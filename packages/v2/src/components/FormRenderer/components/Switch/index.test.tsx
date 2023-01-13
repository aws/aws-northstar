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

const { Default, DefaultSwitchOn, Disabled } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('Switch', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render switch', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('This is description')).toBeVisible();
        expect(screen.getByText('This is helper text')).toBeVisible();

        await act(async () => {
            await userEvent.click(screen.getByLabelText('Switch'));
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith({ switch: true }, expect.any(Object), expect.any(Function));
    });

    it('should be populated with initial value', async () => {
        render(<DefaultSwitchOn onSubmit={handleSubmit} onCancel={handleCancel} />);

        const parent = screen.getByLabelText('Switch').parentElement;

        expect(parent?.className).toContain('-checked');

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith({ switch: true }, expect.any(Object), expect.any(Function));
    });

    it('should pass isDisabled prop', async () => {
        render(<Disabled onSubmit={handleSubmit} onCancel={handleCancel} />);

        const parent = screen.getByLabelText('Switch').parentElement;

        expect(parent?.className).toContain('-disabled');
    });
});
