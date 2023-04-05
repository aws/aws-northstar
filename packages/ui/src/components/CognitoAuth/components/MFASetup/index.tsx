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
import { CognitoUser, ChallengeName } from 'amazon-cognito-identity-js';
import MFASetupView from '../MFASetupView';
import { useCallback, ReactNode, FC } from 'react';

export interface MFASetupProps {
    cognitoUser: CognitoUser;
    setTransition: React.Dispatch<React.SetStateAction<ReactNode>>;
    challengeName: ChallengeName;
    challengeParams: any;
    onAssociateSecretCode: (cognitoUser: CognitoUser, secretCode: string) => void;
    onMFARequired: (cognitoUser: CognitoUser, challengeName: ChallengeName, challengeParams: any) => void;
}

const MFASetup: FC<MFASetupProps> = ({
    cognitoUser,
    setTransition,
    challengeName,
    challengeParams,
    onAssociateSecretCode,
    onMFARequired,
}) => {
    const handleMFASetup = useCallback(
        async (mfaMethod: string) => {
            return new Promise((resolve, reject) => {
                if (mfaMethod === 'SOFTWARE_TOKEN_MFA') {
                    cognitoUser.associateSoftwareToken({
                        associateSecretCode(secretCode: string): void {
                            console.debug('associateSecretCode');
                            onAssociateSecretCode(cognitoUser, secretCode);
                            resolve(secretCode);
                        },
                        onFailure(err: any): void {
                            console.error(err);
                            reject(err);
                        },
                    });
                } else if (mfaMethod === 'SMS_MFA') {
                    onMFARequired(cognitoUser, challengeName, challengeParams);
                    resolve({});
                } else {
                    console.debug('Unhandled mfaMethod', mfaMethod);
                    reject({
                        message: `Unhandled mfaMethod ${mfaMethod}`,
                    });
                }
            });
        },
        [cognitoUser, challengeName, challengeParams, onAssociateSecretCode, onMFARequired]
    );

    return (
        <MFASetupView
            challengeName={challengeName}
            challengeParams={challengeParams}
            onConfirm={handleMFASetup}
            onBackToSignIn={() => setTransition(undefined)}
        />
    );
};

export default MFASetup;
