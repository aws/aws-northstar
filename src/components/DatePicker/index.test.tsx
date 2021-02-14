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
import { render, cleanup, fireEvent } from '@testing-library/react';
import DatePicker from '.';

describe('Date', () => {
    beforeEach(() => jest.clearAllMocks());
    afterEach(cleanup);

    it('renders a Date input', () => {
        const { getByRole } = render(<DatePicker />);
        expect(getByRole('textbox')).toBeInTheDocument();
    });

    it('use the specified yyyy/MM/dd date format', () => {
        const { getByRole } = render(<DatePicker />);
        fireEvent.change(getByRole('textbox'), { target: { value: '20200603' } });
        expect(getByRole('textbox')).toHaveValue('2020/06/03');
    });

    describe('with a valid number input value', () => {
        it('fires onChange event', () => {
            const mockOnChange = jest.fn();
            const { getByRole } = render(<DatePicker onChange={mockOnChange} />);
            expect(mockOnChange).toHaveBeenCalledTimes(0);
            fireEvent.change(getByRole('textbox'), { target: { value: 1 } });
            expect(mockOnChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('with props', () => {
        const textboxAttributes = [
            { propKey: 'ariaRequired', propValue: true, attribute: 'aria-required' },
            { propKey: 'ariaDescribedby', propValue: 'the description', attribute: 'aria-describedBy' },
            { propKey: 'ariaLabelledby', propValue: 'the label by', attribute: 'aria-labelledBy' },
            { propKey: 'label', propValue: 'the label', attribute: 'aria-label' },
            { propKey: 'controlId', propValue: 'the id', attribute: 'id' },
            { propKey: 'name', propValue: 'the name', attribute: 'name' },
        ];

        textboxAttributes.forEach((t) => {
            describe(t.propKey, () => {
                it(`adds the ${t.attribute} attribute with the value`, () => {
                    const { getByRole } = render(<DatePicker {...{ [t.propKey]: t.propValue }} />);
                    expect(getByRole('textbox')).toHaveAttribute(t.attribute, `${t.propValue}`);
                });
            });
        });

        describe('disabled', () => {
            it('disables the MUI button', () => {
                const { getByRole } = render(<DatePicker disabled={true} />);
                expect(getByRole('button')).toHaveAttribute('class', expect.stringContaining('Mui-disabled'));
            });
        });

        describe('isDateDisabled', () => {
            it('calls the provided fn when clicked (for each date)', () => {
                const mockIsEnabled = jest.fn();
                const { getByRole } = render(<DatePicker isDateDisabled={mockIsEnabled} />);
                getByRole('button').click();
                expect(mockIsEnabled).toBeCalled();
            });
        });
    });
});
