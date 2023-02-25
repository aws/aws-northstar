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
import { render, cleanup, screen, act } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import Table from './';
import * as stories from './index.stories';
import userEvent from '@testing-library/user-event';

const { Default, LongData, Empty } = composeStories(stories);

describe('Table', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render table', async () => {
        const { container } = render(<Default />);
        const table = wrapper(container).findTable();
        const pagination = wrapper(container).findPagination();
        const search = wrapper(container).findTextFilter();
        expect(table?.findRows()).toHaveLength(9);
        expect(screen.getByText('Table Title')).toBeVisible();
        expect(screen.getByText('(9)')).toBeVisible();
        expect(pagination?.findPageNumbers()).toHaveLength(1);

        expect(table?.findColumnHeaders()[1].getElement()).toHaveTextContent('Id');
        expect(table?.findColumnHeaders()[2].getElement()).toHaveTextContent('Name');
        expect(table?.findColumnHeaders()[3].getElement()).toHaveTextContent('Total Amount');
        expect(table?.findColumnHeaders()[4].getElement()).toHaveTextContent('# Items');

        await act(() => {
            search?.findInput().setInputValue('3');
        });

        expect(table?.findRows()).toHaveLength(3);
    });

    it('should render table with large dataset', async () => {
        const { container } = render(<LongData />);
        const table = wrapper(container).findTable();
        const pagination = wrapper(container).findPagination();
        expect(table?.findRows()).toHaveLength(10);

        expect(screen.getByText('Table Title')).toBeVisible();
        expect(screen.getByText('(555)')).toBeVisible();
        expect(pagination?.findPageNumbers().map((pg) => pg.getElement())).toHaveLength(8); // Maximum display 8

        expect(table?.findBodyCell(1, 2)?.getElement()).toHaveTextContent('id000001');

        await act(() => {
            userEvent.click(pagination!.findNextPageButton().getElement());
        });

        expect(table?.findBodyCell(1, 2)?.getElement()).toHaveTextContent('id000011');

        await act(() => {
            userEvent.click(pagination!.findPageNumberByIndex(4)!.getElement());
        });

        expect(table?.findBodyCell(1, 2)?.getElement()).toHaveTextContent('id000031');

        await act(() => {
            userEvent.click(pagination!.findPreviousPageButton()!.getElement());
        });

        expect(table?.findBodyCell(1, 2)?.getElement()).toHaveTextContent('id000021');
    });

    it('should render empty table', async () => {
        render(<Empty />);
        expect(screen.getByText('No items')).toBeVisible();
        expect(screen.getByText('No items to display.')).toBeVisible();
    });

    it('should render default remote update table', async () => {
        const handleFetchData = jest.fn();

        const { container } = render(
            <Table
                header="Remote Update Table"
                columnDefinitions={stories.columnDefinitionsRemoteUpdateTable}
                onFetchData={handleFetchData}
                totalItemsCount={stories.dataRemoteUpdateTable.length}
                defaultPageSize={10}
                items={stories.dataRemoteUpdateTable.slice(0, 10)}
            />
        );

        const table = wrapper(container).findTable();
        expect(table?.findRows()).toHaveLength(10);
        expect(handleFetchData).toHaveBeenCalledWith({
            pageSize: 10,
            pageIndex: 1,
            filterText: '',
        });
    });
});
