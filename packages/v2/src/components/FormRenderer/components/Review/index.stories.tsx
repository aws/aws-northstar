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
import { action } from '@storybook/addon-actions';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Link from '@cloudscape-design/components/link';
import Header from '@cloudscape-design/components/header';
import Container from '@cloudscape-design/components/container';

import FormRenderer, { componentTypes } from '../..';
import KeyValuePairs from '../../../KeyValuePairs';

export default {
    component: FormRenderer,
    title: 'Components/FormRenderer/Review',
    excludeStories: ['TEST_DATA'],
};

export const TEST_DATA = {
    distributionId: 'E1WG1ZNPRXT0D4',
    domainName: 'example.com',
    arn: 'arn:aws:cloudfront::111122223333:distribution/E1WG1ZNPRXT0D4',
    available: true,
    priceClass: 'Use only US, Canada, Europe, and Asia',
    infoLink: '/',
    updateProgress: 37,
    logging: true,
    sslClientSupport: undefined,
};

const defaultArgs = {
    onSubmit: action('Submit'),
    onCancel: action('Cancel'),
};

export const Default = (args = defaultArgs) => {
    const ReviewTemplate = ({ data }: { data: typeof TEST_DATA }) => {
        return (
            <Container header={<Header variant="h2">Header</Header>}>
                <KeyValuePairs
                    items={[
                        [
                            {
                                label: 'Distribution Id',
                                value: data.distributionId,
                            },
                            {
                                label: 'Domain name',
                                value: data.domainName,
                            },
                            {
                                label: 'ARN',
                                value: data.arn,
                            },
                        ],
                        [
                            {
                                label: 'Status',
                                value: data.available ? (
                                    <StatusIndicator type="success">Available</StatusIndicator>
                                ) : undefined,
                            },
                            {
                                label: 'Price class',
                                value: data.priceClass,
                            },
                            {
                                label: 'Link',
                                value: (
                                    <Link
                                        href={data.infoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        external={true}
                                    >
                                        Label with external link
                                    </Link>
                                ),
                            },
                        ],
                        [
                            {
                                label: 'SSL Certificate',
                                description: 'Update in progress',
                                value: data.updateProgress,
                                variant: 'key-value',
                            },
                            {
                                label: 'Custom SSL client support',
                                value: data.sslClientSupport,
                            },
                            {
                                label: 'Logging',
                                value: data.logging ? 'On' : 'Off',
                            },
                        ],
                    ]}
                />
            </Container>
        );
    };

    const schema = {
        header: ' Data driven form displaying Review with Template',
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.REVIEW,
                name: 'review',
                Template: ReviewTemplate,
            },
        ],
    };

    return <FormRenderer {...args} initialValues={TEST_DATA} schema={schema} />;
};
