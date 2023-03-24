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
    title: 'Components/FormRenderer/Select',
} as ComponentMeta<typeof FormRenderer>;

export const Select = Template.bind({});
Select.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/select" rel="noreferrer noopener">
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
                'data-testid': 'testId',
                options: [
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2', disabled: true },
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
    },
};

export const SelectWithInitialValue = Template.bind({});
SelectWithInitialValue.args = {
    ...Select.args,
    initialValues: {
        select: { label: 'Option 3', value: '3' },
    },
};

export const SelectDisabled = Template.bind({});
SelectDisabled.args = {
    ...SelectWithInitialValue.args,
    schema: {
        ...SelectWithInitialValue.args.schema,
        fields: SelectWithInitialValue.args.schema!.fields.map((field) => ({
            ...field,
            isDisabled: true,
        })),
    },
};

export const Multiselect = Template.bind({});
Multiselect.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/multiselectd" rel="noreferrer noopener">
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
                deselectAriaLabel: (e: any) => `Remove ${e.label}`,
                selectedAriaLabel: 'Selected',
                options: [
                    {
                        label: 'Option 1',
                        value: '1',
                        description: 'This is Option 1 description',
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
    },
};

export const MultiselectWithInitialValue = Template.bind({});
MultiselectWithInitialValue.args = {
    ...Multiselect.args,
    initialValues: {
        select: [
            {
                label: 'Option 1',
                value: '1',
                description: 'This is Option 1 description',
            },
            {
                label: 'Option 4',
                value: '4',
            },
        ],
    },
};

export const MultiselectDisabled = Template.bind({});
MultiselectDisabled.args = {
    ...MultiselectWithInitialValue.args,
    schema: {
        ...MultiselectWithInitialValue.args.schema,
        fields: MultiselectWithInitialValue.args.schema!.fields.map((field) => ({
            ...field,
            isDisabled: true,
        })),
    },
};

export const Autosuggest = Template.bind({});
Autosuggest.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/autosuggest" rel="noreferrer noopener">
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
                    { value: '1', label: 'Suggestion 1' },
                    { value: '2', label: 'Suggestion 2' },
                    { value: '3', label: 'Suggestion 3' },
                    { value: '4', label: 'Suggestion 4' },
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

export const AutosuggestWithInitialValue = Template.bind({});
AutosuggestWithInitialValue.args = {
    ...Autosuggest.args,
    initialValues: {
        select: { value: '2', label: 'Suggestion 2' },
    },
};

export const AutosuggestDisabled = Template.bind({});
AutosuggestDisabled.args = {
    ...AutosuggestWithInitialValue.args,
    schema: {
        ...AutosuggestWithInitialValue.args.schema,
        fields: AutosuggestWithInitialValue.args.schema!.fields.map((field) => ({
            ...field,
            isDisabled: true,
        })),
    },
};

export const AutosuggestWithFreeText = Template.bind({});
AutosuggestWithFreeText.args = {
    ...Autosuggest.args,
    initialValues: {
        select: { value: 'Suggestion 5' },
    },
};
