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
    title: 'Components/FormRenderer/CodeEditor',
    excludeStories: ['TEXT_CONTENT'],
} as ComponentMeta<typeof FormRenderer>;

export const TEXT_CONTENT = 'const pi = 3.14;';

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/code-editor/" rel="noreferrer">
                    Code Editor
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.CODE_EDITOR,
                name: 'codeEditor',
                label: 'Code Editor',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'This is placeholder text',
                language: 'javascript',
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
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
        codeEditor: TEXT_CONTENT,
    },
};
