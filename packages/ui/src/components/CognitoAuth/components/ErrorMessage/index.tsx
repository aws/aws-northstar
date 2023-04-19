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
import { FC, PropsWithChildren } from 'react';
import Alert from '@cloudscape-design/components/alert';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Button from '@cloudscape-design/components/button';

export interface ErrorMessageProps {
    onBackToSignIn?: () => void;
}

const ErrorMessage: FC<PropsWithChildren<ErrorMessageProps>> = ({ onBackToSignIn, children }) => {
    return (
        <SpaceBetween direction="vertical" size="xl">
            <Box padding="xl">
                <Alert statusIconAriaLabel="Error" type="error">
                    {children}
                </Alert>
            </Box>
            {onBackToSignIn && (
                <div
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Button variant="link" onClick={onBackToSignIn}>
                        Back to Sign In
                    </Button>
                </div>
            )}
        </SpaceBetween>
    );
};

export default ErrorMessage;
