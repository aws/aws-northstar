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
import {
    CognitoUser,
    CognitoUserSession,
    CognitoUserPool,
    IAuthenticationDetailsData,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import SignInView from '../SignInView';
import { useCallback, FC } from 'react';
import { MFAEventHandler, MFASetupEventHandler } from '../../types';

export interface SignInProps {
    userPool: CognitoUserPool;
    onMFARequired: MFAEventHandler;
    onNewPasswordRequired: (cognitoUser: CognitoUser, userAttributes: any, requiredAttributes: any) => void;
    onMFASetup: MFASetupEventHandler;
    onForgotPassword: () => void;
    resetView: () => void;
}

const SignIn: FC<SignInProps> = ({
    userPool,
    onMFARequired,
    onNewPasswordRequired,
    onMFASetup,
    resetView,
    onForgotPassword,
}) => {
    const handleSignIn = useCallback(
        async (authenticationDetails: IAuthenticationDetailsData) => {
            if (userPool) {
                const authDetails = new AuthenticationDetails(authenticationDetails);
                const cognitoUser = new CognitoUser({
                    Username: authenticationDetails.Username,
                    Pool: userPool,
                });

                return new Promise((resolve, reject) => {
                    cognitoUser.authenticateUser(authDetails, {
                        onSuccess(result: CognitoUserSession) {
                            resolve(result);
                            resetView();
                        },
                        onFailure(err) {
                            console.error('Congnito Auth Failure', err);
                            reject(err);
                        },
                        newPasswordRequired(userAttributes, requiredAttributes) {
                            onNewPasswordRequired(cognitoUser, userAttributes, requiredAttributes);
                            resolve({});
                        },
                        selectMFAType(challengeName, challengeParams) {
                            onMFASetup(cognitoUser, false, challengeName, challengeParams);
                            resolve({});
                        },
                        mfaSetup(challengeName, challengeParams) {
                            onMFASetup(cognitoUser, true, challengeName, challengeParams);
                            resolve({});
                        },
                        totpRequired(challengeName, challengeParams) {
                            onMFARequired(cognitoUser, challengeName, challengeParams);
                            resolve({});
                        },
                        mfaRequired(challengeName, challengeParams) {
                            onMFARequired(cognitoUser, challengeName, challengeParams);
                            resolve({});
                        },
                    });
                });
            }
        },
        [userPool, onMFARequired, onNewPasswordRequired, onMFASetup, resetView]
    );

    return <SignInView onSignIn={handleSignIn} onForgotPassword={onForgotPassword} />;
};

export default SignIn;
