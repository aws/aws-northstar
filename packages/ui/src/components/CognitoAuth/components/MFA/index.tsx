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
import { CognitoUser, CognitoUserSession, ChallengeName } from 'amazon-cognito-identity-js';
import MFAView from '../MFAView';
import { useCallback, ReactNode, FC } from 'react';

export interface MFAProps {
    cognitoUser: CognitoUser;
    setTransition: React.Dispatch<React.SetStateAction<ReactNode>>;
    challengeName: ChallengeName;
    challengeParams: any;
}

const MFA: FC<MFAProps> = ({ cognitoUser, setTransition, challengeName, challengeParams }) => {
    const handleMFA = useCallback(
        async (mfaCode: string) => {
            return new Promise((resolve, reject) => {
                cognitoUser.sendMFACode(mfaCode, {
                    onSuccess(result: CognitoUserSession) {
                        console.debug('Cognito sendMFACode Success');
                        resolve(result);
                        setTransition(undefined);
                    },
                    onFailure(err: any) {
                        console.error('Cognito sendMFACode Failure', err);
                        reject(err);
                    },
                });
            });
        },
        [setTransition, cognitoUser]
    );

    return (
        <MFAView
            challengeName={challengeName}
            challengeParams={challengeParams}
            onConfirm={handleMFA}
            onBackToSignIn={() => setTransition(undefined)}
        />
    );
};

export default MFA;
