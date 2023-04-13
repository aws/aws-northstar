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
import { IAuthenticationDetailsData } from 'amazon-cognito-identity-js';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';
import FormRenderer, { Schema, componentTypes } from '../../../FormRenderer';
import useSubmitCallback from '../../hooks/useSubmitCallback';

export interface SignInViewProps {
    onSignIn: (authenticationDetails: IAuthenticationDetailsData) => Promise<unknown>;
    onForgotPassword: () => void;
}

const schema: Schema = {
    variant: 'embedded',
    canCancel: false,
    submitLabel: 'Sign in',
    fields: [
        {
            component: componentTypes.TEXT_FIELD,
            isRequired: true,
            label: 'Username',
            name: 'Username',
            placeholder: 'Enter your Username',
            validate: [
                {
                    type: 'required',
                },
            ],
        },
        {
            component: componentTypes.TEXT_FIELD,
            isRequired: true,
            label: 'Password',
            name: 'Password',
            type: 'password',
            placeholder: 'Enter your Password',
            validate: [
                {
                    type: 'required',
                },
            ],
        },
    ],
};

const SignIn: FC<SignInViewProps> = ({ onSignIn, onForgotPassword }) => {
    const { handleSubmit, isSubmitting, errorMessage } = useSubmitCallback(onSignIn);

    return (
        <SpaceBetween direction="vertical" size="xl" data-testid="sign-in-form">
            <FormRenderer
                schema={schema}
                onSubmit={handleSubmit}
                errorText={errorMessage}
                isSubmitting={isSubmitting}
            />
            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Button variant="link" onClick={onForgotPassword}>
                    Forgot your password?
                </Button>
            </div>
        </SpaceBetween>
    );
};

export default SignIn;
