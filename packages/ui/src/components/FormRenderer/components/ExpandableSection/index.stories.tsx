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
    title: 'Components/FormRenderer/ExpandableSection',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/expandable-section" rel="noreferrer">
                    Expandable Section
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.EXPANDABLE_SECTION,
                name: 'section1',
                title: 'Section 1',
                'data-testid': 'section1',
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
        ],
    },
};

export const Container = Template.bind({});
Container.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/expandable-section" rel="noreferrer">
                    Expandable Section
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.EXPANDABLE_SECTION,
                name: 'section2',
                title: 'Section 2',
                'data-testid': 'section2',
                description: 'This is a expandable container',
                variant: 'container',
                fields: [
                    {
                        component: componentTypes.TEXTAREA,
                        name: 'textarea1',
                        label: 'Textarea 1',
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

export const ExpandedContainer = Template.bind({});
ExpandedContainer.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/expandable-section" rel="noreferrer">
                    Expandable Section
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.EXPANDABLE_SECTION,
                name: 'section3',
                title: 'Section 3',
                'data-testid': 'section3',
                variant: 'container',
                expanded: true,
                description: 'This is a expanded expandable container',
                fields: [
                    {
                        component: componentTypes.TEXTAREA,
                        name: 'textarea2',
                        label: 'Textarea 2',
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
    schema: {
        ...Default.args.schema,
        fields: [
            ...(Default.args.schema?.fields || []),
            ...(Container.args.schema?.fields || []),
            ...(ExpandedContainer.args.schema?.fields || []),
        ],
    },
    initialValues: {
        section1: {
            textfield: 'TextFieldContent',
        },
        section2: {
            textarea1: 'TextareaContent',
        },
        section3: {
            textarea2: 'TextareaContent',
        },
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
