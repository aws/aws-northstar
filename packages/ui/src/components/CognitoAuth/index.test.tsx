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
import { render, screen, act } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from './index.stories';
import CognitoAuth from '.';
import { MFA_SETUP_CHALLENGE_PARAM, REQUIRED_SIGNUP_ATTRIBUTES } from './fixtures';

const { CognitoAuthFlow } = composeStories(stories);
const mockGetCurrentUser = jest.fn();
const mockAuthenticateUser = jest.fn();
const mockCompleteNewPasswordChallenge = jest.fn();
const mockSendMFACode = jest.fn();
const mockAssociateSoftwareToken = jest.fn();
const mockVerifySoftwareToken = jest.fn();

jest.mock('amazon-cognito-identity-js', () => ({
    CognitoUserPool: jest.fn().mockImplementation(() => {
        return {
            getCurrentUser: mockGetCurrentUser,
        };
    }),
    CognitoUser: jest.fn().mockImplementation(() => {
        return {
            authenticateUser: mockAuthenticateUser,
            completeNewPasswordChallenge: mockCompleteNewPasswordChallenge,
            sendMFACode: mockSendMFACode,
            associateSoftwareToken: mockAssociateSoftwareToken,
            verifySoftwareToken: mockVerifySoftwareToken,
        };
    }),
    AuthenticationDetails: function (authDetails: any) {
        return authDetails;
    },
}));

describe('CognitoAuth', () => {
    afterEach(() => {
        mockGetCurrentUser.mockReset();
        mockAuthenticateUser.mockReset();
        mockCompleteNewPasswordChallenge.mockReset();
        mockSendMFACode.mockReset();
        mockAssociateSoftwareToken.mockReset();
        mockVerifySoftwareToken.mockReset();
    });

    it('should render error message when userPooId or AppClientId is not provide', async () => {
        render(<CognitoAuth clientId="" userPoolId="" />);
        expect(screen.getByText('Missing or invalid Cognito User Pool Id or App Client Id.')).toBeVisible();
    });

    it('should render main content when user has signed in', async () => {
        const currentUser = {};
        mockGetCurrentUser.mockReturnValue(currentUser);
        render(
            <CognitoAuth clientId="TestClientId" userPoolId="TestUserPoolId">
                Main Content
            </CognitoAuth>
        );
        expect(screen.getByText('Main Content')).toBeVisible();
    });

    it('should render main content when user has signed in', async () => {
        const mockHandleSignOut = jest.fn();
        const currentUser = {
            getUsername: () => 'TestUserName',
            signOut: mockHandleSignOut,
        };
        mockGetCurrentUser.mockReturnValue(currentUser);
        render(<CognitoAuthFlow clientId="TestClientId" userPoolId="TestUserPoolId" />);
        expect(screen.getByText('Hello TestUserName')).toBeVisible();

        act(() => {
            userEvent.click(screen.getByText('Sign Out'));
        });

        expect(mockHandleSignOut).toHaveBeenCalled();
    });

    it('should render sign in form when user has not signed in yet', async () => {
        render(
            <CognitoAuth clientId="TestClientId" userPoolId="TestUserPoolId">
                Main Content
            </CognitoAuth>
        );
        expect(screen.getByTestId('sign-in-form')).toBeVisible();
    });

    it('should handle simple sign in flow', async () => {
        mockAuthenticateUser.mockImplementation((_authDetail, callback) => {
            callback.onSuccess();
        });

        render(
            <CognitoAuth clientId="TestClientId" userPoolId="TestUserPoolId">
                Main Content
            </CognitoAuth>
        );
        expect(screen.queryByText('Main Content')).toBeNull();

        signIn(() => {
            mockGetCurrentUser.mockReturnValue({});
        });

        expect(await screen.findByText('Main Content')).toBeVisible();
    });

    it('should handle NewPasswordRequired flow', async () => {
        mockAuthenticateUser.mockImplementation((_authDetail, callback) => {
            callback.newPasswordRequired();
        });

        mockCompleteNewPasswordChallenge.mockImplementation((_newPassword, _attributes, callback) => {
            callback.onSuccess();
        });

        render(
            <CognitoAuth clientId="TestClientId" userPoolId="TestUserPoolId">
                Main Content
            </CognitoAuth>
        );
        expect(screen.queryByText('Main Content')).toBeNull();

        signIn();

        expect(screen.queryByText('Main Content')).toBeNull();

        setNewPassword(() => {
            mockGetCurrentUser.mockReturnValue({});
        });

        expect(await screen.findByText('Main Content')).toBeVisible();
    });

    it('should handle MFARequired flow', async () => {
        mockAuthenticateUser.mockImplementation((_authDetail, callback) => {
            callback.mfaRequired();
        });

        mockSendMFACode.mockImplementation((_mfaCode, callback) => {
            callback.onSuccess();
        });

        render(
            <CognitoAuth clientId="TestClientId" userPoolId="TestUserPoolId">
                Main Content
            </CognitoAuth>
        );
        expect(screen.queryByText('Main Content')).toBeNull();

        signIn();

        expect(screen.queryByText('Main Content')).toBeNull();

        inputMfa(() => {
            mockGetCurrentUser.mockReturnValue({});
        });

        expect(await screen.findByText('Main Content')).toBeVisible();
    });

    it('should handle MFASetup flow', async () => {
        mockAuthenticateUser.mockImplementation((_authDetail, callback) => {
            callback.mfaSetup('MFA_SETUP', MFA_SETUP_CHALLENGE_PARAM);
        });

        mockAssociateSoftwareToken.mockImplementation((callback) => {
            callback.associateSecretCode('12345678');
        });

        mockVerifySoftwareToken.mockImplementation((_mfaCode, _, callback) => {
            callback.onSuccess();
        });

        render(
            <CognitoAuth clientId="TestClientId" userPoolId="TestUserPoolId">
                Main Content
            </CognitoAuth>
        );
        expect(screen.queryByText('Main Content')).toBeNull();

        signIn();

        expect(screen.queryByText('Main Content')).toBeNull();

        setupMFA();

        expect(screen.queryByText('Main Content')).toBeNull();

        inputTotp(() => {
            mockGetCurrentUser.mockReturnValue({});
        });

        expect(await screen.findByText('Main Content')).toBeVisible();
    });

    it('should render ForgotPassword form', async () => {
        render(
            <CognitoAuth clientId="TestClientId" userPoolId="TestUserPoolId">
                Main Content
            </CognitoAuth>
        );

        expect(screen.getByTestId('sign-in-form')).toBeVisible();

        act(() => {
            userEvent.click(screen.getByText('Forgot your password?'));
        });

        expect(screen.getByText('Reset Password')).toBeVisible();
    });

    it('should render SignUp form', async () => {
        render(
            <CognitoAuth
                clientId="TestClientId"
                userPoolId="TestUserPoolId"
                allowSignup={true}
                requiredSignUpAttributes={REQUIRED_SIGNUP_ATTRIBUTES}
            >
                Main Content
            </CognitoAuth>
        );

        expect(screen.getByTestId('sign-in-form')).toBeVisible();
        expect(screen.queryByTestId('sign-up-form')).toBeNull();

        act(() => {
            userEvent.click(screen.getByText('Sign Up'));
        });

        expect(screen.queryByTestId('sign-in-form')).toBeNull();
        expect(screen.getByTestId('sign-up-form')).toBeVisible();
    });
});

