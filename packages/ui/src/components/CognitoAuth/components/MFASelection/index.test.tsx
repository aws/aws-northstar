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
import userEvent from '@testing-library/user-event';
import MFASelection from '.';
import { MFA_CHALLENGE_PARAMS, MFA_SELECTION_CHALLENGE_PARAM } from '../../fixtures';

const challengeName = 'SMS_MFA';

describe('MFASetup', () => {
    it('should handle SMS_MFA flow', async () => {
        const mockCognitoUser: any = {
            sendMFASelectionAnswer: jest.fn().mockImplementation((mfaMethod, callback) => {
                expect(mfaMethod).toBe('SMS_MFA');
                callback.mfaRequired(challengeName, MFA_CHALLENGE_PARAMS);
            }),
        };

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(handleMFARequired, handleResetView, mockCognitoUser, 'SMS');
        expect(handleMFARequired).toHaveBeenCalledWith(mockCognitoUser, challengeName, MFA_CHALLENGE_PARAMS);
    });

    it('should handle SOFTWARE_TOKEN_MFA flow', async () => {
        const mockCognitoUser: any = {
            sendMFASelectionAnswer: jest.fn().mockImplementation((mfaMethod, callback) => {
                expect(mfaMethod).toBe('SOFTWARE_TOKEN_MFA');
                callback.totpRequired(challengeName, MFA_CHALLENGE_PARAMS);
            }),
        };

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(handleMFARequired, handleResetView, mockCognitoUser, 'Authenticator app');

        expect(handleMFARequired).toHaveBeenCalled();
    });

    it('should handle sendMFASelectionAnswer onSuccess flow', async () => {
        const mockCognitoUser: any = {
            sendMFASelectionAnswer: jest.fn().mockImplementation((mfaMethod, callback) => {
                expect(mfaMethod).toBe('SOFTWARE_TOKEN_MFA');
                callback.onSuccess();
            }),
        };

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(handleMFARequired, handleResetView, mockCognitoUser, 'Authenticator app');

        expect(handleResetView).toHaveBeenCalled();
    });

    it('should handle sendMFASelectionAnswer onFailure flow', async () => {
        const errMsg = 'Error Message';

        const mockCognitoUser: any = {
            sendMFASelectionAnswer: jest.fn().mockImplementation((mfaMethod, callback) => {
                expect(mfaMethod).toBe('SOFTWARE_TOKEN_MFA');
                callback.onFailure({
                    message: errMsg,
                });
            }),
        };

        const handleResetView = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(handleMFARequired, handleResetView, mockCognitoUser, 'Authenticator app');

        expect(await screen.findByText(errMsg)).toBeVisible();
    });
});

const testMFASetup = async (
    handleMFARequired: jest.Mock<any, any>,
    handleResetView: jest.Mock<any, any>,
    mockCognitoUser: any,
    mfaMethod: string
) => {
    render(
        <MFASelection
            cognitoUser={mockCognitoUser}
            resetView={handleResetView}
            challengeName="SELECT_MFA_TYPE"
            challengeParams={MFA_SELECTION_CHALLENGE_PARAM}
            onMFARequired={handleMFARequired}
        />
    );

    act(() => {
        userEvent.click(screen.getByText(mfaMethod));
        userEvent.click(screen.getByText('Continue'));
    });
};
