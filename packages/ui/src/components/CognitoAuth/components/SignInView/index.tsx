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
import { FC, useCallback, useMemo, useState } from 'react';
import FormRenderer, { Schema, componentTypes } from '../../../FormRenderer';
import { IAuthenticationDetailsData } from 'amazon-cognito-identity-js';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';

export interface SignInViewProps {
    onSignIn: (authenticationDetails: IAuthenticationDetailsData) => Promise<unknown>;
    onResetPassword: () => void;
}

const SignIn: FC<SignInViewProps> = ({ onSignIn, onResetPassword }) => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const schema: Schema = useMemo(() => {
        return {
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
    }, []);

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                setIsSubmitting(true);
                await onSignIn(data);
            } catch (err: any) {
                setErrorMessage(err.message);
            } finally {
                setIsSubmitting(false);
            }
        },
        [onSignIn]
    );

    return (
        <SpaceBetween direction="vertical" size="xl">
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
                <Button variant="link" onClick={onResetPassword}>
                    Forgot your password?
                </Button>
            </div>
        </SpaceBetween>
    );
};

export default SignIn;
