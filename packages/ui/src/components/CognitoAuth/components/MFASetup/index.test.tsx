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
import MFASetup from '.';
import { MFA_CHALLENGE_PARAMS, MFA_SETUP_CHALLENGE_PARAM } from '../../fixtures';

const challengeName = 'SMS_MFA';
const secretCode = '12345678';

describe('MFASetup', () => {
    it('should handle SMS_MFA flow', async () => {
        const mockCognitoUser: any = {
            sendMFASelectionAnswer: jest.fn().mockImplementation((mfaMethod, callback) => {
                expect(mfaMethod).toBe('SMS_MFA');
                callback.mfaRequired(challengeName, MFA_CHALLENGE_PARAMS);
            }),
        };

        const handleResetView = jest.fn();
        const handleAssociateSecretCode = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(
            handleAssociateSecretCode,
            handleMFARequired,
            handleResetView,
            mockCognitoUser,
            'SMS',
            false
        );
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
        const handleAssociateSecretCode = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(
            handleAssociateSecretCode,
            handleMFARequired,
            handleResetView,
            mockCognitoUser,
            'Authenticator app',
            false
        );

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
        const handleAssociateSecretCode = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(
            handleAssociateSecretCode,
            handleMFARequired,
            handleResetView,
            mockCognitoUser,
            'Authenticator app',
            false
        );

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
        const handleAssociateSecretCode = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(
            handleAssociateSecretCode,
            handleMFARequired,
            handleResetView,
            mockCognitoUser,
            'Authenticator app',
            false
        );

        expect(await screen.findByText(errMsg)).toBeVisible();
    });

    it('should handle SOFTWARE_TOKEN_MFA setup flow', async () => {
        const mockCognitoUser: any = {
            associateSoftwareToken: jest.fn().mockImplementation((callback) => {
                callback.associateSecretCode(secretCode);
            }),
        };

        const handleResetView = jest.fn();
        const handleAssociateSecretCode = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(
            handleAssociateSecretCode,
            handleMFARequired,
            handleResetView,
            mockCognitoUser,
            'Authenticator app',
            true
        );

        expect(handleAssociateSecretCode).toHaveBeenCalledWith(mockCognitoUser, secretCode);
    });
});

const testMFASetup = async (
    handleAssociateSecretCode: jest.Mock<any, any>,
    handleMFARequired: jest.Mock<any, any>,
    handleResetView: jest.Mock<any, any>,
    mockCognitoUser: any,
    mfaMethod: string,
    setupMode: boolean
) => {
    render(
        <MFASetup
            cognitoUser={mockCognitoUser}
            resetView={handleResetView}
            challengeName={setupMode ? 'MFA_SETUP' : 'SELECT_MFA_TYPE'}
            challengeParams={MFA_SETUP_CHALLENGE_PARAM}
            onAssociateSecretCode={handleAssociateSecretCode}
            onMFARequired={handleMFARequired}
            setupMode={setupMode}
        />
    );

    act(() => {
        userEvent.click(screen.getByText(mfaMethod));
        userEvent.click(screen.getByText('Continue'));
    });
};
