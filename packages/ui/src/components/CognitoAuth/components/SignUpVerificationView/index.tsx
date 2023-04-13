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
import { FC, useMemo } from 'react';
import Button from '@cloudscape-design/components/button';
import FormRenderer, { Schema, componentTypes } from '../../../FormRenderer';
import useSubmitCallback from '../../hooks/useSubmitCallback';

export interface SignUpVerificationViewFormData {
    verificationCode: string;
}

export interface SignUpVerificationViewProps {
    onConfirm: (data: SignUpVerificationViewFormData) => Promise<unknown>;
    onResendCode: () => Promise<unknown>;
}

const SignUpVerificationView: FC<SignUpVerificationViewProps> = ({ onConfirm, onResendCode }) => {
    const { handleSubmit, isSubmitting, errorMessage } = useSubmitCallback(onConfirm);

    const {
        handleSubmit: handleResendCode,
        isSubmitting: isResendingCode,
        errorMessage: resendCodeErrorMessage,
    } = useSubmitCallback(onResendCode);

    const CustomComponent = useMemo(() => {
        return () => {
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'end',
                        height: '100%',
                    }}
                >
                    <div>
                        <Button loading={isResendingCode} onClick={handleResendCode}>
                            Resend
                        </Button>
                    </div>
                </div>
            );
        };
    }, [handleResendCode, isResendingCode]);

    const schema: Schema = useMemo(() => {
        return {
            header: 'Confirm Registration',
            variant: 'embedded',
            canCancel: false,
            submitLabel: 'Confirm',
            fields: [
                {
                    component: componentTypes.CUSTOM_LAYOUT,
                    name: 'layout',
                    gridDefinition: [
                        {
                            colspan: {
                                default: 9,
                            },
                        },
                        {
                            colspan: {
                                default: 3,
                            },
                        },
                    ],
                    fields: [
                        {
                            component: componentTypes.TEXT_FIELD,
                            isRequired: true,
                            label: 'Code',
                            name: 'verificationCode',
                            placeholder: 'Code',
                            validate: [
                                {
                                    type: 'required',
                                },
                            ],
                        },
                        {
                            component: componentTypes.CUSTOM,
                            CustomComponent: CustomComponent,
                            name: 'btnResendCode',
                        },
                    ],
                },
            ],
        };
    }, [CustomComponent]);

    return (
        <FormRenderer
            schema={schema}
            onSubmit={handleSubmit}
            errorText={errorMessage || resendCodeErrorMessage}
            isSubmitting={isSubmitting}
        />
    );
};

export default SignUpVerificationView;
