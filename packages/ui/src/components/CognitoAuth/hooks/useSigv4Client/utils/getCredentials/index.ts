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
import { CognitoUserSession, CognitoUser } from 'amazon-cognito-identity-js';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import EmptyArgumentError from '../../EmptyArgumentError';
import { getCachedCredentials, setCachedCredentials } from './cache';

const getCredentials = (
    cognitoUser: CognitoUser,
    region?: string,
    identityPoolId?: string,
    userPoolId?: string,
    disableCache?: boolean
) => {
    return new Promise<AwsCredentialIdentity>(async (resolve, reject) => {
        if (!disableCache) {
            const cachedCredentials = getCachedCredentials();
            if (cachedCredentials) {
                resolve(cachedCredentials);
                return;
            }
        }

        if (!region) {
            reject(new EmptyArgumentError('region is empty'));
            return;
        }

        if (!identityPoolId) {
            reject(new EmptyArgumentError('identityPoolId is empty'));
            return;
        }

        if (!userPoolId) {
            reject(new EmptyArgumentError('userPoolId is empty'));
            return;
        }

        cognitoUser.getSession(async (_: null, session: CognitoUserSession) => {
            const credentialsFromCognitoIdentityPool = fromCognitoIdentityPool({
                client: new CognitoIdentityClient({ region }),
                identityPoolId,
                logins: {
                    [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: session.getIdToken().getJwtToken(),
                },
            });
            const cognitoidentity = new CognitoIdentityClient({
                credentials: credentialsFromCognitoIdentityPool,
            });
            const credential = await cognitoidentity.config.credentials();
            if (!disableCache) {
                setCachedCredentials(credential);
            }
            resolve(credential);
        });
    });
};

export default getCredentials;
