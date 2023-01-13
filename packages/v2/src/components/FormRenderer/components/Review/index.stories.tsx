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
import Box from '@cloudscape-design/components/box';
import FormRenderer, { componentTypes } from '../..';

export default {
    component: FormRenderer,
    title: 'Components/FormRenderer/Review',
    excludeStories: ['TEST_DATA'],
};

export const TEST_DATA = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
};

const defaultArgs = {
    onSubmit: action('Submit'),
    onCancel: action('Cancel'),
};

export const Default = (args = defaultArgs) => {
    const ReviewTemplate = ({ data }: any) => {
        return <Box>{JSON.stringify(data)}</Box>;
    };

    const schema = {
        header: ' Data driven form displaying Review with input Template',
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.REVIEW,
                name: 'review',
                Template: ReviewTemplate,
            },
        ],
    };

    return <FormRenderer {...args} initialValues={TEST_DATA} schema={schema} />;
};
