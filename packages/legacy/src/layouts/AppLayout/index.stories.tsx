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
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { v4 as uuidv4 } from 'uuid';
import AppLayout, { Notification, useAppLayoutContext } from '.';
import ColumnLayout, { Column } from '../ColumnLayout';
import KeyValuePair from '../../components/KeyValuePair';
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
import { Simple as SimpleTable } from '../../components/Table/index.stories';
import { Default as GeneralInfo } from '../../components/KeyValuePair/index.stories';

export default {
    component: AppLayout,
    title: 'Layouts/AppLayout',
    parameters: {
        layout: 'fullscreen',
    },
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

const splitPanel = (
    <ColumnLayout>
        <Column key="column1">
            <Stack>
                <KeyValuePair label="Distribution Id" value="SLCCSMWOHOFUY0"></KeyValuePair>
                <KeyValuePair label="Domain name" value="bbb.cloudfront.net"></KeyValuePair>
            </Stack>
        </Column>
        <Column key="column2">
            <Stack>
                <KeyValuePair label="Price class" value="Use only US, Canada, Europe, and Asia"></KeyValuePair>
                <KeyValuePair label="CNAMEs"></KeyValuePair>
            </Stack>
        </Column>
        <Column key="column3">
            <Stack>
                <KeyValuePair label="SSL certificate" value="Default CloudFront SSL certificate"></KeyValuePair>
                <KeyValuePair label="Custom SSL client support"></KeyValuePair>
                <KeyValuePair label="Logging" value="Off"></KeyValuePair>
            </Stack>
        </Column>
    </ColumnLayout>
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
            splitPanel={splitPanel}
            notifications={notifications.map((n) => ({ ...n, onDismiss: () => handleDismiss(n.id) }))}
        >
            <Stack>
                <SimpleTable />
            </Stack>
        </AppLayout>
    );
};

const DynamicSplitPanelSubComponent: React.FunctionComponent<any> = () => {
    const { setSplitPanelContent, openSplitPanel } = useAppLayoutContext();

    const handleButtonClick = useCallback(() => {
        setSplitPanelContent(splitPanel);
        openSplitPanel(true);
    }, [openSplitPanel, setSplitPanelContent]);

    return <Button onClick={handleButtonClick}>Show Details</Button>;
};

export const DynamicSplitPanel = () => {
    return (
        <AppLayout header={header} breadcrumbs={breadcrumbGroup}>
            <DynamicSplitPanelSubComponent />
        </AppLayout>
    );
};

const DynamicHelpPanelSubComponent: React.FunctionComponent<any> = ({ children }) => {
    const { setHelpPanelContent } = useAppLayoutContext();

    useEffect(() => {
        setHelpPanelContent(helpPanel);
    }, [setHelpPanelContent]);

    return children;
};

export const DynamicHelpPanel = () => {
    return (
        <AppLayout header={header} breadcrumbs={breadcrumbGroup} navigation={navigation}>
            <DynamicHelpPanelSubComponent>
                <Stack>
                    <GeneralInfo />
                    <SimpleTable />
                </Stack>
            </DynamicHelpPanelSubComponent>
        </AppLayout>
    );
};

export const WithoutNotifications = () => {
    return (
        <AppLayout header={header} navigation={navigation} helpPanel={helpPanel} breadcrumbs={breadcrumbGroup}>
            <Stack>
                <GeneralInfo />
                <SimpleTable />
            </Stack>
        </AppLayout>
    );
};

const DynamicNotificationAddMainComponent: FunctionComponent = () => {
    const { addNotification, dismissNotifications } = useAppLayoutContext();
    const [notificationId, setNotificationId] = useState<string>();
    const handleAddClick = useCallback(() => {
        const id = uuidv4();
        addNotification({
            id,
            type: 'success',
            header: `Your request ${id} is being processed`,
            dismissible: true,
        });
        setNotificationId(id);
    }, [addNotification]);
    const handleRemoveLastClick = useCallback(() => {
        notificationId && dismissNotifications(notificationId);
    }, [dismissNotifications, notificationId]);
    const handleRemoveAll = useCallback(() => {
        dismissNotifications();
    }, [dismissNotifications]);

    return (
        <Stack>
            <Button onClick={handleAddClick}>Add New Notification</Button>
            <Button onClick={handleRemoveLastClick}>Remove Last Notification</Button>
            <Button onClick={handleRemoveAll}>Remove All notifications</Button>
        </Stack>
    );
};

export const DynamicNotificationAdd = () => (
    <AppLayout header={header} navigation={navigation} breadcrumbs={breadcrumbGroup} maxNotifications={5}>
        <DynamicNotificationAddMainComponent />
    </AppLayout>
);

export const WithoutSidebars = () => {
    return (
        <AppLayout header={header}>
            <Stack>
                <GeneralInfo />
                <SimpleTable />
            </Stack>
        </AppLayout>
    );
};

export const WithOnlyHelpPanel = () => {
    return (
        <AppLayout header={header} breadcrumbs={breadcrumbGroup} helpPanel={helpPanel}>
            <Stack>
                <GeneralInfo />
                <SimpleTable />
            </Stack>
        </AppLayout>
    );
};

export const WithoutContentPadding = () => {
    return (
        <AppLayout header={header} paddingContentArea={false}>
            <Stack>
                <GeneralInfo />
                <SimpleTable />
            </Stack>
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
        <AppLayout header={header} breadcrumbs={breadcrumbGroup} navigation={navigation} helpPanel={helpPanel}>
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
            Header
        </Box>
    );
    return (
        <AppLayout
            header={customHeader}
            breadcrumbs={breadcrumbGroup}
            navigation={navigation}
            helpPanel={helpPanel}
            headerHeightInPx={100}
        >
            <Stack>
                <GeneralInfo />
                <SimpleTable />
            </Stack>
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
            <Stack>
                <GeneralInfo />
                <SimpleTable />
            </Stack>
        </AppLayout>
    );
};
