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
import { REQUIRED_ATTRIBUTES, TEST_USER_ATTRIBUTES, MFA_CHALLENGE_PARAMS } from '../../fixtures';
import SignIn from '.';

const username = 'TestUsername';
const password = 'TestPassword';

const challengeName = 'SMS_MFA';

const mockAuthenticateUser = jest.fn();

jest.mock('amazon-cognito-identity-js', () => ({
    CognitoUser: jest.fn().mockImplementation(() => {
        return {
            authenticateUser: mockAuthenticateUser,
        };
    }),
    AuthenticationDetails: function (authDetails: any) {
        return authDetails;
    },
}));

describe('SignIn', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'debug').mockImplementation(() => {});
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
        (console.debug as jest.Mock).mockRestore();
    });

    afterEach(() => {
        mockAuthenticateUser.mockClear();
    });

    it('should handle onSuccess flow', async () => {
        mockAuthenticateUser.mockImplementation((authDetails, callback) => {
            expect(authDetails).toEqual({
                Username: username,
                Password: password,
            });
            callback.onSuccess();
        });

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();
        const handleForgotPassword = jest.fn();
        const handleNewPasswordRequired = jest.fn();

        await testAuthenciateUser(
            handleMFARequired,
            handleMFASetup,
            handleResetView,
            handleForgotPassword,
            handleNewPasswordRequired
        );
        expect(handleResetView).toHaveBeenCalled();
    });

    it('should handle onFailure flow', async () => {
        const errMsg = 'Error Message';

        mockAuthenticateUser.mockImplementation((authDetails, callback) => {
            expect(authDetails).toEqual({
                Username: username,
                Password: password,
            });
            callback.onFailure({
                message: errMsg,
            });
        });

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();
        const handleForgotPassword = jest.fn();
        const handleNewPasswordRequired = jest.fn();

        await testAuthenciateUser(
            handleMFARequired,
            handleMFASetup,
            handleResetView,
            handleForgotPassword,
            handleNewPasswordRequired
        );
        expect(screen.getByText(errMsg)).toBeVisible();
    });

    it('should handle mfaRequired flow', async () => {
        mockAuthenticateUser.mockImplementation((authDetails, callback) => {
            expect(authDetails).toEqual({
                Username: username,
                Password: password,
            });
            callback.mfaRequired(challengeName, MFA_CHALLENGE_PARAMS);
        });

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();
        const handleForgotPassword = jest.fn();
        const handleNewPasswordRequired = jest.fn();

        await testAuthenciateUser(
            handleMFARequired,
            handleMFASetup,
            handleResetView,
            handleForgotPassword,
            handleNewPasswordRequired
        );
        expect(handleMFARequired).toHaveBeenCalledWith(expect.any(Object), challengeName, MFA_CHALLENGE_PARAMS);
    });

    it('should handle totpRequired flow', async () => {
        mockAuthenticateUser.mockImplementation((authDetails, callback) => {
            expect(authDetails).toEqual({
                Username: username,
                Password: password,
            });
            callback.totpRequired(challengeName, MFA_CHALLENGE_PARAMS);
        });

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();
        const handleForgotPassword = jest.fn();
        const handleNewPasswordRequired = jest.fn();

        await testAuthenciateUser(
            handleMFARequired,
            handleMFASetup,
            handleResetView,
            handleForgotPassword,
            handleNewPasswordRequired
        );
        expect(handleMFARequired).toHaveBeenCalledWith(expect.any(Object), challengeName, MFA_CHALLENGE_PARAMS);
    });

    it('should handle mfaSetup flow', async () => {
        mockAuthenticateUser.mockImplementation((authDetails, callback) => {
            expect(authDetails).toEqual({
                Username: username,
                Password: password,
            });
            callback.mfaSetup(challengeName, MFA_CHALLENGE_PARAMS);
        });

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();
        const handleForgotPassword = jest.fn();
        const handleNewPasswordRequired = jest.fn();

        await testAuthenciateUser(
            handleMFARequired,
            handleMFASetup,
            handleResetView,
            handleForgotPassword,
            handleNewPasswordRequired
        );
        expect(handleMFASetup).toHaveBeenCalledWith(expect.any(Object), true, challengeName, MFA_CHALLENGE_PARAMS);
    });

    it('should handle selectMFAType flow', async () => {
        mockAuthenticateUser.mockImplementation((authDetails, callback) => {
            expect(authDetails).toEqual({
                Username: username,
                Password: password,
            });
            callback.selectMFAType(challengeName, MFA_CHALLENGE_PARAMS);
        });

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();
        const handleForgotPassword = jest.fn();
        const handleNewPasswordRequired = jest.fn();

        await testAuthenciateUser(
            handleMFARequired,
            handleMFASetup,
            handleResetView,
            handleForgotPassword,
            handleNewPasswordRequired
        );
        expect(handleMFASetup).toHaveBeenCalledWith(expect.any(Object), false, challengeName, MFA_CHALLENGE_PARAMS);
    });

    it('should handle newPasswordRequired flow', async () => {
        mockAuthenticateUser.mockImplementation((authDetails, callback) => {
            expect(authDetails).toEqual({
                Username: username,
                Password: password,
            });
            callback.newPasswordRequired(TEST_USER_ATTRIBUTES, REQUIRED_ATTRIBUTES);
        });

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();
        const handleForgotPassword = jest.fn();
        const handleNewPasswordRequired = jest.fn();

        await testAuthenciateUser(
            handleMFARequired,
            handleMFASetup,
            handleResetView,
            handleForgotPassword,
            handleNewPasswordRequired
        );
        expect(handleNewPasswordRequired).toHaveBeenCalledWith(
            expect.any(Object),
            TEST_USER_ATTRIBUTES,
            REQUIRED_ATTRIBUTES
        );
    });
});

const testAuthenciateUser = async (
    handleMFARequired: jest.Mock<any, any>,
    handleMFASetup: jest.Mock<any, any>,
    handleResetView: jest.Mock<any, any>,
    handleForgotPassword: jest.Mock<any, any>,
    handleNewPasswordRequired: jest.Mock<any, any>
) => {
    const userPool: any = {
        ClientId: 'TestClientId',
        UserPoolId: 'TestUserPoolId',
    };

    const { container } = render(
        <SignIn
            userPool={userPool}
            onMFARequired={handleMFARequired}
            onMFASetup={handleMFASetup}
            resetView={handleResetView}
            onForgotPassword={handleForgotPassword}
            onNewPasswordRequired={handleNewPasswordRequired}
        />
    );

    const submitBtn = wrapper(container).findButton("[type='submit']");
    act(() => {
        userEvent.type(screen.getByLabelText('Username'), username);
        userEvent.type(screen.getByLabelText('Password'), password);
        userEvent.click(screen.getByText('Sign in'));
    });

    expect(submitBtn?.findLoadingIndicator()).not.toBeNull();
    await waitFor(() => expect(submitBtn?.findLoadingIndicator()).toBeNull());

    expect(mockAuthenticateUser).toHaveBeenCalled();
};
