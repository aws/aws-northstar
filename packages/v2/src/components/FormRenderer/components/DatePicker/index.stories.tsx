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
    title: 'Components/FormRenderer/DatePicker',
};

export const Default = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/date-picker" rel="noreferrer">
                    DatePicker
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/date-picker',
        fields: [
            {
                component: componentTypes.DATE_PICKER,
                name: 'date',
                label: 'Date',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'YYYY/MM/DD',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
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
                <a target="_blank" href="https://cloudscape.design/components/date-picker" rel="noreferrer">
                    DatePicker
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/date-picker',
        fields: [
            {
                component: componentTypes.DATE_PICKER,
                name: 'date',
                label: 'Date',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'YYYY/MM/DD',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
        ],
    };
    return (
        <FormRenderer
            schema={schema}
            initialValues={{
                date: '2023-01-01',
            }}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};
