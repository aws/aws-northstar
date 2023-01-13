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
    title: 'Components/FormRenderer/TextField',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
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
    },
};

export const Disabled = Template.bind({});
Disabled.args = {
    ...Default.args,
    schema: {
        ...Default.args.schema,
        fields: [
            {
                ...Default.args.schema!.fields[0],
                isDisabled: true,
            },
        ],
    },
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
    ...Default.args,
    initialValues: {
        email: 'test@test.com',
    },
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    ...WithInitialValue.args,
    schema: {
        ...WithInitialValue.args.schema,
        fields: [
            {
                ...WithInitialValue.args.schema!.fields[0],
                isReadOnly: true,
            },
        ],
    },
};

export const Hidden = Template.bind({});
Hidden.args = {
    ...WithInitialValue.args,
    schema: {
        ...WithInitialValue.args.schema,
        fields: [
            {
                ...WithInitialValue.args.schema!.fields[0],
                hideField: true,
            },
        ],
    },
};

export const CustomProps = Template.bind({});
CustomProps.args = {
    ...WithInitialValue.args,
    schema: {
        ...WithInitialValue.args.schema,
        fields: [
            {
                ...WithInitialValue.args.schema!.fields[0],
                ariaDescribedby: 'Input ariaDescribedby',
                ariaLabel: 'Input ariaLabel',
                autoComplete: false,
                placeholder: 'This is placeholder text',
            },
        ],
    },
};
