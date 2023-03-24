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
    title: 'Components/FormRenderer/CustomLayout',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/grid/" rel="noreferrer noopener">
                    Custom Layout using Grid
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.CUSTOM_LAYOUT,
                name: 'layout',
                gridDefinition: [
                    { colspan: { default: 12, s: 6 } },
                    { colspan: { default: 12, s: 6 } },
                    { colspan: { default: 12, s: 6 } },
                    { colspan: { default: 9, s: 4 } },
                    { colspan: { default: 3, s: 2 } },
                ],
                fields: [
                    {
                        name: 'first-name',
                        label: 'First name',
                        component: componentTypes.TEXT_FIELD,
                        isRequired: true,
                        stretch: true,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        name: 'last-name',
                        label: 'Last name',
                        component: componentTypes.TEXT_FIELD,
                        isRequired: true,
                        stretch: true,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        name: 'address',
                        label: 'Address',
                        component: componentTypes.TEXT_FIELD,
                        isRequired: true,
                        stretch: true,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        name: 'suburb',
                        label: 'Suburb',
                        component: componentTypes.TEXT_FIELD,
                        isRequired: true,
                        stretch: true,
                        validate: [
                            {
                                type: validatorTypes.REQUIRED,
                            },
                        ],
                    },
                    {
                        name: 'postcode',
                        label: 'Postcode',
                        component: componentTypes.TEXT_FIELD,
                        isRequired: true,
                        stretch: true,
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
