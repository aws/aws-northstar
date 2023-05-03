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
import { withRouter } from 'storybook-addon-react-router-v6';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Badge from '@cloudscape-design/components/badge';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import AppLayout, { useAppLayoutContext } from '.';
import { KEY_VALUE_PAIR_ITEMS } from '../KeyValuePairs/index.stories';
import KeyValuePairs from '../KeyValuePairs';
import Table from '../Table';
import columnDefinition from '../Table/data/columnDefinitions';
import shortData from '../Table/data/short';
import FormRenderer, { Schema } from '../FormRenderer';
import { Default as FormRendererDefault, TEST_DATA } from '../FormRenderer/index.stories';
import { action } from '@storybook/addon-actions';
import { Route, RouteProps, Routes } from 'react-router-dom';

export const TEST_NAV_ITEMS: SideNavigationProps.Item[] = [
    { type: 'link', text: 'home', href: '/' },
    { type: 'link', text: 'Page 1', href: '/page1' },
    { type: 'link', text: 'Page 2', href: '/page2' },
    { type: 'link', text: 'Page 3', href: '/page3' },
    { type: 'link', text: 'Page 4', href: '/page4' },
    { type: 'divider' },
    {
        type: 'link',
        text: 'Notifications',
        href: '/notifications',
        info: <Badge color="red">23</Badge>,
    },
    {
        type: 'link',
        text: 'Documentation',
        href: 'https://docs.aws.amazon.com',
        external: true,
    },
];

const KeyValuePairsComponent = () => {
    return (
        <Container>
            <KeyValuePairs items={KEY_VALUE_PAIR_ITEMS} />
        </Container>
    );
};

const DefaultTableComponent = () => {
    return <Table columnDefinitions={columnDefinition} items={shortData} header="Table Title" />;
};

const FormRendererFullLayoutComponent = () => {
    return (
        <FormRenderer
            schema={FormRendererDefault.args!.schema as Schema}
            initialValues={TEST_DATA}
            onSubmit={action('onSubmit')}
        />
    );
};

export default {
    component: AppLayout,
    title: 'Components/AppLayout',
    decorators: [withRouter],
    argTypes: {
        onSignout: { action: true },
    },
    parameters: {
        layout: 'fullscreen',
    },
    excludeStories: ['TEST_NAV_ITEMS'],
} as ComponentMeta<typeof AppLayout>;

const Template: ComponentStory<typeof AppLayout> = (args) => {
    return (
        <AppLayout {...args}>
            {args.children ?? (
                <SpaceBetween size="l">
                    <KeyValuePairsComponent />
                    <DefaultTableComponent />
                </SpaceBetween>
            )}
        </AppLayout>
    );
};

export const Default = Template.bind({});
Default.args = {
    title: 'HelloWorld App',
    logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDNweCIgaGVpZ2h0PSIzMXB4IiB2aWV3Qm94PSIwIDAgNDMgMzEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGZpbGw9IiMyMzJmM2UiIHN0cm9rZT0iI2Q1ZGJkYiIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MiIgaGVpZ2h0PSIzMCIgcng9IjIiPjwvcmVjdD4KICAgICAgICA8dGV4dCBmb250LWZhbWlseT0iQW1hem9uRW1iZXItUmVndWxhciwgQW1hem9uIEVtYmVyIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHRzcGFuIHg9IjkiIHk9IjE5Ij5Mb2dvPC90c3Bhbj4KICAgICAgICA8L3RleHQ+CiAgICA8L2c+Cjwvc3ZnPgo=',
    navigationItems: TEST_NAV_ITEMS,
};

export const WithUser = Template.bind({});
WithUser.args = {
    ...Default.args,
    user: {
        username: 'Username',
        email: 'test@test.com',
    },
};

const CustomHeader = (
    <TopNavigation
        identity={{
            href: '/',
            title: 'Custom Header',
        }}
        i18nStrings={{
            overflowMenuTitleText: 'All',
            overflowMenuTriggerText: 'More',
        }}
    />
);

export const WithCustomHeader = Template.bind({});
WithCustomHeader.args = {
    ...Default.args,
    header: CustomHeader,
};

export const FormContentType = Template.bind({});
FormContentType.args = {
    ...Default.args,
    contentType: 'form',
    children: <FormRendererFullLayoutComponent />,
};

const SplitPanelExamples = () => {
    return (
        <Box padding="l">
            <KeyValuePairsComponent />
        </Box>
    );
};

const SplitPanelInner = () => {
    const { setSplitPanelOpen, setSplitPanelProps } = useAppLayoutContext();

    return (
        <SpaceBetween direction="vertical" size="l">
            <Button
                onClick={() => {
                    setSplitPanelProps({
                        header: 'Details',
                        children: <SplitPanelExamples />,
                    });

                    setSplitPanelOpen(true);
                }}
            >
                Open Split Panel
            </Button>
            <Button
                onClick={() => {
                    setSplitPanelOpen(false);
                }}
            >
                Collapse Split Panel
            </Button>
            <Button
                onClick={() => {
                    setSplitPanelProps(undefined);
                }}
            >
                Hide Split Panel
            </Button>
        </SpaceBetween>
    );
};

export const SplitPanel = () => {
    return (
        <AppLayout title="HelloWorld App" navigationItems={TEST_NAV_ITEMS}>
            <SplitPanelInner />
        </AppLayout>
    );
};

const ToolsExample = () => {
    return <Box padding="l">Help Panel</Box>;
};

const ToolsInner = () => {
    const { setTools, setToolsOpen, setToolsWidth } = useAppLayoutContext();

    return (
        <SpaceBetween direction="vertical" size="l">
            <Button
                onClick={() => {
                    setTools(<ToolsExample />);
                    setToolsOpen(true);
                    setToolsWidth(500);
                }}
            >
                Open Tools Panel
            </Button>
            <Button
                onClick={() => {
                    setToolsOpen(false);
                }}
            >
                Close Tools Panel
            </Button>
        </SpaceBetween>
    );
};

export const ToolsPanel = () => {
    return (
        <AppLayout title="HelloWorld App" toolsHide={false} navigationItems={TEST_NAV_ITEMS}>
            <ToolsInner />
        </AppLayout>
    );
};

const TEST_ROUTES: RouteProps[] = [
    {
        path: '/domain1/:domain1Id/domain2/:domain2Id',
        element: <div>Domain 2 Details</div>,
    },
    {
        path: '/domain1/:domain1Id',
        element: <div>Domain 1 Details</div>,
    },
    {
        path: '/domain1',
        element: <div>Domain 1</div>,
    },
    {
        path: '/',
        element: <div>Home</div>,
    },
];

const TEST_NAV_ITEMS_WITH_ROUTES: SideNavigationProps.Item[] = [
    { type: 'link', text: 'home', href: '/' },
    { type: 'link', text: 'Domain1', href: '/domain1' },
    { type: 'link', text: 'Domain 1 Details', href: '/domain1/id1' },
    { type: 'link', text: 'Domain 2 Details', href: '/domain1/id1/domain2/id2' },
];

export const WithRoutes = () => {
    return (
        <AppLayout
            title="HelloWorld App"
            navigationItems={TEST_NAV_ITEMS_WITH_ROUTES}
            availableRoutes={TEST_ROUTES.map((x) => x.path || '')}
        >
            <Routes>
                {TEST_ROUTES.map((r, i) => (
                    <Route key={i} {...r} />
                ))}
            </Routes>
        </AppLayout>
    );
};
