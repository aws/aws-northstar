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
import { render, fireEvent } from '@testing-library/react';
import Input from '.';

describe('Input', () => {
    const mockOnChange = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fires onChange event', () => {
        const { getByPlaceholderText } = render(<Input placeholder="input-1" onChange={mockOnChange} />);

        expect(mockOnChange).toHaveBeenCalledTimes(0);
        fireEvent.change(getByPlaceholderText('input-1'), { target: { value: '23' } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('renders an input required', () => {
        const { getByPlaceholderText } = render(<Input required={true} placeholder="input-1" />);

        expect(getByPlaceholderText('input-1').hasAttribute('required')).toBeTruthy();
    });

    it('renders a "text" as default input', () => {
        const { getByPlaceholderText } = render(<Input placeholder="input-1" />);

        expect(getByPlaceholderText('input-1').getAttribute('type')).toEqual('text');
    });

    it('generates auto id for input', () => {
        const { getByPlaceholderText } = render(<Input placeholder="input-1" />);

        expect(getByPlaceholderText('input-1').hasAttribute('id')).toBeTruthy();
    });

    it('should render aria attributes', () => {
        const { getByPlaceholderText } = render(
            <Input placeholder="input-1" ariaLabelledby="ariaLabelledby" ariaDescribedby="ariaDescribedby" required />
        );

        expect(getByPlaceholderText('input-1')).toHaveAttribute('aria-labelledby', 'ariaLabelledby');
        expect(getByPlaceholderText('input-1')).toHaveAttribute('aria-describedby', 'ariaDescribedby');
        expect(getByPlaceholderText('input-1')).toHaveAttribute('aria-required', 'true');
    });

    it('should render a "text" input with autocomplete disabled', () => {
        const { getByPlaceholderText } = render(<Input placeholder="input-1" autocomplete={false} />);

        expect(getByPlaceholderText('input-1').getAttribute('type')).toEqual('text');
        expect(getByPlaceholderText('input-1').getAttribute('autocomplete')).toEqual('off');
    });

    describe('for search input', () => {
        it('does not render clear button on default', () => {
            const { getByPlaceholderText, queryByTestId } = render(<Input type="search" placeholder="input-1" />);

            expect(queryByTestId('input-1')).toBeNull();
        });

        it('fires onChange event', () => {
            const { getByPlaceholderText } = render(
                <Input type="search" placeholder="input-1" onChange={mockOnChange} />
            );

            expect(mockOnChange).toHaveBeenCalledTimes(0);
            fireEvent.change(getByPlaceholderText('input-1'), { target: { value: '23' } });
            expect(mockOnChange).toHaveBeenCalledTimes(1);
        });

        it('clears input value', () => {
            const { getByPlaceholderText, getByTestId } = render(
                <Input type="search" placeholder="input-1" onChange={mockOnChange} />
            );

            /**user types into input */
            fireEvent.change(getByPlaceholderText('input-1'), { target: { value: '23' } });
            expect(getByPlaceholderText('input-1').getAttribute('value')).toEqual('23');

            /**user clears input */
            fireEvent.click(getByTestId('clear-input'));
            expect(getByPlaceholderText('input-1').getAttribute('value')).toEqual('');
            expect(mockOnChange).toHaveBeenCalledTimes(2);
        });
    });
});
