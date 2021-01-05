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
import { render, fireEvent, act } from '@testing-library/react';
import SettingsBar from '.';

const styles = {
    leftSpace: 'leftSpace',
    verticalGrid: 'verticalGrid',
};

describe('SettingsBar', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders SettingsBar', () => {
        const { getByText, getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                rowCount={120}
                styles={styles}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        expect(getByText('11-20 of 120')).toBeVisible();
        expect(getByTestId('first-page')).toBeVisible();
        expect(getByTestId('previous-page')).toBeVisible();
        expect(getByTestId('next-page')).toBeVisible();
        expect(getByTestId('last-page')).toBeVisible();
        expect(getByTestId('settings')).toBeVisible();
    });

    it('renders SettingsBar for the last page', () => {
        const { getByText, getByTestId, debug } = render(
            <SettingsBar
                pageIndex={4}
                pageSize={25}
                pageSizes={[10, 25, 100]}
                pageLength={20}
                rowCount={120}
                styles={styles}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        expect(getByText('101-120 of 120')).toBeVisible();

        expect(getByTestId('next-page')).toHaveAttribute('disabled');
        expect(getByTestId('last-page')).toHaveAttribute('disabled');
    });

    it('renders SettingsBar for the first page', () => {
        const { getByText, getByTestId, debug } = render(
            <SettingsBar
                pageIndex={0}
                pageSize={100}
                pageSizes={[10, 25, 100]}
                pageLength={100}
                rowCount={120}
                styles={styles}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        expect(getByText('1-100 of 120')).toBeVisible();

        expect(getByTestId('first-page')).toHaveAttribute('disabled');
        expect(getByTestId('previous-page')).toHaveAttribute('disabled');
    });

    it('should not render SettingsBar when disablePagination and disableSettings is true', () => {
        const { container } = render(
            <SettingsBar
                pageIndex={0}
                pageSize={100}
                pageSizes={[10, 25, 100]}
                pageLength={100}
                rowCount={120}
                styles={styles}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
                disablePagination={true}
                disableSettings={true}
            />
        );

        expect(container.childElementCount).toBe(0);
    });

    it('should not render Settings icon when disableSettings is true', () => {
        const { getByTestId, queryByTestId } = render(
            <SettingsBar
                pageIndex={0}
                pageSize={100}
                pageSizes={[10, 25, 100]}
                pageLength={100}
                rowCount={120}
                styles={styles}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
                disableSettings={true}
            />
        );

        expect(getByTestId('first-page')).toBeVisible();
        expect(getByTestId('previous-page')).toBeVisible();
        expect(getByTestId('next-page')).toBeVisible();
        expect(getByTestId('last-page')).toBeVisible();
        expect(queryByTestId('settings')).toBeNull();
    });

    it('should not render pagination icons when disablePagination is true', () => {
        const { getByTestId, queryByTestId } = render(
            <SettingsBar
                pageIndex={0}
                pageSize={100}
                pageSizes={[10, 25, 100]}
                pageLength={100}
                rowCount={120}
                styles={styles}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
                disablePagination={true}
            />
        );

        expect(queryByTestId('first-page')).toBeNull();
        expect(queryByTestId('previous-page')).toBeNull();
        expect(queryByTestId('next-page')).toBeNull();
        expect(queryByTestId('last-page')).toBeNull();
        expect(getByTestId('settings')).toBeVisible();
    });

    it('should trigger gotoPage event when first page icon is clicked', () => {
        const handleGoToPage = jest.fn();
        const { getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                rowCount={120}
                styles={styles}
                gotoPage={handleGoToPage}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        act(() => {
            fireEvent.click(getByTestId('first-page'));
        });

        expect(handleGoToPage).toHaveBeenCalledWith(0);
    });

    it('should trigger gotoPage event when last page icon is clicked', () => {
        const handleGoToPage = jest.fn();
        const { getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                rowCount={120}
                styles={styles}
                gotoPage={handleGoToPage}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        act(() => {
            fireEvent.click(getByTestId('last-page'));
        });

        expect(handleGoToPage).toHaveBeenCalledWith(11);
    });

    it('should trigger gotoPage event when last page icon is clicked', () => {
        const handleGoToPage = jest.fn();
        const { getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={11}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                rowCount={120}
                styles={styles}
                gotoPage={handleGoToPage}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        act(() => {
            fireEvent.click(getByTestId('last-page'));
        });

        expect(handleGoToPage).toHaveBeenCalledWith(10);
    });

    it('should trigger nextPage event when next page icon is clicked', () => {
        const handleNextPage = jest.fn();
        const { getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                rowCount={120}
                styles={styles}
                nextPage={handleNextPage}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        act(() => {
            fireEvent.click(getByTestId('next-page'));
        });

        expect(handleNextPage).toHaveBeenCalled();
    });

    it('should trigger previousPage event when previous page icon is clicked', () => {
        const handlePreviousPage = jest.fn();
        const { getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                rowCount={120}
                styles={styles}
                previousPage={handlePreviousPage}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        act(() => {
            fireEvent.click(getByTestId('previous-page'));
        });

        expect(handlePreviousPage).toHaveBeenCalled();
    });

    it('should render SettingsPopover when settings icon is clicked', () => {
        const { getByTestId, getByText, queryByText } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                rowCount={120}
                styles={styles}
                columnsGroupingComponent={<div data-testid="columnsGroupingComponent" />}
                columnsSelectorComponent={<div data-testid="columnsSelectorComponent" />}
            />
        );

        expect(queryByText('Settings')).toBeNull();

        act(() => {
            fireEvent.click(getByTestId('settings'));
        });

        expect(getByText('Settings')).toBeVisible();
    });
});
