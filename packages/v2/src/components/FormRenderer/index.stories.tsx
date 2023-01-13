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
import FormRenderer, { componentTypes, validatorTypes } from '.';
import { awsServices } from './fixtures/data';
import playFormRenderDefault, { TEST_DATA } from './tests/playFormRenderDefault';

export const DEFAULT_ARGS = {
    component: FormRenderer,
    argTypes: {
        onSubmit: { action: true },
        onCancel: { action: true },
    },
};

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer',
    excludeStories: ['Template', 'DEFAULT_ARGS'],
} as ComponentMeta<typeof FormRenderer>;

export const Template: ComponentStory<typeof FormRenderer> = (args) => {
    return <FormRenderer {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: <>Data driven form</>,
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'email',
                label: 'Email',
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
            {
                component: componentTypes.TEXT_FIELD,
                name: 'password',
                label: 'Password',
                type: 'password',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                    {
                        type: validatorTypes.MIN_LENGTH,
                        threshold: 6,
                    },
                    {
                        type: validatorTypes.MAX_LENGTH,
                        threshold: 10,
                    },
                ],
            },
            {
                component: componentTypes.TEXT_FIELD,
                name: 'number',
                label: 'Number',
                type: 'number',
                dataType: 'number',
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                    {
                        type: validatorTypes.MIN_NUMBER_VALUE,
                        includeThreshold: true,
                        value: 4,
                    },
                    {
                        type: validatorTypes.MAX_NUMBER_VALUE,
                        includeThreshold: false,
                        value: 20,
                    },
                ],
            },
            {
                component: componentTypes.CHECKBOX,
                name: 'checkbox',
                label: 'Checkbox',
                options: [
                    {
                        label: 'Option 1',
                        value: '1',
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
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: componentTypes.RADIO,
                name: 'radio',
                label: 'Radio',
                options: [
                    {
                        label: 'Option 1',
                        description: 'Description 1',
                        value: '1',
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
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: componentTypes.SELECT,
                name: 'select',
                label: 'Select',
                placeholder: 'Choose an option',
                options: [
                    {
                        label: 'Option 1',
                        description: 'Description 1',
                        value: '1',
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
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: componentTypes.SELECT,
                name: 'autosugguest',
                label: 'Autosuggest',
                placeholder: 'Choose an AWS service',
                isSearchable: true,
                options: awsServices,
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: componentTypes.SELECT,
                name: 'multiselect',
                label: 'Multiselect',
                placeholder: 'Choose an AWS service',
                isMulti: true,
                options: awsServices,
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: componentTypes.TEXTAREA,
                name: 'textarea',
                label: 'Textarea',
                helperText: 'This is a help text',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: componentTypes.SWITCH,
                name: 'switch',
                label: 'Switch',
            },
            {
                component: componentTypes.SWITCH,
                name: 'switch1',
                label: 'Switch 1',
            },
            {
                component: componentTypes.SWITCH,
                name: 'switch2',
                label: 'Switch 2',
            },
            {
                component: componentTypes.DATE_PICKER,
                name: 'datePicker',
                label: 'Date picker',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: componentTypes.DATA_RANGE_PICKER,
                name: 'dateRange',
                label: 'Date Range',
                description: 'This is description',
                helperText: 'This is helper text',
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
            {
                component: componentTypes.CHECKBOX,
                name: 'confirm',
                label: 'I understand the terms and condition',
                description: 'Term 1.0.0',
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                        message: 'please accept the terms and condition',
                    },
                ],
            },
        ],
    },
};
Default.play = playFormRenderDefault;

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
    ...Default.args,
    initialValues: TEST_DATA,
};

export const Submitting = Template.bind({});
Submitting.args = {
    schema: {
        header: 'Data driven form',
        description: 'Define your form in JSON format',
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
                ],
            },
        ],
    },
    isSubmitting: true,
    initialValues: { email: 'test@test.com' },
};
