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

import React, { ReactNode, useMemo, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    Column,
    IdType,
    Row,
    SortingRule,
    TableInstance as TableBaseInstance,
    TableState,
    useBlockLayout,
    useExpanded,
    UseExpandedOptions,
    useFilters,
    UseFiltersInstanceProps,
    UseFiltersOptions,
    useGlobalFilter,
    UseGlobalFiltersState,
    UseGlobalFiltersInstanceProps,
    UseGlobalFiltersOptions,
    useGroupBy,
    UseGroupByInstanceProps,
    UseGroupByOptions,
    UseGroupByRowProps,
    usePagination,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    useResizeColumns,
    useRowSelect,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectState,
    useSortBy,
    UseSortByOptions,
    UseSortByState,
    useTable,
    UseTableOptions,
} from 'react-table';
import { makeStyles, Table as BaseTable } from '@material-ui/core';
import Container from '../../layouts/Container';
import Checkbox from '../Checkbox';
import ContainerHeaderContent, { ContainerHeaderContentProps } from './components/ContainerHeaderContent';
import TableHead from './components/TableHead';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';
import SettingsBar from './components/SettingsBar';
import ColumnsSelector from './components/ColumnsSelector';
import ColumnsGrouping from './components/ColumnsGrouping';
import { RadioButton } from '../RadioGroup';
import { useDebouncedCallback } from 'use-debounce';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_SIZES = [10, 25, 50];
const DEFAULT_DEBOUNCE_TIMER = 250;

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

export interface TableOptions<D extends object>
    extends UseExpandedOptions<D>,
        UseRowSelectOptions<D>,
        UseFiltersOptions<D>,
        UseGlobalFiltersOptions<D>,
        UseGroupByOptions<D>,
        UseSortByOptions<D>,
        UseFiltersOptions<D>,
        UsePaginationOptions<D>,
        Record<string, any> {}

export interface TableBaseOptions<D extends object> {
    /**
     * The actions displayed on the top right corner.
     */
    actionGroup?: ReactNode;
    /**
     * The items serve as data source for table rows. The display of a row is handled by the column definition in the columnDefinitions property. <br/>
     * Remark: if you want to change the set of items make sure you provide a new array. Any modification to the same array will not be reflected in the view.
     */
    items?: D[] | null;
    /** Describes the columns to be displayed in the table, and how each item is rendered. */
    columnDefinitions: Column<D>[];
    /** The default grouping ids */
    defaultGroups?: string[];
    /** Disable pagination */
    disablePagination?: boolean;
    /** Disable setting toolbar */
    disableSettings?: boolean;
    /** Disable sortBy */
    disableSortBy?: boolean;
    /** Disable filters */
    disableFilters?: boolean;
    /** Disable groupBy */
    disableGroupBy?: boolean;
    /** Disable row select */
    disableRowSelect?: boolean;
    /** The default index of the page that should be displayed */
    defaultPageIndex?: number;
    /** The default number of rows on any given page */
    defaultPageSize?: number;
    /** Indicates the row select is multiselect or not, when disableRowSelect is false */
    multiSelect?: boolean;
    /** Renders the table as being in a loading state. */
    loading?: boolean;
    /** Text to be displayed in case of a data fetching error.*/
    errorText?: string;
    /** Triggers when an row/rows are selected */
    onSelectionChange?: (selectedItems: D[]) => void;
    /** The list of available page sizes */
    pageSizes?: number[];
    /** The total number of rows */
    rowCount?: number;
    /** The title of the table */
    tableTitle?: string;
    /** The description of the table */
    tableDescription?: string;
    /** Whether the text in the table cell is wrapped */
    wrapText?: boolean;
    /** The list of ids of the row(s) selected. To support this, you need to have the getRowId set. Otherwise, the index will be used. */
    selectedRowIds?: string[];
    /**
     * Handler for updating data when table options (pageSize, pageIndex, filterText) change. <br/>
     * If the handler is not provided, data is processed automatically.
     * */
    onFetchData?: ((options: FetchDataOptions) => void) | null;
    /** Returns the id of each row if it is not 'id' */
    getRowId?: (originalRow: D, relativeIndex: number) => string;
    /** The initial columns to sort by */
    sortBy?: SortingRule<string>[];
    /** Determines whether a given item is disabled. If an item is disabled, the user can't select it. */
    isItemDisabled?: (item: D) => boolean;
}

export interface FetchDataOptions {
    pageSize?: number;
    pageIndex?: number;
    groupBy?: string[];
    showColumns?: string[];
    sortBy?: SortingRule<string>[];
    filterText?: string;
}

