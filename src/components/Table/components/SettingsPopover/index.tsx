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
import { Divider, Grid, Popover } from '@material-ui/core';
import Container from '../../../../layouts/Container';
import ButtonDropdown from '../../../ButtonDropdown';

export interface SettingsPopoverProps {
    pageSize: number;
    pageSizes: number[];
    settingsId?: string;
    settingsOpen: boolean;
    disableGroupBy: boolean;
    gotoPage: (page: number) => void;
    settingsAnchor?: Element | ((element: Element) => Element) | null;
    handleSettingsClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void;
    setPageSize: (size: number) => void;
    styles: {
        verticalGrid: string;
    };
    columnsGroupingComponent: ReactNode;
    columnsSelectorComponent: ReactNode;
}

export default ({
    pageSize,
    pageSizes,
    settingsId,
    settingsOpen,
    disableGroupBy,
    gotoPage,
    settingsAnchor,
    handleSettingsClose,
    setPageSize,
    styles,
    columnsGroupingComponent,
    columnsSelectorComponent,
}: SettingsPopoverProps) => (
    <Popover
        id={settingsId}
        open={settingsOpen}
        anchorEl={settingsAnchor}
        onClose={handleSettingsClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
    >
        <Container title={'Settings'} style={{ marginBottom: 0 }}>
            <Grid container spacing={2}>
                <Grid item>
                    <div className={styles.verticalGrid}>
                        <b>Page size</b>
                        <ButtonDropdown
                            content={pageSize}
                            items={pageSizes.map((pageSize) => {
                                return {
                                    text: pageSize,
                                    onClick: (e) => {
                                        setPageSize(Number(Number(e.target.textContent)));
                                        gotoPage(0);
                                    },
                                };
                            })}
                        />
                    </div>
                </Grid>
                {disableGroupBy ? null : (
                    <>
                        <Grid item>
                            <Divider orientation={'vertical'} />
                        </Grid>
                        <Grid item>{columnsGroupingComponent}</Grid>
                    </>
                )}
                <>
                    <Grid item>
                        <Divider orientation={'vertical'} />
                    </Grid>
                    <Grid item>{columnsSelectorComponent}</Grid>
                </>
            </Grid>
        </Container>
    </Popover>
);
