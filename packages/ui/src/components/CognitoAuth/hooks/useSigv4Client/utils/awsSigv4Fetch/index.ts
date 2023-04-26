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
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { Sha256 } from '@aws-crypto/sha256-js';
import fetch, { Headers } from 'cross-fetch';
import { Provider, AwsCredentialIdentity } from '@aws-sdk/types';
import { parseQueryString } from '@aws-sdk/querystring-parser';

type SignedFetcherInit = {
    service: string;
    region?: string;
    credentials: AwsCredentialIdentity | Provider<AwsCredentialIdentity>;
};

type CreateSignedFetcher = (init: SignedFetcherInit) => typeof fetch;

export const createSignedFetcher: CreateSignedFetcher = ({
    service,
    region = 'us-east-1',
    credentials,
}): typeof fetch => {
    return async (input, init?) => {
        const url = new URL(typeof input === 'string' ? input : input instanceof URL ? input.href : input.url);

        const headers = new Map<string, string>();
        init?.headers && new Headers(init.headers).forEach((value, key) => headers.set(key, value));
        headers.set('host', url.host);

        const request = new HttpRequest({
            hostname: url.hostname,
            path: url.pathname,
            protocol: url.protocol,
            method: init?.method?.toUpperCase() || 'GET',
            body: init?.body,
            query: parseQueryString(url.search),
            headers: Object.fromEntries(headers.entries()),
        });

        const signer = new SignatureV4({
            credentials,
            service,
            region,
            sha256: Sha256,
        });

        const signedRequest = await signer.sign(request);

        return fetch(input, { headers: signedRequest.headers, body: signedRequest.body, method: signedRequest.method });
    };
};
