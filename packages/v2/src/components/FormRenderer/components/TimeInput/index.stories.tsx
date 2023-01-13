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
import FormRenderer, { componentTypes, validatorTypes } from '../..';
import { Template, DEFAULT_ARGS } from '../../index.stories';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/TimeInput',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/time-input" rel="noreferrer">
                    Time Input
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.TIME_INPUT,
                name: 'time',
                label: 'Time',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'hh:mm',
                format: 'hh:mm',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
        ],
    },
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
    ...Default.args,
    initialValues: {
        time: '15:20',
    },
};
