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
import { Column } from 'react-table';
import Checkbox from '../../../Checkbox';

export interface ColumnsSelectorProps<D extends object> {
    columnDefinitions: Array<Column<D>>;
    styles: {
        verticalGrid: string;
    };
    onShowColumnsChange: (columnId?: string) => void;
    showColumns: {
        [columnId: string]: boolean;
    };
}

export default function ColumnsSelectorProps<D extends object>({
    columnDefinitions,
    styles,
    onShowColumnsChange,
    showColumns,
}: ColumnsSelectorProps<D>) {
    return (
        <div className={styles.verticalGrid}>
            <b>Show columns</b>
            {columnDefinitions
                .filter((c) => typeof c.id != 'undefined')
                .map((c: Column<D>) => (
                    <div key={c.id}>
                        <Checkbox onChange={() => onShowColumnsChange(c.id)} checked={showColumns[c.id!] === true}>
                            {c.Header}
                        </Checkbox>
                    </div>
                ))}
        </div>
    );
}
