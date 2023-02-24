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
    title: 'Components/FormRenderer/Textarea',
    excludeStories: ['TEXT_CONTENT'],
} as ComponentMeta<typeof FormRenderer>;

export const TEXT_CONTENT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/textarea" rel="noreferrer">
                    Textarea
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/textarea',
        fields: [
            {
                component: componentTypes.TEXTAREA,
                name: 'textarea',
                label: 'Textarea',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'This is placeholder text',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                    {
                        type: validatorTypes.MIN_LENGTH,
                        threshold: 100,
                    },
                    {
                        type: validatorTypes.MAX_LENGTH,
                        threshold: 500,
                    },
                ],
            },
        ],
    },
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
    ...Default.args,
    schema: {
        ...Default.args.schema,
        fields: [
            {
                ...Default.args.schema!.fields[0],
                ariaDescribedby: 'Textarea ariaDescribedby',
                ariaLabel: 'Textarea ariaLabel',
                autoComplete: false,
                rows: '20',
            },
        ],
    },
    initialValues: {
        textarea: TEXT_CONTENT,
    },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    ...WithInitialValue.args,
    schema: {
        ...WithInitialValue.args.schema,
        fields: WithInitialValue.args.schema!.fields.map((field) => ({
            ...field,
            isReadOnly: true,
        })),
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...WithInitialValue.args,
    schema: {
        ...WithInitialValue.args.schema,
        fields: WithInitialValue.args.schema!.fields.map((field) => ({
            ...field,
            isDisabled: true,
        })),
    },
};
