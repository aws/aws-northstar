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

import React, { useMemo, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    IdType,
    Row,
    useBlockLayout,
    useExpanded,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    UseGroupByRowProps,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useSortBy,
    useTable,
    UseTableOptions,
} from 'react-table';
import { makeStyles } from '@material-ui/core/styles';
import BaseTable from '@material-ui/core/Table';
import { useDebouncedCallback } from 'use-debounce';

import Container from '../../layouts/Container';
import ContainerHeaderContent, { ContainerHeaderContentProps } from './components/ContainerHeaderContent';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';
import SettingsBar from './components/SettingsBar';
import ColumnsSelector from './components/ColumnsSelector';
import ColumnsGrouping from './components/ColumnsGrouping';
import DefaultColumnFilter from './components/DefaultColumnFilter';
import useTableColumnFilter from './hooks/useTableColumnFilter';
import { Column, BooleanObject, TableOptions, TableBaseOptions, TableInstance, FetchDataOptions } from './types';
import { convertBooleanObjectToArray, convertArrayToBooleanObject } from './utils/converter';
import { DEFAULT_DEBOUNCE_TIMER, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZES } from './constants';

const useStyles = makeStyles((theme) => ({
    tableBar: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '.5rem',
    },
    tableWrapper: {
        maxHeight: '75vh',
    },
    searchBar: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
    },
    leftSpace: {
        marginLeft: '10px',
    },
    tableHeadRow: {
        borderTop: 0,
    },
    cellAlign: {
        display: 'inline-flex',
        alignItems: 'flex-end',
        width: 'inherit',
        height: 'max-content',
    },
    loadingTableBlur: {
        filter: 'alpha(opacity=50)',
        opacity: 0.5,
        transition: 'all 0.15s linear',
    },
    loadingSearchBarPadding: {
        paddingRight: '.25rem',
    },
    aggregated: {
        backgroundColor: theme.palette.grey[100],
    },
    verticalGrid: {
        display: 'inline-grid',
    },
    footerCell: {
        textAlign: 'center',
        fontWeight: 700,
        padding: '.5rem',
    },
    ellipsizeText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    resizer: {
        display: 'inline-block',
        borderLeft: `1px solid ${theme.palette.grey[200]}`,
        width: '1px',
        height: '60%',
        position: 'absolute',
        right: 0,
        top: '20%',
        transform: 'translateX(50%)',
        zIndex: 1,
    },
}));

/**
 * A table presents data in a two-dimensional format, arranged in columns and rows in a rectangular form.
 * */
