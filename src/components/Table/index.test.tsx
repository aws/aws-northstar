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
import { act, fireEvent, render } from '@testing-library/react';
import Table from '.';

const data = [{ id: '123', name: 'Item one' }];
const data10 = [
    { id: '0', name: 'Item0' },
    { id: '1', name: 'Item1' },
    { id: '2', name: 'Item2' },
    { id: '3', name: 'Item3' },
    { id: '4', name: 'Item4' },
    { id: '5', name: 'Item5' },
    { id: '6', name: 'Item6' },
    { id: '7', name: 'Item7' },
    { id: '8', name: 'Item8' },
    { id: '9', name: 'Item9' },
];
const dataGroup = [
    { id: '0', name: 'Item0' },
    { id: '1', name: 'Item0' },
    { id: '2', name: 'Item1' },
    { id: '3', name: 'Item1' },
    { id: '4', name: 'Item2' },
    { id: '5', name: 'Item2' },
    { id: '6', name: 'Item3' },
    { id: '7', name: 'Item3' },
    { id: '8', name: 'Item4' },
    { id: '9', name: 'Item4' },
]; // 5 groups by 'name'

const columnDefinitions = [
    {
        id: 'id',
        Header: 'Id',
        accessor: 'id',
    },
    {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
    },
];

describe('Table', () => {
    it('renders table title, headers and data', () => {
        const { getByText } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                items={data}
                disableSortBy={true}
                disableSettings={true}
                disablePagination={true}
                disableFilters={true}
                disableRowSelect={true}
                disableGroupBy={true}
            />
        );

        expect(getByText('My Table')).toBeVisible();
        expect(getByText('Id')).toBeVisible();
        expect(getByText('Name')).toBeVisible();
        expect(getByText('123')).toBeVisible();
        expect(getByText('Item one')).toBeVisible();
    });

    it('renders checkbox', () => {
        const { getByLabelText } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                items={data}
                disableSortBy={true}
                disableSettings={true}
                disablePagination={true}
                disableFilters={true}
                disableRowSelect={false}
                disableGroupBy={true}
            />
        );

        expect(getByLabelText('Checkbox to select row item')).toBeInTheDocument();
    });

    it('renders radio buttons', () => {
        const { getAllByRole } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                items={data}
                disableSortBy={true}
                disableSettings={true}
                disablePagination={true}
                disableFilters={true}
                disableRowSelect={false}
                multiSelect={false}
                disableGroupBy={true}
            />
        );

        expect(getAllByRole('radio')).toHaveLength(1);
    });

    it('renders seach input without extra column for search field', () => {
        const { getByPlaceholderText, getAllByRole } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                items={data}
                disableSortBy={true}
                disableSettings={true}
                disablePagination={true}
                disableFilters={false}
                disableRowSelect={true}
                disableGroupBy={true}
            />
        );

        expect(getByPlaceholderText('Search')).toBeInTheDocument();
        expect(getAllByRole('columnheader')).toHaveLength(2);
    });

    it('renders pagination', () => {
        const { getByText, getByLabelText } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                items={data}
                disableSortBy={true}
                disableSettings={true}
                disablePagination={false}
                disableFilters={true}
                disableRowSelect={true}
                disableGroupBy={true}
            />
        );

        expect(getByText('1-1 of 1')).toBeVisible();
        expect(getByLabelText('last page')).toBeInTheDocument();
        expect(getByLabelText('next page')).toBeInTheDocument();
        expect(getByLabelText('previous page')).toBeInTheDocument();
        expect(getByLabelText('first page')).toBeInTheDocument();
    });

    it('renders settings', () => {
        const { getByLabelText } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                items={data}
                disableSortBy={true}
                disableSettings={false}
                disablePagination={true}
                disableFilters={true}
                disableRowSelect={true}
                disableGroupBy={true}
            />
        );

        expect(getByLabelText('settings')).toBeInTheDocument();
    });

    it('renders sort icons', () => {
        const { getAllByTitle } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                items={data}
                disableSortBy={false}
                disableSettings={true}
                disablePagination={true}
                disableFilters={true}
                disableRowSelect={true}
                disableGroupBy={true}
            />
        );

        expect(getAllByTitle('Toggle SortBy')).toHaveLength(2);
    });

    it('should trigger onFetchData if onFetchData is provided', () => {
        const handleFetchData = jest.fn();

        act(() => {
            render(
                <Table tableTitle={'My Table'} columnDefinitions={columnDefinitions} onFetchData={handleFetchData} />
            );
        });

        expect(handleFetchData).toHaveBeenCalledWith({
            pageIndex: 0,
            filterText: '',
            groupBy: [],
            pageSize: 10,
            showColumns: ['id', 'name'],
            sortBy: [],
        });
    });

    it('should trigger onFetchData if onFetchData is provided and the next page icon is clicked', () => {
        const handleFetchData = jest.fn();

        const { getByText, getByTestId } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                onFetchData={handleFetchData}
                rowCount={56}
                items={data10}
            />
        );

        act(() => {
            fireEvent.click(getByTestId('next-page'));
        });

        expect(getByText('11-20 of 56')).toBeVisible();

        expect(handleFetchData).toHaveBeenLastCalledWith({
            pageIndex: 1,
            filterText: '',
            groupBy: [],
            pageSize: 10,
            showColumns: ['id', 'name'],
            sortBy: [],
        });
    });

    it('should render data group', () => {
        const { getAllByRole } = render(
            <Table
                tableTitle={'My Table'}
                columnDefinitions={columnDefinitions}
                items={dataGroup}
                disableGroupBy={false}
                disableRowSelect={true}
                defaultGroups={['name']}
            />
        );

        expect(getAllByRole('rowgroup')[1].childNodes).toHaveLength(5);
    });
});
