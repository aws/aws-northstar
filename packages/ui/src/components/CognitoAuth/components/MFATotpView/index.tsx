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
import Popover from '@cloudscape-design/components/popover';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import Button from '@cloudscape-design/components/button';
import QRCode from 'react-qr-code';
import { IMAGE_AUTH_APP } from '../../assets/images';
import GenericView from '../GenericView';

export interface MFATotpViewFormData {
    confirmationCode: string;
}

export interface MFATotpViewProps {
    secretCode: string;
    onConfirm: (data: MFATotpViewFormData) => Promise<unknown>;
    onBackToSignIn: () => void;
}

const MFATotpView: FC<MFATotpViewProps> = ({ secretCode, onConfirm, onBackToSignIn }) => {
    const CustomComponent = useMemo(() => {
        return () => {
            return (
                <SpaceBetween size="xl" direction="horizontal">
                    <SpaceBetween size="xl" direction="horizontal">
                        <span>1.</span>
                        <img width={75} src={IMAGE_AUTH_APP} alt="authenticator_app_mfa" />
                        <span>Install an authenticator app on your mobile device.</span>
                    </SpaceBetween>
                    <SpaceBetween size={'xl'} direction={'horizontal'}>
                        <span>2.</span>
                        <QRCode size={75} value={`otpauth://totp/${window.location.origin}?secret=${secretCode}`} />
                        <span style={{ display: 'block', width: '320px' }}>
                            Scan this QR code with your authenticator app. Alternatively, you can copy the secret key
                            below and enter it in your authenticator app.
                        </span>
                        <Box margin="l">
                            <Popover
                                dismissButton={false}
                                position="top"
                                size="small"
                                triggerType="custom"
                                content={<StatusIndicator type="success">Secret key copied</StatusIndicator>}
                            >
                                <Button
                                    iconName="copy"
                                    onClick={() => {
                                        void (
                                            navigator &&
                                            navigator.clipboard &&
                                            navigator.clipboard.writeText &&
                                            navigator.clipboard.writeText(secretCode)
                                        );
                                    }}
                                >
                                    Copy secret key
                                </Button>
                            </Popover>
                        </Box>
                    </SpaceBetween>
                </SpaceBetween>
            );
        };
    }, [secretCode]);

    const schema: Schema = useMemo(() => {
        return {
            header: 'Set Up Authenticator',
            variant: 'embedded',
            canCancel: false,
            submitLabel: 'Continue',
            fields: [
                {
                    component: componentTypes.CUSTOM,
                    CustomComponent: CustomComponent,
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
    }, [CustomComponent]);

    return <GenericView schema={schema} onBackToSignIn={onBackToSignIn} onSubmit={onConfirm} />;
};

export default MFATotpView;
