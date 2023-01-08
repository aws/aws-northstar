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
import React from 'react';
import { action } from '@storybook/addon-actions';
import FormRenderer, { componentTypes, validatorTypes } from '../..';

export default {
    component: FormRenderer,
    title: 'Components/FormRenderer/Radio',
};

export const Default = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/radio-group" rel="noreferrer">
                    Radio Group
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/radio',
        fields: [
            {
                component: componentTypes.RADIO,
                name: 'radio',
                label: 'Radio',
                description: 'This is description',
                helperText: 'This is helper text',
                isRequired: true,
                options: [
                    {
                        label: 'Option 1',
                        value: '1',
                        description: 'This is option 1 description',
                    },
                    {
                        label: 'Option 2',
                        value: '2',
                        disabled: true,
                    },
                    {
                        label: 'Option 3',
                        value: '3',
                    },
                ],
            },
        ],
        isRequired: true,
        validate: [
            {
                type: validatorTypes.REQUIRED,
            },
        ],
    };
    return <FormRenderer schema={schema} onSubmit={action('Submit')} onCancel={action('Cancel')} />;
};

export const WithInitialValue = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/radio-group" rel="noreferrer">
                    Radio Group
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/radio',
        fields: [
            {
                component: componentTypes.RADIO,
                name: 'radio',
                label: 'Radio',
                description: 'This is description',
                helperText: 'This is helper text',
                options: [
                    {
                        label: 'Option 1',
                        value: '1',
                        description: 'This is option 1 description',
                    },
                    {
                        label: 'Option 2',
                        value: '2',
                    },
                    {
                        label: 'Option 3',
                        value: '3',
                    },
                ],
            },
        ],
    };
    return (
        <FormRenderer
            schema={schema}
            initialValues={{
                radio: '2',
            }}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};
