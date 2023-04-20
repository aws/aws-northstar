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
import { FC, ReactNode, useState, createContext, useCallback, useMemo, useContext, useReducer } from 'react';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import Tabs from '@cloudscape-design/components/tabs';
import Container from './components/Container';
import ConfigError from './components/ConfigError';
import MFA from './components/MFA';
import MFASelection from './components/MFASelection';
import MFATotpSetup from './components/MFATotpSetup';
import NewPassword from './components/NewPassword';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import { MFAEventHandler, SignUpAttribute } from './types';
import ErrorMessage from './components/ErrorMessage';

export interface CognitoAuthProps {
    /**
     * Cognito User Pool Id
     */
    userPoolId: string;
    /**
     * Cognito App client Id
     */
    clientId: string;
    /**
     * Whether to allow users to sign up.
     */
    allowSignup?: boolean;
    /**
     * Specifies the user attributes for sign up flow if allowSignup is true
     */
    signUpAttributes?: SignUpAttribute[];
    /**
     * The header title.
     */
    header?: string;
    /**
     * A logo displayed next to the header title.
     */
    logo?: string | ReactNode;
    /**
     * Url for Terms and Conditions to display at the bottom of SignUp component.
     */
    hrefTermsAndConditions?: string;
    /**
     * Main content show post authentication flow
     */
    children?: ReactNode | ((signOut: () => void, user: CognitoUser) => ReactNode);
}

export interface CognitoAuthContextAPI {
    userPool: CognitoUserPool | null;
    onSignOut: () => void;
    getAuthenticatedUser?: () => CognitoUser | null;
}

const initialState = {
    userPool: null,
    onSignOut: () => {},
    getAuthenticatedUser: () => null,
};

export const CognitoAuthContext = createContext<CognitoAuthContextAPI>(initialState);

/**
 * Support Cognito authentication flows.
 *
 * **Limitations:**
 * The following authentication flows are not supported in the current version of CognitoAuth component:
 * * Cognito Federated SignIn
 * * App Client with Client Secret
 * * [Cognito hosted UI](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html)
 */
const CognitoAuth: FC<CognitoAuthProps> = ({
    children,
    userPoolId,
    clientId,
    allowSignup,
    signUpAttributes,
    logo,
    header,
    hrefTermsAndConditions,
}) => {
    const [transition, setTransition] = useState<ReactNode>();
    const [activeTab, setActiveTab] = useState('signIn');
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    const userPool = useMemo(() => {
        if (!userPoolId || !clientId) {
            return null;
        }

        try {
            return new CognitoUserPool({
                UserPoolId: userPoolId,
                ClientId: clientId,
            });
        } catch (err) {
            console.info('Error in initiating CognitoUserPool', err);
            return null;
        }
    }, [userPoolId, clientId]);

    const resetView = useCallback(() => {
        setActiveTab('signIn');
        setTransition(undefined);
        forceUpdate();
    }, [forceUpdate]);

    const handleSignOut = useCallback(() => {
        userPool?.getCurrentUser()?.signOut();
        setTransition(undefined);
        forceUpdate();
    }, [userPool]);

    const getAuthenticatedUser = useCallback(() => {
        return userPool?.getCurrentUser() || null;
    }, [userPool]);

    const handleMFARequired: MFAEventHandler = useCallback(
        (cognitoUser, challengeName, challengeParams) => {
            setTransition(
                <MFA
                    cognitoUser={cognitoUser}
                    challengeName={challengeName}
                    challengeParams={challengeParams}
                    resetView={resetView}
                />
            );
        },
        [resetView]
    );

    const handleMFATotpSetup = useCallback(
        (cognitoUser: CognitoUser) => {
            cognitoUser.associateSoftwareToken({
                associateSecretCode(secretCode) {
                    setTransition(
                        <MFATotpSetup secretCode={secretCode} cognitoUser={cognitoUser} resetView={resetView} />
                    );
                },
                onFailure(err) {
                    setTransition(<ErrorMessage onBackToSignIn={resetView}>{err.message}</ErrorMessage>);
                },
            });
        },
        [resetView]
    );

    const handleMFASelection: MFAEventHandler = useCallback(
        (cognitoUser, challengeName, challengeParams) => {
            setTransition(
                <MFASelection
                    challengeName={challengeName}
                    challengeParams={challengeParams}
                    onMFARequired={handleMFARequired}
                    cognitoUser={cognitoUser}
                    resetView={resetView}
                />
            );
        },
        [resetView, handleMFARequired]
    );

    const handleNewPasswordRequired = useCallback(
        (cognitoUser: CognitoUser, userAttributes: any, requiredAttributes: any) => {
            setTransition(
                <NewPassword
                    cognitoUser={cognitoUser}
                    userAttributes={userAttributes}
                    requiredAttributes={requiredAttributes}
                    resetView={resetView}
                    onMFARequired={handleMFARequired}
                    onMFASelection={handleMFASelection}
                    onMFASetup={handleMFATotpSetup}
                />
            );
        },
        [handleMFARequired, handleMFATotpSetup, handleMFASelection, resetView]
    );

    const handleForgotPassword = useCallback(() => {
        setTransition(<ForgotPassword userPool={userPool} resetView={resetView} />);
    }, [userPool, resetView]);

    if (!userPool) {
        return (
            <Container>
                <ConfigError />
            </Container>
        );
    }

    const user = getAuthenticatedUser();
    if (user) {
        return (
            <CognitoAuthContext.Provider
                value={{
                    userPool,
                    onSignOut: handleSignOut,
                    getAuthenticatedUser,
                }}
            >
                {typeof children === 'function' ? children(handleSignOut, user) : children}
            </CognitoAuthContext.Provider>
        );
    }

    return (
        <Container header={header} logo={logo}>
            {transition ??
                (allowSignup ? (
                    <Tabs
                        activeTabId={activeTab}
                        onChange={({ detail }) => setActiveTab(detail.activeTabId)}
                        tabs={[
                            {
                                label: 'Sign In',
                                id: 'signIn',
                                content: (
                                    <SignIn
                                        userPool={userPool}
                                        onMFARequired={handleMFARequired}
                                        onMFASelection={handleMFASelection}
                                        onMFASetup={handleMFATotpSetup}
                                        onNewPasswordRequired={handleNewPasswordRequired}
                                        resetView={resetView}
                                        onForgotPassword={handleForgotPassword}
                                    />
                                ),
                            },
                            {
                                label: 'Sign Up',
                                id: 'signUp',
                                content: (
                                    <SignUp
                                        userPool={userPool}
                                        resetView={resetView}
                                        attributes={signUpAttributes}
                                        hrefTermsAndConditions={hrefTermsAndConditions}
                                    />
                                ),
                            },
                        ]}
                    />
                ) : (
                    <SignIn
                        userPool={userPool}
                        onMFARequired={handleMFARequired}
                        onMFASelection={handleMFASelection}
                        onMFASetup={handleMFATotpSetup}
                        onNewPasswordRequired={handleNewPasswordRequired}
                        resetView={resetView}
                        onForgotPassword={handleForgotPassword}
                    />
                ))}
        </Container>
    );
};

export const useCognitoAuthContext = () => useContext(CognitoAuthContext);

export default CognitoAuth;
export * from './types';
