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
import { act, cleanup, render, waitFor } from '@testing-library/react';
import * as stories from './index.stories';
import { composeStories } from '@storybook/react';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import userEvent from '@testing-library/user-event';

const { Default, ClientSideTextFilter, ClientSideSort } = composeStories(stories);

describe('InfiniteQueryTable', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render table', async () => {
        const { container } = render(<Default />);
        const table = wrapper(container).findTable();
        const pagination = wrapper(container).findPagination();

        await waitFor(() => expect(table?.findRows()).toHaveLength(3));
        expect(table?.findBodyCell(1, 1)?.getElement()).toHaveTextContent('Item 1');
        expect(table?.findBodyCell(2, 1)?.getElement()).toHaveTextContent('Item 2');
        expect(table?.findBodyCell(3, 1)?.getElement()).toHaveTextContent('Item 3');

        await act(() => {
            userEvent.click(pagination!.findNextPageButton().getElement());
        });

        await waitFor(() => expect(table?.findRows()).toHaveLength(3));
        expect(table?.findBodyCell(1, 1)?.getElement()).toHaveTextContent('Item 4');
        expect(table?.findBodyCell(2, 1)?.getElement()).toHaveTextContent('Item 5');
        expect(table?.findBodyCell(3, 1)?.getElement()).toHaveTextContent('Item 6');
    });

    it('should render with client side filter', async () => {
        const { container } = render(<ClientSideTextFilter />);
        const table = wrapper(container).findTable();
        const search = wrapper(container).findTextFilter();

        await waitFor(() => expect(table?.findRows()).toHaveLength(3));
        expect(table?.findBodyCell(1, 1)?.getElement()).toHaveTextContent('Item 1');
        expect(table?.findBodyCell(2, 1)?.getElement()).toHaveTextContent('Item 2');
        expect(table?.findBodyCell(3, 1)?.getElement()).toHaveTextContent('Item 3');

        await act(() => {
            search?.findInput().setInputValue('3');
        });

        expect(table?.findRows()).toHaveLength(1);
    });

    it('should render with client side sorting', async () => {
        const { container } = render(<ClientSideSort />);
        const table = wrapper(container).findTable();
        const sort = table?.findColumnSortingArea(1);

        await waitFor(() => expect(table?.findRows()).toHaveLength(3));
        expect(table?.findBodyCell(1, 1)?.getElement()).toHaveTextContent('Item 1');
        expect(table?.findBodyCell(2, 1)?.getElement()).toHaveTextContent('Item 2');
        expect(table?.findBodyCell(3, 1)?.getElement()).toHaveTextContent('Item 3');

        await act(() => {
            userEvent.click(sort!.getElement());
        });

        expect(table?.findRows()).toHaveLength(3);
        expect(table?.findBodyCell(1, 1)?.getElement()).toHaveTextContent('Item 3');
        expect(table?.findBodyCell(2, 1)?.getElement()).toHaveTextContent('Item 2');
        expect(table?.findBodyCell(3, 1)?.getElement()).toHaveTextContent('Item 1');
    });
});
