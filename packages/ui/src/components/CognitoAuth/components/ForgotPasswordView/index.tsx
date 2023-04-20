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
import { FC, useCallback, useMemo } from 'react';
import { Schema, componentTypes } from '../../../FormRenderer';
import GenericView from '../GenericView';

export interface ForgotPasswordViewFormData {
    verificationCode: string;
    password: string;
}

export interface ForgotPasswordViewProps {
    data?: any;
    onResetPassword: (data: ForgotPasswordViewFormData) => Promise<unknown>;
    onBackToSignIn: () => void;
}

const ForgotPasswordView: FC<ForgotPasswordViewProps> = ({ onResetPassword, onBackToSignIn, data }) => {
    const schema = useMemo(() => {
        const destination = data?.CodeDeliveryDetails?.Destination;

        const formSchema: Schema = {
            header: 'Reset Password',
            headerVariant: 'h2',
            variant: 'embedded',
            canCancel: false,
            submitLabel: 'Confirm',
            fields: [
                {
                    component: componentTypes.TEXT_FIELD,
                    isRequired: true,
                    label: 'Code',
                    name: 'verificationCode',
                    placeholder: 'Enter verification code',
                    helperText: `A verification code has been sent to: ${destination}`,
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
                    name: 'password',
                    type: 'password',
                    placeholder: 'Enter your Password',
                    validate: [
                        {
                            type: 'required',
                        },
                    ],
                },
                {
                    component: componentTypes.TEXT_FIELD,
                    isRequired: true,
                    label: 'Confirm Password',
                    name: 'confirmPassword',
                    type: 'password',
                    placeholder: 'Confirm your Password',
                    validate: [
                        {
                            type: 'required',
                        },
                    ],
                },
            ],
        };

        return formSchema;
    }, [data]);

    const validate = useCallback((values: any) => {
        const errors: any = {};

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do NOT match';
        }

        return errors;
    }, []);

    return (
        <GenericView schema={schema} onSubmit={onResetPassword} onBackToSignIn={onBackToSignIn} validate={validate} />
    );
};

export default ForgotPasswordView;
