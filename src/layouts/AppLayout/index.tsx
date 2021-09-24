/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.                                                                              *
 ******************************************************************************************************************** */

import React, {
    createContext,
    ReactNode,
    ReactElement,
    FunctionComponent,
    useContext,
    useState,
    useLayoutEffect,
    useRef,
    useCallback,
    useEffect,
    useMemo,
} from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import useLocalStorage from 'react-use-localstorage';
import MenuIcon from '@material-ui/icons/Menu';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';

import Box from '../../layouts/Box';
import Sidebar, { SidebarType } from './components/Sidebar';
import SplitPanel from './components/SplitPanel';
import Stack from '../../layouts/Stack';
import Overlay from '../../components/Overlay';
import Flashbar from '../../components/Flashbar';
import { FlashbarMessage } from '../../components/Flashbar';
import useScrollPosition, { ScrollPosition } from '../../hooks/useScrollPosition';
import LoadingIndicator from '../../components/LoadingIndicator';
import { SideNavigationProps } from '../../components/SideNavigation';
import { HelpPanelProps } from '../../components/HelpPanel';
import { LOCAL_STORAGE_KEY_SIDE_NAV_OPEN, LOCAL_STORAGE_KEY_HELP_PANEL_OPEN } from './constants';

interface StyleProps {
    hasSideNavigation: boolean;
    hasHelpPanel: boolean;
    isSideNavigationOpen: boolean;
    isHelpPanelOpen: boolean;
    inProgress: boolean;
    notificationsBoxHeight: number;
    mainContentScrollPosition: ScrollPosition;
    headerHeightInPx: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
    root: {
        margin: '0',
        overflow: 'hidden',
    },
    flashbarContainer: {
        margin: theme.spacing(-4, -4, 2, -4),
    },
    breadcrumbsContainer: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    main: {
        display: 'flex',
        height: ({ headerHeightInPx }) => `calc(100vh - ${headerHeightInPx}px)`,
    },
    contentArea: ({ hasSideNavigation, isSideNavigationOpen, hasHelpPanel, isHelpPanelOpen }) => ({
        marginTop: 0,
        marginBottom: 0,
        height: '100%',
        position: 'relative',
        flexGrow: 1,
        boxSizing: 'border-box',
        overflow: 'auto',
        marginLeft: hasSideNavigation && !isSideNavigationOpen ? -WIDTH_SIDEBAR : 0,
        marginRight: hasHelpPanel && !isHelpPanelOpen ? -WIDTH_HELP_PANEL : 0,
    }),
    content: {
        flexGrow: 1,
        overflow: 'auto',
    },
    notifications: ({ mainContentScrollPosition }) => ({
        position: 'absolute',
        top: mainContentScrollPosition.y || 0,
        left: mainContentScrollPosition.x || 0,
        right: 0,
        zIndex: theme.zIndex.modal,
        transition: 'all 0.5s linear',
    }),
    contentPadding: {
        [theme.breakpoints.up('sm')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
        },
    },
    mainContent: ({ notificationsBoxHeight }) => ({
        marginTop: notificationsBoxHeight,
        '&:focus': {
            outline: 'none',
        },
    }),
    menu: {
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
        },
        [theme.breakpoints.up('sm')]: {
            position: 'absolute',
            top: '20px',
            paddingRight: 0,
        },
    },
    menuBar: {
        display: 'flex',
        boxShadow: '0 2px 1px -1px rgba(0,28,36,.3)',
    },
    menuBarIcon: {
        padding: theme.spacing(2),
    },
    menuBarNavIcon: {
        flexShrink: 1,
        borderRight: `1px solid ${theme.palette.grey['400']}`,
    },
    menuBarInfoIcon: {
        flexShrink: 1,
        borderLeft: `1px solid ${theme.palette.grey['400']}`,
    },
}));

const WIDTH_SIDEBAR = 285;
const WIDTH_HELP_PANEL = 285;

export interface Notification extends FlashbarMessage {
    id: string;
}

