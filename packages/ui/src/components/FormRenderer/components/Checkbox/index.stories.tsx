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
    title: 'Components/FormRenderer/Checkbox',
} as ComponentMeta<typeof FormRenderer>;

export const Single = Template.bind({});
Single.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/checkbox" rel="noreferrer">
                    Checkbox
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/checkbox',
        fields: [
            {
                component: componentTypes.CHECKBOX,
                name: 'checkbox',
                label: 'Checkbox',
                description: 'This is description',
                helperText: 'This is helper text',
                'data-testid': 'checkbox-1',
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

export const SingleWithInitialValues = Template.bind({});
SingleWithInitialValues.args = {
    ...Single.args,
    initialValues: { checkbox: true },
};

export const SingleDisabled = Template.bind({});
SingleDisabled.args = {
    ...SingleWithInitialValues.args,
    schema: {
        ...SingleWithInitialValues.args.schema,
        fields: SingleWithInitialValues.args.schema!.fields.map((field) => ({
            ...field,
            isDisabled: true,
        })),
    },
};

export const Multiple = Template.bind({});
Multiple.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/checkbox" rel="noreferrer">
                    Checkbox
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/checkbox-multiple',
        fields: [
            {
                component: componentTypes.CHECKBOX,
                name: 'checkbox',
                label: 'Checkbox',
                description: 'This is description',
                helperText: 'This is helper text',
                'data-testid': 'checkbox-1',
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
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
        ],
    },
};

export const MultipleWithInitialValues = Template.bind({});
MultipleWithInitialValues.args = {
    ...Multiple.args,
    initialValues: {
        checkbox: ['1', '3'],
    },
};

export const MultipleDisabled = Template.bind({});
MultipleDisabled.args = {
    ...MultipleWithInitialValues.args,
    schema: {
        ...MultipleWithInitialValues.args.schema,
        fields: MultipleWithInitialValues.args.schema!.fields.map((field) => ({
            ...field,
            isDisabled: true,
        })),
    },
};
