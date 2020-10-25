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

import { TableBody as BaseTableBody, TableCell, TableRow } from '@material-ui/core';
import {
    Cell,
    Row,
    TableBodyProps as ReactTableBodyProps,
    UseExpandedRowProps,
    UseRowSelectRowProps,
    UseGroupByRowProps,
    UseGroupByCellProps,
} from 'react-table';
import { KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';

export interface TableBodyProps<D extends object> {
    reactTableBodyProps: ReactTableBodyProps;
    page: Row<D>[];
    wrapText?: boolean;
    prepareRow: (row: Row<D>) => void;
    styles: {
        cellAlign: string;
        ellipsizeText: string;
        aggregated: string;
    };
}

export default function TableBody<D extends object>({
    page,
    prepareRow,
    wrapText = true,
    reactTableBodyProps,
    styles,
}: TableBodyProps<D>) {
    return (
        <BaseTableBody {...reactTableBodyProps}>
            {page!
                .map((row: Row<D>) => {
                    prepareRow(row);
                    return row;
                })
                .map(
                    (
                        row: Row<D> & Partial<UseExpandedRowProps<D> & UseRowSelectRowProps<D> & UseGroupByRowProps<D>>
                    ) => (
                        <TableRow
                            selected={row.isSelected}
                            {...row.getRowProps()}
                            className={row.isGrouped ? styles.aggregated : ''}
                        >
                            {row.cells.map((cell: Partial<Cell<D> & UseGroupByCellProps<D>>) => {
                                return (
                                    <TableCell {...cell.getCellProps!()}>
                                        {cell.isGrouped ? (
                                            <div className={styles.cellAlign}>
                                                <span className={!wrapText ? styles.ellipsizeText : ''}>
                                                    <b>
                                                        {cell.render!('Cell')} (
                                                        {cell.render!('Aggregated', { count: true })})
                                                    </b>
                                                </span>
                                                {row.isExpanded ? (
                                                    <KeyboardArrowDown {...row.getToggleRowExpandedProps!()} />
                                                ) : (
                                                    <KeyboardArrowRight {...row.getToggleRowExpandedProps!()} />
                                                )}
                                            </div>
                                        ) : cell.isAggregated ? (
                                            // If the cell is aggregated, use the Aggregated
                                            // renderer for cell
                                            <div className={wrapText ? '' : styles.ellipsizeText}>
                                                {cell!.render!('Aggregated')}
                                            </div>
                                        ) : (
                                            // For cells with repeated values, render null
                                            // Otherwise, just render the regular cell
                                            <div className={wrapText ? '' : styles.ellipsizeText}>
                                                {cell!.render!('Cell')}
                                            </div>
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    )
                )}
        </BaseTableBody>
    );
}
