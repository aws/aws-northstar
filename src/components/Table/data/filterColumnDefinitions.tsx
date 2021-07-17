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
import { DataType } from './type';
import { Column } from '../';
import Select from '../../Select';
import { UseFiltersColumnOptions } from 'react-table';
import { Button } from '../../index';

function SelectColumnFilter({ column: { filterValue, setFilter } }: any) {
    const options = [
        {
            label: 'Order 11',
            value: 'Order 11',
        },
        {
            label: 'Order 12',
            value: 'Order 12',
        },
        {
            label: 'Order 13',
            value: 'Order 13',
        },
    ];

    return (
        <div style={{ display: 'flex' }}>
            <Select
                options={options}
                selectedOption={options.find(({ value }) => value === filterValue)}
                onChange={(e) => {
                    setFilter(e.target.value || undefined);
                }}
            />
            <Button onClick={() => setFilter(undefined)}>Clear</Button>
        </div>
    );
}

const filterColumnDefinition: (Column<DataType> & UseFiltersColumnOptions<DataType>)[] = [
    {
        id: 'id',
        width: 200,
        Header: 'Id',
        accessor: 'id',
    },
    {
        id: 'name',
        width: 200,
        Header: 'Name',
        Filter: SelectColumnFilter,
        accessor: 'name',
    },
    {
        id: 'createdDate',
        width: 200,
        Header: 'Created date',
        accessor: 'createdDate',
    },
    {
        id: 'accounts',
        width: 200,
        Header: '# Accounts',
        accessor: (row) => row.accounts?.length,
    },
];

export default filterColumnDefinition;
