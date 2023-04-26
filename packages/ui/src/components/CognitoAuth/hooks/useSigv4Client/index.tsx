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
import { useState, useEffect, useRef } from 'react';
import { createSignedFetcher } from './utils/awsSigv4Fetch';
import { useCognitoAuthContext } from '../../context';
import getCredentials from './utils/getCredentials';

const useSigv4Client = (service: string = 'execute-api') => {
    const { getAuthenticatedUser, region, identityPoolId, userPoolId } = useCognitoAuthContext();
    const [error, SetError] = useState<Error>();
    const client = useRef<(input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>>();

    useEffect(() => {
        const getClient = async () => {
            SetError(undefined);
            try {
                const cognitoUser = getAuthenticatedUser?.();

                if (!cognitoUser) {
                    throw new Error('CognitoUser is empty');
                }

                const credentials = await getCredentials(cognitoUser, region, identityPoolId, userPoolId);

                const fetcher = createSignedFetcher({
                    service,
                    region: region || 'ap-southeast-2',
                    credentials,
                });

                client.current = fetcher;
            } catch (error: any) {
                SetError(error);
            }
        };

        getClient();
    }, [getAuthenticatedUser, region, identityPoolId, userPoolId, service]);

    return {
        client: client.current,
        error,
    };
};

export default useSigv4Client;
