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
import {
    CognitoUserPool,
    CognitoUser,
    AuthenticationDetails,
    IAuthenticationDetailsData,
    CognitoUserSession,
    ChallengeName,
} from 'amazon-cognito-identity-js';
import Container from './components/Container';
import ConfigError from './components/ConfigError';
import SignInView from './components/SignInView';
import NewPasswordView from './components/NewPasswordView';
import MFAView from './components/MFAView';

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

    const handleSignOut = useCallback(() => {
        userPool?.getCurrentUser()?.signOut();
        forceUpdate();
    }, [userPool]);

    const getAuthenticatedUser = useCallback(() => {
        return userPool?.getCurrentUser() || null;
    }, [userPool]);

    const resetComponent = useCallback(() => {
        setTransition(undefined);
        forceUpdate();
    }, []);

    const handleMFA = useCallback(
        async (cognitoUser: CognitoUser, mfaCode: string) => {
            return new Promise((resolve, reject) => {
                cognitoUser.sendMFACode(mfaCode, {
                    onSuccess(result: CognitoUserSession) {
                        console.debug('Cognito sendMFACode Success');
                        resolve(result);
                        resetComponent();
                    },
                    onFailure(err) {
                        console.error('Cognito sendMFACode Failure', err);
                        reject(err);
                    },
                });
            });
        },
        [resetComponent]
    );

    const handleMFARequired = useCallback(
        (cognitoUser: CognitoUser, challengeName: ChallengeName, challengeParams: any) => {
            setTransition(
                <MFAView
                    challengeName={challengeName}
                    challengeParams={challengeParams}
                    onConfirm={async (code) => handleMFA(cognitoUser, code)}
                    onBackToSignIn={() => setTransition(undefined)}
                />
            );
        },
        [handleMFA]
    );

    const handleChangePassword = useCallback(
        async (cognitoUser: CognitoUser, newPassword: string, attributes: any) => {
            return new Promise((resolve, reject) => {
                return cognitoUser.completeNewPasswordChallenge(newPassword, attributes, {
                    onSuccess(result: CognitoUserSession) {
                        console.debug('Cognito Change Password Success', result);
                        resolve(result);
                        setTransition(undefined);
                    },
                    onFailure(err) {
                        console.error('Cognito Change Password Error', err);
                        reject(err);
                    },
                    mfaRequired(challengeName, challengeParams) {
                        handleMFARequired(cognitoUser, challengeName, challengeParams);
                        resolve({});
                    },
                });
            });
        },
        [handleMFARequired]
    );

    const handleNewPasswordRequired = useCallback(
        (cognitoUser: CognitoUser, userAttributes: any, requiredAttributes: any) => {
            setTransition(
                <NewPasswordView
                    userAttributes={userAttributes}
                    requiredAttributes={requiredAttributes}
                    onChangePassword={async (newPassword, attributes) => {
                        await handleChangePassword(cognitoUser, newPassword, attributes);
                    }}
                    onBackToSignIn={() => setTransition(undefined)}
                />
            );
        },
        [handleChangePassword]
    );

    const handleSignIn = useCallback(
        async (authenticationDetails: IAuthenticationDetailsData) => {
            if (userPool) {
                const authDetails = new AuthenticationDetails(authenticationDetails);
                const cognitoUser = new CognitoUser({
                    Username: authenticationDetails.Username,
                    Pool: userPool,
                });

                return new Promise((resolve, reject) => {
                    cognitoUser.authenticateUser(authDetails, {
                        onSuccess(result: CognitoUserSession) {
                            console.debug('Congnito Auth Success', result);
                            resolve(result);
                            setTransition(undefined);
                        },
                        onFailure(err) {
                            console.error('Congnito Auth Failure', err);
                            reject(err);
                        },
                        newPasswordRequired(userAttributes, requiredAttributes) {
                            handleNewPasswordRequired(cognitoUser, userAttributes, requiredAttributes);
                            resolve({});
                        },
                        mfaRequired(challengeName, challengeParams) {
                            console.log('mfaRequired', challengeName, challengeParams);
                            handleMFARequired(cognitoUser, challengeName, challengeParams);
                            resolve({});
                        },
                    });
                });
            }
        },
        [userPool, handleMFARequired, handleNewPasswordRequired]
    );

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
            {transition ?? <SignInView onSignIn={handleSignIn} onResetPassword={() => console.log('WIP')} />}
        </Container>
    );
};

export const useCognitoAuthContext = () => useContext(CognitoAuthContext);

export default CognitoAuth;
