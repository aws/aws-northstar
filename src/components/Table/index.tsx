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

import React, { ReactNode, useMemo, useEffect, useState, useRef } from 'react';
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
import matchSorter from 'match-sorter';
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
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';

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
        backgroundColor: theme.palette.background.paper,
        marginRight: '10px',
    },
    leftSpace: {
        marginLeft: '10px',
    },
    tableHeadRow: {
        borderTop: 0,
    },
    cellAlign: {
        display: 'inline-flex !important',
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
    columnDefinitions: Array<Column<D>>;
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
}

interface FilterProps {
    _all_?: string;
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
        UsePaginationOptions<D> &
            UseRowSelectInstanceProps<D> &
            UsePaginationInstanceProps<D> &
            UseFiltersInstanceProps<D> &
            UseGroupByInstanceProps<D>
    > &
    Partial<{
        state: Partial<TableState & UsePaginationState<D> & UseSortByState<D> & UseRowSelectState<D>>;
    }> &
    Partial<{ selectedFlatRows: Row<D>[] }>;

/** A table presents data in a two-dimensional format, arranged in columns and rows in a rectangular form. */
export default function Table<D extends object>({
    actionGroup = null,
    columnDefinitions = [],
    defaultGroups = [],
    defaultPageIndex = 0,
    defaultPageSize = 10,
    disableGroupBy = true,
    disablePagination = false,
    disableSettings = false,
    disableSortBy = false,
    disableFilters = false,
    disableRowSelect = false,
    items = [],
    loading = false,
    onSelectionChange = () => {},
    onFetchData = null,
    pageSizes = [10, 25, 50],
    tableDescription,
    tableTitle = '',
    wrapText = true,
    selectedRowIds = [],
    multiSelect = true,
    getRowId,
    sortBy: defaultSortBy = [],
    errorText,
    ...props
}: TableBaseOptions<D>) {
    const styles = useStyles({});
    const [groupBy, setGroupBy] = useState(
        defaultGroups.reduce((map: { [key: string]: boolean }, id: string) => {
            map[id] = true;
            return map;
        }, {})
    );
    const [showColumns, setShowColumns] = useState<{ [key: string]: boolean }>(
        columnDefinitions
            .map((column: Column<D>) => column.id || '')
            .reduce((map: { [key: string]: boolean }, id: string) => {
                map[id] = true;
                return map;
            }, {})
    );
    const [filterInput, setFilterInput] = useState<FilterProps>({ _all_: undefined });

    const columns = useMemo(() => {
        const columnsFiltered = columnDefinitions.filter((column: Column<D>) => showColumns[column.id || '']);
        if (!disableRowSelect) {
            columnsFiltered.unshift({
                id: '_selection_',
                width: 50,
                Header: (props: any) => {
                    return multiSelect ? (
                        <Checkbox
                            ariaLabel="Checkbox to select all row items"
                            {...props.getToggleAllRowsSelectedProps()}
                        />
                    ) : null;
                },
                Cell: (props: any) => {
                    const { row } = props;
                    return (
                        <div>
                            {multiSelect ? (
                                <Checkbox
                                    ariaLabel="Checkbox to select row item"
                                    {...row.getToggleRowSelectedProps()}
                                />
                            ) : (
                                <RadioButton
                                    name="select"
                                    checked={row.isSelected}
                                    onChange={() => {
                                        /** React Table does not support Radio Button natively. 
                                         A solution is to toggle all the row off and then toggle the current row on to ensure only current row is selected.
                                         However, due the desynchronization of the toggleAllRowsSelected, 
                                         if we do not wait a certian time, the solution does not work. 
                                         The issue should be related to this Github issue https://github.com/tannerlinsley/react-table/issues/2170
                                         Once it is address we can remove the setTimeout */
                                        props.toggleAllRowsSelected(false);
                                        setTimeout(() => {
                                            row.toggleRowSelected(true);
                                        }, 100);
                                    }}
                                />
                            )}
                        </div>
                    );
                },
            });
        }

        if (!disableFilters) {
            columnsFiltered.push({
                id: '_all_',
                // @ts-ignore
                show: false,
                // @ts-ignore
                filter: (rows: readonly Row[], id: string, filterValue: string) => {
                    return matchSorter(rows, filterValue, {
                        keys: columnDefinitions.map((c: { id?: string }) => `values.${c.id}`),
                        threshold: matchSorter.rankings.WORD_STARTS_WITH,
                    });
                },
            });
        }
        return columnsFiltered;
    }, [columnDefinitions, showColumns]);

    const rowCount = useMemo(() => {
        if (typeof props.rowCount === 'undefined') {
            return items ? items.length : 0;
        }

        return props.rowCount;
    }, [items, props.rowCount]);

    const selectedRowIdMap = useMemo(() => {
        const map: any = {};
        selectedRowIds.forEach((id) => {
            map[id] = true;
        });
        return map;
    }, [selectedRowIds]);

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
                pageSize: defaultPageSize,
                selectedRowIds: selectedRowIdMap,
                sortBy: defaultSortBy,
                groupBy: defaultGroups,
            },
            getRowId,
            disableSortBy,
            disableGroupBy,
            disableFilters,
            defaultCanFilter: true,
            manualFilters: onFetchData != null,
            manualPagination: onFetchData != null,
            manualSorting: onFetchData != null,
            manualSortBy: onFetchData != null,
            autoResetSortBy: onFetchData === null,
            autoResetPage: onFetchData === null,
            autoResetSelectedRows: onFetchData === null,
        }),
        [items, columns, groupBy, filterInput]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        selectedFlatRows,
        setFilter,
        toggleGroupBy,
        state: { pageIndex, pageSize, sortBy },
    }: TableInstance<D> = useTable(
        tableOpts,
        useBlockLayout,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        useRowSelect,
        usePagination,
        useResizeColumns
    );

    const handleFilterChangeDebounce = debounce((value: string) => {
        setFilterInput({ _all_: value });
        setFilter!('_all_', value);
    }, 250);

    const handleFilterChange = (value: string) => {
        handleFilterChangeDebounce(value);
    };

    const handleShowColumnsChange = (headerId: IdType<string> | string | undefined) => {
        if (!headerId) {
            return;
        }

        const showColumnsCopy: any = { ...showColumns };

        if (showColumnsCopy[headerId]) {
            delete showColumnsCopy[headerId];
        } else {
            showColumnsCopy[headerId] = true;
        }

        setShowColumns(showColumnsCopy);
    };

    const onGroupChange = (headerId: IdType<string> | string | undefined) => {
        if (!headerId) {
            return;
        }

        const groupByCopy: any = { ...groupBy };

        if (groupByCopy[headerId]) {
            delete groupByCopy[headerId];
        } else {
            groupByCopy[headerId] = true;
        }

        setGroupBy(groupByCopy);
        toggleGroupBy!(headerId);
    };

    const previousSelectedFlatRows = useRef<D[]>();

    const onSelectionChangeDebounce = debounce(
        (selectedFlatRows: Row<D>[]) => {
            const selected = selectedFlatRows
                .filter((row: Row<D> & Partial<UseGroupByRowProps<D>>) => !row.isGrouped)
                .map((row: Row<D>) => row.original);
            if (previousSelectedFlatRows.current) {
                if (!isEqual(previousSelectedFlatRows.current, selected)) {
                    onSelectionChange(selected);
                    previousSelectedFlatRows.current = selected;
                }
            } else {
                onSelectionChange(selected);
                previousSelectedFlatRows.current = selected;
            }
        },
        250,
        { maxWait: 1000 }
    );

    useEffect(() => {
        if (selectedFlatRows) {
            onSelectionChangeDebounce(selectedFlatRows);
        }
    }, [selectedFlatRows]);

    const flattenGroupBy = () => Object.keys(groupBy).filter((key) => groupBy[key]);

    const flattenShowColumns = () => Object.keys(showColumns).filter((key) => showColumns[key]);

    useEffect(() => {
        if (onFetchData) {
            onFetchData({
                pageSize: pageSize || 0,
                pageIndex: pageIndex || 0,
                sortBy: sortBy || [],
                groupBy: flattenGroupBy(),
                showColumns: flattenShowColumns(),
                filterText: filterInput._all_ || '',
            });
        }
    }, [onFetchData, pageIndex, pageSize, filterInput, sortBy, groupBy, showColumns]);

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

    const settingsBarProps = {
        pageIndex: pageIndex || 0,
        pageSize: pageSize || 10,
        pageSizes: pageSizes || [10, 25, 50],
        pageLength: (page || []).length,
        rowCount,
        loading,
        disablePagination,
        disableSettings,
        disableGroupBy,
        gotoPage,
        previousPage,
        nextPage,
        setPageSize,
        styles,
        columnsGroupingComponent: <ColumnsGrouping {...columnsGroupingProps} />,
        columnsSelectorComponent: <ColumnsSelector {...columnsSelectorProps} />,
    };

    const containerHeaderContentProps: ContainerHeaderContentProps = {
        disableFilters,
        loading,
        onFilterChange: handleFilterChange,
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
                <BaseTable {...getTableProps()} size="small" className={loading ? styles.loadingTableBlur : ''}>
                    <TableHead {...tableHeadProps} />
                    <TableBody {...tableBodyProps} />
                    <TableFooter {...tableFooterProps} />
                </BaseTable>
            </div>
        </Container>
    );
}
