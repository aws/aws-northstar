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
    title: 'Components/FormRenderer/Subform',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a
                    target="_blank"
                    href="https://cloudscape.design/components/form/?tabId=playground&example=with-form-containers-and-fields"
                    rel="noreferrer noopener"
                >
                    Form Container
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/sub-form',
        fields: [
            {
                component: componentTypes.SUB_FORM,
                name: 'subForm1',
                title: 'Subform 1',
                fields: [
                    {
                        component: componentTypes.TEXT_FIELD,
                        name: 'textfield',
                        label: 'Textfield',
                        isRequired: true,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                ],
            },
            {
                component: componentTypes.SUB_FORM,
                name: 'subForm2',
                title: 'Subform 2',
                fields: [
                    {
                        component: componentTypes.TEXTAREA,
                        name: 'textarea',
                        label: 'Textarea',
                        isRequired: true,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
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
        textarea: 'TextareaContent',
        textfield: 'TextFieldContent',
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
