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
import { render, screen, cleanup } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';
import { TEXT_CONTENT } from '../Textarea/index.stories';

const { Default, HeaderContent, FreeContent } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

const checkHeaderContent = (headerContent: string, tag: string) => {
    const header = screen.getByText(headerContent);
    expect(header).toBeVisible();
    expect(header.tagName).toBe(tag);
};

describe('PlainText', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render text content', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        const content = screen.getByText(TEXT_CONTENT);

        expect(content).toBeVisible();
        expect(content.tagName).toBe('P');
    });

    it('should render header content', async () => {
        render(<HeaderContent onSubmit={handleSubmit} onCancel={handleCancel} />);

        for (let i = 1; i <= 5; i++) {
            checkHeaderContent(`Header ${i}`, `H${i}`);
        }
    });

    it('should render free content', async () => {
        render(<FreeContent onSubmit={handleSubmit} onCancel={handleCancel} />);

        const contents = screen.queryAllByText('item of unordered list');

        expect(contents).toHaveLength(2);
        expect(contents[0].tagName).toBe('LI');
    });
});
