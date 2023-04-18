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
import { Schema, componentTypes } from '../../../FormRenderer';
import validatePasswords from '../../utils/validatePasswords';
import AttributeMapping from '../../attributeMapping';
import GenericView from '../GenericView';

export interface NewPasswordViewFormData {
    password: string;
    attributes: Record<string, string>;
}

export interface NewPasswordViewProps {
    userAttributes?: Record<string, string>;
    requiredAttributes?: string[];
    onChangePassword: (data: NewPasswordViewFormData) => Promise<unknown>;
    onBackToSignIn: () => void;
}

const NewPasswordView: FC<NewPasswordViewProps> = ({ requiredAttributes, onChangePassword, onBackToSignIn }) => {
    const schema = useMemo(() => {
        const formSchema: Schema = {
            header: 'Change Password',
            headerVariant: 'h2',
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

    return (
        <GenericView
            schema={schema}
            validate={validatePasswords}
            onSubmit={onChangePassword}
            onBackToSignIn={onBackToSignIn}
        />
    );
};

export default NewPasswordView;
