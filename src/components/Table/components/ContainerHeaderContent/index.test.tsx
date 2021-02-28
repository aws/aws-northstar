import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import ContainerHeaderContent from '.';
import { useDebouncedCallback } from 'use-debounce';

const mockCallback = jest.fn();

jest.mock('use-debounce', () => ({
   useDebouncedCallback: jest.fn().mockImplementation(() => {
       return {
           callback: mockCallback
       }
   })
}));

const styles = {
    tableBar: 'tableBar',
    searchBar: 'searchBar',
    cellAlign: 'cellAlign',
    loadingSearchBarPadding: 'loadingSearchBarPadding',
    leftSpace: 'leftSpace'
};

const settingsBarComponent = <>Settings Bar</>

describe('ContainerHeaderContent', () => {
    it('should render search input and settings bars', () => {
        const { getByPlaceholderText, getByText, queryByRole } = render(
            <ContainerHeaderContent
                styles={styles}
                disableFilters={false}
                settingsBarComponent={settingsBarComponent}
            />);
            expect(getByPlaceholderText('Search')).toBeVisible();
            expect(getByText('Settings Bar')).toBeVisible();
            expect(useDebouncedCallback).toBeCalledTimes(1);
            expect(queryByRole('progressbar')).toBeNull();
        ;
    });

    it('should hide search input when disableFilters is true', () => {
        const { queryByPlaceholderText } = render(
            <ContainerHeaderContent
                styles={styles}
                disableFilters={true}
                settingsBarComponent={settingsBarComponent}
            />);
            expect(queryByPlaceholderText('Search')).toBeNull();
        ;
    });

    it('should trigger callback when users type search input', () => {
        const { getByPlaceholderText } = render(
            <ContainerHeaderContent
                styles={styles}
                disableFilters={false}
                settingsBarComponent={settingsBarComponent}
            />);

            act(() => {
                fireEvent.change(getByPlaceholderText('Search'), { target: { value: 'content' }})
            })

            expect(mockCallback).toHaveBeenCalledWith('content');
        ;
    });

    it('should set the initial filter text when it is provided', () => {
        const { getByPlaceholderText } = render(
            <ContainerHeaderContent
                styles={styles}
                globalFilter={'search text'}
                disableFilters={false}
                settingsBarComponent={settingsBarComponent}
            />);
            expect(getByPlaceholderText('Search')).toHaveAttribute('value', 'search text');
        ;
    });

    it('should render loading state', () => {
        const { getByRole } = render(
            <ContainerHeaderContent
                styles={styles}
                disableFilters={false}
                loading={true}
                settingsBarComponent={settingsBarComponent}
            />);
            expect(getByRole('progressbar')).toBeVisible();
        ;
    });
});