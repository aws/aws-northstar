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
import getCredentials from '.';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

const testRegion = 'ap-southeast-2';
const testIdentityPoolId = 'testIdentityPoolId';
const testUserPoolId = 'testUserPoolId';

const mockCredentials = jest.fn();
const mockGetJwtToken = jest.fn().mockReturnValue('JWT Token');

const testCognitoUserSession: any = {
    getIdToken: jest.fn().mockImplementation(() => ({
        getJwtToken: mockGetJwtToken,
    })),
};

const testCognitoUser: any = {
    getSession: jest.fn().mockImplementation((callback) => callback(null, testCognitoUserSession)),
};

jest.mock('@aws-sdk/credential-provider-cognito-identity');

jest.mock('@aws-sdk/client-cognito-identity', () => ({
    CognitoIdentityClient: jest.fn().mockImplementation(() => {
        return {
            config: {
                credentials: mockCredentials,
            },
        };
    }),
}));

describe('getCredentials', () => {
    afterEach(() => {
        mockCredentials.mockReset();
        (fromCognitoIdentityPool as jest.Mock).mockReset();
    });

    it('should return credential', async () => {
        (fromCognitoIdentityPool as jest.Mock).mockReturnValue('fromCognitoIdentityPoolResponse');

        mockCredentials.mockResolvedValue('Credentials');

        const credential = await getCredentials(testCognitoUser, testRegion, testIdentityPoolId, testUserPoolId);
        expect(credential).toEqual('Credentials');
        expect(fromCognitoIdentityPool).toHaveBeenCalledWith({
            client: expect.any(Object),
            identityPoolId: testIdentityPoolId,
            logins: {
                'cognito-idp.ap-southeast-2.amazonaws.com/testUserPoolId': 'JWT Token',
            },
        });
    });

    it('should throw error if region is empty', async () => {
        const t = async () => {
            await getCredentials(testCognitoUser, undefined, testIdentityPoolId, testUserPoolId);
        };

        await expect(t()).rejects.toThrow('region is empty');
    });

    it('should throw error if identityPoolId is empty', async () => {
        const t = async () => {
            await getCredentials(testCognitoUser, testRegion, undefined, testUserPoolId);
        };

        await expect(t()).rejects.toThrow('identityPoolId is empty');
    });

    it('should throw error if userPoolId is empty', async () => {
        const t = async () => {
            await getCredentials(testCognitoUser, testRegion, testIdentityPoolId, undefined);
        };

        await expect(t()).rejects.toThrow('userPoolId is empty');
    });
});
