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

describe('MarkdownViewer', () => {

    const title = 'Title';
    const bodyText = 'Body';
    const subtitle = 'subtitle';
    const buttonText = 'Action Button';


    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render header and description', () => {
        const { getByText } = render(<MarkdownViewer title={title} subtitle={subtitle}></MarkdownViewer>);

        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(bodyText)).toBeInTheDocument();
        expect(getByText(title)).toBeVisible();
        expect(getByText(subtitle)).toBeVisible();

    });

    it('should render header and description with the correct content', () => {
        const { queryByRole, getByRole } = render(<MarkdownViewer title={title} subtitle={subtitle}># Heading One</MarkdownViewer>);
        expect(queryByRole('h1')).not.toBeNull();
        expect(getByRole('h1')).toHaveTextContent('Heading One');
    });
});
