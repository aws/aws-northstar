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
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';
import useSubmitCallback from '../../hooks/useSubmitCallback';
import AttributeMapping from '../../attributeMapping';
import validatePasswords from '../../utils/validatePasswords';
import { SignUpAttribute } from '../../types';

export interface SignUpFormData {
    username: string;
    password: string;
    attributes?: Record<string, string>;
}

export interface SignUpViewProps {
    attributes?: SignUpAttribute[];
    onSignUp: (data: SignUpFormData) => Promise<unknown>;
    hrefTermsAndConditions?: string;
}

const SignUpView: FC<SignUpViewProps> = ({ attributes, onSignUp, hrefTermsAndConditions }) => {
    const schema = useMemo(() => {
        const formSchema: Schema = {
            variant: 'embedded',
            canCancel: false,
            headerVariant: 'h2',
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

        attributes &&
            formSchema.fields.push(
                ...attributes.map((attr) => {
                    const displayName = attr.displayName || AttributeMapping[attr.name]?.displayName || attr.name;
                    return {
                        component: componentTypes.TEXT_FIELD,
                        isRequired: true,
                        label: displayName,
                        placeholder: `Enter ${displayName}`,
                        name: `attributes[${attr.name}]`,
                        ...AttributeMapping[attr.name]?.componentSettingsOverride,
                        validate: [
                            ...(attr.required
                                ? [
                                      {
                                          type: 'required',
                                      },
                                  ]
                                : []),
                            ...(AttributeMapping[attr.name]?.componentSettingsOverride?.validate || []),
                        ],
                    };
                })
            );

        return formSchema;
    }, [attributes]);

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
            {hrefTermsAndConditions && (
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    <Link href={hrefTermsAndConditions} external>
                        Terms and Conditions
                    </Link>
                </div>
            )}
        </SpaceBetween>
    );
};

export default SignUpView;
