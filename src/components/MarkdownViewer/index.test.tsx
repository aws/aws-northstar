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
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import MarkdownViewer from '.';

describe('FormRenderer', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    const handleCancel = jest.fn();
    const handleSubmit = jest.fn();

    it('should render header and description', () => {
        const { getByText } = render(
            <MarkdownViewer
                title={'A sample Markdown viewer'}
                subtitle={'Renders nice markdown from text'}
            ></MarkdownViewer>
        );

        expect(getByText('header')).toBeVisible();
        expect(getByText('subtitle')).toBeVisible();
    });

    it('should render header and description', () => {
        const { queryByRole, getByRole } = render(
            <MarkdownViewer title={'A sample Markdown viewer'} subtitle={'Renders nice markdown from text'}>
                # Heading A
            </MarkdownViewer>
        );
        expect(queryByRole('h1')).not.toBeNull();
        expect(getByRole('h1')).toHaveTextContent('Heading');
    });
});
