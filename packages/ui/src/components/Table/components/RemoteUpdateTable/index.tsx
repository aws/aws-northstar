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
import { FC, useMemo, useState, useCallback, useEffect } from 'react';
import TableComponent, { TableProps as CloudscapeTableProps } from '@cloudscape-design/components/table';
import Pagination, { PaginationProps } from '@cloudscape-design/components/pagination';
import TextFilter, { TextFilterProps } from '@cloudscape-design/components/text-filter';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events';
import { useDebouncedCallback } from 'use-debounce';

import EmptyState from '../EmptyState';
import { RemoteUpdateTableProps, InternalTableProps, FetchDataOptions } from '../../types';
import {
    DEFAULT_TRACK_BY,
    DEFAULT_LOADING_TEXT,
    DEFAULT_PAGINATION_LABELS,
    DEFAULT_FILTERING_PLACEHOLDER,
    DEFAULT_FILTERING_ARIA_LABEL,
    getAriaLabels,
    DEFAULT_PAGE_SIZE,
} from '../../config';

const DEFAULT_DEBOUNCE_TIMER = 500;

const RemoteUpdateTable: FC<RemoteUpdateTableProps & InternalTableProps> = ({
    ariaLabels,
    columnDefinitions,
    items,
    disablePagination = false,
    pagination: paginationComponent,
    disableSettings = false,
    preferences: collectionPreferenceComponent,
    disableFilters = false,
    disableRowSelect = false,
    selectionType = 'multi',
    filter: filterComponent,
    selectedItems = [],
    header,
    trackBy = DEFAULT_TRACK_BY,
    collectionPreferences,
    totalItemsCount,
    onFetchData,
    defaultPageSize = DEFAULT_PAGE_SIZE,
    defaultPageIndex = 1,
    ...props
}) => {
    const [fetchOption, setFetchOption] = useState<FetchDataOptions>({
        pageSize: defaultPageSize,
        pageIndex: defaultPageIndex,
        filterText: '',
        sortingField: props.sortingColumn?.sortingField,
        isDescending: props.sortingDescending,
    });

    const [filteringText, setFilteringText] = useState(fetchOption.filterText);

    const handleFilteringTextChangeDebounce = useDebouncedCallback((filterText: string) => {
        setFetchOption((prevOption) => ({
            ...prevOption,
            pageIndex: 1,
            filterText,
        }));
    }, DEFAULT_DEBOUNCE_TIMER);

    const handleFilteringTextChange: NonCancelableEventHandler<TextFilterProps.ChangeDetail> = useCallback(
        ({ detail }) => {
            setFilteringText(detail.filteringText);
            handleFilteringTextChangeDebounce(detail.filteringText);
        },
        [handleFilteringTextChangeDebounce]
    );

    const handlePaginationChange: NonCancelableEventHandler<PaginationProps.ChangeDetail> = useCallback(
        ({ detail }) => {
            setFetchOption((prevOption) => ({
                ...prevOption,
                pageIndex: detail.currentPageIndex,
            }));
        },
        []
    );

    const handleClearFilter = useCallback(() => {
        setFilteringText('');
        handleFilteringTextChangeDebounce('');
    }, [handleFilteringTextChangeDebounce]);

    const emptyComponent = useMemo(() => {
        return fetchOption.filterText ? (
            <EmptyState
                title="No matches"
                subtitle="We can’t find a match."
                action={<Button onClick={handleClearFilter}>Clear filter</Button>}
            />
        ) : (
            <EmptyState title="No items" subtitle="No items to display." />
        );
    }, [fetchOption.filterText, handleClearFilter]);

    const pagesCount = useMemo(() => {
        if (!totalItemsCount || !collectionPreferences.pageSize) {
            return 0;
        }

        if (totalItemsCount % collectionPreferences.pageSize === 0) {
            return Math.floor(totalItemsCount / collectionPreferences.pageSize);
        }

        return Math.floor(totalItemsCount / collectionPreferences.pageSize + 1);
    }, [totalItemsCount, collectionPreferences.pageSize]);

    const handleSortingChange: NonCancelableEventHandler<CloudscapeTableProps.SortingState<any>> = useCallback(
        ({ detail }) => {
            setFetchOption((prevOption) => ({
                ...prevOption,
                sortingField: detail.sortingColumn.sortingField,
                isDescending: detail.isDescending,
            }));
        },
        []
    );

    useEffect(() => {
        setFetchOption((prevOption) => ({
            ...prevOption,
            pageSize: collectionPreferences.pageSize || defaultPageSize,
        }));
    }, [collectionPreferences.pageSize, defaultPageSize]);

    useEffect(() => {
        onFetchData?.(fetchOption);
    }, [onFetchData, fetchOption]);

    const sortingColumn = useMemo(() => {
        return {
            sortingField: fetchOption.sortingField,
        };
    }, [fetchOption.sortingField]);

    return (
        <TableComponent
            trackBy={trackBy}
            loadingText={DEFAULT_LOADING_TEXT}
            visibleColumns={collectionPreferences.visibleContent}
            wrapLines={collectionPreferences.wrapLines}
            stripedRows={collectionPreferences.stripedRows}
            {...props}
            onSortingChange={handleSortingChange}
            selectionType={(!disableRowSelect && selectionType) || undefined}
            ariaLabels={ariaLabels || getAriaLabels()}
            columnDefinitions={columnDefinitions}
            items={items || []}
            empty={emptyComponent}
            sortingColumn={sortingColumn}
            sortingDescending={fetchOption.isDescending}
            pagination={
                !disablePagination &&
                (paginationComponent ?? (
                    <Pagination
                        currentPageIndex={fetchOption.pageIndex}
                        pagesCount={pagesCount}
                        onChange={handlePaginationChange}
                        ariaLabels={DEFAULT_PAGINATION_LABELS}
                    />
                ))
            }
            preferences={collectionPreferenceComponent}
            filter={
                !disableFilters &&
                (filterComponent ?? (
                    <TextFilter
                        filteringText={filteringText || ''}
                        onChange={handleFilteringTextChange}
                        filteringPlaceholder={DEFAULT_FILTERING_PLACEHOLDER}
                        filteringAriaLabel={DEFAULT_FILTERING_ARIA_LABEL}
                    />
                ))
            }
            header={
                header && typeof header === 'string' ? (
                    <Header
                        counter={
                            selectedItems.length
                                ? `(${selectedItems.length}/${totalItemsCount})`
                                : `(${totalItemsCount})`
                        }
                    >
                        {header}
                    </Header>
                ) : (
                    header
                )
            }
        />
    );
};

export default RemoteUpdateTable;
