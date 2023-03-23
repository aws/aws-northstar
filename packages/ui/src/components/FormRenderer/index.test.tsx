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
import { composeStories, composeStory } from '@storybook/testing-react';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import SubmittingMeta, { Submitting as SubmittingStory } from './stories/Submitting.stories';
import ResetMeta, { Reset as ResetStory } from './stories/Reset.stories';
import * as stories from './index.stories';
import FormRenderer, { ValidatorMapper, componentTypes } from '.';

const { Default, WithInitialValue } = composeStories(stories);
const Submitting = composeStory(SubmittingStory, SubmittingMeta);
const Reset = composeStory(ResetStory, ResetMeta);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

jest.setTimeout(10000);

describe('FormRenderer', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render form with controls', async () => {
        const { container } = render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Email'), stories.TEST_DATA.email);
            userEvent.type(screen.getByLabelText('Password'), stories.TEST_DATA.password);
            userEvent.type(screen.getByLabelText('Number'), stories.TEST_DATA.number.toString());

            userEvent.click(screen.queryAllByText('Option 1')![0]);
        });

        await waitFor(() => expect(screen.queryAllByLabelText('Option 1')![0]).toBeChecked());

        act(() => {
            userEvent.click(screen.queryAllByText('Option 2')![0]);
        });

        await waitFor(() => expect(screen.queryAllByLabelText('Option 2')![0]).toBeChecked());

        act(() => {
            userEvent.click(screen.queryAllByText('Option 3')![1]);
        });

        await waitFor(() => expect(screen.queryAllByLabelText('Option 3')![1]).toBeChecked());

        const select = wrapper(container).findSelect();

        act(() => {
            select?.openDropdown();
        });

        act(() => {
            select?.selectOptionByValue('2');
            select?.closeDropdown();
        });

        act(() => {
            userEvent.type(screen.getByLabelText('Autosuggest'), 'Lambda');
        });

        const autosugguest = wrapper(container).findAutosuggest();
        const dropdown = autosugguest?.findDropdown();

        await waitFor(() => expect(dropdown?.findOptionByValue('Lambda')?.getElement()).toBeVisible());

        act(() => {
            userEvent.click(dropdown?.findOptionByValue('Lambda')?.getElement()!);
        });

        const multiSelect = wrapper(container).findMultiselect();

        act(() => {
            multiSelect?.openDropdown();
        });

        act(() => {
            multiSelect?.selectOptionByValue('EC2');
        });

        act(() => {
            multiSelect?.selectOptionByValue('Lambda');
            multiSelect?.closeDropdown();
            multiSelect?.blur();
        });

        act(() => {
            userEvent.type(screen.getByLabelText('Textarea'), stories.TEST_DATA.textarea);
            userEvent.type(screen.getByText('Switch'), stories.TEST_DATA.textarea);

            wrapper(container).findDatePicker()?.setInputValue('2022/01/01');
        });

        const dateRangePicker = wrapper(container).findDateRangePicker();

        act(() => {
            dateRangePicker?.openDropdown();
        });

        act(() => {
            userEvent.click(screen.getByLabelText('Last 5 minutes'));
        });

        await waitFor(() => expect(screen.getByLabelText('Last 5 minutes')).toBeChecked());

        act(() => {
            userEvent.click(screen.getByText('Apply'));
            userEvent.click(screen.getByLabelText('I understand the terms and condition'));
            userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(stories.TEST_DATA, expect.anything(), expect.anything());
    });

    it('should trigger validation', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(screen.queryAllByText('Required')).toHaveLength(11);
        expect(screen.getByText('please accept the terms and condition')).toBeVisible();
        expect(handleSubmit).not.toBeCalled();
    });

    it('should be populated with initial value', async () => {
        render(<WithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByLabelText('Email')).toHaveValue(stories.TEST_DATA.email);
        expect(screen.getByLabelText('Password')).toHaveValue(stories.TEST_DATA.password);
        expect(screen.getByLabelText('Number')).toHaveValue(stories.TEST_DATA.number);
        expect(screen.queryAllByLabelText('Option 1')![0]).toBeChecked();
        expect(screen.queryAllByLabelText('Option 2')![0]).toBeChecked();
        expect(screen.queryAllByLabelText('Option 3')![1]).toBeChecked();

        expect(screen.getAllByText('Option 2')[2].parentElement?.id).toBe('select');

        expect(screen.getByLabelText('Autosuggest')).toHaveValue(stories.TEST_DATA.autosugguest.label);

        expect(screen.getByText('EC2 - Amazon Elastic Compute Cloud')).toBeVisible();
        expect(screen.getByText('Lambda - Amazon Lambda')).toBeVisible();

        expect(screen.getByLabelText('Textarea')).toHaveValue(stories.TEST_DATA.textarea);

        expect(screen.getByLabelText('Switch')).toBeChecked();
        expect(screen.getByLabelText('Switch 1')).not.toBeChecked();
        expect(screen.getByLabelText('Switch 2')).not.toBeChecked();

        expect(screen.getByLabelText('Date picker')).toHaveValue('2022/01/01');

        expect(screen.getByLabelText('I understand the terms and condition')).toBeChecked();

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(stories.TEST_DATA, expect.any(Object), expect.any(Function));
    });

    it('should render form in submitting state', async () => {
        render(<Submitting onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('Submit').parentElement).toBeDisabled();
    });

    it('should reset the form when reset button is clicked', async () => {
        render(<Reset onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
        });

        expect(screen.getByLabelText('Email')).toHaveValue('test@test.com');

        await act(async () => {
            await userEvent.click(screen.getByText('Reset'));
        });

        expect(screen.getByLabelText('Email')).toHaveValue('');
    });

    it('should support custom validator', async () => {
        const mockValidationFn = jest.fn().mockReturnValue(true);

        const validatorMapping: ValidatorMapper = {
            custom: jest.fn(
                ({ threshold }: any) =>
                    (value: number) =>
                        mockValidationFn(threshold, value)
            ),
        };

        const schema = {
            header: 'Data driven form with custom validator',
            info: 'https://data-driven-forms.org/mappers/validator-mapper',
            fields: [
                {
                    component: componentTypes.TEXT_FIELD,
                    name: 'number',
                    label: 'Number',
                    type: 'number',
                    isRequired: true,
                    validate: [
                        {
                            type: 'custom',
                            threshold: 6,
                        },
                    ],
                },
            ],
        };

        render(
            <FormRenderer
                schema={schema}
                validatorMapper={validatorMapping}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        );

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Number'), '4');
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(mockValidationFn).lastCalledWith(6, '4');
    });
});
