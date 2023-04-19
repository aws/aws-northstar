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

export const MFA_METHODS = {
    SOFTWARE_TOKEN_MFA: 'SOFTWARE_TOKEN_MFA',
    SMS_MFA: 'SMS_MFA',
};

export type MFAEventHandler = (cognitoUser: CognitoUser, challengeName: ChallengeName, challengeParams: any) => void;
export type NewPasswordEventHandler = (cognitoUser: CognitoUser, userAttributes: any, requiredAttributes: any) => void;

export interface SignUpAttribute {
    /**
     * The name of the attribute. If it is a custom attribute, include custom: as prefix in the name
     */
    name: string;
    /**
     * The display name of the attribute.
     */
    displayName?: string;
    /**
     * Whether the attribute is required.
     */
    required?: boolean;
}
