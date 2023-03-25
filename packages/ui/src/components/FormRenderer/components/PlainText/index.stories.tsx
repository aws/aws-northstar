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
import FormRenderer, { componentTypes } from '../..';
import { Template, DEFAULT_ARGS } from '../../index.stories';
import { TEXT_CONTENT } from '../Textarea/index.stories';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/PlainText',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/text-content" rel="noreferrer noopener">
                    Text Content
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/plain-text',
        fields: [
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'text',
                label: TEXT_CONTENT,
                element: 'p',
            },
        ],
    },
};

export const HeaderContent = Template.bind({});
HeaderContent.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/text-content" rel="noreferrer noopener">
                    Text Content
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/plain-text',
        fields: [
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'header1',
                label: 'Header 1',
                element: 'h1',
            },
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'header2',
                label: 'Header 2',
                element: 'h2',
            },
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'header3',
                label: 'Header 3',
                element: 'h3',
            },
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'header4',
                label: 'Header 4',
                element: 'h4',
            },
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'header5',
                label: 'Header 5',
                element: 'h5',
            },
        ],
    },
};

export const FreeContent = Template.bind({});
FreeContent.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/text-content" rel="noreferrer noopener">
                    Text Content
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        info: 'https://data-driven-forms.org/provided-mappers/plain-text',
        fields: [
            {
                component: componentTypes.PLAIN_TEXT,
                name: 'text',
                label: (
                    <>
                        <h1>Heading 1</h1>
                        <h2>Heading 2</h2>
                        <h3>Heading 3</h3>
                        <h4>Heading 4</h4>
                        <h5>Heading 5</h5>
                        <p>Paragraph</p>
                        <p>
                            <strong>Strong text</strong>
                        </p>
                        <p>
                            <small>
                                Small text with a <a href="/">link</a>
                            </small>
                        </p>
                        <p>
                            <a href="/">Link</a>
                        </p>
                        <p>
                            <code>Code</code>
                        </p>

                        <ul>
                            <li>item of unordered list</li>
                            <li>item of unordered list</li>
                        </ul>

                        <ol>
                            <li>item of ordered list</li>
                            <li>item of ordered list</li>
                        </ol>
                    </>
                ),
            },
        ],
    },
};
