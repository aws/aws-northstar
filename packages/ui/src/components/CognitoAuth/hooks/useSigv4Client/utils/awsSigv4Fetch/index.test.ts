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
import { createSignedFetcher } from '.';
import crossFetch from 'cross-fetch';

const testRegion = 'ap-southeast-2';
const testCredentials: any = 'testCredentials';

const mockSign = jest.fn();

jest.mock('cross-fetch', () => ({
    ...jest.requireActual('cross-fetch'),
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('@aws-sdk/signature-v4', () => ({
    SignatureV4: jest.fn().mockImplementation(() => {
        return {
            sign: mockSign,
        };
    }),
}));

const testHeaders = 'testHeaders';
const testBody = 'testBody';
const testMethod = 'testMethod';
const testUrl = 'http://test.com/test?name=value';

describe('createSignedFetcher', () => {
    beforeEach(() => {
        (crossFetch as jest.Mock).mockReset();
        mockSign.mockReset();
    });

    it('should handle Get request', async () => {
        mockSign.mockResolvedValue({
            headers: testHeaders,
            body: testBody,
            method: testMethod,
        });

        const fetch = await createSignedFetcher({
            service: 'execute-api',
            region: testRegion,
            credentials: testCredentials,
        });

        await fetch(testUrl);

        expect(mockSign).toHaveBeenCalledWith({
            hostname: 'test.com',
            path: '/test',
            protocol: 'http:',
            method: 'GET',
            port: undefined,
            query: {
                name: 'value',
            },
            body: undefined,
            headers: {
                host: 'test.com',
            },
        });

        expect(crossFetch).toHaveBeenCalledWith(testUrl, {
            headers: testHeaders,
            body: testBody,
            method: testMethod,
        });
    });

    it('should handle Post request', async () => {
        mockSign.mockResolvedValue({
            headers: testHeaders,
            body: testBody,
            method: testMethod,
        });

        const fetch = await createSignedFetcher({
            service: 'execute-api',
            region: testRegion,
            credentials: testCredentials,
        });

        await fetch(testUrl, {
            method: 'POST',
            body: testBody,
            headers: {
                key1: 'value1',
            },
        });

        expect(mockSign).toHaveBeenCalledWith({
            hostname: 'test.com',
            path: '/test',
            protocol: 'http:',
            method: 'POST',
            port: undefined,
            query: {
                name: 'value',
            },
            body: testBody,
            headers: {
                host: 'test.com',
                key1: 'value1',
            },
        });

        expect(crossFetch).toHaveBeenCalledWith(testUrl, {
            headers: testHeaders,
            body: testBody,
            method: testMethod,
        });
    });
});
