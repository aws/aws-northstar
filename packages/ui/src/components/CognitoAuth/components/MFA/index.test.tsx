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
import { MFA_CHALLENGE_PARAMS } from '../../fixtures';
import MFA from '.';

const challengeName = 'SMS_MFA';

const mfaCode = '123456';

describe('MFA', () => {
    it('should handle onSuccess flow', async () => {
        const mockCognitoUser: any = {
            sendMFACode: jest.fn().mockImplementation((mfaCode, callback) => {
                expect(mfaCode).toBe(mfaCode);
                callback.onSuccess();
            }),
        };

        const handleResetView = jest.fn();

        await testSendMFACode(handleResetView, mockCognitoUser);
        expect(handleResetView).toHaveBeenCalled();
    });

    it('should handle onFailure flow', async () => {
        const errMsg = 'Error Message';

        const mockCognitoUser: any = {
            sendMFACode: jest.fn().mockImplementation((mfaCode, callback) => {
                expect(mfaCode).toBe(mfaCode);
                callback.onFailure({
                    message: errMsg,
                });
            }),
        };

        const handleResetView = jest.fn();

        await testSendMFACode(handleResetView, mockCognitoUser);

        expect(await screen.findByText(errMsg)).toBeVisible();
    });
});

const testSendMFACode = async (handleResetView: jest.Mock<any, any>, mockCognitoUser: any) => {
    render(
        <MFA
            cognitoUser={mockCognitoUser}
            resetView={handleResetView}
            challengeName={challengeName}
            challengeParams={MFA_CHALLENGE_PARAMS}
        />
    );

    act(() => {
        userEvent.type(screen.getByLabelText('Code'), mfaCode);
        userEvent.click(screen.getByText('Confirm'));
    });

    expect(mockCognitoUser.sendMFACode).toHaveBeenCalledWith(mfaCode, expect.any(Object));
};
