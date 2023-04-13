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
import FormRenderer, { Schema, componentTypes } from '../../../FormRenderer';
import SpaceBetween from '@cloudscape-design/components/space-between';
import useSubmitCallback from '../../hooks/useSubmitCallback';
import AttributeMapping from '../../attributeMapping';
import validatePasswords from '../../utils/validatePasswords';

export interface SignUpFormData {
    username: string;
    password: string;
    attributes?: Record<string, string>;
}

export interface SignUpViewProps {
    requiredAttributes?: string[];
    onSignUp: (data: SignUpFormData) => Promise<unknown>;
}

const SignUpView: FC<SignUpViewProps> = ({ requiredAttributes, onSignUp }) => {
    const schema = useMemo(() => {
        const formSchema: Schema = {
            header: 'Sign Up',
            variant: 'embedded',
            canCancel: false,
            submitLabel: 'Sign up',
            fields: [
                {
                    component: componentTypes.TEXT_FIELD,
                    isRequired: true,
                    label: 'Username',
                    name: 'username',
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

    const { handleSubmit, isSubmitting, errorMessage } = useSubmitCallback(onSignUp);

    return (
        <SpaceBetween direction="vertical" size="xl" data-testid="sign-up-form">
            <FormRenderer
                schema={schema}
                onSubmit={handleSubmit}
                errorText={errorMessage}
                isSubmitting={isSubmitting}
                validate={validatePasswords}
            />
        </SpaceBetween>
    );
};

export default SignUpView;
