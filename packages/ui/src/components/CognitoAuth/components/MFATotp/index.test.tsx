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
import MFATotp from '.';

const mfaCode = '123456';
const secretCode = '12345678';

describe('MFATotp', () => {
    it('should handle onSuccess flow', async () => {
        const mockCognitoUser: any = {
            verifySoftwareToken: jest.fn().mockImplementation((mfaCode, _deviceName, callback) => {
                expect(mfaCode).toBe(mfaCode);
                callback.onSuccess();
            }),
        };

        const handleResetView = jest.fn();

        await testVerifySoftwareToken(handleResetView, mockCognitoUser);
        expect(handleResetView).toHaveBeenCalled();
    });

    it('should handle onFailure flow', async () => {
        const errMsg = 'Error Message';

        const mockCognitoUser: any = {
            verifySoftwareToken: jest.fn().mockImplementation((mfaCode, _deviceName, callback) => {
                expect(mfaCode).toBe(mfaCode);
                callback.onFailure({
                    message: errMsg,
                });
            }),
        };

        const handleResetView = jest.fn();

        await testVerifySoftwareToken(handleResetView, mockCognitoUser);

        expect(await screen.findByText(errMsg)).toBeVisible();
    });
});

const testVerifySoftwareToken = async (handleResetView: jest.Mock<any, any>, mockCognitoUser: any) => {
    render(<MFATotp cognitoUser={mockCognitoUser} secretCode={secretCode} resetView={handleResetView} />);

    act(() => {
        userEvent.type(screen.getByLabelText('Code'), mfaCode);
        userEvent.click(screen.getByText('Continue'));
    });

    expect(mockCognitoUser.verifySoftwareToken).toHaveBeenCalledWith(mfaCode, '', expect.any(Object));
};
