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
import { render } from '@testing-library/react';
import Flashbar, { FlashbarMessage } from '.';
import { axe } from 'jest-axe';
import { Default, StackedMessages, Loading } from './index.stories';

describe('Flashbar', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders all the flashbar messsages', () => {
        const items: FlashbarMessage[] = [
            {
                header: 'message 1',
                type: 'success',
                content: 'message 1 content',
            },
            {
                header: 'message 2',
                type: 'error',
                content: 'message 2 content',
            },
            {
                header: 'message 3',
                type: 'warning',
                content: 'message 3 content',
            },
        ];

        const { getByText } = render(<Flashbar items={items} />);
        expect(getByText('message 1')).toBeInTheDocument();
        expect(getByText('message 2')).toBeInTheDocument();
        expect(getByText('message 3')).toBeInTheDocument();
    });

    it('renders maximum number of flashbar messsages when maxItemsDisplayed is specified', () => {
        const items: FlashbarMessage[] = [
            {
                header: 'message 1',
                type: 'success',
                content: 'message 1 content',
            },
            {
                header: 'message 2',
                type: 'error',
                content: 'message 2 content',
            },
            {
                header: 'message 3',
                type: 'warning',
                content: 'message 3 content',
            },
        ];

        const { container } = render(<Flashbar items={items} maxItemsDisplayed={2} />);
        expect(container.querySelectorAll('.MuiAlert-root').length).toEqual(2);
    });

    it('renders accessible component - Default', async () => {
        const { container } = render(<Default />);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it('renders accessible component - StackedMessages', async () => {
        const { container } = render(<StackedMessages />);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it('renders accessible component - Loading', async () => {
        const { container } = render(<Loading />);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
