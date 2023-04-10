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
import { Default } from '../MFASetupView/index.stories';
import MFASetup from '.';

const challengeName = 'SMS_MFA';
const secretCode = '12345678';

describe('MFASetup', () => {
    it('should handle SMS_MFA flow', async () => {
        const mockCognitoUser: any = {};

        const handleResetView = jest.fn();
        const handleAssociateSecretCode = jest.fn();
        const handleMFARequired = jest.fn();

        await testMFASetup(handleAssociateSecretCode, handleMFARequired, handleResetView, mockCognitoUser, 'SMS');
        expect(handleMFARequired).toHaveBeenCalledWith(mockCognitoUser, challengeName, Default.args?.challengeParams);
    });

    it('should handle SOFTWARE_TOKEN_MFA associateSecretCode flow', async () => {
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
            'Authenticator app'
        );

        expect(handleAssociateSecretCode).toHaveBeenCalled();
    });

    it('should handle SOFTWARE_TOKEN_MFA onFailure flow', async () => {
        const errMsg = 'Error Message';

        const mockCognitoUser: any = {
            associateSoftwareToken: jest.fn().mockImplementation((callback) => {
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
            'Authenticator app'
        );

        expect(await screen.findByText(errMsg)).toBeVisible();
    });
});

const testMFASetup = async (
    handleAssociateSecretCode: jest.Mock<any, any>,
    handleMFARequired: jest.Mock<any, any>,
    handleResetView: jest.Mock<any, any>,
    mockCognitoUser: any,
    mfaMethod: string
) => {
    render(
        <MFASetup
            cognitoUser={mockCognitoUser}
            resetView={handleResetView}
            challengeName={challengeName}
            challengeParams={Default.args?.challengeParams}
            onAssociateSecretCode={handleAssociateSecretCode}
            onMFARequired={handleMFARequired}
        />
    );

    act(() => {
        userEvent.click(screen.getByText(mfaMethod));
        userEvent.click(screen.getByText('Continue'));
    });
};