type TableInstance<D extends object> = {} & TableBaseInstance<D> &
    Partial<
        UsePaginationInstanceProps<D> &
            UseRowSelectInstanceProps<D> &
            UseFiltersInstanceProps<D> &
            UseGlobalFiltersInstanceProps<D> &
            UseGroupByInstanceProps<D>
    > &
    Partial<{
        state: Partial<
            TableState & UsePaginationState<D> & UseSortByState<D> & UseRowSelectState<D> & UseGlobalFiltersState<D>
        >;
    }> &
    Partial<{ selectedFlatRows: Row<D>[] }>;

type BooleanObject = { [key: string]: boolean };

const convertArrayToBooleanObject = (arr: string[]): BooleanObject =>
    arr.reduce((map, id) => ({ ...map, [id]: true }), {});

/** A table presents data in a two-dimensional format, arranged in columns and rows in a rectangular form. */
export default function Table<D extends object>({
    actionGroup = null,
    columnDefinitions = [],
    defaultGroups = [],
    defaultPageIndex = 0,
    defaultPageSize = DEFAULT_PAGE_SIZE,
    disableGroupBy = true,
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
    selectedRowIds = [],
    multiSelect = true,
    getRowId,
    isItemDisabled,
    sortBy: defaultSortBy = [],
    errorText,
    ...props
}: TableBaseOptions<D>) {
    const styles = useStyles({});
    const [groupBy, setGroupBy] = useState(convertArrayToBooleanObject(defaultGroups));
    const [showColumns, setShowColumns] = useState(
        convertArrayToBooleanObject(columnDefinitions.map((column: Column<D>) => column.id || ''))
    );

    const [controlledPageSize, setControlledPageSize] = useState(defaultPageSize);

    const columns = useMemo(() => {
        const columnsFiltered = columnDefinitions.filter((column: Column<D>) => showColumns[column.id || '']);
        if (!disableRowSelect) {
            columnsFiltered.unshift({
                id: '_selection_',
                width: 50,
                Header: (props: any) => {
                    return multiSelect && !isItemDisabled ? (
                        <Checkbox
                            ariaLabel="Checkbox to select all row items"
                            {...props.getToggleAllRowsSelectedProps()}
                        />
                    ) : null;
                },
                Cell: (props: any) => {
                    const { row } = props;
                    const isSelectDisabled = !!isItemDisabled?.(row.original);
                    return (
                        <div>
                            {multiSelect ? (
                                <Checkbox
                                    ariaLabel="Checkbox to select row item"
                                    {...row.getToggleRowSelectedProps()}
                                    disabled={isSelectDisabled}
                                    controlId={row.id}
                                />
                            ) : (
                                <RadioButton
                                    name="select"
                                    checked={row.isSelected}
                                    controlId={row.id}
                                    disabled={isSelectDisabled}
                                    onChange={() => {
                                        props.toggleAllRowsSelected(false);
                                        row.toggleRowSelected(true);
                                    }}
                                />
                            )}
                        </div>
                    );
                },
            });
        }

        return columnsFiltered;
    }, [columnDefinitions, showColumns, disableRowSelect, multiSelect, isItemDisabled]);

    const rowCount = useMemo(() => {
        if (typeof props.rowCount === 'undefined') {
            return items?.length || 0;
        }

        return props.rowCount;
    }, [items, props.rowCount]);

    const selectedRowIdMap = useMemo(() => {
        return convertArrayToBooleanObject(selectedRowIds);
    }, [selectedRowIds]);

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
            disableSortBy,
            disableGroupBy,
            disableFilters,
            defaultCanFilter: true,
            manualFilters: onFetchData != null,
            manualPagination: onFetchData != null,
            manualSorting: onFetchData != null,
            manualSortBy: onFetchData != null,
            manualGlobalFilter: onFetchData != null,
            autoResetSortBy: onFetchData === null,
            autoResetPage: onFetchData === null,
            autoResetSelectedRows: onFetchData === null,
            autoResetGlobalFilter: onFetchData === null,
        }),
        [
            items,
            columns,
            pageCount,
            controlledPageSize,
            defaultGroups,
            defaultPageIndex,
            defaultSortBy,
            disableFilters,
            disableGroupBy,
            disableSortBy,
            getRowId,
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
        state: { pageIndex, pageSize, sortBy, globalFilter },
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
    };

    const tableHeadProps = {
        headerGroups,
        styles,
    };

    const tableBodyProps = {
        reactTableBodyProps: getTableBodyProps(),
        page: page || [],
        wrapText,
        prepareRow,
        styles,
    };

    const tableFooterProps = {
        errorText,
        loading,
        styles,
        colSpan: columns.length,
        pageLength: page?.length,
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

export type { Column };
