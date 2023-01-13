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

const {
    Select,
    SelectWithInitialValue,
    Multiselect,
    MultiselectWithInitialValue,
    Autosuggest,
    AutosuggestWithInitialValue,
} = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('Select', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    describe('Single Select', () => {
        it('should render single select', async () => {
            render(<Select onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByText('This is description')).toBeVisible();
            expect(screen.getByText('This is helper text')).toBeVisible();
            expect(screen.getByText('This is placeholder text')).toBeVisible();

            const element = await screen.findByTestId('form-renderer');
            const select = wrapper(element).findSelect();

            await act(async () => {
                select?.openDropdown();
            });

            const dropdown = select?.findDropdown();

            await waitFor(() => expect(dropdown?.findOptionByValue('1')).not.toBeNull());

            await act(async () => {
                select?.selectOptionByValue('1');
            });

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                { select: { label: 'Option 1', value: '1' } },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger validation', async () => {
            render(<Select onSubmit={handleSubmit} onCancel={handleCancel} />);

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(screen.getByText('Required')).toBeVisible();
            expect(handleSubmit).not.toBeCalled();
        });

        it('should be populated with initial value', async () => {
            render(<SelectWithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByText('Option 3')).toBeVisible();

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                { select: { label: 'Option 3', value: '3' } },
                expect.any(Object),
                expect.any(Function)
            );
        });
    });

    describe('Multiple Select', () => {
        it('should render multiselect', async () => {
            render(<Multiselect onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByText('This is description')).toBeVisible();
            expect(screen.getByText('This is helper text')).toBeVisible();
            expect(screen.getByText('Choose options')).toBeVisible();

            const element = await screen.findByTestId('form-renderer');
            const select = wrapper(element).findMultiselect();

            await act(async () => {
                select?.openDropdown();
            });

            const dropdown = select?.findDropdown();
            await waitFor(() => expect(dropdown?.findOptionByValue('1')).not.toBeNull());

            await act(async () => {
                select?.selectOptionByValue('1');
                select?.closeDropdown();
            });

            await waitFor(() => expect(select?.findTokens()).toHaveLength(1));

            select?.openDropdown();
            await waitFor(() => expect(dropdown?.findOptionByValue('1')).not.toBeNull());

            await act(async () => {
                select?.selectOptionByValue('4');
                select?.closeDropdown();
            });

            await waitFor(() => expect(select?.findTokens()).toHaveLength(2));

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                MultiselectWithInitialValue.args?.initialValues,
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger validation', async () => {
            render(<Multiselect onSubmit={handleSubmit} onCancel={handleCancel} />);

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(screen.getByText('Required')).toBeVisible();
            expect(handleSubmit).not.toBeCalled();
        });

        it('should be populated with initial value', async () => {
            render(<MultiselectWithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByText('Option 1')).toBeVisible();
            expect(screen.getByText('This is Option 1 description')).toBeVisible();
            expect(screen.getByText('Option 4')).toBeVisible();

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                MultiselectWithInitialValue.args?.initialValues,
                expect.any(Object),
                expect.any(Function)
            );
        });
    });

    describe('Autosuggest', () => {
        it('should render autosuggest', async () => {
            render(<Autosuggest onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByText('This is description')).toBeVisible();
            expect(screen.getByText('This is helper text')).toBeVisible();
            expect(screen.getByPlaceholderText('This is placeholder text')).toBeVisible();

            const element = await screen.findByTestId('form-renderer');
            const autosugguest = wrapper(element).findAutosuggest();

            await act(async () => {
                await userEvent.type(screen.getByLabelText('Select'), 'suggestion');
            });

            const dropdown = autosugguest?.findDropdown();

            await waitFor(() => expect(dropdown?.findOptionByValue('2')?.getElement()).toBeVisible());

            await act(async () => {
                await userEvent.click(dropdown?.findOptionByValue('2')?.getElement()!);
            });

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                {
                    select: { value: '2', label: 'Suggestion 2' },
                },
                expect.any(Object),
                expect.any(Function)
            );
        });

        it('should trigger validation', async () => {
            render(<Autosuggest onSubmit={handleSubmit} onCancel={handleCancel} />);

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(screen.getByText('Required')).toBeVisible();
            expect(handleSubmit).not.toBeCalled();
        });

        it('should be populated with initial value', async () => {
            render(<AutosuggestWithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

            expect(screen.getByRole('combobox')).toHaveValue('Suggestion 2');

            await act(async () => {
                await userEvent.click(screen.getByText('Submit'));
            });

            expect(handleSubmit).toHaveBeenCalledWith(
                {
                    select: { value: '2', label: 'Suggestion 2' },
                },
                expect.any(Object),
                expect.any(Function)
            );
        });
    });
});
