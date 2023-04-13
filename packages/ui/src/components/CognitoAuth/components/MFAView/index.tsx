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
import Box from '@cloudscape-design/components/box';
import { ChallengeName } from 'amazon-cognito-identity-js';
import GenericView from '../GenericView';

export interface MFAViewFormData {
    confirmationCode: string;
}

export interface MFAViewProps {
    challengeName: ChallengeName;
    challengeParams: any;
    onConfirm: (data: MFAViewFormData) => Promise<unknown>;
    onBackToSignIn: () => void;
}

const MFAView: FC<MFAViewProps> = ({ challengeName, challengeParams, onConfirm, onBackToSignIn }) => {
    const schema: Schema = useMemo(() => {
        return {
            header: `Confirm ${challengeParams?.CODE_DELIVERY_MEDIUM || ''} Code`,
            variant: 'embedded',
            canCancel: false,
            submitLabel: 'Confirm',
            fields: [
                {
                    component: componentTypes.PLAIN_TEXT,
                    label: (
                        <Box variant="p">
                            {challengeName === 'SMS_MFA'
                                ? `A code has been sent to ${challengeParams.CODE_DELIVERY_DESTINATION}`
                                : 'Please enter the code from your Authenticator app'}
                        </Box>
                    ),
                    name: 'description',
                },
                {
                    component: componentTypes.TEXT_FIELD,
                    isRequired: true,
                    label: 'Code',
                    name: 'confirmationCode',
                    placeholder: 'Code',
                    validate: [
                        {
                            type: 'required',
                        },
                    ],
                },
            ],
        };
    }, [challengeParams, challengeName]);

    return <GenericView schema={schema} onSubmit={onConfirm} onBackToSignIn={onBackToSignIn} />;
};

export default MFAView;
