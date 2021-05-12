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

import { TableHead as BaseTableHead, TableCell, TableRow, TableSortLabel } from '@material-ui/core';
import { Column, ColumnInstance, HeaderGroup, UseSortByColumnProps, UseResizeColumnsColumnProps } from 'react-table';
import { ArrowDropDown } from '@material-ui/icons';

export interface TableHeadProps<D extends object> {
    headerGroups: HeaderGroup<D>[];
    styles: {
        cellAlign: string;
        tableHeadRow: string;
        resizer: string;
    };
}

export default function TableHead<D extends object>({ headerGroups, styles }: TableHeadProps<D>) {
    return (
        <BaseTableHead>
            {headerGroups.map((headerGroup: HeaderGroup<D>) => (
                <TableRow {...headerGroup.getHeaderGroupProps()} className={styles.tableHeadRow}>
                    {headerGroup.headers.map(
                        (
                            column: Partial<
                                ColumnInstance<D> & Column<D> & UseSortByColumnProps<D> & UseResizeColumnsColumnProps<D>
                            >
                        ) =>
                            column.id !== '_all_' && (
                                <TableCell {...column.getHeaderProps!()}>
                                    <div>
                                        {column.canSort ? (
                                            <TableSortLabel
                                                {...column.getSortByToggleProps!()}
                                                active={column.isSorted}
                                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                                                IconComponent={ArrowDropDown}
                                                className={styles.cellAlign}
                                            >
                                                <span>{column.render?.('Header')}</span>
                                            </TableSortLabel>
                                        ) : (
                                            <span>{column.render?.('Header')}</span>
                                        )}
                                        <div {...column.getResizerProps!()} className={styles.resizer} />
                                    </div>
                                </TableCell>
                            )
                    )}
                </TableRow>
            ))}
        </BaseTableHead>
    );
}
