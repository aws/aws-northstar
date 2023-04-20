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

const { Default } = composeStories(stories);

describe('ForgotPassword', () => {
    it('should render ResetPassword form', async () => {
        const handleResetPassword = jest.fn();
        render(<Default onResetPassword={handleResetPassword} />);

        expect(screen.getByText('A verification code has been sent to: t***@t***')).toBeVisible();

        act(() => {
            userEvent.type(screen.getByLabelText('Password'), 'NewPassword');
            userEvent.type(screen.getByLabelText('Confirm Password'), 'NewPassword');
            userEvent.type(screen.getByLabelText('Code'), '123456');
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(handleResetPassword).toHaveBeenCalledWith({
            verificationCode: '123456',
            password: 'NewPassword',
            confirmPassword: 'NewPassword',
        });
    });

    it('should validate 2 passwords match', async () => {
        const handleResetPassword = jest.fn();
        render(<Default onResetPassword={handleResetPassword} />);
        act(() => {
            userEvent.type(screen.getByLabelText('Password'), 'Password1');
            userEvent.type(screen.getByLabelText('Confirm Password'), 'Password2');
            userEvent.type(screen.getByLabelText('Code'), '123456');
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(screen.getByText('Passwords do NOT match')).toBeVisible();
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
