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
import { render, act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import ForgotPassword from '.';
import { FORGOT_PASSWORD_DATA } from '../../fixtures';

const mockConfirmPassword = jest.fn();
const mockForgotPassword = jest.fn();

jest.mock('amazon-cognito-identity-js', () => ({
    CognitoUser: jest.fn().mockImplementation(() => {
        return {
            confirmPassword: mockConfirmPassword,
            forgotPassword: mockForgotPassword,
        };
    }),
}));

const username = 'TestUsername';
const password = 'NewPassword';
const verificationCode = '123456';
const userPool: any = {
    ClientId: 'TestClientId',
    UserPoolId: 'TestUserPoolId',
};
const data = FORGOT_PASSWORD_DATA;

describe('ForgetPassword', () => {
    afterEach(() => {
        mockConfirmPassword.mockReset();
        mockForgotPassword.mockReset();
    });

    it('should handle onSuccess flow', async () => {
        mockConfirmPassword.mockImplementation((code, newPassword, callback) => {
            expect(code).toBe(verificationCode);
            expect(newPassword).toBe(password);
            callback.onSuccess();
        });

        mockForgotPassword.mockImplementation((callback) => {
            callback.onSuccess(data);
        });

        const handleResetView = jest.fn();

        const { container } = render(<ForgotPassword userPool={userPool} resetView={handleResetView} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Username'), username);
            userEvent.click(screen.getByText('Send code'));
        });

        expect(screen.getByText('Reset Password')).toBeVisible();
        expect(screen.getByText('A verification code has been sent to: t***@t***')).toBeVisible();

        act(() => {
            userEvent.type(screen.getByLabelText('Code'), verificationCode);
            userEvent.type(screen.getByLabelText('Password'), password);
            userEvent.type(screen.getByLabelText('Confirm Password'), password);
            userEvent.click(screen.getByText('Confirm'));
        });

        const submitBtn = wrapper(container).findButton("[type='submit']");
        expect(submitBtn?.findLoadingIndicator()).not.toBeNull();
        await waitFor(() => expect(submitBtn?.findLoadingIndicator()).toBeNull());

        expect(handleResetView).toHaveBeenCalled();
    });

    it('should handle forgotPassword onFailure flow', async () => {
        const errMsg = 'Error Message';

        mockForgotPassword.mockImplementation((callback) => {
            callback.onFailure({
                message: errMsg,
            });
        });

        const handleResetView = jest.fn();

        render(<ForgotPassword userPool={userPool} resetView={handleResetView} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Username'), username);
            userEvent.click(screen.getByText('Send code'));
        });

        expect(await screen.findByText(errMsg)).toBeVisible();
    });

    it('should handle confirmPassword onFailure flow', async () => {
        const errMsg = 'Error Message';

        mockForgotPassword.mockImplementation((callback) => {
            callback.onSuccess(data);
        });

        mockConfirmPassword.mockImplementation((code, newPassword, callback) => {
            expect(code).toBe(verificationCode);
            expect(newPassword).toBe(password);
            callback.onFailure({
                message: errMsg,
            });
        });

        const handleResetView = jest.fn();

        const { container } = render(<ForgotPassword userPool={userPool} resetView={handleResetView} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Username'), username);
            userEvent.click(screen.getByText('Send code'));
        });

        expect(screen.getByText('Reset Password')).toBeVisible();

        act(() => {
            userEvent.type(screen.getByLabelText('Code'), verificationCode);
            userEvent.type(screen.getByLabelText('Password'), password);
            userEvent.type(screen.getByLabelText('Confirm Password'), password);
            userEvent.click(screen.getByText('Confirm'));
        });

        const submitBtn = wrapper(container).findButton("[type='submit']");
        expect(submitBtn?.findLoadingIndicator()).not.toBeNull();
        await waitFor(() => expect(submitBtn?.findLoadingIndicator()).toBeNull());

        expect(await screen.getByText(errMsg)).toBeVisible();
    });
});
