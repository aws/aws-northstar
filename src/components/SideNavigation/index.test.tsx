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
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SideNavigation, { SideNavigationItemType } from '.';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Badge from '../Badge';

describe('SideNavigation', () => {
    afterEach(cleanup);

    it(`should render the headers and navigation items`, () => {
        const navigationItems = [
            { type: SideNavigationItemType.LINK, text: 'Page 1', href: '/page1' },
            { type: SideNavigationItemType.LINK, text: 'Page 2', href: 'https://www.mysite.com' },
        ];
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <SideNavigation
                    header={{
                        text: 'Site header',
                    }}
                    items={navigationItems}
                />
            </Router>
        );
        expect(getByText('Site header')).toBeInTheDocument();
        expect(getByText('Page 1').closest('a')).toHaveAttribute('href', '/page1');
        expect(getByText('Page 2').closest('a')).toHaveAttribute('href', 'https://www.mysite.com');
    });

    it(`should render the header link`, () => {
        const navigationItems = [
            { type: SideNavigationItemType.LINK, text: 'Page 1', href: '/page1' },
            { type: SideNavigationItemType.LINK, text: 'Page 2', href: 'https://www.mysite.com' },
        ];
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <SideNavigation
                    header={{
                        href: '/',
                        text: 'Site header',
                    }}
                    items={navigationItems}
                />
            </Router>
        );
        expect(getByText('Site header').closest('a')).toHaveAttribute('href', '/');
    });

    it('should render sub list items when the section is expanded', () => {
        const navigationItems = [
            { type: SideNavigationItemType.LINK, text: 'Page 1', href: '/page1' },
            {
                type: SideNavigationItemType.SECTION,
                text: 'Section 1',
                expanded: true,
                items: [
                    {
                        type: SideNavigationItemType.LINK,
                        text: 'Page 2',
                        href: '/page2',
                    },
                ],
            },
        ];
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <SideNavigation
                    header={{
                        href: '/',
                        text: 'Site header',
                    }}
                    items={navigationItems}
                />
            </Router>
        );
        expect(getByText('Site header').closest('a')).toHaveAttribute('href', '/');
        expect(getByText('Page 1').closest('a')).toHaveAttribute('href', '/page1');
        expect(getByText('Page 2').closest('a')).toHaveAttribute('href', '/page2');
    });

    it('should not render sub list items when the section is not expanded', () => {
        const navigationItems = [
            { type: SideNavigationItemType.LINK, text: 'Page 1', href: '/page1' },
            {
                type: SideNavigationItemType.SECTION,
                text: 'Section 1',
                items: [
                    {
                        type: SideNavigationItemType.LINK,
                        text: 'Page 2',
                        href: '/page2',
                    },
                ],
            },
        ];
        const history = createMemoryHistory();
        const { queryByText } = render(
            <Router history={history}>
                <SideNavigation
                    header={{
                        href: '/',
                        text: 'Site header',
                    }}
                    items={navigationItems}
                />
            </Router>
        );
        expect(queryByText('Page 2')).not.toBeInTheDocument();
    });

    it('should expand sub list items when click the section', () => {
        const navigationItems = [
            { type: SideNavigationItemType.LINK, text: 'Page 1', href: '/page1' },
            {
                type: SideNavigationItemType.SECTION,
                text: 'Section 1',
                items: [
                    {
                        type: SideNavigationItemType.LINK,
                        text: 'Page 2',
                        href: '/page2',
                    },
                ],
            },
        ];
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <SideNavigation
                    header={{
                        href: '/',
                        text: 'Site header',
                    }}
                    items={navigationItems}
                />
            </Router>
        );
        fireEvent.click(getByText('Section 1'));
        expect(getByText('Page 2')).toBeInTheDocument();
    });

    it('should render the divider', () => {
        const navigationItems = [
            { type: SideNavigationItemType.LINK, text: 'Page 1', href: '/page1' },
            { type: SideNavigationItemType.DIVIDER },
            { type: SideNavigationItemType.LINK, text: 'Page 2', href: '/page2' },
        ];
        const history = createMemoryHistory();
        const { container } = render(
            <Router history={history}>
                <SideNavigation
                    header={{
                        href: '/',
                        text: 'Site header',
                    }}
                    items={navigationItems}
                />
            </Router>
        );
        expect(container.querySelector('hr')).toBeInTheDocument();
    });

    it('should render the badge if it is provided', () => {
        const navigationItems = [
            { type: SideNavigationItemType.LINK, text: 'Page 1', href: '/page1' },
            {
                type: SideNavigationItemType.LINK,
                text: 'Notifications',
                href: '/notifications',
                info: <Badge color="red" content="23"></Badge>,
            },
        ];
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <SideNavigation
                    header={{
                        href: '/',
                        text: 'Site header',
                    }}
                    items={navigationItems}
                />
            </Router>
        );
        expect(getByText('23').closest('span')).toHaveClass('MuiChip-label');
    });
});
