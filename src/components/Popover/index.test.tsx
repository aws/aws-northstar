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
import { render } from '@testing-library/react';
import Popover from '.';

describe('Popover', () => {
    const mockOnChange = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders text trigger correctly', () => {
        const { queryByRole, getByRole } = render(
            <Popover triggerType="text">
                <span>Trigger</span>
            </Popover>
        );
        expect(queryByRole('button')).not.toBeNull();
        expect(getByRole('button')).toHaveTextContent('Trigger');
    });
    it('renders custom trigger correctly', () => {
        const { queryByRole, getByText } = render(
            <Popover triggerType="custom">
                <span>Trigger</span>
            </Popover>
        );
        expect(queryByRole('button')).toBeNull();
        expect(getByText('Trigger')).toBeInTheDocument();
    });

    it('renders the popover header correctly', () => {
        const { getByText, queryByText } = render(
            <Popover header="header text">
                <span>Trigger</span>
            </Popover>
        );
        expect(queryByText('header text')).toBeNull();
        getByText('Trigger').click();
        expect(getByText('header text')).toBeInTheDocument();
    });

    it('renders the popover content correctly', () => {
        const { getByText } = render(
            <Popover header="header text" content="popover content">
                <span>Trigger</span>
            </Popover>
        );
        getByText('Trigger').click();
        expect(getByText('popover content')).toHaveTextContent('popover content');
    });

    it('calls the onOpen callback when the popover is opened', () => {
        const { getByText, queryByTestId } = render(
            <Popover header="header text" content="popover content" onOpen={mockOnChange}>
                <span>Trigger</span>
            </Popover>
        );
        expect(mockOnChange).not.toHaveBeenCalled();
        getByText('Trigger').click();
        expect(mockOnChange).toHaveBeenCalledTimes(1);
        queryByTestId('dismiss-button')!.click();
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('calls the onClose callback when the popover is closed', () => {
        const { getByText, queryByTestId } = render(
            <Popover header="header text" content="popover content" onClose={mockOnChange}>
                <span>Trigger</span>
            </Popover>
        );
        expect(mockOnChange).not.toHaveBeenCalled();
        getByText('Trigger').click();
        expect(mockOnChange).not.toHaveBeenCalled();
        queryByTestId('dismiss-button')!.click();
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    describe('Dismiss button', () => {
        it('renders a dismiss button by default', () => {
            const { getByText, queryByTestId } = render(
                <Popover>
                    <span>Trigger</span>
                </Popover>
            );
            getByText('Trigger').click();
            expect(queryByTestId('dismiss-button')).not.toBeNull();
        });

        it('does not render a dismiss button if showDismissButton is false', () => {
            const { getByText, queryByTestId } = render(
                <Popover showDismissButton={false}>
                    <span>Trigger</span>
                </Popover>
            );
            getByText('Trigger').click();
            expect(queryByTestId('dismiss-button')).toBeNull();
        });
    });
});
