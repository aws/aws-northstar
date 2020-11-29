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
import { render, fireEvent, within } from '@testing-library/react';
import Select, { SelectProps } from '.';

const options = [
    {
        label: 'Option 1',
        value: '1',
    },
    {
        label: 'Option 2',
        value: '2',
    },
];

describe('Select', () => {
    describe('props', () => {
        it('renders selected option', () => {
            const props: SelectProps = { options, selectedOption: { value: '1' } };
            const { getByText } = render(<Select {...props} />);

            expect(getByText('Option 1')).toBeVisible();
        });

        it('renders placeholder', () => {
            const props: SelectProps = { options, placeholder: 'Choose an option' };
            const { getByText } = render(<Select {...props} />);

            expect(getByText('Choose an option')).toBeVisible();
        });

        it('should set class disabled when disabled prop is given', () => {
            const props: SelectProps = { options, disabled: true };
            const { getByRole } = render(<Select {...props} />);

            expect(getByRole('button')).toHaveClass('Mui-disabled');
        });

        it('renders options', () => {
            const props: SelectProps = { options };
            const { getByRole, getByText } = render(<Select {...props} />);

            fireEvent.mouseDown(getByRole('button'));

            expect(getByText('Option 1')).toBeVisible();
            expect(getByText('Option 2')).toBeVisible();
        });

        it('renders icon options', () => {
            const disabledOptions = [
                {
                    label: 'Option 1',
                    value: '1',
                    iconName: 'copy' as const,
                },
            ];
            const props: SelectProps = { options: disabledOptions };
            const { getByRole } = render(<Select {...props} />);

            fireEvent.mouseDown(getByRole('button'));
        });

        it('renders disabled options', () => {
            const disabledOptions = [
                {
                    label: 'Option 1',
                    value: '1',
                    disabled: true,
                },
            ];
            const props: SelectProps = { options: disabledOptions };
            const { getByRole, getByText } = render(<Select {...props} />);

            fireEvent.mouseDown(getByRole('button'));

            expect(getByText('Option 1')).toBeVisible();
            expect(getByText('Option 1')).toHaveAttribute('aria-disabled', 'true');
        });

        it('renders options with group header', () => {
            const optionsWithGroup = [
                ...options,
                {
                    label: 'Group 1',
                    options: [
                        {
                            label: 'Option 3',
                            value: '3',
                        },
                    ],
                },
            ];

            const props: SelectProps = { options: optionsWithGroup };
            const { getByRole, getByText } = render(<Select {...props} />);

            fireEvent.mouseDown(getByRole('button'));

            expect(getByText('Option 1')).toBeVisible();
            expect(getByText('Option 2')).toBeVisible();
            expect(getByText('Group 1')).toBeVisible();
            expect(getByText('Option 3')).toBeVisible();
        });

        it('disable all options in the disabled group', () => {
            const optionsWithGroup = [
                ...options,
                {
                    label: 'Group 1',
                    disabled: true,
                    options: [
                        {
                            label: 'Option 3',
                            value: '3',
                        },
                    ],
                },
            ];

            const props: SelectProps = { options: optionsWithGroup };
            const { getByRole, getByText } = render(<Select {...props} />);

            fireEvent.mouseDown(getByRole('button'));

            expect(getByText('Option 1')).toHaveAttribute('aria-disabled', 'false');
            expect(getByText('Option 2')).toHaveAttribute('aria-disabled', 'false');
            expect(getByText('Option 3')).toHaveAttribute('aria-disabled', 'true');
        });

        it('shows empty text when there is no options', () => {
            const props: SelectProps = { empty: 'No options' };
            const { getByRole, queryByText } = render(<Select {...props} />);

            expect(queryByText('No options')).not.toBeInTheDocument();

            fireEvent.mouseDown(getByRole('button'));

            expect(within(getByRole('listbox')).queryByText('No options')).toBeInTheDocument();
        });

        it('does not show empty text when there is options', () => {
            const props: SelectProps = { options, empty: 'No options' };
            const { getByRole, queryByText } = render(<Select {...props} />);

            expect(queryByText('No options')).not.toBeInTheDocument();

            fireEvent.mouseDown(getByRole('button'));

            expect(within(getByRole('listbox')).queryByText('No options')).not.toBeInTheDocument();
        });

        it('shows loading text without options when loading', () => {
            const props: SelectProps = { options, statusType: 'loading', loadingText: 'loading' };
            const { getByRole, queryByText } = render(<Select {...props} />);

            expect(queryByText('loading')).not.toBeInTheDocument();

            fireEvent.mouseDown(getByRole('button'));

            expect(queryByText('Option 1')).not.toBeInTheDocument();
            expect(queryByText('Option 2')).not.toBeInTheDocument();
            expect(within(getByRole('listbox')).queryByText('loading')).toBeInTheDocument();
        });

        it('shows error and recovery text without options when error', () => {
            const props: SelectProps = { options, statusType: 'error', errorText: 'error', recoveryText: 'retry' };
            const { getByRole, queryByText } = render(<Select {...props} />);

            expect(queryByText('error')).not.toBeInTheDocument();
            expect(queryByText('retry')).not.toBeInTheDocument();

            fireEvent.mouseDown(getByRole('button'));

            expect(queryByText('Option 1')).not.toBeInTheDocument();
            expect(queryByText('Option 2')).not.toBeInTheDocument();
            expect(getByRole('listbox')).toHaveTextContent('error');
            expect(getByRole('listbox')).toHaveTextContent('retry');
        });

        it('adds aria label from controlId', () => {
            const props: SelectProps = { options, controlId: 'select-label' };
            const { getByRole } = render(<Select {...props} />);
            expect(getByRole('button')).toHaveAttribute('id', 'select-label');
        });
    });

    describe('events', () => {
        it('fires onFocus, onChange, and onBlur event', () => {
            const mockFocusFn = jest.fn();
            const mockChangeFn = jest.fn();
            const mockBlurFn = jest.fn();
            const props: SelectProps = { options, onChange: mockChangeFn, onBlur: mockBlurFn, onFocus: mockFocusFn };
            const { getByRole, getAllByRole } = render(<Select {...props} />);

            expect(mockFocusFn).toHaveBeenCalledTimes(0);
            expect(mockChangeFn).toHaveBeenCalledTimes(0);
            expect(mockBlurFn).toHaveBeenCalledTimes(0);

            fireEvent.mouseDown(getByRole('button'));
            expect(mockFocusFn).toHaveBeenCalledTimes(1);

            getAllByRole('option')[1].click();

            expect(mockChangeFn).toHaveBeenCalledTimes(1);
            expect(mockBlurFn).toHaveBeenCalledTimes(1);
        });

        it('fires onRecoveryClick event and keep the select open', () => {
            const mockFn = jest.fn();
            const props: SelectProps = { options, statusType: 'error', recoveryText: 'retry', onRecoveryClick: mockFn };
            const { getByRole, getByText } = render(<Select {...props} />);

            expect(mockFn).toHaveBeenCalledTimes(0);

            fireEvent.mouseDown(getByRole('button'));
            getByText('retry').click();

            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(getByText('retry')).toBeVisible();
        });
    });
});
