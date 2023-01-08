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
    title: 'Components/FormRenderer/TextField',
};

export const Default = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/input" rel="noreferrer">
                    Input
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/text-field',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'email',
                label: 'Email',
                description: 'Email Address',
                helperText: 'Enter a valid email address',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                    {
                        type: validatorTypes.PATTERN,
                        message: 'Invalid email address',
                        // eslint-disable-next-line
            pattern: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i,
                    },
                ],
            },
        ],
    };
    return <FormRenderer schema={schema} onSubmit={action('Submit')} onCancel={action('Cancel')} />;
};

export const Disabled = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/input" rel="noreferrer">
                    Input
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/text-field',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'email',
                label: 'Email',
                isDisabled: true,
            },
        ],
    };
    return <FormRenderer schema={schema} onSubmit={action('Submit')} onCancel={action('Cancel')} />;
};

export const ReadOnly = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/input" rel="noreferrer">
                    Input
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/text-field',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'email',
                label: 'Email',
                isReadOnly: true,
            },
        ],
    };
    return (
        <FormRenderer
            schema={schema}
            initialValues={{
                email: 'test@example.com',
            }}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};

export const Hidden = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/input" rel="noreferrer">
                    Input
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/text-field',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'email',
                label: 'Email',
                hideField: true,
            },
        ],
    };
    return (
        <FormRenderer
            schema={schema}
            initialValues={{
                email: 'test@example.com',
            }}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};

export const CustomProps = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/input" rel="noreferrer">
                    Input
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/text-field',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'email',
                label: 'Email',
                ariaDescribedby: 'Input ariaDescribedby',
                ariaLabel: 'Input ariaLabel',
                autoComplete: false,
                disableBrowserAutocorrect: true,
                placeholder: 'This is placeholder text',
            },
        ],
    };
    return <FormRenderer schema={schema} onSubmit={action('Submit')} onCancel={action('Cancel')} />;
};
