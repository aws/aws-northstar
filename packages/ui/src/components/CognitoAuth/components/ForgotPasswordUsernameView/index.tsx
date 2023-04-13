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
import { FC } from 'react';
import { Schema, componentTypes } from '../../../FormRenderer';
import GenericView from '../GenericView';

export interface ForgotPasswordUsernameViewData {
    username: string;
}

export interface ForgotPasswordUsernameViewProps {
    onSendCode: (data: ForgotPasswordUsernameViewData) => Promise<unknown>;
    onBackToSignIn: () => void;
}

const schema: Schema = {
    header: 'Reset Password',
    variant: 'embedded',
    canCancel: false,
    submitLabel: 'Send code',
    fields: [
        {
            component: componentTypes.TEXT_FIELD,
            isRequired: true,
            label: 'Username',
            name: 'username',
            placeholder: 'Enter your username',
            validate: [
                {
                    type: 'required',
                },
            ],
        },
    ],
};

const ForgotPasswordUsernameView: FC<ForgotPasswordUsernameViewProps> = ({ onSendCode, onBackToSignIn }) => {
    return <GenericView schema={schema} onSubmit={onSendCode} onBackToSignIn={onBackToSignIn} />;
};

export default ForgotPasswordUsernameView;
