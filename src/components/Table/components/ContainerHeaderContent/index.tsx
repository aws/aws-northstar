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

import React, { ReactNode } from 'react';
import { CircularProgress } from '@material-ui/core';
import Input from '../../../Input';
import clsx from 'clsx';

export interface ContainerHeaderContentProps {
    styles: {
        tableBar: string;
        searchBar: string;
        cellAlign: string;
        loadingSearchBarPadding: string;
        leftSpace: string;
    };
    disableFilters: boolean;
    loading?: boolean;
    onFilterChange?: (value: string) => void;
    settingsBarComponent: ReactNode;
}

export default ({
    loading,
    onFilterChange = () => {},
    styles,
    disableFilters,
    settingsBarComponent,
}: ContainerHeaderContentProps) => {
    return (
        <div className={styles.tableBar}>
            {!disableFilters && (
                <div className={styles.searchBar}>
                    <div id="table-search-label" hidden>
                        Search input to filter table items
                    </div>
                    <Input
                        placeholder="Search"
                        type="search"
                        onChange={onFilterChange}
                        disabled={loading}
                        ariaLabelledby={'table-search-label'}
                    />
                    {loading ? (
                        <div className={clsx(styles.cellAlign, styles.loadingSearchBarPadding)}>
                            <CircularProgress color={'secondary'} size={12} variant={'indeterminate'} />
                        </div>
                    ) : null}
                </div>
            )}
            {settingsBarComponent}
        </div>
    );
};
