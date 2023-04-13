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
import { FC } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import SpaceBetween from '@cloudscape-design/components/space-between';
import CognitoAuth, { CognitoAuthProps } from '.';
import Container from './components/Container';
import { REQUIRED_SIGNUP_ATTRIBUTES } from './fixtures';

export default {
    component: CognitoAuth,
    title: 'Components/CognitoAuth',
} as ComponentMeta<typeof CognitoAuth>;

const AuthenticatedContent: FC<{
    user: CognitoUser;
    onSignOut: () => void;
}> = ({ onSignOut, user }) => {
    return (
        <Container>
            <SpaceBetween direction="vertical" size="l">
                <Box>Hello {user.getUsername()}</Box>
                <Button onClick={onSignOut}>Sign Out</Button>
            </SpaceBetween>
        </Container>
    );
};

const Template: ComponentStory<typeof CognitoAuth> = (args: CognitoAuthProps) => {
    return (
        <CognitoAuth {...args}>
            {(signOut, user) => <AuthenticatedContent onSignOut={signOut} user={user} />}
        </CognitoAuth>
    );
};

export const CognitoAuthFlow = Template.bind({});

export const CognitoAuthFlowWithSignUp = Template.bind({});
CognitoAuthFlowWithSignUp.args = {
    allowSignup: true,
    requiredSignUpAttributes: REQUIRED_SIGNUP_ATTRIBUTES,
};
