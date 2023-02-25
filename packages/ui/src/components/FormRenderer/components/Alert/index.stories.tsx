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
import { TEXT_CONTENT } from '../Textarea/index.stories';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/Alert',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/alert/" rel="noreferrer">
                    Alert
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.ALERT,
                name: 'alert',
                content: TEXT_CONTENT,
            },
        ],
    },
};

export const Warning = Template.bind({});
Warning.args = {
    ...Default.args,
    schema: {
        ...Default.args.schema,
        fields: [
            {
                component: componentTypes.ALERT,
                name: 'alert',
                content: TEXT_CONTENT,
                type: 'warning',
            },
        ],
    },
};
