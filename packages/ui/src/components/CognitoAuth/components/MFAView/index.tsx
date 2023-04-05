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
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import { ChallengeName } from 'amazon-cognito-identity-js';

export interface MFAViewProps {
    challengeName: ChallengeName;
    challengeParams: any;
    onConfirm: (confirmationCode: string) => Promise<unknown>;
    onBackToSignIn: () => void;
}

const MFAView: FC<MFAViewProps> = ({ challengeName, challengeParams, onConfirm, onBackToSignIn }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const schema: Schema = useMemo(() => {
        return {
            header: `Confirm ${challengeParams?.CODE_DELIVERY_DELIVERY_MEDIUM || ''} Code`,
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

    const handleSubmit = useCallback(
        async (data: any) => {
            try {
                setIsSubmitting(true);
                await onConfirm(data.confirmationCode);
            } catch (err: any) {
                setErrorMessage(err.message);
            } finally {
                setIsSubmitting(false);
            }
        },
        [onConfirm]
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
                <Button variant="link" onClick={onBackToSignIn}>
                    Back to Sign In
                </Button>
            </div>
        </SpaceBetween>
    );
};

export default MFAView;
