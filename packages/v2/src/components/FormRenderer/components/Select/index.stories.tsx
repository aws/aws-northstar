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
    title: 'Components/FormRenderer/Select',
};

export const Select = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/select" rel="noreferrer">
                    Select
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/select',
        fields: [
            {
                component: componentTypes.SELECT,
                name: 'select',
                label: 'Select',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'This is placeholder text',
                isRequired: true,
                options: [
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' },
                    { label: 'Option 4', value: '4' },
                    { label: 'Option 5', value: '5' },
                ],
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

export const SelectWithInitialValue = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/select" rel="noreferrer">
                    Select
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/select',
        fields: [
            {
                component: componentTypes.SELECT,
                name: 'select',
                label: 'Select',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'This is placeholder text',
                isRequired: true,
                options: [
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' },
                    { label: 'Option 4', value: '4' },
                    { label: 'Option 5', value: '5' },
                ],
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
                select: { label: 'Option 3', value: '3' },
            }}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};

export const Multiselect = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/multiselectd" rel="noreferrer">
                    Multiselect
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/select',
        fields: [
            {
                component: componentTypes.SELECT,
                name: 'select',
                label: 'Select',
                description: 'This is description',
                helperText: 'This is helper text',
                isRequired: true,
                isMulti: true,
                placeholder: 'Choose options',
                deselectAriaLabel: (e) => `Remove ${e.label}`,
                selectedAriaLabel: 'Selected',
                options: [
                    {
                        label: 'Option 1',
                        value: '1',
                        description: 'This is a description',
                    },
                    {
                        label: 'Option 2',
                        value: '2',
                        iconName: 'unlocked',
                        labelTag: 'This is a label tag',
                    },
                    {
                        label: 'Option 3 (disabled)',
                        value: '3',
                        iconName: 'share',
                        tags: ['Tags go here', 'Tag1', 'Tag2'],
                        disabled: true,
                    },
                    {
                        label: 'Option 4',
                        value: '4',
                        filteringTags: ['filtering', 'tags', 'these are filtering tags'],
                    },
                    { label: 'Option 5', value: '5' },
                ],
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

export const MultiselectWithInitialValue = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/multiselectd" rel="noreferrer">
                    Multiselect
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/select',
        fields: [
            {
                component: componentTypes.SELECT,
                name: 'select',
                label: 'Select',
                description: 'This is description',
                helperText: 'This is helper text',
                isRequired: true,
                isMulti: true,
                placeholder: 'Choose options',
                deselectAriaLabel: (e) => `Remove ${e.label}`,
                selectedAriaLabel: 'Selected',
                options: [
                    {
                        label: 'Option 1',
                        value: '1',
                        description: 'This is a description',
                    },
                    {
                        label: 'Option 2',
                        value: '2',
                        iconName: 'unlocked',
                        labelTag: 'This is a label tag',
                    },
                    {
                        label: 'Option 3 (disabled)',
                        value: '3',
                        iconName: 'share',
                        tags: ['Tags go here', 'Tag1', 'Tag2'],
                        disabled: true,
                    },
                    {
                        label: 'Option 4',
                        value: '4',
                        filteringTags: ['filtering', 'tags', 'these are filtering tags'],
                    },
                    { label: 'Option 5', value: '5' },
                ],
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
                select: [
                    {
                        label: 'Option 1',
                        value: '1',
                        description: 'This is a description',
                    },
                ],
            }}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};

export const Autosuggest = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/autosuggest" rel="noreferrer">
                    Autosuggest
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/select',
        fields: [
            {
                component: componentTypes.SELECT,
                name: 'select',
                label: 'Select',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'This is placeholder text',
                isRequired: true,
                isSearchable: true,
                options: [
                    { value: 'Suggestion 1' },
                    { value: 'Suggestion 2' },
                    { value: 'Suggestion 3' },
                    { value: 'Suggestion 4' },
                ],
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

export const AutosuggestWithInitialValue = () => {
    const schema = {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/autosuggest" rel="noreferrer">
                    Autosuggest
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/select',
        fields: [
            {
                component: componentTypes.SELECT,
                name: 'select',
                label: 'Select',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'This is placeholder text',
                isRequired: true,
                isSearchable: true,
                options: [
                    { value: 'Suggestion 1' },
                    { value: 'Suggestion 2' },
                    { value: 'Suggestion 3' },
                    { value: 'Suggestion 4' },
                ],
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
                select: 'Suggestion 2',
            }}
            onSubmit={action('Submit')}
            onCancel={action('Cancel')}
        />
    );
};
