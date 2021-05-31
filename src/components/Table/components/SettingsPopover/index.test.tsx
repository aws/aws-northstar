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
import { fireEvent, render } from '@testing-library/react';
import SettingsPopover from '.';
import { debug } from 'webpack';

describe('SettingsPopover', () => {
    const pageSize = 10;
    const pageSizes = [10, 25, 50];
    const settingsId = 'settingsId';
    const columnsGroupingComponent = <div>ColumnGroupingComponent</div>;
    const columnsSelectorComponent = <div>ColumnSelectorComponent</div>;
    const anchorElement = document.createElement('button');
    const styles = {
        verticalGrid: 'verticalGrid',
    };

    it('should hide if settingsOpen is false', () => {
        const { queryAllByText } = render(
            <SettingsPopover
                settingsOpen={false}
                settingsId={settingsId}
                settingsAnchor={anchorElement}
                pageSize={pageSize}
                pageSizes={pageSizes}
                columnsGroupingComponent={columnsGroupingComponent}
                columnsSelectorComponent={columnsSelectorComponent}
                styles={styles}
                disableGroupBy={false}
            />
        );

        expect(queryAllByText('Settings')).toHaveLength(0);
    });

    it('should render the settings popover if settingsOpen is true', () => {
        const { getByText } = render(
            <SettingsPopover
                settingsOpen={true}
                settingsId={settingsId}
                settingsAnchor={anchorElement}
                pageSize={pageSize}
                pageSizes={pageSizes}
                columnsGroupingComponent={columnsGroupingComponent}
                columnsSelectorComponent={columnsSelectorComponent}
                styles={styles}
                disableGroupBy={false}
            />
        );

        expect(getByText('Settings')).toBeVisible();
        expect(getByText('ColumnGroupingComponent')).toBeVisible();
        expect(getByText('ColumnSelectorComponent')).toBeVisible();
    });

    it('should hide the column grouping component if disableGroupBy is true', () => {
        const { getByText, queryByText } = render(
            <SettingsPopover
                settingsOpen={true}
                settingsId={settingsId}
                settingsAnchor={anchorElement}
                pageSize={pageSize}
                pageSizes={pageSizes}
                columnsGroupingComponent={columnsGroupingComponent}
                columnsSelectorComponent={columnsSelectorComponent}
                styles={styles}
                disableGroupBy={true}
            />
        );

        expect(getByText('Settings')).toBeVisible();
        expect(queryByText('ColumnGroupingComponent')).toBeNull();
    });

    it('should render page size selector', () => {
        const mockSetPageSize = jest.fn();
        const mockGoToPage = jest.fn();

        const { getAllByText, getByRole } = render(
            <SettingsPopover
                settingsOpen={true}
                settingsId={settingsId}
                settingsAnchor={anchorElement}
                pageSize={pageSize}
                pageSizes={pageSizes}
                columnsGroupingComponent={columnsGroupingComponent}
                columnsSelectorComponent={columnsSelectorComponent}
                styles={styles}
                disableGroupBy={true}
                setPageSize={mockSetPageSize}
                gotoPage={mockGoToPage}
            />
        );

        const dropdown = getAllByText('10')[0];
        fireEvent.click(dropdown);

        const menu = getByRole('menu');
        const menuItems = menu.querySelectorAll('li');
        expect(menuItems).toHaveLength(3);

        fireEvent.click(menuItems[2]);
        expect(mockSetPageSize).toHaveBeenCalledWith(50);
        expect(mockGoToPage).toHaveBeenCalledWith(0);
    });
});
