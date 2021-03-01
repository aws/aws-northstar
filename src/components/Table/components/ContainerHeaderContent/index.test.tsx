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
import ContainerHeaderContent from '.';
import { useDebouncedCallback } from 'use-debounce';

const mockCallback = jest.fn();

jest.mock('use-debounce', () => ({
    useDebouncedCallback: jest.fn().mockImplementation(() => {
        return {
            callback: mockCallback,
        };
    }),
}));

const styles = {
    tableBar: 'tableBar',
    searchBar: 'searchBar',
    cellAlign: 'cellAlign',
    loadingSearchBarPadding: 'loadingSearchBarPadding',
    leftSpace: 'leftSpace',
};

const settingsBarComponent = <>Settings Bar</>;

describe('ContainerHeaderContent', () => {
    it('should render search input and settings bars', () => {
        const { getByPlaceholderText, getByText, queryByRole } = render(
            <ContainerHeaderContent
                styles={styles}
                disableFilters={false}
                settingsBarComponent={settingsBarComponent}
            />
        );
        expect(getByPlaceholderText('Search')).toBeVisible();
        expect(getByText('Settings Bar')).toBeVisible();
        expect(useDebouncedCallback).toBeCalledTimes(1);
        expect(queryByRole('progressbar')).toBeNull();
    });

    it('should hide search input when disableFilters is true', () => {
        const { queryByPlaceholderText } = render(
            <ContainerHeaderContent styles={styles} disableFilters={true} settingsBarComponent={settingsBarComponent} />
        );
        expect(queryByPlaceholderText('Search')).toBeNull();
    });

    it('should trigger callback when users type search input', () => {
        const { getByPlaceholderText } = render(
            <ContainerHeaderContent
                styles={styles}
                disableFilters={false}
                settingsBarComponent={settingsBarComponent}
            />
        );

        act(() => {
            fireEvent.change(getByPlaceholderText('Search'), { target: { value: 'content' } });
        });

        expect(mockCallback).toHaveBeenCalledWith('content');
    });

    it('should set the initial filter text when it is provided', () => {
        const { getByPlaceholderText } = render(
            <ContainerHeaderContent
                styles={styles}
                globalFilter={'search text'}
                disableFilters={false}
                settingsBarComponent={settingsBarComponent}
            />
        );
        expect(getByPlaceholderText('Search')).toHaveAttribute('value', 'search text');
    });

    it('should render loading state', () => {
        const { getByRole } = render(
            <ContainerHeaderContent
                styles={styles}
                disableFilters={false}
                loading={true}
                settingsBarComponent={settingsBarComponent}
            />
        );
        expect(getByRole('progressbar')).toBeVisible();
    });
});
