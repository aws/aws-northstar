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
import { ReactNode } from 'react';
import {
    Column as ReactTableColumn,
    Row as ReactTableRow,
    SortingRule,
    TableInstance as TableBaseInstance,
    TableState,
    UseExpandedOptions,
    UseExpandedRowProps,
    UseFiltersColumnOptions,
    UseFiltersInstanceProps,
    UseFiltersOptions,
    UseGlobalFiltersColumnOptions,
    UseGlobalFiltersInstanceProps,
    UseGlobalFiltersOptions,
    UseGlobalFiltersState,
    UseGroupByInstanceProps,
    UseGroupByOptions,
    UseGroupByRowProps,
    UsePaginationInstanceProps,
    UsePaginationOptions,
    UsePaginationState,
    UseRowSelectInstanceProps,
    UseRowSelectOptions,
    UseRowSelectRowProps,
    UseRowSelectState,
    UseSortByOptions,
    UseSortByState,
} from 'react-table';

export type Row<D extends object> = ReactTableRow<D> &
    Partial<UseExpandedRowProps<D> & UseRowSelectRowProps<D> & UseGroupByRowProps<D>>;

export type Column<D extends object> = {} & ReactTableColumn<D> &
    Partial<UseFiltersColumnOptions<D> & UseGlobalFiltersColumnOptions<D>>;

export type BooleanObject = { [key: string]: boolean };

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

export interface FetchDataOptions {
    pageSize?: number;
    pageIndex?: number;
    groupBy?: string[];
    showColumns?: string[];
    sortBy?: SortingRule<string>[];
    filterText?: string;
}

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
    /**
     * Describes the columns to be displayed in the table, and how each item is rendered.
     * */
    columnDefinitions: Column<D>[];
    /**
     * The default column filter component
     * */
    defaultColumnFilter?: ReactNode;
    /**
     * The default grouping ids
     * */
    defaultGroups?: string[];
    /**
     * Disable pagination
     * */
    disablePagination?: boolean;
    /**
     * Disable setting toolbar
     * */
    disableSettings?: boolean;
    /**
     * Disable sortBy
     * */
    disableSortBy?: boolean;
    /**
     * Disable search filters */
    disableFilters?: boolean;
    /**
     * Disable column filters
     * */
    disableColumnFilters?: boolean;
    /**
     * Disable expand
     * */
    disableExpand?: boolean;
    /**
     * Disable groupBy
     * */
    disableGroupBy?: boolean;
    /**
     * Disable row select
     * */
    disableRowSelect?: boolean;
    /**
     * The default index of the page that should be displayed
     * */
    defaultPageIndex?: number;
    /**
     * The default number of rows on any given page
     * */
    defaultPageSize?: number;
    /**
     * Indicates the row select is multiselect or not, when disableRowSelect is false
     * */
    multiSelect?: boolean;
    /**
     * Renders the table as being in a loading state.
     * */
    loading?: boolean;
    /**
     * Text to be displayed in case of a data fetching error.
     * */
    errorText?: string;
    /**
     * Triggers when an row/rows are selected or the filters are changed. <br/>
     * The callback argument only includes the rows after taking filters (global filter or column filters) result into account. <br/>
     * See also <i>onSelectedRowIdsChange</i>.
     * */
    onSelectionChange?: (selectedItems: D[]) => void;
    /**
     * The list of available page sizes
     * */
    pageSizes?: number[];
    /**
     * The total number of rows
     * */
    rowCount?: number;
    /**
     * The title of the table
     * */
    tableTitle?: string;
    /**
     * The description of the table
     * */
    tableDescription?: string;
    /**
     * Whether the text in the table cell is wrapped
     * */
    wrapText?: boolean;
    /**
     * The list of ids of the row(s) selected. To support this, you need to have the getRowId set. Otherwise, the index will be used.
     * */
    selectedRowIds?: string[];
    /**
     * Triggers when an row/rows are selected. <br/>
     * Use <b>getRowId</b> to specify how Table constructs each row's underlying <i>id</i> property. <br/>
     * This callback argument includes the rows the users select no matter whether the filters filter out the selections. <br/>
     * See also <i>onSelectionChange</i>.
     **/
    onSelectedRowIdsChange?: (selectedRowIds: string[]) => void;
    /**
     * Handler for updating data when table options (pageSize, pageIndex, filterText) change. <br/>
     * If the handler is not provided, data is processed automatically.
     * */
    onFetchData?: ((options: FetchDataOptions) => void) | null;
    /**
     * Instruct how Table constructs each row's underlying <i>id</i> property. Must be <b>memoized</b>.
     * */
    getRowId?: (originalRow: D, relativeIndex: number) => string;
    /**
     * Instruct how Table detects subrows. Must be <b>memoized</b>.
     * */
    getSubRows?: (originalRow: D, relativeIndex: number) => D[];
    /**
     * The initial columns to sort by
     * */
    sortBy?: SortingRule<string>[];
    /**
     * Determines whether a given item is disabled. If an item is disabled, the user can't select it.
     * */
    isItemDisabled?: (item: D) => boolean;
}

export type TableInstance<D extends object> = {} & TableBaseInstance<D> &
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
