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
import SpaceBetween from '@cloudscape-design/components/space-between';
import Box from '@cloudscape-design/components/box';
import { ChallengeName } from 'amazon-cognito-identity-js';
import { IMAGE_AUTH_APP, IMAGE_SMS_MFA } from '../../assets/images';
import GenericView from '../GenericView';

export interface MFASetupViewFormData {
    mfaMethod: string;
}

export interface MFASetupViewProps {
    challengeName: ChallengeName;
    challengeParams: any;
    onConfirm: (data: MFASetupViewFormData) => Promise<unknown>;
    onBackToSignIn: () => void;
}

const MFA_LITERALS: Record<string, { key: string; value: string; img: string }> = {
    SMS_MFA: {
        key: 'SMS',
        value: 'Authenticate using a code sent via text message to your phone.',
        img: IMAGE_SMS_MFA,
    },
    SOFTWARE_TOKEN_MFA: {
        key: 'Authenticator app',
        value: 'Authenticate using a code generated by an authenticator app.',
        img: IMAGE_AUTH_APP,
    },
};

const MFASetupView: FC<MFASetupViewProps> = ({ challengeName, challengeParams, onConfirm, onBackToSignIn }) => {
    const schema: Schema = useMemo(() => {
        return {
            header: 'Choose a MFA method',
            variant: 'embedded',
            canCancel: false,
            submitLabel: 'Continue',
            fields: [
                {
                    component: componentTypes.PLAIN_TEXT,
                    label: 'You must configure MFA before you can sign in. Choose how you want to authenticate.',
                    name: 'description',
                },
                {
                    component: componentTypes.RADIO,
                    label: 'MFA Methods',
                    name: 'mfaMethod',
                    options: JSON.parse(challengeParams.MFAS_CAN_SETUP ?? challengeParams.MFAS_CAN_CHOOSE).map(
                        (v: string) => ({
                            value: v,
                            label: (
                                <Box
                                    padding={{
                                        bottom: 'l',
                                    }}
                                >
                                    <SpaceBetween direction="horizontal" size="xl">
                                        <img src={MFA_LITERALS[v].img} alt={v} />
                                        <SpaceBetween direction="vertical" size="xl">
                                            <span>
                                                <b>{MFA_LITERALS[v].key}</b>
                                            </span>
                                            <span
                                                style={{
                                                    display: 'block',
                                                    wordWrap: 'break-word',
                                                    maxWidth: '360px',
                                                }}
                                            >
                                                {MFA_LITERALS[v].value}
                                            </span>
                                        </SpaceBetween>
                                    </SpaceBetween>
                                </Box>
                            ),
                        })
                    ),
                    validate: [
                        {
                            type: 'required',
                        },
                    ],
                },
            ],
        };
    }, [challengeParams]);

    return <GenericView schema={schema} onSubmit={onConfirm} onBackToSignIn={onBackToSignIn} />;
};

export default MFASetupView;
