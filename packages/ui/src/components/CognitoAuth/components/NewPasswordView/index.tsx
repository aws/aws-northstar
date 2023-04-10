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
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';

import AttributeMapping from '../../attributeMapping';

export interface NewPasswordViewProps {
    userAttributes?: string[];
    requiredAttributes?: string[];
    onChangePassword: (newPassword: string, attributes?: any) => Promise<unknown>;
    onBackToSignIn: () => void;
}

const NewPasswordView: FC<NewPasswordViewProps> = ({ requiredAttributes, onChangePassword, onBackToSignIn }) => {
    const [errorMessage, setErrorMessage] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const schema = useMemo(() => {
        const formSchema: Schema = {
            header: 'Change Password',
            variant: 'embedded',
            canCancel: false,
            submitLabel: 'Confirm',
            fields: [
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

        requiredAttributes &&
            formSchema.fields.push(
                ...requiredAttributes.map((attr) => ({
                    component: componentTypes.TEXT_FIELD,
                    isRequired: true,
                    label: AttributeMapping[attr] || attr,
                    placeholder: `Enter ${AttributeMapping[attr] || attr}`,
                    name: `attributes[${attr}]`,
                    validate: [
                        {
                            type: 'required',
                        },
                    ],
                }))
            );

        return formSchema;
    }, [requiredAttributes]);

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                setIsSubmitting(true);
                await onChangePassword(data.password, data.attributes);
            } catch (err: any) {
                setErrorMessage(err.message);
            } finally {
                setIsSubmitting(false);
            }
        },
        [onChangePassword]
    );

    const validate = useCallback((values: any) => {
        const errors: any = {};

        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do NOT match';
        }

        return errors;
    }, []);

    return (
        <SpaceBetween direction="vertical" size="xl">
            <FormRenderer
                schema={schema}
                onSubmit={handleSubmit}
                errorText={errorMessage}
                isSubmitting={isSubmitting}
                validate={validate}
            />
            <div
                style={{
                    textAlign: 'center',
                }}
            >
                <Button variant="link" onClick={onBackToSignIn}>
                    Back to Sign In
                </Button>
            </div>
        </SpaceBetween>
    );
};

export default NewPasswordView;