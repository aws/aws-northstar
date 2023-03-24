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
import Box from '@cloudscape-design/components/box';
import FormRenderer, { componentTypes, validatorTypes } from '../..';
import { Template, DEFAULT_ARGS } from '../../index.stories';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/Wizard',
} as ComponentMeta<typeof FormRenderer>;

const ReviewTemplate = ({ data }: any) => {
    return <Box>{JSON.stringify(data)}</Box>;
};

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/wizard" rel="noreferrer noopener">
                    Wizard
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/wizard',
        fields: [
            {
                component: componentTypes.WIZARD,
                name: 'wizard',
                allowSkipTo: true,
                fields: [
                    {
                        title: 'Step 1',
                        name: 'step-1',
                        header: 'Form container header',
                        fields: [
                            {
                                component: componentTypes.TEXT_FIELD,
                                name: 'config1',
                                label: 'Config 1',
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
                        title: 'Step 2',
                        name: 'step-2',
                        fields: [
                            {
                                component: componentTypes.TEXT_FIELD,
                                name: 'config2',
                                label: 'Config 2',
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
                        title: 'Step 3',
                        name: 'step-3',
                        isOptional: true,
                        fields: [
                            {
                                component: componentTypes.TEXT_FIELD,
                                name: 'config3',
                                label: 'Config 3',
                            },
                        ],
                    },
                    {
                        title: 'Review',
                        name: 'review',
                        fields: [
                            {
                                component: componentTypes.REVIEW,
                                name: 'config3',
                                Template: ReviewTemplate,
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
        config1: 'Config 1 Content',
        config2: 'Config 2 Content',
        config3: 'Config 3 Content',
    },
};

export const Submittting = Template.bind({});
Submittting.args = {
    ...WithInitialValue.args,
    schema: {
        ...WithInitialValue.args.schema,
        fields: [
            {
                ...WithInitialValue.args.schema!.fields[0],
                activeStepIndex: 3,
            },
        ],
    },
    isSubmitting: true,
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
