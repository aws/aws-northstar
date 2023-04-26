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
import React, { useCallback, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from '@cloudscape-design/components/input';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import CognitoAuth, { CognitoAuthProps, useCognitoAuthContext, useSigv4Client } from '../../';
import Container from '../../components/Container';
import Alert from '@cloudscape-design/components/alert';

export default {
    component: CognitoAuth,
    title: 'Components/CognitoAuth/Sigv4Client',
} as ComponentMeta<typeof CognitoAuth>;

const AuthenticatedContent = () => {
    const { onSignOut } = useCognitoAuthContext();
    const [value, setValue] = useState('');
    const [response, setResponse] = useState();
    const [responseError, setResponseError] = useState<Error>();
    const { client, error } = useSigv4Client();
    const handleFetch = useCallback(async () => {
        if (client) {
            try {
                const response = await client(value);
                setResponse(await response.json());
            } catch (err) {
                setResponseError(err);
            }
        }
    }, [client, value]);

    return (
        <Container>
            <SpaceBetween direction="vertical" size="l">
                <Box>
                    <FormField label="Fetch Url">
                        <Input
                            value={value}
                            onChange={(event) => setValue(event.detail.value)}
                            placeholder="Enter APIGateway Fetch Url"
                        />
                    </FormField>
                </Box>
                {error && (
                    <Alert type="error" header="Error">
                        {error.message}
                    </Alert>
                )}
                {responseError && (
                    <Alert type="error" header="Error">
                        {responseError.message}
                    </Alert>
                )}
                {response && (
                    <Alert type="info" header="Response">
                        {JSON.stringify(response)}
                    </Alert>
                )}
                <SpaceBetween direction="horizontal" size="l">
                    <Button onClick={onSignOut}>Sign Out</Button>
                    <Button variant="primary" onClick={handleFetch}>
                        Fetch
                    </Button>
                </SpaceBetween>
            </SpaceBetween>
        </Container>
    );
};

const Template: ComponentStory<typeof CognitoAuth> = (args: CognitoAuthProps) => {
    return (
        <CognitoAuth {...args}>
            <AuthenticatedContent />
        </CognitoAuth>
    );
};

export const CognitoAuthFlowWithSigv4Client = Template.bind({});
