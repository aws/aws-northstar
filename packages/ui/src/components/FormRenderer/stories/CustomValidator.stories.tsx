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
import React from 'react';
import { ComponentMeta } from '@storybook/react';
import FormRenderer, { componentTypes, ValidatorMapper } from '..';
import { DEFAULT_ARGS } from '../index.stories';
import { action } from '@storybook/addon-actions';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/CustomValidator',
} as ComponentMeta<typeof FormRenderer>;

const defaultArgs = {
    onSubmit: action('Submit'),
    onCancel: action('Cancel'),
};

export const CustomValidator = (args = defaultArgs) => {
    const validatorMapping: ValidatorMapper = {
        custom:
            ({ threshold }: any) =>
            (value: any) =>
                !value
                    ? 'this is a required field'
                    : value > threshold
                    ? `${value} must be <= ${threshold}`
                    : undefined,
    };

    const schema = {
        header: 'Data driven form with custom validator',
        info: 'https://data-driven-forms.org/mappers/validator-mapper',
        fields: [
            {
                component: componentTypes.TEXT_FIELD,
                name: 'number',
                label: 'Number',
                isRequired: true,
                validate: [
                    {
                        type: 'custom',
                        threshold: 6,
                    },
                ],
            },
        ],
    };

    return <FormRenderer {...args} schema={schema} validatorMapper={validatorMapping} />;
};
