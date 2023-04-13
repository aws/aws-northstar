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
import MFASetupView, { MFASetupViewFormData } from '../MFASetupView';
import { MFAEventHandler, MFA_METHODS } from '../../types';
import { useCallback, FC } from 'react';

export interface MFASetupProps {
    cognitoUser: CognitoUser;
    resetView: () => void;
    challengeName: ChallengeName;
    challengeParams: any;
    onAssociateSecretCode: (cognitoUser: CognitoUser, secretCode: string) => void;
    onMFARequired: MFAEventHandler;
}

const MFASetup: FC<MFASetupProps> = ({
    cognitoUser,
    resetView,
    challengeName,
    challengeParams,
    onAssociateSecretCode,
    onMFARequired,
}) => {
    const handleMFASetup = useCallback(
        async (data: MFASetupViewFormData) => {
            return new Promise((resolve, reject) => {
                if (data.mfaMethod === MFA_METHODS.SOFTWARE_TOKEN_MFA) {
                    cognitoUser.associateSoftwareToken({
                        associateSecretCode(secretCode: string): void {
                            onAssociateSecretCode(cognitoUser, secretCode);
                            resolve(secretCode);
                        },
                        onFailure(err: any): void {
                            console.error('Cognito associateSoftwareToken Failure', err);
                            reject(err);
                        },
                    });
                } else if (data.mfaMethod === MFA_METHODS.SMS_MFA) {
                    onMFARequired(cognitoUser, challengeName, challengeParams);
                    resolve({});
                } else {
                    console.error('Unhandled mfaMethod', data.mfaMethod);
                    reject({
                        message: `Unhandled mfaMethod ${data.mfaMethod}`,
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
            onBackToSignIn={resetView}
        />
    );
};

export default MFASetup;
