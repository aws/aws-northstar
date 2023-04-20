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
import SignUp from '.';
import { TEST_ATTRIBUTES } from '../SignUpView/index.test';
import { REQUIRED_SIGNUP_ATTRIBUTES, TEST_SIGNUP_RESULT } from '../../fixtures';

const testUsername = 'TestUsername';
const testPassword = 'TestPassword';
const testCode = '1234';

const mockConfirmRegistration = jest.fn();
const mockResendConfirmationCode = jest.fn();

jest.mock('amazon-cognito-identity-js', () => ({
    CognitoUserAttribute: function (attribute: any) {
        return attribute;
    },
    CognitoUser: jest.fn().mockImplementation(() => {
        return {
            confirmRegistration: mockConfirmRegistration,
            resendConfirmationCode: mockResendConfirmationCode,
        };
    }),
}));

describe('SignUp', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'debug').mockImplementation(() => {});
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
        (console.debug as jest.Mock).mockRestore();
    });

    afterEach(() => {
        mockConfirmRegistration.mockReset();
        mockResendConfirmationCode.mockReset();
    });

    it('should handle Success flow', async () => {
        const handleResetView = jest.fn();
        mockConfirmRegistration.mockImplementation((_data, _forceAliasCreation, callback) => {
            callback(undefined, 'SUCCESS');
        });

        testSignUp(handleResetView, (callback) => {
            callback(undefined, TEST_SIGNUP_RESULT);
        });

        expect(screen.getByText('Confirm Registration')).toBeVisible();

        testConfirmVerification();

        expect(mockConfirmRegistration).toHaveBeenCalledWith(testCode, true, expect.any(Function));
        expect(handleResetView).toHaveBeenCalled();
    });

    it('should handle signUp Failure flow', async () => {
        const errMsg = 'Error Message';

        const handleResetView = jest.fn();
        testSignUp(handleResetView, (callback) =>
            callback(
                {
                    message: errMsg,
                },
                undefined
            )
        );

        expect(await screen.findByText(errMsg)).toBeVisible();
    });

    it('should handle ConfirmRegistration Failure flow', async () => {
        const errMsg = 'Error Message';
        const handleResetView = jest.fn();
        mockConfirmRegistration.mockImplementation((_data, _forceAliasCreation, callback) => {
            callback(
                {
                    message: errMsg,
                },
                undefined
            );
        });

        testSignUp(handleResetView, (callback) => callback(undefined, TEST_SIGNUP_RESULT));

        expect(screen.getByText('Confirm Registration')).toBeVisible();

        testConfirmVerification();

        expect(await screen.findByText(errMsg)).toBeVisible();
    });

    it('should handle ResendCode flow', async () => {
        const handleResetView = jest.fn();
        mockConfirmRegistration.mockImplementation((_data, _forceAliasCreation, callback) => {
            callback(undefined, 'Success');
        });

        await testSignUp(handleResetView, (callback) => callback(undefined, 'Success'));

        expect(screen.getByText('Confirm Registration')).toBeVisible();

        act(() => {
            userEvent.type(screen.getByLabelText('Code'), testCode);
            userEvent.click(screen.getByText('Resend'));
        });

        expect(mockResendConfirmationCode).toHaveBeenCalled();
    });

    it('should handle ResendCode failure', async () => {
        const errMsg = 'Error Message';

        const handleResetView = jest.fn();
        mockConfirmRegistration.mockImplementation((_data, _forceAliasCreation, callback) => {
            callback(undefined, 'Success');
        });

        mockResendConfirmationCode.mockImplementation((callback) => {
            callback(
                {
                    message: errMsg,
                },
                undefined
            );
        });

        await testSignUp(handleResetView, (callback) => callback(undefined, 'Success'));

        expect(screen.getByText('Confirm Registration')).toBeVisible();

        act(() => {
            userEvent.type(screen.getByLabelText('Code'), testCode);
            userEvent.click(screen.getByText('Resend'));
        });

        expect(mockResendConfirmationCode).toHaveBeenCalled();
        expect(await screen.findByText(errMsg)).toBeVisible();
    });
});

const testSignUp = async (
    handleResetView: jest.Mock<any, any>,
    testCallback: (callback: (err: any, success: any) => void) => void
) => {
    const userPool: any = {
        signUp: jest.fn().mockImplementation((username, password, attributes, _, callback) => {
            expect(username).toBe(testUsername);
            expect(password).toBe(testPassword);
            expect(attributes).toEqual([
                {
                    Name: 'family_name',
                    Value: TEST_ATTRIBUTES.family_name,
                },
                {
                    Name: 'given_name',
                    Value: TEST_ATTRIBUTES.given_name,
                },
                {
                    Name: 'email',
                    Value: TEST_ATTRIBUTES.email,
                },
                {
                    Name: 'phone_number',
                    Value: TEST_ATTRIBUTES.phone_number,
                },
            ]);
            testCallback(callback);
        }),
    };

    const { container } = render(
        <SignUp userPool={userPool} resetView={handleResetView} attributes={REQUIRED_SIGNUP_ATTRIBUTES} />
    );

    act(() => {
        userEvent.type(screen.getByLabelText('Username'), testUsername);
        userEvent.type(screen.getByLabelText('Password'), testPassword);
        userEvent.type(screen.getByLabelText('Confirm Password'), testPassword);
        userEvent.type(screen.getByLabelText('Family Name'), TEST_ATTRIBUTES.family_name);
        userEvent.type(screen.getByLabelText('Given Name(s)'), TEST_ATTRIBUTES.given_name);
        userEvent.type(screen.getByLabelText('Email'), TEST_ATTRIBUTES.email);
        userEvent.type(screen.getByLabelText('Phone Number'), TEST_ATTRIBUTES.phone_number);
        userEvent.click(screen.getByText('Sign up'));
    });

    const submitBtn = wrapper(container).findButton("[type='submit']");
    await waitFor(() => expect(submitBtn?.findLoadingIndicator()).toBeNull());
};

const testConfirmVerification = () => {
    act(() => {
        userEvent.type(screen.getByLabelText('Code'), testCode);
        userEvent.click(screen.getByText('Confirm'));
    });
};
