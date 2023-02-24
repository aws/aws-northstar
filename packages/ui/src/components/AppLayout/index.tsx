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
import { FC, useState, useCallback, createContext, PropsWithChildren, ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadcrumbGroup, { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import Box from '@cloudscape-design/components/box';
import AppLayoutComponent, {
    AppLayoutProps as AppLayoutComponentProps,
} from '@cloudscape-design/components/app-layout';
import NavHeader, { NavHeaderProps } from './components/NavHeader';
import { CancelableEventHandler } from '@cloudscape-design/components/internal/events';
import { TopNavigationProps } from '@cloudscape-design/components/top-navigation';

export type AppLayoutProps = (NavHeaderProps | { header: ReactElement<TopNavigationProps> }) &
    (
        | {
              navigationItems: SideNavigationProps.Item[];
          }
        | { navigation: ReactElement<SideNavigationProps> }
    ) & { breadcrumbGroup?: ReactElement<BreadcrumbGroupProps> } & {
        title: string;
        defaultBreadcrumb?: string;
    } & AppLayoutComponentProps;

export interface AppLayoutContextApi {
    appLayoutProps: AppLayoutComponentProps;
    setAppLayoutProps: (props: AppLayoutComponentProps) => void;
}

const initialState = {
    appLayoutProps: {},
    setAppLayoutProps: () => {},
};

export const AppLayoutContext = createContext<AppLayoutContextApi>(initialState);

const AppLayout: FC<PropsWithChildren<AppLayoutProps>> = ({
    title,
    defaultBreadcrumb = 'home',
    children,
    ...props
}) => {
    const navigate = useNavigate();
    const [activeHref, setActiveHref] = useState('/');
    const [activeBreadcrumbs, setActiveBreadcrumbs] = useState<BreadcrumbGroupProps.Item[]>([
        { text: defaultBreadcrumb, href: '/' },
    ]);
    const [appLayoutProps, setAppLayoutProps] = useState<AppLayoutComponentProps>({});

    const setAppLayoutPropsSafe = useCallback(
        (props: AppLayoutComponentProps) => {
            JSON.stringify(appLayoutProps) !== JSON.stringify(props) && setAppLayoutProps(props);
        },
        [appLayoutProps]
    );

    const onNavigate: CancelableEventHandler<BreadcrumbGroupProps.ClickDetail | SideNavigationProps.FollowDetail> =
        useCallback(
            (e) => {
                if (!e.detail.external) {
                    e.preventDefault();
                    setAppLayoutProps({});
                    setActiveHref(e.detail.href);

                    const segments = [
                        defaultBreadcrumb,
                        ...e.detail.href.split('/').filter((segment) => segment !== ''),
                    ];
                    setActiveBreadcrumbs(
                        segments.map((segment, i) => {
                            const href = segments
                                .slice(0, i + 1)
                                .join('/')
                                .replace('//', '/');
                            return {
                                href,
                                text: segment,
                            };
                        })
                    );
                    navigate(e.detail.href);
                }
            },
            [navigate, setAppLayoutProps, setActiveBreadcrumbs, defaultBreadcrumb]
        );

    return (
        <>
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
                    'breadcrumbGroup' in props ? (
                        props.breadcrumbGroup
                    ) : (
                        <BreadcrumbGroup onFollow={onNavigate} items={activeBreadcrumbs} />
                    )
                }
                toolsHide
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
                    <AppLayoutContext.Provider
                        value={{
                            appLayoutProps,
                            setAppLayoutProps: setAppLayoutPropsSafe,
                        }}
                    >
                        {!props.contentType || props.contentType === 'default' ? (
                            <div
                                style={{
                                    display: 'flex',
                                }}
                            >
                                <div
                                    style={{
                                        flex: '1 0 auto',
                                        overflowY: 'scroll',
                                    }}
                                >
                                    <Box margin="l">{children}</Box>
                                </div>
                            </div>
                        ) : (
                            children
                        )}
                    </AppLayoutContext.Provider>
                }
                {...props}
                {...appLayoutProps}
            />
        </>
    );
};

export const useAppLayoutContext = () => useContext(AppLayoutContext);

export default AppLayout;
