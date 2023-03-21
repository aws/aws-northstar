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
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { composeStory } from '@storybook/testing-react';
import AppLayout, { useAppLayoutContext } from '.';
import KeyValuePairsStoryMeta, {
    Default as KeyValuePairsStory,
    KEY_VALUE_PAIR_ITEMS,
} from '../KeyValuePairs/index.stories';
import KeyValuePairsComponent from '../KeyValuePairs';
import FormRendererStoryMeta, {
    DefaultFullLayout as DefaultFullLayoutStory,
} from '../FormRenderer/stories/FormVariantFull.stories';
import TableMeta, { LongData as TableStory } from '../Table/index.stories';

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
} as ComponentMeta<typeof AppLayout>;

const KeyValuePairs = composeStory(KeyValuePairsStory, KeyValuePairsStoryMeta);
const Table = composeStory(TableStory, TableMeta);
const FormRendererFullLayout = composeStory(DefaultFullLayoutStory, FormRendererStoryMeta);

const Template: ComponentStory<typeof AppLayout> = (args) => {
    return (
        <AppLayout {...args}>
            {args.children ?? (
                <SpaceBetween size="l">
                    <KeyValuePairs />
                    <Table />
                </SpaceBetween>
            )}
        </AppLayout>
    );
};

export const Default = Template.bind({});
Default.args = {
    title: 'HelloWorld App',
    logo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDNweCIgaGVpZ2h0PSIzMXB4IiB2aWV3Qm94PSIwIDAgNDMgMzEiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGZpbGw9IiMyMzJmM2UiIHN0cm9rZT0iI2Q1ZGJkYiIgeD0iMC41IiB5PSIwLjUiIHdpZHRoPSI0MiIgaGVpZ2h0PSIzMCIgcng9IjIiPjwvcmVjdD4KICAgICAgICA8dGV4dCBmb250LWZhbWlseT0iQW1hem9uRW1iZXItUmVndWxhciwgQW1hem9uIEVtYmVyIiBmb250LXNpemU9IjEyIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHRzcGFuIHg9IjkiIHk9IjE5Ij5Mb2dvPC90c3Bhbj4KICAgICAgICA8L3RleHQ+CiAgICA8L2c+Cjwvc3ZnPgo=',
    navigationItems: [
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
    ],
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
    children: <FormRendererFullLayout />,
};

const SplitPanelExamples = () => {
    return (
        <Box padding="l">
            <KeyValuePairsComponent items={KEY_VALUE_PAIR_ITEMS} />
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
        <AppLayout
            title="HelloWorld App"
            navigationItems={[
                { type: 'link', text: 'home', href: '/' },
                { type: 'link', text: 'Page 1', href: '/page1' },
                { type: 'link', text: 'Page 2', href: '/page2' },
                { type: 'link', text: 'Page 3', href: '/page3' },
                { type: 'link', text: 'Page 4', href: '/page4' },
            ]}
        >
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
        <AppLayout
            title="HelloWorld App"
            toolsHide={false}
            navigationItems={[
                { type: 'link', text: 'home', href: '/' },
                { type: 'link', text: 'Page 1', href: '/page1' },
                { type: 'link', text: 'Page 2', href: '/page2' },
                { type: 'link', text: 'Page 3', href: '/page3' },
                { type: 'link', text: 'Page 4', href: '/page4' },
            ]}
        >
            <ToolsInner />
        </AppLayout>
    );
};
