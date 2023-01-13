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
import { render, screen, cleanup, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';

const { Default, WithInitialValue } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('DateRangePicker', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render date range picker', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('This is description')).toBeVisible();
        expect(screen.getByText('This is helper text')).toBeVisible();
        expect(screen.getByText('Filter by a date and time range')).toBeVisible();

        const element = await screen.findByTestId('form-renderer');
        const datePicker = wrapper(element).findDateRangePicker();

        await act(async () => {
            datePicker?.openDropdown();
        });

        await waitFor(() => expect(screen.getByLabelText('Last 5 minutes')).toBeVisible());

        await act(async () => {
            await userEvent.click(screen.getByLabelText('Last 5 minutes'));
        });

        await waitFor(() => expect(screen.getByLabelText('Last 5 minutes')).toBeChecked());

        await act(async () => {
            await userEvent.click(screen.getByText('Apply'));
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            {
                dateRange: {
                    amount: 5,
                    key: 'previous-5-minutes',
                    type: 'relative',
                    unit: 'minute',
                },
            },
            expect.any(Object),
            expect.any(Function)
        );
    });

    it('should trigger validation', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(screen.getByText('Required')).toBeVisible();
        expect(handleSubmit).not.toBeCalled();
    });

    it('should trigger validation', async () => {
        render(<WithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('Last 5 minutes')).toBeVisible();

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            {
                dateRange: {
                    amount: 5,
                    key: 'previous-5-minutes',
                    type: 'relative',
                    unit: 'minute',
                },
            },
            expect.any(Object),
            expect.any(Function)
        );
    });
});
