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

const commonProps = {
    styles,
    columnsGroupingComponent: <div data-testid="columnsGroupingComponent" />,
    columnsSelectorComponent: <div data-testid="columnsSelectorComponent" />,
    rowCount: 120,
    totalCount: 120,
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
                canNextPage={true}
                canPreviousPage={true}
                {...commonProps}
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
        const { getByText, getByTestId } = render(
            <SettingsBar
                pageIndex={4}
                pageSize={25}
                pageSizes={[10, 25, 100]}
                pageLength={20}
                canNextPage={false}
                canPreviousPage={true}
                {...commonProps}
            />
        );

        expect(getByText('101-120 of 120')).toBeVisible();

        expect(getByTestId('next-page')).toHaveAttribute('disabled');
        expect(getByTestId('last-page')).toHaveAttribute('disabled');
    });

    it('renders SettingsBar when there is 0 row filtered out', () => {
        const { getByText } = render(
            <SettingsBar
                pageIndex={0}
                pageSize={25}
                pageSizes={[10, 25, 100]}
                pageLength={20}
                canNextPage={false}
                canPreviousPage={false}
                {...commonProps}
                rowCount={0}
                totalCount={0}
            />
        );

        expect(getByText('0-0 of 0')).toBeVisible();
    });

    it('renders SettingsBar for the first page', () => {
        const { getByText, getByTestId } = render(
            <SettingsBar
                pageIndex={0}
                pageSize={100}
                pageSizes={[10, 25, 100]}
                pageLength={100}
                canNextPage={true}
                canPreviousPage={false}
                {...commonProps}
                totalCount={130}
                rowCount={130}
            />
        );

        expect(getByText('1-100 of 130')).toBeVisible();

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
                canNextPage={true}
                canPreviousPage={true}
                disablePagination={true}
                disableSettings={true}
                {...commonProps}
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
                canNextPage={true}
                canPreviousPage={true}
                disableSettings={true}
                {...commonProps}
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
                canNextPage={true}
                canPreviousPage={true}
                disablePagination={true}
                {...commonProps}
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
                canNextPage={true}
                canPreviousPage={true}
                gotoPage={handleGoToPage}
                {...commonProps}
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
                canNextPage={true}
                canPreviousPage={true}
                gotoPage={handleGoToPage}
                {...commonProps}
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
                canNextPage={true}
                canPreviousPage={true}
                gotoPage={handleGoToPage}
                {...commonProps}
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
                canNextPage={true}
                canPreviousPage={true}
                nextPage={handleNextPage}
                {...commonProps}
            />
        );

        act(() => {
            fireEvent.click(getByTestId('next-page'));
        });

        expect(handleNextPage).toHaveBeenCalled();
    });

    it('should render disabled next page icon when canNextPage is false', () => {
        const { getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                canNextPage={false}
                canPreviousPage={true}
                {...commonProps}
            />
        );
        expect(getByTestId('next-page')).toHaveAttribute('disabled');
    });

    it('should trigger previousPage event when previous page icon is clicked', () => {
        const handlePreviousPage = jest.fn();
        const { getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                canNextPage={true}
                canPreviousPage={true}
                previousPage={handlePreviousPage}
                {...commonProps}
            />
        );

        act(() => {
            fireEvent.click(getByTestId('previous-page'));
        });

        expect(handlePreviousPage).toHaveBeenCalled();
    });

    it('should render disabled previous page icon when canPreviousPage is false', () => {
        const { getByTestId } = render(
            <SettingsBar
                pageIndex={1}
                pageSize={10}
                pageSizes={[10, 25, 100]}
                pageLength={10}
                canNextPage={true}
                canPreviousPage={false}
                {...commonProps}
            />
        );
        expect(getByTestId('previous-page')).toHaveAttribute('disabled');
    });

    it('should render SettingsPopover when settings icon is clicked', () => {
        const { getByTestId, getByText, queryByText } = render(
            <SettingsBar pageIndex={1} pageSize={10} pageSizes={[10, 25, 100]} pageLength={10} {...commonProps} />
        );

        expect(queryByText('Settings')).toBeNull();

        act(() => {
            fireEvent.click(getByTestId('settings'));
        });

        expect(getByText('Settings')).toBeVisible();
    });
});
