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
// @ts-ignore
import StoryRouter from 'storybook-react-router';
import { addDecorator } from '@storybook/react';
import Badge from '../Badge';
import SideNavigation, { SideNavigationItemType } from '.';

addDecorator(
    StoryRouter(
        {},
        {
            initialEntries: ['/page1'],
        }
    )
);

export default {
    component: SideNavigation,
    title: 'SideNavigation',
};

export const Default = () => {
    const navigationItems = [
        { type: SideNavigationItemType.LINK, text: 'Page 1', href: '/page1' },
        { type: SideNavigationItemType.LINK, text: 'Page 2', href: '/page2' },
        { type: SideNavigationItemType.LINK, text: 'Page 3', href: '/page3' },
        { type: SideNavigationItemType.LINK, text: 'Page 4', href: '/page4' },
        { type: SideNavigationItemType.DIVIDER },
        {
            type: SideNavigationItemType.LINK,
            text: 'Notifications',
            href: '/notifications',
            info: <Badge color="red" content="23"></Badge>,
        },
        {
            type: SideNavigationItemType.LINK,
            text: 'Documentation',
            href: 'https://www.mysite.com',
        },
    ];
    return (
        <SideNavigation
            header={{
                href: '/',
                text: 'Service name',
            }}
            items={navigationItems}
        />
    );
};

export const WithSections = () => {
    const navigationItems = [
        {
            type: SideNavigationItemType.LINK,
            text: 'Page 1',
            href: '/page1',
        },
        {
            type: SideNavigationItemType.LINK,
            text: 'Page 2',
            href: '/page2',
        },
        {
            type: SideNavigationItemType.SECTION,
            text: 'Section 1',
            items: [
                {
                    type: SideNavigationItemType.LINK,
                    text: 'Page 4',
                    href: '/page4',
                },
                {
                    type: SideNavigationItemType.LINK,
                    text: 'Page 5',
                    href: '/page5',
                },
                {
                    type: SideNavigationItemType.LINK,
                    text: 'Page 6',
                    href: '/page6',
                },
            ],
        },
        {
            type: SideNavigationItemType.SECTION,
            text: 'Section 2',
            expanded: true,
            items: [
                {
                    type: SideNavigationItemType.LINK,
                    text: 'Page 7',
                    href: '/page7',
                },
                {
                    type: SideNavigationItemType.LINK,
                    text: 'Page 8',
                    href: '/page8',
                },
                {
                    type: SideNavigationItemType.LINK,
                    text: 'Page 9',
                    href: '/page9',
                },
            ],
        },
    ];
    return (
        <SideNavigation
            header={{
                href: '/',
                text: 'Service name',
            }}
            items={navigationItems}
        />
    );
};
