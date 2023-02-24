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
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';

const { Single, SingleWithInitialValues, Multiple, MultipleWithInitialValues } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('Checkbox', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    describe('Single Checkbox', () => {
        it('should render single checkbox', async () => {
            render(<Single onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByLabelText('Checkbox')).toBeInTheDocument();
            expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();

            await act(async () => {
                await userEvent.click(screen.getByLabelText('Checkbox'));
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith({ checkbox: true }, expect.any(Object), expect.any(Function));
        });

        it('should trigger validation', async () => {
            render(<Single onSubmit={handleSubmit} onCancel={handleCancel} />);

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(screen.getByText('Required')).toBeVisible();
        });

        it('should be populated with initial value', async () => {
            render(<SingleWithInitialValues onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByLabelText('Checkbox')).toBeChecked();

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith({ checkbox: true }, expect.any(Object), expect.any(Function));
        });
    });

    describe('Multiple Checkboxes', () => {
        it('should render checkboxes', async () => {
            render(<Multiple onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByTestId('checkbox-1-1')).toBeInTheDocument();
            expect(screen.getByTestId('checkbox-1-2')).toBeInTheDocument();
            expect(screen.getByTestId('checkbox-1-3')).toBeInTheDocument();

            expect(screen.getByLabelText('Option 2')).toBeDisabled();
            expect(screen.getByText('This is option 1 description')).toBeVisible();
            expect(screen.getByText('This is description')).toBeVisible();
            expect(screen.getByText('This is helper text')).toBeVisible();

            await act(async () => {
                await userEvent.click(screen.getByLabelText('Option 1'));
                await userEvent.click(screen.getByLabelText('Option 3'));
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                { checkbox: ['1', '3'] },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger validation', async () => {
            const { getByText } = render(<Multiple onSubmit={handleSubmit} onCancel={handleCancel} />);

            await act(async () => {
                await userEvent.click(getByText('Submit'));
            });

            expect(getByText('Required')).toBeVisible();
        });

        it('should be populated with initial value', async () => {
            render(<MultipleWithInitialValues onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByLabelText('Option 1')).toBeChecked();
            expect(screen.getByLabelText('Option 3')).toBeChecked();

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                { checkbox: ['1', '3'] },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should handle unchecked', async () => {
            render(<MultipleWithInitialValues onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByLabelText('Option 1')).toBeChecked();
            expect(screen.getByLabelText('Option 3')).toBeChecked();

            await act(async () => {
                await userEvent.click(screen.getByLabelText('Option 3'));
            });

            await waitFor(() => expect(screen.getByLabelText('Option 3')).not.toBeChecked());

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith({ checkbox: ['1'] }, expect.any(Object), expect.any(Function));
        });
    });
});