const signIn = (preSubmitCallback?: () => void) => {
    act(() => {
        userEvent.type(screen.getByLabelText('Username'), 'TestUsername');
        userEvent.type(screen.getByLabelText('Password'), 'TestPassword');
    });

    preSubmitCallback?.();

    act(() => {
        userEvent.click(screen.getByText('Sign in'));
    });
};

const setNewPassword = (preSubmitCallback?: () => void) => {
    act(() => {
        userEvent.type(screen.getByLabelText('Password'), 'NewPassword');
        userEvent.type(screen.getByLabelText('Confirm Password'), 'NewPassword');
    });

    preSubmitCallback?.();

    act(() => {
        userEvent.click(screen.getByText('Confirm'));
    });
};

const inputMfa = (preSubmitCallback?: () => void) => {
    act(() => {
        userEvent.type(screen.getByLabelText('Code'), '123456');
    });

    preSubmitCallback?.();

    act(() => {
        userEvent.click(screen.getByText('Confirm'));
    });
};

const setupMFA = () => {
    act(() => {
        userEvent.click(screen.getByText('Authenticator app'));
        userEvent.click(screen.getByText('Continue'));
    });
};

const inputTotp = (preSubmitCallback?: () => void) => {
    act(() => {
        userEvent.type(screen.getByLabelText('Code'), '123456');
    });

    preSubmitCallback?.();

    act(() => {
        userEvent.click(screen.getByText('Continue'));
    });
};
