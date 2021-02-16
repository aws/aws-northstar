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
import React, { useState, useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import AppLayout, { Notification, useAppLayoutContext } from '.';
import Badge from '../../components/Badge';
import Box from '../Box';
import BreadcrumbGroup from '../../components/BreadcrumbGroup';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Heading from '../../components/Heading';
import HelpPanel from '../../components/HelpPanel';
import Link from '../../components/Link';
import SideNavigation, { SideNavigationItemType } from '../../components/SideNavigation';
import Stack from '../Stack';
import Text from '../../components/Text';

export default {
    component: AppLayout,
    title: 'AppLayout',
};

const header = <Header title="HelloWorld" logoPath="img/logo-light-short.png" hideHeaderBelow="sm" />;
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
        href: 'https://docs.yoursite.com',
    },
];
const navigation = (
    <SideNavigation
        header={{
            href: '/',
            text: 'App name',
        }}
        items={navigationItems}
    />
);
const helpPanel = (
    <HelpPanel
        header="Help panel title (h2)"
        learnMoreFooter={[
            <Link href="/docs">Link to internal documentation</Link>,
            <Link href="https://www.yoursite.com">Link to external documentation</Link>,
        ]}
    >
        <Text variant="p">
            This is a paragraph with some <b>bold text</b> and also some <i>italic text.</i>
        </Text>
        <Heading variant="h4">h4 section header</Heading>
        <Heading variant="h5">h5 section header</Heading>
    </HelpPanel>
);
const breadcrumbGroup = (
    <BreadcrumbGroup
        items={[
            {
                text: 'Home',
                href: '#home',
            },
            {
                text: 'Path1',
                href: '#path1',
            },
            {
                text: 'Path2',
                href: '#path2',
            },
            {
                text: 'Path3',
                href: '#path3',
            },
        ]}
    />
);
const defaultNotifications: Notification[] = [
    {
        id: '1',
        header: 'Successfully update 4 orders',
        type: 'success',
        content: 'This is a success flash message.',
        dismissible: true,
    },
    {
        id: '2',
        header: 'Failed to update 1 order',
        type: 'error',
        content: 'This is a dismissible error message with a button.',
        buttonText: 'Retry',
        onButtonClick: action('onButtonClick'),
        dismissible: true,
    },
    {
        id: '3',
        header: 'Warning',
        type: 'warning',
        content: 'This is warning content',
        dismissible: true,
    },
];

const mainContent = (
    <Box bgcolor="grey.300" width="100%" height="1000px">
        Main Content
    </Box>
);

export const Default = () => {
    const [notifications, setNotifications] = useState(defaultNotifications);

    const handleDismiss = (id: string) => {
        setNotifications(notifications.filter((n) => n.id !== id));
    };

    return (
        <AppLayout
            header={header}
            navigation={navigation}
            helpPanel={helpPanel}
            breadcrumbs={breadcrumbGroup}
            notifications={notifications.map((n) => ({ ...n, onDismiss: () => handleDismiss(n.id) }))}
        >
            {mainContent}
        </AppLayout>
    );
};

export const WithoutNotifications = () => {
    return (
        <AppLayout header={header} navigation={navigation} helpPanel={helpPanel} breadcrumbs={breadcrumbGroup}>
            {mainContent}
        </AppLayout>
    );
};

export const WithoutSidebars = () => {
    return <AppLayout header={header}>{mainContent}</AppLayout>;
};

export const WithOnlyHelpPanel = () => {
    return (
        <AppLayout header={header} helpPanel={helpPanel}>
            {mainContent}
        </AppLayout>
    );
};

export const WithoutContentPadding = () => {
    return (
        <AppLayout header={header} paddingContentArea={false}>
            {mainContent}
        </AppLayout>
    );
};

const ContentUsingContext = () => {
    const { openHelpPanel } = useAppLayoutContext();
    return (
        <Box bgcolor="grey.300" width="100%" height="1000px">
            <Stack>
                Main Content
                <Button onClick={() => openHelpPanel()}>Open Help Panel</Button>
                <Button onClick={() => openHelpPanel(false)}>Close Help Panel</Button>
            </Stack>
        </Box>
    );
};

export const OpenHelpPanel = () => {
    return (
        <AppLayout header={header} navigation={navigation} helpPanel={helpPanel}>
            <ContentUsingContext />
        </AppLayout>
    );
};

export const CustomHeader = () => {
    const customHeader = (
        <Box
            display="flex"
            width="100%"
            height="100px"
            bgcolor="primary.main"
            fontSize={56}
            alignItems="center"
            paddingLeft={1}
            paddingY="auto"
            color="primary.contrastText"
        >
            Custom Header
        </Box>
    );
    return (
        <AppLayout header={customHeader} navigation={navigation} helpPanel={helpPanel} headerHeightInPx={100}>
            {mainContent}
        </AppLayout>
    );
};

export const WithInprogressOverlay = () => {
    const [inProgress, setInProgress] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setInProgress(true);
            setTimeout(() => {
                setInProgress(false);
            }, 3000);
        }, 3000);
    }, []);
    return (
        <AppLayout header={header} navigation={navigation} breadcrumbs={breadcrumbGroup} inProgress={inProgress}>
            {mainContent}
        </AppLayout>
    );
};
