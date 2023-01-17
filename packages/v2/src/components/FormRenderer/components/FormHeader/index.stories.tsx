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
import { ComponentMeta } from '@storybook/react';
import FormRenderer, { componentTypes } from '../..';
import { Template, DEFAULT_ARGS } from '../../index.stories';
import Link from '@cloudscape-design/components/link';
import Header from '@cloudscape-design/components/header';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/FormHeader',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: 'Data driven form form header',
        description: 'Define your form in JSON format',
        info: 'https://cloudscape.design/components/header',
        fields: [
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'description',
                label: <>The form header can be defined in a string format.</>,
            },
        ],
    },
};

export const WithFormHeader = Template.bind({});
WithFormHeader.args = {
    schema: {
        header: (
            <Header
                variant="h1"
                description="Define your form in JSON format"
                info={
                    <Link variant="info" href="https://cloudscape.design/components/header" target="_blank">
                        Info
                    </Link>
                }
            >
                Data driven form form header
            </Header>
        ),
        fields: [
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'description',
                label: (
                    <>
                        The form header can be defined as a{' '}
                        <Link href="https://cloudscape.design/components/header" target="_blank">
                            Cloudscape Header component
                        </Link>
                        .
                    </>
                ),
            },
        ],
    },
};
