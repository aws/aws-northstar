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
import { AwsCredentialIdentity } from '@aws-sdk/types';

// Session storage key for cached credentials
const STORAGE_KEY = 'northstar.sigv4fetch.session';

// Credential expiration grace time before considering credentials as expired
const OFFSET_MILLIS = 30 * 1000; // 30 seconds

interface CachedCredentials extends Omit<AwsCredentialIdentity, 'expiration'> {
    readonly expiration?: number;
}

/**
 * Returns cached credentials from session storage (if available and they have not expired)
 */
export const getCachedCredentials = (): AwsCredentialIdentity | undefined => {
    const rawCachedCredentials = window.sessionStorage.getItem(STORAGE_KEY);
    if (rawCachedCredentials) {
        try {
            const cachedCredentials = JSON.parse(rawCachedCredentials) as CachedCredentials;
            const now = Date.now();
            if (cachedCredentials.expiration && cachedCredentials.expiration > now + OFFSET_MILLIS) {
                return {
                    ...cachedCredentials,
                    expiration: new Date(cachedCredentials.expiration),
                };
            }
        } catch {
            // Credentials can't be read
        }
    }
    return undefined;
};

/**
 * Write credentials to the session storage cache
 */
export const setCachedCredentials = (credentials: AwsCredentialIdentity) => {
    window.sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            ...credentials,
            expiration: credentials.expiration?.getTime(),
        })
    );
};
