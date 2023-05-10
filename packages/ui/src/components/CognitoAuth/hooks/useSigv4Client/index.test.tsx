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
import useSigv4Client from '.';
import { renderHook } from '@testing-library/react-hooks';

const mockGetAuthenticatedUser = jest.fn();
const mockFetcher = jest.fn();
const testRegion = 'ap-southeast-2';
const testIdentityPoolId = 'testIdentityPoolId';
const testUserPoolId = 'testUserPoolId';
const testUrl = 'http://test.com';
const testOption = {
    method: 'POST',
};

jest.mock('../../context', () => ({
    useCognitoAuthContext: jest.fn().mockImplementation(() => {
        return {
            getAuthenticatedUser: mockGetAuthenticatedUser,
            region: testRegion,
            identityPoolId: testIdentityPoolId,
            userPoolId: testUserPoolId,
        };
    }),
}));
jest.mock('./utils/awsSigv4Fetch', () => ({
    createSignedFetcher: jest.fn().mockImplementation(() => mockFetcher),
}));

jest.mock('./utils/getCredentials', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue('mockGetCredentialsResult'),
}));

describe('useSigv4Client', () => {
    afterEach(() => {
        mockGetAuthenticatedUser.mockReset();
    });

    it('should return fetch client', async () => {
        mockGetAuthenticatedUser.mockReturnValue('testCognitoUser');
        const { result } = renderHook(() => useSigv4Client());

        await result.current(testUrl, testOption);

        expect(mockFetcher).toHaveBeenCalledWith(testUrl, testOption);
    });

    it('should throw error', async () => {
        mockGetAuthenticatedUser.mockReturnValue(undefined);
        const { result } = renderHook(() => useSigv4Client());

        await expect(result.current(testUrl, testOption)).rejects.toThrow('CognitoUser is empty');
    });
});
