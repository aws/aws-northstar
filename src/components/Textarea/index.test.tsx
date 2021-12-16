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
import Textarea, { mapTextareaProps, TextareaProps } from '.';
import { TextareaAutosizeProps } from '@material-ui/core/TextareaAutosize';
import clsx from 'clsx';

describe('Textarea', () => {
    const mockOnChange = jest.fn();
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the given textarea', () => {
        const { getByPlaceholderText } = render(<Textarea placeholder="textarea" />);

        expect(getByPlaceholderText('textarea')).toBeInTheDocument();
    });

    it('fires onChange event', () => {
        const { getByPlaceholderText } = render(<Textarea placeholder="textarea" onChange={mockOnChange} />);

        expect(mockOnChange).toHaveBeenCalledTimes(0);
        fireEvent.change(getByPlaceholderText('textarea'), { target: { value: '23' } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('fires onKeyUp event', () => {
        const { getByPlaceholderText } = render(<Textarea placeholder="textarea" onKeyUp={mockOnChange} />);

        expect(mockOnChange).toHaveBeenCalledTimes(0);
        fireEvent.keyUp(getByPlaceholderText('textarea'), { key: 'Enter' });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('fires onKeyDown event', () => {
        const { getByPlaceholderText } = render(<Textarea placeholder="textarea" onKeyDown={mockOnChange} />);

        expect(mockOnChange).toHaveBeenCalledTimes(0);
        fireEvent.keyDown(getByPlaceholderText('textarea'), { key: 'Enter' });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('renders disabled textarea', () => {
        const { getByPlaceholderText } = render(<Textarea placeholder="textarea" disabled={true} />);

        expect(getByPlaceholderText('textarea')).toHaveAttribute('disabled');
    });

    it('renders custom className', () => {
        const { getByPlaceholderText } = render(
            <Textarea placeholder="textarea" className={clsx('custom1', 'custom2')} />
        );

        expect(getByPlaceholderText('textarea')).toHaveClass('custom1', 'custom2');
    });

    it('can be accessed by testid', async () => {
        const { getByTestId } = render(<Textarea placeholder="textarea" data-testid="textarea" />);
        expect(getByTestId('textarea')).toBeInTheDocument();
    });

    it('maps props correctly', () => {
        const inputProps: TextareaProps = {
            placeholder: 'placeholder',
            controlId: 'textarea-48',
            disabled: false,
            name: 'textarea',
            ariaRequired: true,
            ariaDescribedby: 'describedby',
            onChange: mockOnChange,
            readonly: false,
            disableBrowserAutocorrect: true,
            autofocus: false,
        };

        const expectedMappedProps: TextareaAutosizeProps = {
            'aria-describedby': 'describedby',
            'aria-label': 'placeholder',
            disabled: false,
            id: 'textarea-48',
            name: 'textarea',
            rowsMin: 3,
            value: undefined,
            onChange: mockOnChange,
            required: true,
            placeholder: 'placeholder',
            readOnly: false,
            autoComplete: 'off',
            autoCapitalize: 'off',
            autoFocus: false,
            'aria-required': true,
        };
        expect(mapTextareaProps(inputProps)).toEqual(expectedMappedProps);
    });
});
