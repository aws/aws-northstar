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
import { CognitoUserAttribute, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { useCallback, FC, useState } from 'react';
import SignUpView, { SignUpFormData } from '../SignUpView';
import SignUpVerificationView, { SignUpVerificationViewFormData } from '../SignUpVerificationView';

export interface SignInProps {
    userPool: CognitoUserPool;
    resetView: () => void;
    requiredAttributes?: string[];
}

const SignUp: FC<SignInProps> = ({ userPool, resetView, requiredAttributes }) => {
    const [cognitoUser, setCognitoUser] = useState<CognitoUser>();

    const handleSignUp = useCallback(
        async (data: SignUpFormData) => {
            if (userPool) {
                const attributeList =
                    data.attributes &&
                    Object.entries(data.attributes).map((n) => {
                        return new CognitoUserAttribute({
                            Name: n[0],
                            Value: n[1],
                        });
                    });
                return new Promise((resolve, reject) => {
                    userPool.signUp(data.username, data.password, attributeList || [], [], (err, result) => {
                        if (err) {
                            console.error('Congnito Signup Failure', err);
                            reject(err);
                        } else {
                            resolve(result);
                            setCognitoUser(
                                new CognitoUser({
                                    Username: data.username,
                                    Pool: userPool,
                                })
                            );
                        }
                    });
                });
            }
        },
        [userPool]
    );

    const handleConfirmRegistration = useCallback(
        async (data: SignUpVerificationViewFormData) => {
            if (cognitoUser) {
                return new Promise((resolve, reject) => {
                    cognitoUser.confirmRegistration(data.verificationCode, true, function (err, result) {
                        if (err) {
                            console.error('Congnito confirmRegistration Failure', err);
                            reject(err);
                        } else {
                            resolve(result);
                            resetView();
                        }
                    });
                });
            }
        },
        [cognitoUser, resetView]
    );

    const handleResendCode = useCallback(async () => {
        if (cognitoUser) {
            return new Promise((resolve, reject) => {
                cognitoUser.resendConfirmationCode(function (err, result) {
                    if (err) {
                        console.error('Congnito resendConfirmationCode Failure', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
    }, [cognitoUser]);

    return cognitoUser ? (
        <SignUpVerificationView onConfirm={handleConfirmRegistration} onResendCode={handleResendCode} />
    ) : (
        <SignUpView onSignUp={handleSignUp} requiredAttributes={requiredAttributes} />
    );
};

export default SignUp;
