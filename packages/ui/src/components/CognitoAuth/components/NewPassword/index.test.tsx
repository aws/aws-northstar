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
import NewPassword from '.';

const password = 'Password';

const attrValues = {
    family_name: 'Name1',
    given_name: 'Name2',
};

const challengeName = 'SMS_MFA';

describe('NewPassword', () => {
    it('should handle onSuccess flow', async () => {
        const mockCognitoUser: any = {
            completeNewPasswordChallenge: jest.fn().mockImplementation((newPassword, attributes, callback) => {
                expect(newPassword).toBe(password);
                expect(attributes).toEqual(attrValues);
                callback.onSuccess();
            }),
        };

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();

        await testNewPasswordChallenge(handleMFARequired, handleMFASetup, handleResetView, mockCognitoUser);
        expect(handleResetView).toHaveBeenCalled();
    });

    it('should handle onFailure flow', async () => {
        const errMsg = 'Error Message';

        const mockCognitoUser: any = {
            completeNewPasswordChallenge: jest.fn().mockImplementation((newPassword, attributes, callback) => {
                expect(newPassword).toBe(password);
                expect(attributes).toEqual(attrValues);
                callback.onFailure({
                    message: errMsg,
                });
            }),
        };

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();

        await testNewPasswordChallenge(handleMFARequired, handleMFASetup, handleResetView, mockCognitoUser);

        expect(screen.getByText(errMsg)).toBeVisible();
    });

    it('should handle mfaSetup flow', async () => {
        const mockCognitoUser: any = {
            completeNewPasswordChallenge: jest.fn().mockImplementation((newPassword, attributes, callback) => {
                expect(newPassword).toBe(password);
                expect(attributes).toEqual(attrValues);
                callback.mfaSetup(challengeName, MFA_CHALLENGE_PARAMS);
            }),
        };

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();

        await testNewPasswordChallenge(handleMFARequired, handleMFASetup, handleResetView, mockCognitoUser);

        expect(handleMFASetup).toHaveBeenCalledWith(mockCognitoUser, challengeName, MFA_CHALLENGE_PARAMS);
    });

    it('should handle mfaRequired flow', async () => {
        const mockCognitoUser: any = {
            completeNewPasswordChallenge: jest.fn().mockImplementation((newPassword, attributes, callback) => {
                expect(newPassword).toBe(password);
                expect(attributes).toEqual(attrValues);
                callback.mfaRequired(challengeName, MFA_CHALLENGE_PARAMS);
            }),
        };

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();
        const handleMFASetup = jest.fn();

        await testNewPasswordChallenge(handleMFARequired, handleMFASetup, handleResetView, mockCognitoUser);

        expect(handleMFARequired).toHaveBeenCalledWith(mockCognitoUser, challengeName, MFA_CHALLENGE_PARAMS);
    });
});

const testNewPasswordChallenge = async (
    handleMFARequired: jest.Mock<any, any>,
    handleMFASetup: jest.Mock<any, any>,
    handleResetView: jest.Mock<any, any>,
    mockCognitoUser: any
) => {
    const { container } = render(
        <NewPassword
            cognitoUser={mockCognitoUser}
            requiredAttributes={REQUIRED_ATTRIBUTES}
            userAttributes={TEST_USER_ATTRIBUTES}
            onMFARequired={handleMFARequired}
            onMFASetup={handleMFASetup}
            resetView={handleResetView}
        />
    );

    const submitBtn = wrapper(container).findButton("[type='submit']");

    act(() => {
        userEvent.type(screen.getByLabelText('Password'), password);
        userEvent.type(screen.getByLabelText('Confirm Password'), password);
        userEvent.type(screen.getByLabelText('Family Name'), attrValues.family_name);
        userEvent.type(screen.getByLabelText('Given Name(s)'), attrValues.given_name);
        userEvent.click(screen.getByText('Confirm'));
    });

    expect(submitBtn?.findLoadingIndicator()).not.toBeNull();

    await waitFor(() => expect(submitBtn?.findLoadingIndicator()).toBeNull());

    expect(mockCognitoUser.completeNewPasswordChallenge).toHaveBeenCalledWith(password, attrValues, expect.any(Object));
};
