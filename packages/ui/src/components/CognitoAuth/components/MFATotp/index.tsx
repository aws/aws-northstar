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
import { CognitoUser } from 'amazon-cognito-identity-js';
import MFATotpView, { MFATotpViewFormData } from '../MFATotpView';
import { useCallback, FC } from 'react';

export interface MFATotpProps {
    cognitoUser: CognitoUser;
    resetView: () => void;
    secretCode: string;
}

const MFATotp: FC<MFATotpProps> = ({ cognitoUser, resetView, secretCode }) => {
    const handleConfirm = useCallback(
        async (data: MFATotpViewFormData) => {
            return new Promise((resolve, reject) => {
                cognitoUser.verifySoftwareToken(data.confirmationCode, '', {
                    onSuccess() {
                        resolve({});
                        resetView();
                    },
                    onFailure(err: any) {
                        console.error('Cognito verifySoftwareToken Failure', err);
                        reject(err);
                    },
                });
            });
        },
        [resetView, cognitoUser]
    );
    return <MFATotpView secretCode={secretCode} onConfirm={handleConfirm} onBackToSignIn={resetView} />;
};

export default MFATotp;