export interface AppLayoutContextApi {
    /**
     * Open/close the help panel.
     */
    openHelpPanel: (open?: boolean) => void;
    /**
     * Set the content of the help panel.
     */
    setHelpPanelContent: (content: ReactNode) => void;
    /**
     * Open/close the split panel.
     */
    openSplitPanel: (open?: boolean) => void;
    /**
     * Set the content of the split panel.
     */
    setSplitPanelContent: (content: ReactNode) => void;
    /**
     * Set the default height of the split panel.
     */
    setDefaultSplitPanelHeight: (height?: number) => void;
    /**
     * Add a notification to the notification panel.
     */
    addNotification: (notification: Notification) => void;
    /**
     * Dismiss the specified notification
     * or all the notifications if notification id is not provided.
     */
    dismissNotifications: (id?: string) => void;
}

const initialState: AppLayoutContextApi = {
    openHelpPanel: () => {},
    setHelpPanelContent: () => {},
    openSplitPanel: () => {},
    setSplitPanelContent: () => {},
    setDefaultSplitPanelHeight: (height?: number) => {},
    addNotification: () => {},
    dismissNotifications: () => {},
};

const AppLayoutContext = createContext<AppLayoutContextApi>(initialState);

interface NotificationExtended extends Notification {
    originalOnDismiss?: Notification['onDismiss'];
}

export interface AppLayoutProps {
    /**The header */
    header: ReactNode;
    /**SideNavigation drawer.*/
    navigation?: ReactElement<SideNavigationProps>;
    /**Help Panel drawer <br/>
     * Alternatively, the helpPanel can be added dynamically via <b>setHelpPanelContent</b> callback in the AppLayoutContext. See <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/applayout--dynamic-help-panel" target="_blank">example</a>.
     */
    helpPanel?: ReactElement<HelpPanelProps>;
    /**
     * Split Panel drawer <br/>
     * Alternatively, the splitPanel can be added dynamically via <b>setSplitPanelContent</b> callback in the AppLayoutContext. See <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/applayout--dynamic-split-panel" target="_blank">example</a>.
     */
    splitPanel?: ReactNode;
    /**Whether to render padding within the content area*/
    paddingContentArea?: boolean;
    /**Breadcrumbs should be defined whithin this region in order to benefit from the responsive breadcrumb pattern.*/
    breadcrumbs?: ReactNode;
    /**Whether to display in Progress global overlay*/
    inProgress?: boolean;
    /**A list of notifications. <br/>
     * The notifications are displayed on top of the main content in the scrollable area,
     * it occupies the full width and is not affected by the padding that is added to the content region. <br/>
     * Alternatively, the notification can be pushed dynamically via <b>addNotification</b> callback in the AppLayoutContext. See <a href='http://https://storybook.northstar.aws-prototyping.cloud/?path=/story/applayout--dynamic-notification-add' target="_blank">example</a>.
     * */
    notifications?: Notification[];
    /**Maximum number of notifications to be displayed*/
    maxNotifications?: number;
    /**
     * Height Of Header in pixel when custom header is used.
     * By default, 65px will be used for the <a href='/#/Components/Header'>NorthStar Header</a>. */
    headerHeightInPx?: number;
}

/**
 * Basic layout for application, with place holder for header, navigation area, content area, breadcrumbs and tools/help panel.
 * It should be placed as the top most component in main content area. There should not be any spacing around it, it consumes
 * 100% of the width and height of the main content area, providing its own scrolling behavior.
 * By default it comes with a padding inside the content region. It can be removed by setting prop paddingContentArea == false.
 */
