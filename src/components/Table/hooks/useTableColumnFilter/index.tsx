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

import React, { useMemo } from 'react';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Column, BooleanObject } from '../../types';
import Checkbox from '../../../Checkbox';
import { RadioButton } from '../../../RadioGroup';
import { SELECTION_COLUMN_NAME } from '../../constants';

export interface useTableColumnFilterProps<D extends object> {
    columnDefinitions: Column<D>[];
    disableRowSelect?: boolean;
    disableExpand?: boolean;
    multiSelect?: boolean;
    isItemDisabled?: (item: D) => boolean;
    showColumns: BooleanObject;
}

const useTableColumnFilter = <D extends object>({
    columnDefinitions,
    showColumns,
    disableRowSelect,
    disableExpand,
    multiSelect,
    isItemDisabled,
}: useTableColumnFilterProps<D>) => {
    return useMemo(() => {
        const columnsFiltered: any = columnDefinitions.filter((column: Column<D>) => showColumns[column.id || '']);
        if (!disableExpand) {
            columnsFiltered.unshift({
                id: '_expander_',
                Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
                    <span {...getToggleAllRowsExpandedProps()}>
                        {isAllRowsExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                    </span>
                ),
                Cell: ({ row }: any) =>
                    row.canExpand ? (
                        <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                        </span>
                    ) : null,
            });
        }
        if (!disableRowSelect) {
            columnsFiltered.unshift({
                id: SELECTION_COLUMN_NAME,
                width: 50,
                defaultCanFilter: false,
                disableFilters: true,
                disableGlobalFilter: true,
                Header: (props: any) => {
                    return multiSelect && !isItemDisabled ? (
                        <Checkbox
                            controlId={`${SELECTION_COLUMN_NAME}_all`}
                            ariaLabel="Checkbox to select all row items"
                            {...props.getToggleAllRowsSelectedProps()}
                        />
                    ) : null;
                },
                Cell: ({ row, toggleAllRowsSelected }: any) => {
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
                                    data-testid={row.id}
                                    disabled={isSelectDisabled}
                                    onChange={() => {
                                        toggleAllRowsSelected(false);
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
    }, [columnDefinitions, showColumns, disableRowSelect, disableExpand, multiSelect, isItemDisabled]);
};

export default useTableColumnFilter;
