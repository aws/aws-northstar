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
import { render, screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';
import { TEST_DATA } from './tests/playFormRenderDefault';

const { Default, WithInitialValue } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('FormRenderer', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render form with controls', async () => {
        jest.setTimeout(10000);

        const { container } = render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);
        await act(() => {
            Default.play({
                args: {
                    onSubmit: handleSubmit,
                    onCancel: handleCancel,
                },
                canvasElement: container,
            });
        });
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

        expect(screen.getByLabelText('Email')).toHaveValue(TEST_DATA.email);
        expect(screen.getByLabelText('Password')).toHaveValue(TEST_DATA.password);
        expect(screen.getByLabelText('Number')).toHaveValue(TEST_DATA.number);
        expect(screen.queryAllByLabelText('Option 1')![0]).toBeChecked();
        expect(screen.queryAllByLabelText('Option 2')![0]).toBeChecked();
        expect(screen.queryAllByLabelText('Option 3')![1]).toBeChecked();

        expect(screen.getAllByText('Option 2')[2].parentElement?.id).toBe('select');

        expect(screen.getByLabelText('Autosuggest')).toHaveValue(TEST_DATA.autosugguest.label);

        expect(screen.getByText('EC2 - Amazon Elastic Compute Cloud')).toBeVisible();
        expect(screen.getByText('Lambda - Amazon Lambda')).toBeVisible();

        expect(screen.getByLabelText('Textarea')).toHaveValue(TEST_DATA.textarea);

        expect(screen.getByLabelText('Switch')).toBeChecked();
        expect(screen.getByLabelText('Switch 1')).not.toBeChecked();
        expect(screen.getByLabelText('Switch 2')).not.toBeChecked();

        expect(screen.getByLabelText('Date picker')).toHaveValue('2022/01/01');

        expect(screen.getByLabelText('I understand the terms and condition')).toBeChecked();

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(TEST_DATA, expect.any(Object), expect.any(Function));
    });
});