const AppLayout: FunctionComponent<AppLayoutProps> = ({
    children,
    header,
    navigation,
    helpPanel,
    splitPanel,
    breadcrumbs,
    paddingContentArea = true,
    maxNotifications = 2,
    inProgress = false,
    notifications: notificationsProp,
    headerHeightInPx = 65,
}) => {
    const [helpPanelContent, setHelpPanelContent] = useState<ReactNode>(helpPanel);
    const [splitPanelContent, setSplitPanelContent] = useState<ReactNode>(splitPanel);
    const [notifications, setNotifications] = useState<NotificationExtended[]>([]);
    const [isSideNavigationOpen, setIsSideNavigationOpen] = useLocalStorage(LOCAL_STORAGE_KEY_SIDE_NAV_OPEN, 'false');
    const [isHelpPanelOpen, setIsHelpPanelOpen] = useLocalStorage(LOCAL_STORAGE_KEY_HELP_PANEL_OPEN, 'false');
    const [isSplitPanelOpen, setIsSplitPanelOpen] = useState(!!splitPanel);
    const [defaultSplitPanelHeight, setDefaultSplitPanelHeight] = useState<number | undefined>();
    const notificationsBoxRef = useRef<HTMLDivElement>(null);
    const mainContentRef = useRef(null);
    const [notificationsBoxHeight, setNotificationsBoxHeight] = useState(0);
    const theme = useTheme();
    const fullMode = useMediaQuery(theme.breakpoints.up('sm'));
    const [mainContentScrollPosition, setMainContentScrollPosition] = useState<ScrollPosition>({
        x: 0,
        y: 0,
    });

    useLayoutEffect(() => {
        setNotificationsBoxHeight(notificationsBoxRef.current?.offsetHeight || 0);
    }, [notificationsBoxRef, notifications]);

    useEffect(() => {
        if (notificationsProp) {
            setNotifications((prevNotifications) => [
                ...prevNotifications,
                ...notificationsProp.filter((np) => !prevNotifications.find((pn) => pn.id === np.id)),
            ]);
        }
    }, [notificationsProp]);

    const handleDismissNotification = useCallback(
        (id?: string) => {
            if (id) {
                setNotifications((prevNotifications) => {
                    const notification = prevNotifications.find((n) => n.id === id);
                    notification?.originalOnDismiss?.();
                    return prevNotifications.filter((n) => n.id !== id);
                });
            } else {
                setNotifications((prevNotifications) => {
                    prevNotifications.forEach((n) => n.originalOnDismiss?.());
                    return [];
                });
            }
        },
        [setNotifications]
    );

    const handleAddNotification = useCallback(
        (newNotification: Notification) => {
            setNotifications((prevNotifications) => {
                const allNotifications = [
                    {
                        ...newNotification,
                        originalOnDismiss: newNotification.onDismiss,
                        onDismiss: () => handleDismissNotification(newNotification.id),
                    },
                    ...prevNotifications,
                ];

                if (allNotifications.length > maxNotifications) {
                    allNotifications.slice(maxNotifications).forEach((n) => n.originalOnDismiss?.());
                }

                return allNotifications.slice(0, maxNotifications);
            });
        },
        [handleDismissNotification, setNotifications, maxNotifications]
    );

    const watchScroll = useMemo(() => {
        return notifications.length > 0;
    }, [notifications]);

    const { handleScroll } = useScrollPosition(
        (position: ScrollPosition) => {
            setMainContentScrollPosition(position);
        },
        mainContentRef,
        200
    );

    const classes = useStyles({
        hasSideNavigation: !!navigation,
        hasHelpPanel: !!helpPanelContent,
        isSideNavigationOpen: isSideNavigationOpen === 'true',
        isHelpPanelOpen: isHelpPanelOpen === 'true',
        inProgress,
        notificationsBoxHeight,
        mainContentScrollPosition,
        headerHeightInPx,
    });

    const renderNavigationIcon = useCallback(
        (rootClassname: string) => {
            return (
                <IconButton
                    color="inherit"
                    aria-label="open navigation drawer"
                    data-testid="open-nav-drawer"
                    onClick={() => setIsSideNavigationOpen('true')}
                    classes={{
                        root: rootClassname,
                        label: classes.menu,
                    }}
                >
                    <MenuIcon />
                </IconButton>
            );
        },
        [classes, setIsSideNavigationOpen]
    );

    const renderInfoIcon = useCallback(
        (rootClassname: string) => {
            return (
                <IconButton
                    color="inherit"
                    aria-label="open help panel drawer"
                    data-testid="open-helppanel-drawer"
                    onClick={() => setIsHelpPanelOpen('true')}
                    classes={{
                        root: rootClassname,
                        label: classes.menu,
                    }}
                >
                    <InfoOutlinedIcon />
                </IconButton>
            );
        },
        [classes, setIsHelpPanelOpen]
    );

    const openHelpPanel = useCallback(
        (open = true) => {
            setIsHelpPanelOpen(open.toString());
        },
        [setIsHelpPanelOpen]
    );

    const openSplitPanel = useCallback(
        (open = true) => {
            setIsSplitPanelOpen(open);
        },
        [setIsSplitPanelOpen]
    );

    return (
        <Box className={classes.root}>
            <AppLayoutContext.Provider
                value={{
                    openHelpPanel,
                    setHelpPanelContent,
                    openSplitPanel,
                    setSplitPanelContent,
                    setDefaultSplitPanelHeight,
                    addNotification: handleAddNotification,
                    dismissNotifications: handleDismissNotification,
                }}
            >
                {header}
                {!fullMode && (navigation || helpPanelContent) && (
                    <Box className={classes.menuBar}>
                        {navigation && (
                            <Box className={classes.menuBarNavIcon}>{renderNavigationIcon(classes.menuBarIcon)}</Box>
                        )}
                        <Box width="100%" />
                        {helpPanelContent && (
                            <Box className={classes.menuBarInfoIcon}>{renderInfoIcon(classes.menuBarIcon)}</Box>
                        )}
                    </Box>
                )}

                <Box className={classes.main}>
                    {navigation && (
                        <Sidebar
                            sidebarWidth={WIDTH_SIDEBAR}
                            isSidebarOpen={isSideNavigationOpen}
                            setIsSidebarOpen={setIsSideNavigationOpen}
                            type={SidebarType.SIDE_NAVIGATION}
                            displayIcon={fullMode}
                            renderIcon={renderNavigationIcon}
                        >
                            {navigation}
                        </Sidebar>
                    )}
                    <Box display="flex" flexDirection="column" className={classes.contentArea}>
                        <div
                            ref={mainContentRef}
                            className={classes.content}
                            onScroll={(watchScroll && handleScroll) || undefined}
                        >
                            {notifications && notifications.length > 0 && (
                                <div ref={notificationsBoxRef} className={classes.notifications}>
                                    <Flashbar items={notifications} maxItemsDisplayed={maxNotifications} />
                                </div>
                            )}
                            <Box
                                tabIndex={0}
                                position="relative"
                                className={clsx(classes.mainContent, {
                                    [classes.contentPadding]: !!paddingContentArea,
                                })}
                            >
                                <Stack spacing="s">
                                    {breadcrumbs && <Box className={classes.breadcrumbsContainer}>{breadcrumbs}</Box>}
                                    <main>{children}</main>
                                </Stack>
                                {inProgress && (
                                    <Overlay>
                                        <LoadingIndicator size="large" />
                                    </Overlay>
                                )}
                            </Box>
                        </div>
                        <SplitPanel
                            isSplitPanelOpen={isSplitPanelOpen}
                            setIsSplitPanelOpen={setIsSplitPanelOpen}
                            defaultSplitPanelHeight={defaultSplitPanelHeight}
                            fullMode={fullMode}
                        >
                            {splitPanelContent}
                        </SplitPanel>
                    </Box>
                    {helpPanelContent && (
                        <Sidebar
                            sidebarWidth={WIDTH_HELP_PANEL}
                            isSidebarOpen={isHelpPanelOpen}
                            setIsSidebarOpen={setIsHelpPanelOpen}
                            type={SidebarType.HELP_PANEL}
                            displayIcon={fullMode}
                            renderIcon={renderInfoIcon}
                        >
                            {helpPanelContent}
                        </Sidebar>
                    )}
                </Box>
            </AppLayoutContext.Provider>
        </Box>
    );
};

export const useAppLayoutContext = () => useContext(AppLayoutContext);

export default AppLayout;
