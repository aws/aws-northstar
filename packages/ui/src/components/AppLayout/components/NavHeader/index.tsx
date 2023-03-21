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
import { FC, useMemo } from 'react';
import { Mode, Density } from '@cloudscape-design/global-styles';
import TopNavigation, { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { useNorthStarThemeContext } from '../../../NorthStarThemeProvider';

/**
 * User information displayed on the right top corner of the app.
 */
export interface User {
    /**
     * Username displayed as the label of the User menu dropdown.
     */
    username: string;
    /**
     * User email information displayed within the User menu dropdown.
     */
    email?: string;
}

/**
 * Props for Top Navigation Header
 */
export interface NavHeaderProps {
    /**
     * The title of the app.
     */
    title: string;
    /**
     * The src of the logo.
     */
    logo?: string;
    /**
     * The href that the header links to
     */
    href?: string;
    /**
     * The user information displayed on the right top corner of the app.
     */
    user?: User;
    /**
     * The callback for User Sign out
     */
    onSignout?: () => Promise<void>;
}

/**
 * Top Navigation Header displayed on AppLayout.
 */
const NavHeader: FC<NavHeaderProps> = ({ title, href = '/', logo, user, onSignout }) => {
    const { theme, density, setTheme, setDensity } = useNorthStarThemeContext();

    const utilities: TopNavigationProps.Utility[] = useMemo(() => {
        const menu: TopNavigationProps.Utility[] = [
            {
                type: 'menu-dropdown',
                iconName: 'settings',
                ariaLabel: 'Settings',
                title: 'Settings',
                items: [
                    {
                        id: 'theme',
                        text: 'Theme',
                        items: [
                            {
                                id: 'theme.light',
                                text: 'Light',
                                disabled: theme === Mode.Light,
                                disabledReason: 'currently selected',
                            },
                            {
                                id: 'theme.dark',
                                text: 'Dark',
                                disabled: theme === Mode.Dark,
                                disabledReason: 'currently selected',
                            },
                        ],
                    },
                    {
                        id: 'density',
                        text: 'Density',
                        items: [
                            {
                                id: 'density.comfortable',
                                text: 'Comfortable',
                                disabled: density === Density.Comfortable,
                                disabledReason: 'currently selected',
                            },
                            {
                                id: 'density.compact',
                                text: 'Compact',
                                disabled: density === Density.Compact,
                                disabledReason: 'currently selected',
                            },
                        ],
                    },
                ],
                onItemClick: (e) => {
                    switch (e.detail.id) {
                        case 'theme.light':
                            setTheme(Mode.Light);
                            break;
                        case 'theme.dark':
                            setTheme(Mode.Dark);
                            break;
                        case 'density.comfortable':
                            setDensity(Density.Comfortable);
                            break;
                        case 'density.compact':
                            setDensity(Density.Compact);
                            break;
                        default:
                            break;
                    }
                },
            },
        ];

        user &&
            menu.push({
                type: 'menu-dropdown',
                text: user.username,
                description: user.email,
                iconName: 'user-profile',
                items: [{ id: 'signout', text: 'Sign out' }],
                onItemClick: onSignout,
            });

        return menu;
    }, [theme, density, setDensity, setTheme, user, onSignout]);

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 1002 }}>
            <TopNavigation
                utilities={utilities}
                i18nStrings={{ overflowMenuTitleText: title, overflowMenuTriggerText: title }}
                identity={{
                    title: title,
                    href: href,
                    logo: logo
                        ? {
                              src: logo,
                              alt: title,
                          }
                        : undefined,
                }}
            />
        </div>
    );
};

export default NavHeader;
