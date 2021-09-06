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
import { render, cleanup } from '@testing-library/react';
import FormRenderer from '../FormRenderer';
import FormRendererMarkdownEditor from '.';

describe('FormRendererMarkdownEditor', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    const handleCancel = jest.fn();
    const handleSubmit = jest.fn();

    describe('should extend the FormRenderer with Markdown Editor', () => {
        it('should render a markdown editor', () => {
            const customComponentMapping = {
                MARKDOWN_EDITOR: FormRendererMarkdownEditor,
            };
            const schema = {
                submitLabel: 'Save',
                cancelLabel: 'Back',
                fields: [
                    {
                        component: 'MARKDOWN_EDITOR',
                        name: 'markdownOne',
                        label: 'This is a markdown editor',
                        helperText: 'Helper text provides users some guidance.',
                        initialValue: '# I am a Markdown editor',
                    },
                ],
                header: 'Markdown Editor',
                description: 'This component allows a user to enter markdown and renders it in real-time.',
            };

            const { getByText } = render(
                <FormRenderer
                    schema={schema}
                    customComponentWrapper={customComponentMapping}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            );

            expect(getByText('Markdown Editor')).toBeVisible();
            expect(getByText('I am a Markdown editor')).toBeInTheDocument();
        });
    });
});
