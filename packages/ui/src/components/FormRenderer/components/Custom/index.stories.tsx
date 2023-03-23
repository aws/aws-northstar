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
import { action } from '@storybook/addon-actions';
import Input from '@cloudscape-design/components/input';
import FormRenderer, { componentTypes, validatorTypes, FieldInputProps } from '../..';

export default {
    component: FormRenderer,
    title: 'Components/FormRenderer/Custom',
};

const defaultArgs = {
    onSubmit: action('Submit'),
    onCancel: action('Cancel'),
};

export const Default = (args = defaultArgs) => {
    const CustomComponent = ({ input }: FieldInputProps<any, HTMLInputElement>) => (
        <Input
            onChange={({ detail }) => input.onChange(detail.value)}
            ariaRequired={input.isRequired}
            value={input.value}
            data-testid="testId"
            placeholder="placeholder"
        />
    );

    const schema = {
        header: 'Data driven form with Custom component',
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.CUSTOM,
                name: 'input',
                CustomComponent: CustomComponent,
                isRequired: true,
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
        ],
    };

    return <FormRenderer {...args} schema={schema} />;
};

export const WithInitialValue = (args = defaultArgs) => {
    const CustomComponent = ({ input }: FieldInputProps<any, HTMLInputElement>) => (
        <Input
            onChange={({ detail }) => input.onChange(detail.value)}
            ariaRequired={input.isRequired}
            value={input.value}
            data-testid="testId"
            placeholder="placeholder"
        />
    );

    const schema = {
        header: 'Data driven form with Custom component',
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.CUSTOM,
                name: 'input',
                CustomComponent: CustomComponent,
            },
        ],
    };

    return <FormRenderer {...args} schema={schema} initialValues={{ input: 'inputContent' }} />;
};
