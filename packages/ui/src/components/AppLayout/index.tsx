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
import {
    FC,
    useState,
    useCallback,
    createContext,
    PropsWithChildren,
    ReactElement,
    useContext,
    useMemo,
    useEffect,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import SplitPanel, { SplitPanelProps as SplitPanelComponentProps } from '@cloudscape-design/components/split-panel';
import Box from '@cloudscape-design/components/box';
import AppLayoutComponent, {
    AppLayoutProps as AppLayoutComponentProps,
} from '@cloudscape-design/components/app-layout';
import NavHeader, { NavHeaderProps } from './components/NavHeader';
import { CancelableEventHandler } from '@cloudscape-design/components/internal/events';
import { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { splitPanelI18nStrings } from './constants';
import getBreadcrumbs from './utils/getBreadcrumbs';

export type AppLayoutProps = (NavHeaderProps | { header: ReactElement<TopNavigationProps> }) &
    (
        | {
              /**
               * Specifies the items to be displayed in the navigation
               */
              navigationItems: SideNavigationProps.Item[];
          }
        | { navigation: ReactElement<SideNavigationProps> }
    ) & {
        /***
         * Use this slot to add the breadcrumb group component to the app layout.
         * If this is not provided, the AppLayout will automatically generate a breadcrumb group
         * based on the current url unless breadcrumbGroupHide is set to false.
         */
        breadcrumbGroup?: ReactElement<BreadcrumbGroupProps>;
    } & {
        /**
         * The header title displayed on both TopNavigation and SideNavigation panel.
         */
        title: string;
        /**
         * The default breadcrumb displayed for / path.
         */
        defaultBreadcrumb?: string;
        /**
         * The available route paths. If this prop is provided, the breadcrumb will show # as href
         * if the href is not matched to any available route path.
         */
        availableRoutes?: string[];
        /**
         *  If true, the breadcrumb group is not displayed at all.
         * */
        breadcrumbGroupHide?: boolean;
    } & AppLayoutComponentProps;

export type SplitPanelProps = Pick<
    SplitPanelComponentProps,
    'header' | 'closeBehavior' | 'hidePreferencesButton' | 'children'
>;

export interface AppLayoutContextApi {
    setContentType: React.Dispatch<React.SetStateAction<AppLayoutComponentProps['contentType']>>;

    setSplitPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSplitPanelSize: React.Dispatch<React.SetStateAction<AppLayoutComponentProps['splitPanelSize']>>;
    setSplitPanelProps: React.Dispatch<React.SetStateAction<SplitPanelProps | undefined>>;
    setSplitPanelPreferences: React.Dispatch<React.SetStateAction<AppLayoutComponentProps.SplitPanelPreferences>>;

    setNotifications: React.Dispatch<React.SetStateAction<AppLayoutComponentProps['notifications']>>;

    setNavigationOpen: React.Dispatch<React.SetStateAction<boolean>>;

    setTools: React.Dispatch<React.SetStateAction<AppLayoutComponentProps['tools']>>;
    setToolsHide: React.Dispatch<React.SetStateAction<boolean>>;
    setToolsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setToolsWidth: React.Dispatch<React.SetStateAction<AppLayoutComponentProps['toolsWidth']>>;
}

const initialState = {
    setContentType: () => {},

    setSplitPanelOpen: () => {},
    setSplitPanelSize: () => {},
    setSplitPanelProps: () => {},
    setSplitPanelPreferences: () => {},

    setNotifications: () => {},

    setNavigationOpen: () => {},

    setTools: () => {},
    setToolsHide: () => {},
    setToolsOpen: () => {},
    setToolsWidth: () => {},
};

export const AppLayoutContext = createContext<AppLayoutContextApi>(initialState);

/**
 * Provides the basic layout for all types of pages, including collapsible side navigation, tools panel, and split panel.
 */
const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
    title,
    defaultBreadcrumb = 'home',
    availableRoutes,
    breadcrumbGroupHide,
    children,
    ...props
}) => {
    const navigate = useNavigate();

    const [contentType, setContentType] = useState(props.contentType);

    const [splitPanelOpen, setSplitPanelOpen] = useState(props.splitPanelOpen ?? false);
    const [splitPanelSize, setSplitPanelSize] = useState(props.splitPanelSize);
    const [splitPanelProps, setSplitPanelProps] = useState<SplitPanelProps | undefined>();
    const [splitPanelPreferences, setSplitPanelPreferences] = useState(
        props.splitPanelPreferences ?? ({ position: 'bottom' } as AppLayoutComponentProps.SplitPanelPreferences)
    );

    const [navigationOpen, setNavigationOpen] = useState(props.navigationOpen ?? true);

    const [notifications, setNotifications] = useState(props.notifications);

    const [tools, setTools] = useState(props.tools);
    const [toolsHide, setToolsHide] = useState(props.toolsHide ?? true);
    const [toolsOpen, setToolsOpen] = useState(props.toolsOpen ?? false);
    const [toolsWidth, setToolsWidth] = useState(props.toolsWidth);

    const [activeHref, setActiveHref] = useState('/');
    const [activeBreadcrumbs, setActiveBreadcrumbs] = useState<BreadcrumbGroupProps.Item[]>([
        { text: defaultBreadcrumb, href: '/' },
    ]);

    const location = useLocation();
    useEffect(() => {
        setActiveHref(location.pathname);
        const breadcrumbs = getBreadcrumbs(location.pathname, location.search, defaultBreadcrumb, availableRoutes);
        setActiveBreadcrumbs(breadcrumbs);
    }, [location, defaultBreadcrumb, availableRoutes]);

    const onNavigate: CancelableEventHandler<BreadcrumbGroupProps.ClickDetail | SideNavigationProps.FollowDetail> =
        useCallback(
            (e) => {
                if (!e.detail.external) {
                    e.preventDefault();
                    setContentType(undefined);
                    setSplitPanelOpen(false);
                    setSplitPanelSize(undefined);
                    setSplitPanelProps(undefined);
                    navigate(e.detail.href);
                }
            },
            [navigate]
        );

    const splitPanel = useMemo(() => {
        return splitPanelProps ? (
            <SplitPanel i18nStrings={splitPanelI18nStrings} {...splitPanelProps}>
                {splitPanelProps?.children}
            </SplitPanel>
        ) : null;
    }, [splitPanelProps]);

    return (
        <AppLayoutContext.Provider
            value={{
                setContentType,

                setSplitPanelOpen,
                setSplitPanelSize,
                setSplitPanelProps,
                setSplitPanelPreferences,

                setNotifications,

                setNavigationOpen,

                setTools,
                setToolsHide,
                setToolsOpen,
                setToolsWidth,
            }}
        >
            {'header' in props ? (
                props.header
            ) : (
                <NavHeader
                    title={title}
                    href={props.href}
                    logo={props.logo}
                    user={props.user}
                    onSignout={props.onSignout}
                />
            )}
            <AppLayoutComponent
                breadcrumbs={
                    breadcrumbGroupHide ? undefined : 'breadcrumbGroup' in props ? (
                        props.breadcrumbGroup
                    ) : (
                        <BreadcrumbGroup onFollow={onNavigate} items={activeBreadcrumbs} />
                    )
                }
                navigation={
                    'navigation' in props ? (
                        props.navigation
                    ) : (
                        <SideNavigation
                            header={{ text: title, href: '/' }}
                            activeHref={activeHref}
                            onFollow={onNavigate}
                            items={props.navigationItems}
                        />
                    )
                }
                content={
                    !contentType || contentType === 'default' ? <Box padding={{ top: 'l' }}>{children}</Box> : children
                }
                {...props}
                contentType={contentType}
                splitPanelOpen={splitPanelOpen}
                splitPanelSize={splitPanelSize}
                splitPanel={splitPanel}
                splitPanelPreferences={splitPanelPreferences}
                onSplitPanelToggle={({ detail }) => setSplitPanelOpen(detail.open)}
                onSplitPanelResize={({ detail }) => setSplitPanelSize(detail.size)}
                onSplitPanelPreferencesChange={({ detail }) => setSplitPanelPreferences(detail)}
                notifications={notifications}
                navigationOpen={navigationOpen}
                onNavigationChange={({ detail }) => setNavigationOpen(detail.open)}
                toolsHide={toolsHide}
                tools={tools}
                toolsOpen={toolsOpen}
                toolsWidth={toolsWidth}
                onToolsChange={({ detail }) => setToolsOpen(detail.open)}
            />
        </AppLayoutContext.Provider>
    );
};

export const useAppLayoutContext = () => useContext(AppLayoutContext);

export default AppLayout;
