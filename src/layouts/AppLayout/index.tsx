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
} from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import useLocalStorage from 'react-use-localstorage';
import MenuIcon from '@material-ui/icons/Menu';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';

import Box from '../../layouts/Box';
import Sidebar, { SidebarType } from './components/Sidebar';
import Stack from '../../layouts/Stack';
import Overlay from '../../components/Overlay';
import Flashbar from '../../components/Flashbar';
import { FlashbarMessage } from '../../components/Flashbar';
import useScrollPosition, { ScrollPosition } from '../../hooks/useScrollPosition';
import LoadingIndicator from '../../components/LoadingIndicator';
import { SideNavigationProps } from '../../components/SideNavigation';
import { HelpPanelProps } from '../../components/HelpPanel';

import { LOCAL_STORAGE_KEY_SIDE_NAV_OPEN, LOCAL_STORAGE_KEY_HELP_PANEL_OPEN } from './constants';

const useStyles = makeStyles((theme: Theme) => ({
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
        height: ({ headerHeightInPx }: any) => `calc(100vh - ${headerHeightInPx}px)`,
    },
    content: ({ hasSideNavigration, isSideNavigationOpen, hasHelpPanel, isHelpPanelOpen }: any) => ({
        marginTop: 0,
        marginBottom: 0,
        height: '100%',
        flexGrow: 1,
        position: 'relative',
        overflow: 'auto',
        boxSizing: 'border-box',
        osition: 'relative',
        marginLeft: hasSideNavigration && !isSideNavigationOpen ? -WIDTH_SIDEBAR : 0,
        marginRight: hasHelpPanel && !isHelpPanelOpen ? -WIDTH_HELP_PANEL : 0,
    }),
    notifications: ({ mainContentScrollPosition }: any) => ({
        position: 'absolute',
        top: mainContentScrollPosition?.y || 0,
        left: mainContentScrollPosition?.x || 0,
        right: 0,
        zIndex: theme.zIndex.modal,
        transition: 'all 0.5s linear',
    }),
    contentPadding: {
        [theme.breakpoints.up('sm')]: {
            padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
        },
    },
    mainContent: ({ notificationsBoxHeight }: any) => ({
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
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
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
    openHelpPanel: (open?: boolean) => void;
}

const initialState: AppLayoutContextApi = {
    openHelpPanel: () => {},
};

const AppLayoutContext = createContext<AppLayoutContextApi>(initialState);

export interface AppLayoutProps {
    /**The header */
    header: ReactNode;
    /**SideNavigation drawer.*/
    navigation?: ReactElement<SideNavigationProps>;
    /**Help Panel drawer*/
    helpPanel?: ReactElement<HelpPanelProps>;
    /**Whether to render padding within the content area*/
    paddingContentArea?: boolean;
    /**Breadcrumbs should be defined whithin this region in order to benefit from the responsive breadcrumb pattern.*/
    breadcrumbs?: ReactNode;
    /**Whether to display in Progress global overlay*/
    inProgress?: boolean;
    /**A list of notifications. <br/>
     * The notifications are displayed on top of the main content in the scrollable area,
     * it occupies the full width and is not affected by the padding that is added to the content region.*/
    notifications?: Notification[];
    /**Maxinum number of notifications to be displayed*/
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
    navigation = null,
    helpPanel = null,
    breadcrumbs = null,
    paddingContentArea = true,
    maxNotifications = 2,
    inProgress = false,
    notifications,
    headerHeightInPx = 65,
}) => {
    const [isSideNavigationOpen, setIsSideNavigationOpen] = useLocalStorage(LOCAL_STORAGE_KEY_SIDE_NAV_OPEN, 'false');
    const [isHelpPanelOpen, setIsHelpPanelOpen] = useLocalStorage(LOCAL_STORAGE_KEY_HELP_PANEL_OPEN, 'false');
    const notificationsBoxRef = useRef(null);
    const mainContentRef = useRef(null);
    const [notificationsBoxHeight, setNotificationsBoxHeight] = useState(0);
    const [mainContentScrollPosition, setMainContentScrollPositon] = useState<ScrollPosition>({
        x: 0,
        y: 0,
    });

    useLayoutEffect(() => {
        // @ts-ignore
        if (notificationsBoxRef.current) {
            // @ts-ignore
            setNotificationsBoxHeight(notificationsBoxRef.current?.offsetHeight || 0);
        }
        // @ts-ignore
    }, [notificationsBoxRef, notifications]);

    const { handleScroll } = useScrollPosition(
        (position: ScrollPosition) => {
            setMainContentScrollPositon(position);
        },
        mainContentRef,
        200
    );

    const classes = useStyles({
        hasSideNavigration: !!navigation,
        hasHelpPanel: !!helpPanel,
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
                    aria-label="open drawer"
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
                    aria-label="open drawer"
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
        (open: boolean = true) => {
            setIsHelpPanelOpen(open.toString());
        },
        [setIsHelpPanelOpen]
    );

    return (
        <AppLayoutContext.Provider
            value={{
                openHelpPanel,
            }}
        >
            {header}
            {(navigation || helpPanel) && (
                <Box className={classes.menuBar}>
                    {navigation && (
                        <Box className={classes.menuBarNavIcon}>{renderNavigationIcon(classes.menuBarIcon)}</Box>
                    )}
                    <Box width="100%" />
                    {helpPanel && <Box className={classes.menuBarInfoIcon}>{renderInfoIcon(classes.menuBarIcon)}</Box>}
                </Box>
            )}
            <Box className={classes.main}>
                {navigation && (
                    <Sidebar
                        sidebarWidth={WIDTH_SIDEBAR}
                        isSidebarOpen={isSideNavigationOpen}
                        setIsSidebarOpen={setIsSideNavigationOpen}
                        type={SidebarType.SIDE_NAVIGATION}
                        renderIcon={renderNavigationIcon}
                    >
                        {navigation}
                    </Sidebar>
                )}
                <div ref={mainContentRef} className={classes.content} onScroll={handleScroll}>
                    {notifications && notifications.length > 0 && (
                        <div ref={notificationsBoxRef} className={classes.notifications}>
                            <Flashbar items={notifications} maxItemsDisplayed={maxNotifications} />
                        </div>
                    )}
                    <Box
                        tabIndex={0}
                        position="relative"
                        className={clsx(classes.mainContent, { [classes.contentPadding]: !!paddingContentArea })}
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
                {helpPanel && (
                    <Sidebar
                        sidebarWidth={WIDTH_HELP_PANEL}
                        isSidebarOpen={isHelpPanelOpen}
                        setIsSidebarOpen={setIsHelpPanelOpen}
                        type={SidebarType.HELP_PANEL}
                        renderIcon={renderInfoIcon}
                    >
                        {helpPanel}
                    </Sidebar>
                )}
            </Box>
        </AppLayoutContext.Provider>
    );
};

export const useAppLayoutContext = () => useContext(AppLayoutContext);

export default AppLayout;
