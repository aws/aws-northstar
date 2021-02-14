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

import React, { useCallback, useMemo, useState } from 'react';
import { action } from '@storybook/addon-actions';
import Table, { FetchDataOptions } from '.';
import longData from './data/long';
import shortData from './data/short';
import groupByData from './data/groupBy';
import columnDefinitions from './data/columnDefinitions';
import orderBy from 'lodash.orderby';

export default {
    component: Table,
    title: 'Table',
};

export const Loading = () => (
    <Table
        tableTitle={'Table'}
        columnDefinitions={columnDefinitions}
        loading={true}
        disableRowSelect={true}
        disableGroupBy={true}
        disableSettings={true}
        disablePagination={true}
        disableSortBy={true}
        disableFilters={true}
    />
);

export const Simple = () => (
    <Table
        columnDefinitions={columnDefinitions}
        items={shortData}
        disableRowSelect={true}
        disableGroupBy={true}
        disableSettings={true}
        disablePagination={true}
        disableSortBy={true}
        disableFilters={true}
    />
);

export const Default = () => (
    <Table tableTitle={'Default Table'} columnDefinitions={columnDefinitions} items={shortData} />
);

export const MultiSelect = () => (
    <Table
        tableTitle={'Multi Select Table'}
        columnDefinitions={columnDefinitions}
        items={shortData}
        selectedRowIds={['id0000012', 'id0000013']}
        onSelectionChange={action('onSelectionChange')}
        getRowId={(data) => data.id}
    />
);

export const SingleSelect = () => (
    <Table
        tableTitle={'Single Select Table'}
        columnDefinitions={columnDefinitions}
        items={shortData}
        multiSelect={false}
        selectedRowIds={['id0000012']}
        onSelectionChange={action('onSelectionChange')}
        getRowId={(data) => data.id}
    />
);

export const GroupBy = () => (
    <Table
        tableTitle={'GroupBy Table'}
        columnDefinitions={columnDefinitions}
        items={groupByData}
        disableGroupBy={false}
        disableRowSelect={true}
        defaultGroups={['name']}
    />
);

export const Complex = () => (
    <Table
        onSelectionChange={action('onSelectionChange')}
        tableTitle={'Complex Table'}
        columnDefinitions={columnDefinitions}
        items={longData}
        sortBy={[
            {
                id: 'name',
                desc: false,
            },
        ]}
    />
);

interface Data {
    id: string;
    name: string;
}

export const RemoteFetch = () => {
    const [items, setItems] = useState<Data[]>([]);
    const [rowCount, setRowCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const fetchIdRef = React.useRef(0);
    const data = useMemo<Data[]>(() => {
        const data = [];
        for (let i = 0; i < 1000; i++) {
            data.push({
                id: i.toString(),
                name: `Name ${i}`,
            });
        }

        return data;
    }, []);
    const handleFetchData = useCallback((options: FetchDataOptions) => {
        setLoading(true);
        const fetchId = ++fetchIdRef.current;
        setTimeout(() => {
            if (fetchId === fetchIdRef.current) {
                // You could fetch your data from server.
                const filterData = data.filter((d: Data) => {
                    if (options.filterText) {
                        return d.name.indexOf(options.filterText) > 0;
                    }

                    return true;
                });
                let tempData = filterData.slice(
                    (options.pageIndex || 0) * (options.pageSize || 10),
                    ((options.pageIndex || 0) + 1) * (options.pageSize || 10)
                );
                if (options.sortBy && options.sortBy.length > 0) {
                    tempData = orderBy(tempData, options.sortBy[0].id, options.sortBy[0].desc ? 'desc' : 'asc');
                }
                setItems(tempData);
                setRowCount(filterData.length);
                setLoading(false);
            }
        }, 1000);
    }, []);
    return (
        <Table
            tableTitle={'Remote Update Table'}
            columnDefinitions={columnDefinitions}
            onFetchData={handleFetchData}
            rowCount={rowCount}
            items={items}
            loading={loading}
            onSelectionChange={action('onSelectionChange')}
        />
    );
};
