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
import { render, act, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from './index.stories';

const { Default, WithRequiredAttributes } = composeStories(stories);

describe('NewPassword', () => {
    it('should render NewPassword form', async () => {
        const handleChangePassword = jest.fn().mockResolvedValue({});
        const handleBackToSignIn = jest.fn();
        render(<Default onChangePassword={handleChangePassword} onBackToSignIn={handleBackToSignIn} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Password'), 'Password');
            userEvent.type(screen.getByLabelText('Confirm Password'), 'Password');
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(handleChangePassword).toHaveBeenCalledWith({
            password: 'Password',
            confirmPassword: 'Password',
        });
    });

    it('should trigger validation', async () => {
        const handleChangePassword = jest.fn();
        const handleBackToSignIn = jest.fn();
        render(<Default onChangePassword={handleChangePassword} onBackToSignIn={handleBackToSignIn} />);

        act(() => {
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(screen.queryAllByText('Required')).toHaveLength(2);
    });

    it('should validate 2 passwords match', async () => {
        const handleChangePassword = jest.fn();
        const handleBackToSignIn = jest.fn();
        render(<Default onChangePassword={handleChangePassword} onBackToSignIn={handleBackToSignIn} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Password'), 'Password1');
            userEvent.type(screen.getByLabelText('Confirm Password'), 'Password2');
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(screen.getByText('Passwords do NOT match')).toBeVisible();
    });

    it('should render required attributes', async () => {
        const handleChangePassword = jest.fn().mockResolvedValue({});
        const handleBackToSignIn = jest.fn();
        render(<WithRequiredAttributes onChangePassword={handleChangePassword} onBackToSignIn={handleBackToSignIn} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Password'), 'Password');
            userEvent.type(screen.getByLabelText('Confirm Password'), 'Password');
            userEvent.type(screen.getByLabelText('Family Name'), 'Name1');
            userEvent.type(screen.getByLabelText('Given Name(s)'), 'Name2');
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(handleChangePassword).toHaveBeenCalledWith({
            password: 'Password',
            confirmPassword: 'Password',
            attributes: {
                family_name: 'Name1',
                given_name: 'Name2',
            },
        });
    });

    it('should handle Back to Sign In button click', async () => {
        const handleBackToSignIn = jest.fn();
        render(<Default onBackToSignIn={handleBackToSignIn} />);

        act(() => {
            userEvent.click(screen.getByText('Back to Sign In'));
        });

        expect(handleBackToSignIn).toHaveBeenCalled();
    });
});
