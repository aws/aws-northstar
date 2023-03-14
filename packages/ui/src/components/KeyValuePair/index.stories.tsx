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
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Link from '@cloudscape-design/components/link';
import KeyValuePair, { KeyValuePairProps } from '.';

export default {
    component: KeyValuePair,
    title: 'Components/KeyValuePair',
} as ComponentMeta<typeof KeyValuePair>;

const Template: ComponentStory<typeof KeyValuePair> = (args: KeyValuePairProps) => {
    return <KeyValuePair {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    label: 'Domain name',
    value: 'example.com',
};

export const EmptyValue = Template.bind({});
EmptyValue.args = {
    label: 'Class',
};

export const WithStatus = Template.bind({});
WithStatus.args = {
    label: 'Status',
    value: <StatusIndicator type="success">Available</StatusIndicator>,
};

export const WithExternalLink = Template.bind({});
WithExternalLink.args = {
    label: 'Link',
    value: (
        <Link href="/" target="_blank" rel="noopener noreferrer" external={true}>
            Value with external link
        </Link>
    ),
};
