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
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { useCallback, FC } from 'react';
import NewPasswordView, { NewPasswordViewFormData } from '../NewPasswordView';
import { MFAEventHandler, MFASetupEventHandler } from '../../types';

export interface NewPasswordProps {
    cognitoUser: CognitoUser;
    onMFARequired: MFAEventHandler;
    onMFASetup: MFASetupEventHandler;
    resetView: () => void;
    userAttributes: any;
    requiredAttributes: any;
}

const NewPassword: FC<NewPasswordProps> = ({
    onMFARequired,
    onMFASetup,
    resetView,
    cognitoUser,
    userAttributes,
    requiredAttributes,
}) => {
    const handleChangePassword = useCallback(
        async (data: NewPasswordViewFormData) => {
            return new Promise((resolve, reject) => {
                return cognitoUser.completeNewPasswordChallenge(data.password, data.attributes, {
                    onSuccess(result: CognitoUserSession) {
                        resolve(result);
                        resetView();
                    },
                    onFailure(err) {
                        reject(err);
                    },
                    mfaSetup(challengeName, challengeParams) {
                        onMFASetup(cognitoUser, true, challengeName, challengeParams);
                        resolve({});
                    },
                    selectMFAType(challengeName, challengeParams) {
                        onMFASetup(cognitoUser, false, challengeName, challengeParams);
                        resolve({});
                    },
                    mfaRequired(challengeName, challengeParams) {
                        onMFARequired(cognitoUser, challengeName, challengeParams);
                        resolve({});
                    },
                    totpRequired(challengeName, challengeParams) {
                        onMFARequired(cognitoUser, challengeName, challengeParams);
                        resolve({});
                    },
                });
            });
        },
        [onMFARequired, resetView, cognitoUser, onMFASetup]
    );

    return (
        <NewPasswordView
            userAttributes={userAttributes}
            requiredAttributes={requiredAttributes}
            onChangePassword={handleChangePassword}
            onBackToSignIn={resetView}
        />
    );
};

export default NewPassword;
