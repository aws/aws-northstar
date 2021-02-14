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
import Multiselect from '.';

const options = [
    {
        label: 'Aoption 1',
        value: '1',
    },
    {
        label: 'Aoption 2',
        value: '2',
    },
    {
        label: 'Boption 3',
        value: '3',
    },
    {
        label: 'Boption 4',
        value: '4',
    },
];

describe('MultiSelect', () => {
    afterEach(cleanup);
    it('should render placeholder', () => {
        const { getByPlaceholderText } = render(<Multiselect options={options} placeholder="placeholder-1" />);
        expect(getByPlaceholderText('placeholder-1')).toBeVisible();
    });

    it('should render all options when user click input', () => {
        const { getByPlaceholderText, getAllByRole, getByText } = render(
            <Multiselect options={options} placeholder="input-1" />
        );
        const input = getByPlaceholderText('input-1');
        fireEvent.click(input);
        expect(getAllByRole('option')).toHaveLength(4);
        expect(getByText('Aoption 1')).toBeVisible();
        expect(getByText('Aoption 2')).toBeVisible();
        expect(getByText('Boption 3')).toBeVisible();
        expect(getByText('Boption 4')).toBeVisible();
    });

    it('should render matched options when user types', () => {
        const { getByPlaceholderText, getAllByRole, getByText } = render(
            <Multiselect options={options} placeholder="input-1" />
        );
        const input = getByPlaceholderText('input-1');
        fireEvent.change(input, { target: { value: 'aopt' } });
        expect(getAllByRole('option')).toHaveLength(2);
        expect(getByText('Aoption 1')).toBeVisible();
        expect(getByText('Aoption 2')).toBeVisible();
    });

    it('should render loading text when it is provided', () => {
        const { getByText } = render(
            <Multiselect placeholder="input-1" loadingText="Loading text" statusType="loading" />
        );
        expect(getByText('Loading text')).toBeVisible();
    });

    it('should render error text when it is provided', () => {
        const { getByText } = render(<Multiselect placeholder="input-1" errorText="Error text" statusType="error" />);
        expect(getByText('Error text.')).toBeVisible();
    });

    it('should render recovery text when it is provided', () => {
        const handleRetry = jest.fn();
        const { getByText } = render(
            <Multiselect
                placeholder="input-1"
                errorText="Error text"
                recoveryText="Retry"
                onRecoveryClick={handleRetry}
                statusType="error"
            />
        );
        expect(getByText('Retry', { exact: false })).toBeVisible();
        fireEvent.click(getByText('Retry', { exact: false }));
        expect(handleRetry).toHaveBeenCalled();
    });

    it('should render the component as disabled when the disable is true', () => {
        const { getByPlaceholderText } = render(
            <Multiselect options={options} placeholder="placeholder-1" disabled={true} />
        );
        expect(getByPlaceholderText('placeholder-1')).toBeDisabled();
    });

    it('should render the selected option as token', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText, getByText, container } = render(
            <Multiselect options={options} placeholder="input-1" onChange={handleChange} />
        );
        const input = getByPlaceholderText('input-1');
        fireEvent.change(input, { target: { value: 'aopt' } });
        fireEvent.click(getByText('Aoption 2'));
        expect(container.querySelector('.MuiChip-label')).toHaveTextContent('Aoption 2');
    });

    it('should render multiple selected options as tokens', () => {
        const handleChange = jest.fn();
        const { getByText, getByTitle, container } = render(
            <Multiselect options={options} placeholder="input-1" onChange={handleChange} />
        );
        fireEvent.click(getByTitle('Open'));
        fireEvent.click(getByText('Aoption 2'));
        fireEvent.click(getByTitle('Open'));
        fireEvent.click(getByText('Boption 3'));
        expect(container.querySelectorAll('.MuiChip-label')).toHaveLength(2);
    });

    it('should deselected the selected option when clicked again', () => {
        const { getByText, getAllByText, getByTitle, container } = render(
            <Multiselect options={options} placeholder="input-1" />
        );
        fireEvent.click(getByTitle('Open'));
        fireEvent.click(getByText('Aoption 2'));
        fireEvent.click(getByTitle('Open'));
        fireEvent.click(getAllByText('Aoption 2')[1]);
        expect(container.querySelectorAll('.MuiChip-label')).toHaveLength(0);
    });

    it('should render checkbox', () => {
        const { getAllByRole, getByTitle } = render(
            <Multiselect options={options} placeholder="input-1" checkboxes={true} />
        );
        fireEvent.click(getByTitle('Open'));
        expect(getAllByRole('checkbox')).toHaveLength(4);
    });

    it('should render checkbox checked for selected option', () => {
        const { getByText, getAllByRole, getByTitle } = render(
            <Multiselect options={options} placeholder="input-1" checkboxes={true} />
        );
        fireEvent.click(getByTitle('Open'));
        fireEvent.click(getByText('Aoption 1'));
        fireEvent.click(getByTitle('Open'));
        expect(getAllByRole('checkbox').filter((x) => x.hasAttribute('checked'))).toHaveLength(1);
    });

    describe('Event handlers', () => {
        it('should trigger onFocus event', () => {
            const handleFocus = jest.fn();
            const handleBlur = jest.fn();
            const { getByPlaceholderText } = render(
                <Multiselect options={options} placeholder="placeholder-1" onFocus={handleFocus} onBlur={handleBlur} />
            );
            fireEvent.click(getByPlaceholderText('placeholder-1'));
            expect(handleFocus).toHaveBeenCalled();
        });

        it('should trigger onInputChange event if filteringType is manual', () => {
            const handleInputChange = jest.fn();
            const { getByPlaceholderText } = render(
                <Multiselect
                    options={options}
                    placeholder="input-1"
                    filteringType="manual"
                    onInputChange={handleInputChange}
                />
            );
            const input = getByPlaceholderText('input-1');
            fireEvent.change(input, { target: { value: 'aopt' } });
            expect(handleInputChange).toHaveBeenCalled();
        });

        it('should trigger onChange event', () => {
            const handleChange = jest.fn();
            const { getByPlaceholderText, getByText } = render(
                <Multiselect options={options} placeholder="input-1" onChange={handleChange} />
            );
            const input = getByPlaceholderText('input-1');
            fireEvent.change(input, { target: { value: 'aopt' } });
            fireEvent.click(getByText('Aoption 2'));
            expect(handleChange).toHaveBeenCalledWith([
                {
                    label: 'Aoption 2',
                    value: '2',
                },
            ]);
        });
    });
});
