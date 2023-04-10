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
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { useCallback, FC, useState, useRef } from 'react';
import ForgotPasswordUsernameView from '../ForgotPasswordUsernameView';
import ForgotPasswordView from '../ForgotPasswordView';

export interface ForgotPasswordProps {
    userPool: CognitoUserPool | null;
    resetView: () => void;
}

const ForgotPassword: FC<ForgotPasswordProps> = ({ userPool, resetView }) => {
    const cognitoUserRef = useRef<CognitoUser>();
    const [forgotPasswordData, setForgotPasswordData] = useState();
    const handleSendCode = useCallback(
        async (username: string) => {
            if (userPool) {
                const cognitoUser = new CognitoUser({
                    Username: username,
                    Pool: userPool,
                });

                return new Promise((resolve, reject) => {
                    cognitoUser.forgotPassword({
                        onSuccess(data: any) {
                            console.debug('Congnito forgotPassword Success', data);
                            cognitoUserRef.current = cognitoUser;
                            resolve(data);
                            setForgotPasswordData(data);
                        },
                        onFailure(err) {
                            console.error('Congnito forgotPassword Failure', err);
                            reject(err);
                        },
                    });
                });
            }
        },
        [userPool]
    );

    const handleResetPassword = useCallback(
        async (verificationCode: string, newPassword: string) => {
            if (cognitoUserRef.current) {
                return new Promise((resolve, reject) => {
                    cognitoUserRef.current!.confirmPassword(verificationCode, newPassword, {
                        onSuccess() {
                            console.debug('Congnito confirmPassword Success');
                            resolve({});
                            resetView();
                        },
                        onFailure(err) {
                            console.error('Congnito confirmPassword Failure', err);
                            reject(err);
                        },
                    });
                });
            }
        },
        [resetView]
    );

    return forgotPasswordData ? (
        <ForgotPasswordView
            onResetPassword={handleResetPassword}
            onBackToSignIn={resetView}
            data={forgotPasswordData}
        />
    ) : (
        <ForgotPasswordUsernameView onSendCode={handleSendCode} onBackToSignIn={resetView} />
    );
};

export default ForgotPassword;
