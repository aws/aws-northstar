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
import TextFilter from '@cloudscape-design/components/text-filter';
import Pagination from '@cloudscape-design/components/pagination';
import Table, { TableProps } from '@cloudscape-design/components/table';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import orderBy from 'lodash/orderBy';
import get from 'lodash/get';
import chunk from 'lodash/chunk';
import { useMemo, useState } from 'react';

/**
 * Options for a local text filter
 */
export interface InfiniteQueryTextFilterOptions<TItem> {
    /**
     * Given the entered filter text, return true if the item is considered a match
     */
    readonly filterFunction: (filterText: string, item: TItem) => boolean;
    /**
     * Placeholder for the filter text box
     */
    readonly placeholder?: string;
}

/**
 * Options for local sorting
 */
export interface InfiniteQuerySortOptions<TItem> {
    /**
     * Default column to sort by. Can use dot notation for nested keys of an item, eg foo.bar for { foo: { bar: "value" } }
     * @default not sorted
     */
    readonly defaultSortingColumn?: TableProps.SortingColumn<TItem>;
    /**
     * Set to true if sorting in descending order
     * @default ascending order
     */
    readonly defaultSortingDescending?: boolean;
}

/**
 * Options for the infinite query table
 */
export interface InfiniteQueryTableProps<TItem, K extends string, TExtendedItem extends TItem, TError>
    extends Omit<TableProps, 'items' | 'loading' | 'pagination' | 'columnDefinitions'> {
    /**
     * Columns configuration
     */
    readonly columnDefinitions: TableProps.ColumnDefinition<TExtendedItem>[];
    /**
     * Tanstack query hook result used to fetch items
     */
    readonly query: UseInfiniteQueryResult<Record<K, TItem[]>, TError>;
    /**
     * Key in the response under which the items to tabulate are returned
     */
    readonly itemsKey: K;
    /**
     * Number of items per page. Set this to the page size you are requesting in your query hook.
     * @default 100
     */
    readonly pageSize?: number;
    /**
     * Options for a text filter which will filter loaded items client side
     */
    readonly clientSideTextFilter?: InfiniteQueryTextFilterOptions<TItem>;
    /**
     * Options for sorting items client side
     */
    readonly clientSideSort?: InfiniteQuerySortOptions<TItem>;
    /**
     * Optional function to compute additional fields or add items, called with all pages of data whenever new data is loaded
     */
    readonly extendData?: (data: TItem[]) => TExtendedItem[];
}

/**
 * Extends the Cloudscape Table component with pagination options for @tanstack/react-query infinite query hooks.
 * Compatible with generated hooks for paginated operations from <a href='https://aws.github.io/aws-pdk/developer_guides/type-safe-api/index.html' target='_blank' rel='noreferrer noopener'>AWS PDK Type Safe API</a>.
 */
const InfiniteQueryTable = <TItem, K extends string, TExtendedItem extends TItem, TError>({
    query,
    itemsKey,
    pageSize,
    clientSideSort,
    clientSideTextFilter,
    extendData,
    ...tableProps
}: InfiniteQueryTableProps<TItem, K, TExtendedItem, TError>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filterText, setFilterText] = useState('');
    const [sortingColumn, setSortingColumn] = useState<TableProps.SortingColumn<TExtendedItem> | undefined>(
        clientSideSort?.defaultSortingColumn
    );
    const [sortingDescending, setSortingDescending] = useState<boolean | undefined>(
        clientSideSort?.defaultSortingDescending
    );

    const allLocalData = useMemo(() => {
        const flattenedData = (query?.data?.pages ?? []).flatMap((p) => p[itemsKey]);
        return extendData ? extendData(flattenedData) : flattenedData;
    }, [query.data?.pages, extendData, itemsKey]);

    const filteredData = useMemo(
        () =>
            allLocalData.filter((item) =>
                clientSideTextFilter ? clientSideTextFilter.filterFunction(filterText, item) : true
            ),
        [filterText, clientSideTextFilter, allLocalData]
    );

    const sortedData = useMemo(
        () =>
            sortingColumn?.sortingField
                ? orderBy(filteredData, (s) => get(s, sortingColumn.sortingField!), sortingDescending ? 'desc' : 'asc')
                : filteredData,
        [filteredData, sortingColumn, sortingDescending]
    );

    const pages = useMemo(() => chunk(sortedData, pageSize ?? 100), [sortedData, pageSize]);

    return (
        <Table
            pagination={
                <Pagination
                    currentPageIndex={currentPage}
                    pagesCount={pages.length}
                    openEnd={query.hasNextPage}
                    onChange={(e) => setCurrentPage(e.detail.currentPageIndex)}
                    onNextPageClick={(e) => {
                        if (!e.detail.requestedPageAvailable) {
                            void query.fetchNextPage();
                        }
                    }}
                />
            }
            items={query.isError ? [] : pages[currentPage - 1]}
            loading={query.isLoading || query.isFetchingNextPage || query.isRefetching}
            sortingColumn={sortingColumn}
            sortingDescending={sortingDescending}
            sortingDisabled={!clientSideSort}
            filter={
                clientSideTextFilter ? (
                    <TextFilter
                        filteringText={filterText}
                        filteringPlaceholder={clientSideTextFilter.placeholder}
                        onChange={(e) => setFilterText(e.detail.filteringText)}
                    />
                ) : undefined
            }
            {...tableProps}
            onSortingChange={
                clientSideSort
                    ? (e) => {
                          setSortingColumn(e.detail.sortingColumn);
                          setSortingDescending(e.detail.isDescending);
                      }
                    : tableProps?.onSortingChange
            }
        />
    );
};

export default InfiniteQueryTable;
