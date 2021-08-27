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
import { SwitchProps } from '@material-ui/core/Switch';
import Toggle, { mapProps, ToggleProps } from '.';

describe('Toggle', () => {
    const mockOnChange = jest.fn();
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the given toggle', () => {
        const { getByText } = render(<Toggle label="On" />);

        expect(getByText('On')).toBeInTheDocument();
    });

    it('fires onChange event', () => {
        const { getByText } = render(<Toggle label="On" onChange={mockOnChange} />);

        expect(mockOnChange).toHaveBeenCalledTimes(0);
        fireEvent.click(getByText('On'));
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('renders disabled toggle', () => {
        const { getByText } = render(<Toggle label="On" disabled={true} onChange={mockOnChange} />);

        fireEvent.click(getByText('On'));
        expect(mockOnChange).toHaveBeenCalledTimes(0);
    });

    it('maps props correctly', () => {
        const inputProps: ToggleProps = {
            label: 'This is a label',
            checked: true,
            controlId: 'toggle-48',
            disabled: false,
            name: 'toggle',
            ariaLabelledby: 'labelledby',
            ariaDescribedby: 'describedby',
            ariaLabel: 'label',
            onChange: mockOnChange,
        };

        const expectedMappedProps: SwitchProps = {
            'aria-describedby': 'describedby',
            'aria-label': 'label',
            'aria-labelledby': 'labelledby',
            checked: true,
            disabled: false,
            id: 'toggle-48',
            name: 'toggle',
        };
        expect(mapProps(inputProps)).toEqual(expectedMappedProps);
    });
});
