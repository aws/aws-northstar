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
import { CircularProgress, TableCell, TableFooter as BaseTableFooter, TableRow } from '@material-ui/core';
import { Row } from 'react-table';
import Text from '../../../Text';

export interface TableFooterProps<D extends object> {
    loading?: boolean;
    styles: {
        footerCell: string;
        cellAlign: string;
        leftSpace: string;
    };
    colSpan: number;
    pageLength?: number;
    errorText?: string;
}

export default function TableFooter<D extends object>({
    errorText,
    loading = false,
    styles,
    colSpan,
    pageLength = 0,
}: TableFooterProps<D>) {
    if (pageLength == 0) {
        return (
            <BaseTableFooter>
                <TableRow>
                    <TableCell className={styles.footerCell} colSpan={colSpan}>
                        {!loading ? (
                            <>
                                {errorText ? (
                                    <Text variant="span" color="error">
                                        {errorText}
                                    </Text>
                                ) : (
                                    <Text>No records found</Text>
                                )}
                            </>
                        ) : (
                            <div className={styles.cellAlign}>
                                <CircularProgress color={'secondary'} size={16} variant={'indeterminate'} />
                                <span className={styles.leftSpace}>Loading...</span>
                            </div>
                        )}
                    </TableCell>
                </TableRow>
            </BaseTableFooter>
        );
    }

    return null;
}
