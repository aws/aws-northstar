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
import Table from '.';

const data = [{ id: '123', name: 'Item one' }];

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
});
