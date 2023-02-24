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
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Link from '@cloudscape-design/components/link';
import KeyValuePairs from '.';

export default {
    component: KeyValuePairs,
    title: 'Components/KeyValuePairs',
} as ComponentMeta<typeof KeyValuePairs>;

const Template: ComponentStory<typeof KeyValuePairs> = (args) => {
    return (
        <Container header={<Header variant="h2">Header</Header>}>
            <KeyValuePairs data-testid="testId" {...args} />
        </Container>
    );
};

export const Default = Template.bind({});
Default.args = {
    items: [
        [
            {
                label: 'Distribution ID',
                value: 'E1WG1ZNPRXT0D4',
            },
            {
                label: 'Domain name',
                value: 'example.com',
            },
            {
                label: 'ARN',
                value: 'arn:aws:cloudfront::111122223333:distribution/E1WG1ZNPRXT0D4',
            },
        ],
        [
            {
                label: 'Status',
                value: <StatusIndicator type="success">Available</StatusIndicator>,
            },
            {
                label: 'Price class',
                value: 'Use only US, Canada, Europe, and Asia',
            },
            {
                label: 'Link',
                value: (
                    <Link href="/" target="_blank" rel="noopener noreferrer" external={true}>
                        Value with external link
                    </Link>
                ),
            },
        ],
        [
            {
                label: 'SSL Certificate',
                description: 'Update in progress',
                value: 37,
                variant: 'key-value',
            },
            {
                label: 'Custom SSL client support',
            },
            {
                label: 'Logging',
                value: 'Off',
            },
        ],
    ],
};
