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
import { awsServices, groupedAwsServices } from './data/data';
import Autosuggest from '.';
import { axe } from 'jest-axe';
import FormField from '../FormField';

describe('Autosuggest', () => {
    const mockEvent = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders suggestions based on user input', () => {
        const { getByPlaceholderText, getAllByRole } = render(
            <Autosuggest options={awsServices} placeholder="input-1" />
        );
        const input = getByPlaceholderText('input-1');

        fireEvent.change(input, { target: { value: 'direct' } });

        expect(getAllByRole('option')).toHaveLength(2);
    });

    it('renders grouped suggestions ', () => {
        const { getByPlaceholderText, getAllByRole } = render(
            <Autosuggest options={groupedAwsServices} placeholder="input-1" />
        );
        const input = getByPlaceholderText('input-1');

        fireEvent.change(input, { target: { value: 'AWS Mobile' } });

        expect(getAllByRole('option')).toHaveLength(1);
    });

    it('renders loading status', () => {
        const loadingText = 'Loading';
        const { getByText } = render(<Autosuggest statusType="loading" loadingText={loadingText} />);

        expect(getByText(loadingText)).toBeInTheDocument();
    });

    it('renders error status', () => {
        const errorText = 'Error';
        const { getByText } = render(<Autosuggest statusType="error" errorText={errorText} />);

        expect(getByText(`${errorText}.`)).toBeInTheDocument();
    });

    it('renders error recoveryText', () => {
        const recoveryText = 'recoveryText';
        const { getByText } = render(<Autosuggest statusType="error" recoveryText={recoveryText} />);

        expect(getByText(recoveryText).closest('a')).toHaveAttribute('href', '#');
    });

    it('renders an component required', () => {
        const { getByPlaceholderText } = render(
            <Autosuggest ariaRequired={true} options={awsServices} placeholder="input-1" />
        );
        const input = getByPlaceholderText('input-1');

        expect(input).toBeRequired();
    });

    it('renders an component disabled', () => {
        const { getByPlaceholderText, queryByText } = render(
            <Autosuggest options={awsServices} disabled={true} placeholder="input-1" onFocus={mockEvent} />
        );
        const input = getByPlaceholderText('input-1');

        expect(input).toBeDisabled();
    });

    describe('events', () => {
        it('fires onChange event', () => {
            const { getByPlaceholderText } = render(
                <Autosuggest options={awsServices} placeholder="input-1" onChange={mockEvent} />
            );
            const input = getByPlaceholderText('input-1');

            expect(mockEvent).toHaveBeenCalledTimes(0);
            fireEvent.change(input, { target: { value: 'Amazon Pay' } });
            fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
            expect(mockEvent).toHaveBeenCalledTimes(1);
        });

        it('fires onFocus event', () => {
            const { getByPlaceholderText } = render(
                <Autosuggest options={awsServices} placeholder="input-1" onFocus={mockEvent} />
            );
            const input = getByPlaceholderText('input-1');

            expect(mockEvent).toHaveBeenCalledTimes(0);
            fireEvent.change(input, { target: { value: 'Amazon Pay' } });
            expect(mockEvent).toHaveBeenCalledTimes(1);
        });

        it('fires onBlur event', () => {
            const { getByPlaceholderText } = render(
                <Autosuggest options={awsServices} placeholder="input-1" onBlur={mockEvent} />
            );
            const input = getByPlaceholderText('input-1');

            expect(mockEvent).toHaveBeenCalledTimes(0);
            fireEvent.change(input, { target: { value: 'Amazon Pay' } });
            fireEvent.keyDown(input, { key: 'Escape', code: '27' });
            expect(mockEvent).toHaveBeenCalledTimes(1);
        });

        it('fires onRecoveryClick event', () => {
            const recoveryText = 'Retry';
            const { getByText } = render(
                <Autosuggest statusType="error" recoveryText={recoveryText} onRecoveryClick={mockEvent} />
            );
            const input = getByText(recoveryText);

            fireEvent.click(input);
            expect(mockEvent).toHaveBeenCalledTimes(1);
        });

        it('fires onInputChange event on manual filtering', () => {
            const { getByPlaceholderText } = render(
                <Autosuggest
                    options={awsServices}
                    filteringType="manual"
                    placeholder="input-1"
                    onInputChange={mockEvent}
                />
            );
            const input = getByPlaceholderText('input-1');

            expect(mockEvent).toHaveBeenCalledTimes(0);
            fireEvent.change(input, { target: { value: 'Amazon Pay' } });
            expect(mockEvent).toHaveBeenCalledTimes(1);
        });

        it('does not fire onInputChange event on auto filtering', () => {
            const { getByPlaceholderText } = render(
                <Autosuggest options={awsServices} placeholder="input-1" onInputChange={mockEvent} />
            );
            const input = getByPlaceholderText('input-1');

            fireEvent.change(input, { target: { value: 'Amazon Pay' } });
            expect(mockEvent).toHaveBeenCalledTimes(0);
        });
    });

    it('renders accessible component', async () => {
        const { container } = render(
            <>
                <FormField label="Form field label" controlId="formFieldId1">
                    <Autosuggest
                        options={awsServices}
                        controlId="formFieldId1"
                        ariaDescribedby="This is a description"
                    />
                </FormField>
                <FormField label="Form field label" controlId="formFieldId2">
                    <Autosuggest
                        options={groupedAwsServices}
                        controlId="formFieldId2"
                        empty="No matching service found"
                    />
                </FormField>
            </>
        );
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    describe('icons', () => {
        it('should render the component with default icon', () => {
            const { container } = render(<Autosuggest options={awsServices} placeholder="input-1" />);
            const svg = container.querySelector('.MuiSvgIcon-colorAction');

            expect(svg).toBeInTheDocument();
        });

        it('should render the component with custom icon', () => {
            const { container } = render(<Autosuggest options={awsServices} placeholder="input-1" icon="Dns" />);
            const svg = container.querySelector('.MuiSvgIcon-colorAction');

            expect(svg).toBeInTheDocument();
        });

        it('should render the component without an icon', () => {
            const { container } = render(<Autosuggest options={awsServices} placeholder="input-1" icon={false} />);
            const svg = container.querySelector('.MuiSvgIcon-colorAction');

            expect(svg).not.toBeInTheDocument();
        });
    });
});
