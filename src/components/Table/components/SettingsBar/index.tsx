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
import { IconButton } from '@material-ui/core';
import { FirstPage, LastPage, NavigateBefore, NavigateNext, SettingsOutlined } from '@material-ui/icons';
import SettingsPopover from '../SettingsPopover';
import { Row } from 'react-table';

export interface SettingsBarProps<D extends object> {
    pageIndex: number;
    pageSize: number;
    pageSizes: number[];
    page: Row<D>[];
    rowCount: number;
    disablePagination?: boolean;
    disableSettings?: boolean;
    disableGroupBy?: boolean;
    loading?: boolean;
    gotoPage?: (pageIndex: number) => void;
    previousPage?: () => void;
    nextPage?: () => void;
    setPageSize?: (size: number) => void;
    styles: {
        leftSpace: string;
        verticalGrid: string;
    };
    columnsGroupingComponent: ReactNode;
    columnsSelectorComponent: ReactNode;
}

export default function SettingBar<D extends object>({
    pageIndex,
    pageSize,
    pageSizes,
    page,
    loading,
    rowCount,
    disablePagination,
    disableSettings,
    disableGroupBy = false,
    gotoPage = () => {},
    previousPage = () => {},
    nextPage = () => {},
    setPageSize = () => {},
    styles,
    columnsGroupingComponent,
    columnsSelectorComponent,
}: SettingsBarProps<D>) {
    const [settingsAnchor, setSettingsAnchor] = React.useState<HTMLButtonElement | null>(null);
    const handleSettingsClick = (event: React.MouseEvent<any, MouseEvent>) => {
        setSettingsAnchor(event.currentTarget);
    };

    const handleSettingsClose = () => {
        setSettingsAnchor(null);
    };

    const settingsOpen = Boolean(settingsAnchor);
    const settingsId = settingsOpen ? 'settings-popover' : undefined;

    const settingsPopoverProps = {
        pageSize: pageSize || 10,
        pageSizes,
        settingsId,
        loading,
        settingsOpen,
        disableGroupBy,
        gotoPage,
        settingsAnchor,
        handleSettingsClose,
        setPageSize,
        styles,
        columnsGroupingComponent,
        columnsSelectorComponent,
    };

    if (!(disablePagination && disableSettings)) {
        return (
            <div>
                {!disablePagination && (
                    <>
                        <IconButton
                            size={'small'}
                            aria-label="first page"
                            disabled={pageIndex === 0 || loading}
                            onClick={() => gotoPage(0)}
                        >
                            <FirstPage />
                        </IconButton>
                        <IconButton
                            size={'small'}
                            aria-label="previous page"
                            disabled={pageIndex == 0 || loading}
                            onClick={() => previousPage()}
                        >
                            <NavigateBefore />
                        </IconButton>
                        <span>{`${pageIndex! * pageSize! + 1}-${pageIndex! * pageSize! +
                            page.length} of ${rowCount}`}</span>
                        <IconButton
                            aria-label="next page"
                            size={'small'}
                            disabled={pageIndex! * pageSize! + page!.length >= rowCount || loading}
                            onClick={() => nextPage()}
                        >
                            <NavigateNext />
                        </IconButton>
                        <IconButton
                            aria-label="last page"
                            size={'small'}
                            disabled={pageIndex! * pageSize! + page!.length >= rowCount || loading}
                            onClick={() => gotoPage!(Math.floor(rowCount / pageSize!))}
                        >
                            <LastPage />
                        </IconButton>
                    </>
                )}
                {!disableSettings && (
                    <>
                        <IconButton
                            size={'small'}
                            aria-label="settings"
                            className={styles.leftSpace}
                            aria-describedby={settingsId}
                            disabled={loading}
                            onClick={handleSettingsClick}
                        >
                            <SettingsOutlined fontSize={'small'} />
                        </IconButton>
                        {<SettingsPopover {...settingsPopoverProps} />}
                    </>
                )}
            </div>
        );
    }

    return null;
}
