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
import { CognitoUserPool, CognitoUser, ChallengeName } from 'amazon-cognito-identity-js';
import Container from './components/Container';
import ConfigError from './components/ConfigError';
import MFA from './components/MFA';
import MFASetup from './components/MFASetup';
import MFATotp from './components/MFATotp';
import NewPassword from './components/NewPassword';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';

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
 * Support cognito authentication flows.
 *
 * **Limitations**
 * * Sign up flow is not supported
 * * [Cognito hosted UI](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-integration.html) is not supported
 */
const CognitoAuth: FC<CognitoAuthProps> = ({ children, userPoolId, clientId }) => {
    const [transition, setTransition] = useState<ReactNode>();
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
        transition ? setTransition(undefined) : forceUpdate();
    }, [transition, forceUpdate]);

    const handleSignOut = useCallback(() => {
        userPool?.getCurrentUser()?.signOut();
        setTransition(undefined);
        forceUpdate();
    }, [userPool]);

    const getAuthenticatedUser = useCallback(() => {
        return userPool?.getCurrentUser() || null;
    }, [userPool]);

    const handleMFARequired = useCallback(
        (cognitoUser: CognitoUser, challengeName: ChallengeName, challengeParams: any) => {
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

    const handleAssociateSecretCode = useCallback(
        (cognitoUser: CognitoUser, secretCode: string) => {
            setTransition(<MFATotp cognitoUser={cognitoUser} secretCode={secretCode} resetView={resetView} />);
        },
        [resetView]
    );

    const handleMFASetup = useCallback(
        (cognitoUser: CognitoUser, challengeName: ChallengeName, challengeParams: any) => {
            setTransition(
                <MFASetup
                    cognitoUser={cognitoUser}
                    challengeName={challengeName}
                    challengeParams={challengeParams}
                    resetView={resetView}
                    onAssociateSecretCode={handleAssociateSecretCode}
                    onMFARequired={handleMFARequired}
                />
            );
        },
        [resetView, handleAssociateSecretCode, handleMFARequired]
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
                    onMFASetup={handleMFASetup}
                />
            );
        },
        [handleMFARequired, handleMFASetup, resetView]
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
        <Container>
            {transition ?? (
                <SignIn
                    userPool={userPool}
                    onMFARequired={handleMFARequired}
                    onMFASetup={handleMFASetup}
                    onNewPasswordRequired={handleNewPasswordRequired}
                    resetView={resetView}
                    onForgotPassword={handleForgotPassword}
                />
            )}
        </Container>
    );
};

export const useCognitoAuthContext = () => useContext(CognitoAuthContext);

export default CognitoAuth;