export default function Table<D extends object>({
    actionGroup = null,
    columnDefinitions = [],
    defaultGroups = [],
    defaultColumnFilter = DefaultColumnFilter,
    defaultPageIndex = 0,
    defaultPageSize = DEFAULT_PAGE_SIZE,
    disableGroupBy = true,
    disableExpand = true,
    disableColumnFilters = true,
    disablePagination = false,
    disableSettings = false,
    disableSortBy = false,
    disableFilters = false,
    disableRowSelect = false,
    items = [],
    loading = false,
    onSelectionChange,
    onFetchData = null,
    pageSizes = DEFAULT_PAGE_SIZES,
    tableDescription,
    tableTitle = '',
    wrapText = true,
    selectedRowIds: initialSelectedRowIds = [],
    multiSelect = true,
    getRowId,
    getSubRows,
    isItemDisabled,
    errorText,
    onSelectedRowIdsChange,
    sortBy: defaultSortBy = [],
    ...props
}: TableBaseOptions<D>) {
    const styles = useStyles({});
    const [groupBy, setGroupBy] = useState(convertArrayToBooleanObject(defaultGroups));
    const [showColumns, setShowColumns] = useState<BooleanObject>(
        convertArrayToBooleanObject(columnDefinitions.map((column: Column<D>) => column.id || ''))
    );

    const selectedRowIdMap = useMemo(() => convertArrayToBooleanObject(initialSelectedRowIds), [initialSelectedRowIds]);

    const [controlledPageSize, setControlledPageSize] = useState(defaultPageSize);

    const columns = useTableColumnFilter({
        columnDefinitions,
        showColumns,
        disableRowSelect,
        disableExpand,
        multiSelect,
        isItemDisabled,
    });

    const rowCount = useMemo(() => {
        if (typeof props.rowCount === 'undefined') {
            return items?.length || 0;
        }

        return props.rowCount;
    }, [items, props.rowCount]);

    const pageCount = useMemo(() => {
        return Math.ceil(rowCount / controlledPageSize);
    }, [rowCount, controlledPageSize]);

    const tableOpts: TableOptions<D> & UseTableOptions<D> = useMemo(
        () => ({
            data: items || [],
            columns,
            defaultColumn: {
                minWidth: 50,
                width: 120,
                maxWidth: 800,
                Filter: !disableColumnFilters && defaultColumnFilter,
            },
            initialState: {
                pageIndex: defaultPageIndex,
                pageSize: controlledPageSize,
                selectedRowIds: selectedRowIdMap,
                sortBy: defaultSortBy,
                groupBy: defaultGroups,
            },
            ...(onFetchData != null && { pageCount }),
            getRowId,
            getSubRows,
            disableSortBy,
            disableGroupBy,
            disableFilters: disableColumnFilters,
            manualFilters: onFetchData != null,
            manualPagination: onFetchData != null,
            manualSorting: onFetchData != null,
            manualSortBy: onFetchData != null,
            manualGlobalFilter: onFetchData != null,
            autoResetSortBy: onFetchData === null,
            autoResetPage: onFetchData === null,
            autoResetSelectedRows: onFetchData === null,
            autoResetFilters: onFetchData === null,
            autoResetGlobalFilter: onFetchData === null,
        }),
        [
            items,
            columns,
            pageCount,
            controlledPageSize,
            defaultColumnFilter,
            defaultGroups,
            defaultPageIndex,
            defaultSortBy,
            disableColumnFilters,
            disableGroupBy,
            disableSortBy,
            getRowId,
            getSubRows,
            onFetchData,
            selectedRowIdMap,
        ]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        rows,
        gotoPage,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        setPageSize,
        selectedFlatRows,
        setGlobalFilter,
        toggleGroupBy,
        state: { pageIndex, pageSize, sortBy, globalFilter, selectedRowIds },
    }: TableInstance<D> = useTable(
        tableOpts,
        useBlockLayout,
        useFilters,
        useGlobalFilter,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        useResizeColumns
    );

    useEffect(() => {
        setControlledPageSize(pageSize || DEFAULT_PAGE_SIZE);
    }, [pageSize]);

    const toggleCopy = (target: object, headerId: string) => {
        const copy = { ...target };

        if (copy[headerId]) {
            delete copy[headerId];
        } else {
            copy[headerId] = true;
        }

        return copy;
    };

    const handleShowColumnsChange = (headerId?: IdType<string> | string) => {
        if (!headerId) {
            return;
        }

        const showColumnsCopy = toggleCopy(showColumns, headerId);

        setShowColumns(showColumnsCopy);
    };

    const onGroupChange = (headerId?: IdType<string> | string) => {
        if (!headerId) {
            return;
        }

        const groupByCopy = toggleCopy(groupBy, headerId);

        setGroupBy(groupByCopy);
        toggleGroupBy!(headerId);
    };

    const handleSelectionChangeDebounce = useDebouncedCallback((selectedFlatRows: Row<D>[]) => {
        const selected = selectedFlatRows
            .filter((row: Row<D> & Partial<UseGroupByRowProps<D>>) => !row.isGrouped)
            .map((row: Row<D>) => row.original);

        onSelectionChange?.(selected);
    }, DEFAULT_DEBOUNCE_TIMER);

    useEffect(() => {
        if (selectedFlatRows) {
            handleSelectionChangeDebounce(selectedFlatRows);
        }
    }, [selectedFlatRows, handleSelectionChangeDebounce]);

    useEffect(() => {
        selectedRowIds && onSelectedRowIdsChange?.(convertBooleanObjectToArray(selectedRowIds) || []);
    }, [selectedRowIds, onSelectedRowIdsChange]);

    useEffect(() => {
        if (onFetchData) {
            const flattenGroupBy = () => Object.keys(groupBy).filter((key) => groupBy[key]);
            const flattenShowColumns = () => Object.keys(showColumns).filter((key) => showColumns[key]);
            onFetchData({
                pageSize: pageSize || 0,
                pageIndex: pageIndex || 0,
                sortBy: sortBy || [],
                groupBy: flattenGroupBy(),
                showColumns: flattenShowColumns(),
                filterText: globalFilter || '',
            });
        }
    }, [onFetchData, pageIndex, pageSize, sortBy, groupBy, showColumns, globalFilter]);

    const columnsSelectorProps = {
        columnDefinitions,
        onShowColumnsChange: handleShowColumnsChange,
        showColumns,
        styles,
    };

    const columnsGroupingProps = {
        columnDefinitions,
        onGroupChange,
        groupBy,
        styles,
    };

    const groupCount = useMemo(() => {
        return rows.filter((row: Row<D> & Partial<UseGroupByRowProps<D>>) => row.isGrouped).length;
    }, [rows]);

    const testId = props['data-testid'] || 'table';

    const settingsBarProps = {
        pageIndex: pageIndex || 0,
        pageSize: pageSize || DEFAULT_PAGE_SIZE,
        pageSizes: pageSizes || DEFAULT_PAGE_SIZES,
        pageLength: (page || []).length,
        rowCount: rows.length,
        totalCount: rowCount + groupCount,
        loading,
        disablePagination,
        disableSettings,
        disableGroupBy,
        gotoPage,
        previousPage,
        canPreviousPage,
        nextPage,
        canNextPage,
        setPageSize,
        styles,
        columnsGroupingComponent: <ColumnsGrouping {...columnsGroupingProps} />,
        columnsSelectorComponent: <ColumnsSelector {...columnsSelectorProps} />,
    };

    const containerHeaderContentProps: ContainerHeaderContentProps = {
        disableFilters,
        loading,
        setGlobalFilter,
        globalFilter,
        styles,
        settingsBarComponent: <SettingsBar {...settingsBarProps} />,
    };

    const containerProps = {
        actionGroup,
        gutters: false,
        title: tableTitle,
        subtitle: tableDescription,
        headerContent:
            disableFilters && disableSettings && disablePagination ? null : (
                <ContainerHeaderContent {...containerHeaderContentProps} />
            ),
        'data-testid': testId,
    };

    const tableHeadProps = {
        headerGroups,
        styles,
        'data-testid': `${testId}-head`,
    };

    const tableBodyProps = {
        reactTableBodyProps: getTableBodyProps(),
        page: page || [],
        wrapText,
        prepareRow,
        styles,
        'data-testid': `${testId}-body`,
    };

    const tableFooterProps = {
        errorText,
        loading,
        styles,
        colSpan: columns.length,
        pageLength: page?.length,
        'data-testid': `${testId}-footer`,
    };

    return (
        <Container {...containerProps}>
            <div className={styles.tableWrapper}>
                <BaseTable {...getTableProps()} size="small" className={clsx({ [styles.loadingTableBlur]: loading })}>
                    <TableHead {...tableHeadProps} />
                    <TableBody {...tableBodyProps} />
                    <TableFooter {...tableFooterProps} />
                </BaseTable>
            </div>
        </Container>
    );
}

export type { CellProps, SortingRule } from 'react-table';

export type { Column, Row, TableOptions, FetchDataOptions, TableBaseOptions };
