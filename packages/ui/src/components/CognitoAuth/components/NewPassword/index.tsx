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
import NewPasswordView from '../NewPasswordView';
import { useCallback, ReactNode, FC } from 'react';

export interface NewPasswordProps {
    cognitoUser: CognitoUser;
    onMFARequired: (cognitoUser: CognitoUser, challengeName: ChallengeName, challengeParams: any) => void;
    onMFASetup: (cognitoUser: CognitoUser, challengeName: ChallengeName, challengeParams: any) => void;
    setTransition: React.Dispatch<React.SetStateAction<ReactNode>>;
    userAttributes: any;
    requiredAttributes: any;
}

const NewPassword: FC<NewPasswordProps> = ({
    onMFARequired,
    onMFASetup,
    setTransition,
    cognitoUser,
    userAttributes,
    requiredAttributes,
}) => {
    const handleChangePassword = useCallback(
        async (newPassword: string, attributes: any) => {
            return new Promise((resolve, reject) => {
                return cognitoUser.completeNewPasswordChallenge(newPassword, attributes, {
                    onSuccess(result: CognitoUserSession) {
                        console.debug('Cognito Change Password Success');
                        resolve(result);
                        setTransition(undefined);
                    },
                    onFailure(err) {
                        console.error('Cognito Change Password Error', err);
                        reject(err);
                    },
                    mfaSetup(challengeName, challengeParams) {
                        console.debug('mfaSetup', challengeName, challengeParams);
                        onMFASetup(cognitoUser, challengeName, challengeParams);
                        resolve({});
                    },
                    mfaRequired(challengeName, challengeParams) {
                        console.debug('mfaRequired', challengeName, challengeParams);
                        onMFARequired(cognitoUser, challengeName, challengeParams);
                        resolve({});
                    },
                });
            });
        },
        [onMFARequired, setTransition, cognitoUser, onMFASetup]
    );

    return (
        <NewPasswordView
            userAttributes={userAttributes}
            requiredAttributes={requiredAttributes}
            onChangePassword={handleChangePassword}
            onBackToSignIn={() => setTransition(undefined)}
        />
    );
};

export default NewPassword;
