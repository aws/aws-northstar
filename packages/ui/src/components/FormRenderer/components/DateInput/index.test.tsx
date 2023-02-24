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
import wrapper from '@cloudscape-design/components/test-utils/dom';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';

const { Default, WithInitialValue } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('DateInput', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render date input', async () => {
        const { container } = render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('This is description')).toBeVisible();
        expect(screen.getByText('This is helper text')).toBeVisible();

        expect(screen.getByPlaceholderText('YYYY/MM/DD')).toBeVisible();

        const dateInput = wrapper(container).findDateInput();
        await act(async () => {
            dateInput?.setInputValue('2022/02/01');
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith({ date: '2022-02-01' }, expect.any(Object), expect.any(Function));
    });

    it('should trigger validation', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(screen.getByText('Required')).toBeVisible();
        expect(handleSubmit).not.toBeCalled();
    });

    it('should be populated with initial value', async () => {
        render(<WithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByPlaceholderText('YYYY/MM/DD')).toHaveValue('2022/02/01');

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith({ date: '2022-02-01' }, expect.any(Object), expect.any(Function));
    });
});
