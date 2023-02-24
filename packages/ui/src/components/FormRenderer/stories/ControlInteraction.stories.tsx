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
import FormRenderer, { componentTypes, validatorTypes } from '..';
import { Template, DEFAULT_ARGS } from '../index.stories';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/ControlInteraction',
} as ComponentMeta<typeof FormRenderer>;

export const ControlInteraction = Template.bind({});
ControlInteraction.args = {
    schema: {
        header: 'Data driven form with control interaction',
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.SELECT,
                name: 'select1',
                label: 'Select 1',
                placeholder: 'Choose an option',
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
                component: componentTypes.SELECT,
                name: 'select2',
                label: 'Select 2',
                helperText: 'Enabled only when the value of Select 1 is 2',
                placeholder: 'Choose an option',
                options: [
                    {
                        label: 'Option 21',
                        value: '21',
                    },
                    {
                        label: 'Option 22',
                        value: '22',
                    },
                    {
                        label: 'Option 23',
                        value: '23',
                    },
                ],
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
                resolveProps: (_props, _field, formOptions) => {
                    const values = formOptions.getState().values;
                    return values.select1?.value === '2'
                        ? {
                              isDisabled: false,
                          }
                        : {
                              isDisabled: true,
                          };
                },
                condition: {
                    when: 'select1.value',
                    is: '2',
                    then: { visible: true, set: { select2: { value: '22' } } },
                    else: { visible: true, set: { select2: { value: '21' } } },
                },
            },
            {
                component: componentTypes.SELECT,
                name: 'select3',
                label: 'Select 3',
                helperText: 'Options changes with the value of Select 1 and only visible when Select 1 is set',
                placeholder: 'Choose an option',
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
                resolveProps: (_props, _field, formOptions) => {
                    const values = formOptions.getState().values;
                    const select1Value = values.select1?.value || ' ';
                    return {
                        options: [
                            {
                                label: `Option 3${select1Value}1`,
                                value: `3${select1Value}1`,
                            },
                            {
                                label: `Option 3${select1Value}2`,
                                value: `3${select1Value}2`,
                            },
                            {
                                label: `Option 3${select1Value}3`,
                                value: `3${select1Value}3`,
                            },
                        ],
                    };
                },
                condition: {
                    when: 'select1',
                    isNotEmpty: true,
                },
            },
        ],
    },
};
