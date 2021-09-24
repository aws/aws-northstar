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
import React from 'react';
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import Header from '../../components/Header';
import AppLayout, { useAppLayoutContext, Notification } from '.';
import useLocalStorage from 'react-use-localstorage';

const mockSetLocalStorage = jest.fn();

jest.mock('react-use-localstorage', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('@material-ui/core/styles/makeStyles', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => () => ({})),
}));

const header = <Header title="App Title" />;

const navigation = <div>App Name</div>;

const helpPanel = <div>HelpPanel</div>;

const splitPanel = <div>SplitPanel</div>;

const breadcrumbsNode = <div>MockBreadcrumbs</div>;

const notifications: Notification[] = [
    {
        id: '1',
        header: 'Failed to update 1 order',
        type: 'error',
        content: 'This is a dismissible error message with a button.',
        buttonText: 'Retry',
        onButtonClick: jest.fn(),
        dismissible: true,
        onDismiss: jest.fn(),
    },
];

describe('AppLayout', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        (useLocalStorage as jest.Mock).mockReturnValue(['false', mockSetLocalStorage]);
    });

    afterEach(cleanup);

    it('renders the headers', () => {
        const { container } = render(<AppLayout header={header} />);
        const headerTag = container.getElementsByTagName('header')[0];
        expect(headerTag).toBeDefined();
        expect(headerTag.textContent).toBe('App Title');
    });

    it('renders the breadcrumbs node', () => {
        const { getByText } = render(<AppLayout header={header} breadcrumbs={breadcrumbsNode} />);
        expect(getByText('MockBreadcrumbs')).toBeInTheDocument();
    });

    describe('NavSideBar', () => {
        it('renders the nav sidebar node but no visible', () => {
            const { getByText } = render(<AppLayout header={header} navigation={navigation} />);

            expect(getByText('App Name')).toBeInTheDocument();
            expect(getByText('App Name')).not.toBeVisible();
        });

        it('should set the local storage value true when users click the open nav drawer button', () => {
            const { getByTestId } = render(<AppLayout header={header} navigation={navigation} />);
            act(() => {
                fireEvent.click(getByTestId('open-nav-drawer'));
            });

            expect(mockSetLocalStorage).toBeCalledWith('true');
        });

        it('should render the nav sidebar drawer visible when local storage returns true', () => {
            (useLocalStorage as jest.Mock).mockReturnValue(['true', mockSetLocalStorage]);

            const { getByTestId, getByText } = render(<AppLayout header={header} navigation={navigation} />);
            act(() => {
                fireEvent.click(getByTestId('open-nav-drawer'));
            });

            expect(getByText('App Name')).toBeVisible();
        });
    });

    describe('HelpPanel', () => {
        it('renders the help panel node', () => {
            const { getByText } = render(<AppLayout header={header} helpPanel={helpPanel} />);

            expect(getByText('HelpPanel')).toBeInTheDocument();
            expect(getByText('HelpPanel')).not.toBeVisible();
        });

        it('should set the local storage value true when users click the button', () => {
            const { getByTestId } = render(<AppLayout header={header} helpPanel={helpPanel} />);

            act(() => {
                fireEvent.click(getByTestId('open-helppanel-drawer'));
            });

            expect(mockSetLocalStorage).toBeCalledWith('true');
        });

        it('should render the help panel drawer visible when local storage returns true', () => {
            (useLocalStorage as jest.Mock).mockReturnValue(['true', mockSetLocalStorage]);

            const { getByTestId, getByText } = render(<AppLayout header={header} helpPanel={helpPanel} />);
            act(() => {
                fireEvent.click(getByTestId('open-helppanel-drawer'));
            });

            expect(getByText('HelpPanel')).toBeVisible();
        });

        it('should trigger open help panel when users call openHelpPanel helper method', () => {
            const ContentNode = () => {
                const { openHelpPanel } = useAppLayoutContext();
                return (
                    <div>
                        <button data-testid="trigger-open" onClick={() => openHelpPanel()} />
                    </div>
                );
            };
            const { getByTestId } = render(
                <AppLayout header={header} helpPanel={helpPanel}>
                    <ContentNode />
                </AppLayout>
            );

            act(() => {
                fireEvent.click(getByTestId('trigger-open'));
            });

            expect(mockSetLocalStorage).toBeCalledWith('true');
        });

        it('should trigger close help panel when users call openHelpPanel helper method with false', () => {
            const ContentNode = () => {
                const { openHelpPanel } = useAppLayoutContext();
                return (
                    <div>
                        <button data-testid="trigger-close" onClick={() => openHelpPanel(false)} />
                    </div>
                );
            };
            const { getByTestId } = render(
                <AppLayout header={header} helpPanel={helpPanel}>
                    <ContentNode />
                </AppLayout>
            );

            act(() => {
                fireEvent.click(getByTestId('trigger-close'));
            });

            expect(mockSetLocalStorage).toBeCalledWith('false');
        });

        it('should trigger help panel content to be dynamically changed', () => {
            const dynamicContent = 'Dynamic Content';

            const ContentNode = () => {
                const { setHelpPanelContent } = useAppLayoutContext();
                return (
                    <div>
                        <button
                            data-testid="trigger-update"
                            onClick={() => setHelpPanelContent(<div>{dynamicContent}</div>)}
                        />
                    </div>
                );
            };
            const { getByTestId, getByText } = render(
                <AppLayout header={header} helpPanel={helpPanel}>
                    <ContentNode />
                </AppLayout>
            );

            act(() => {
                fireEvent.click(getByTestId('trigger-update'));
            });

            expect(getByText(dynamicContent)).toBeInTheDocument();
        });
    });

    describe('SplitPanel', () => {
        it('renders the Split Panel node', () => {
            const { getByText } = render(<AppLayout header={header} splitPanel={splitPanel} />);

            expect(getByText('SplitPanel')).toBeVisible();
        });

        it('should trigger open split panel when users call openSplitPanel helper method', () => {
            const ContentNode = () => {
                const { openSplitPanel, setSplitPanelContent } = useAppLayoutContext();
                return (
                    <div>
                        <button
                            data-testid="trigger-open"
                            onClick={() => {
                                setSplitPanelContent(splitPanel);
                                openSplitPanel();
                            }}
                        />
                    </div>
                );
            };
            const { getByTestId, queryByText, getByText } = render(
                <AppLayout header={header}>
                    <ContentNode />
                </AppLayout>
            );

            expect(queryByText('SplitPanel')).toBeNull();

            act(() => {
                fireEvent.click(getByTestId('trigger-open'));
            });

            expect(getByText('SplitPanel')).toBeVisible();
        });
    });

    describe('Notifications', () => {
        it('renders notifications', () => {
            const { getByText } = render(<AppLayout header={header} notifications={notifications} />);

            expect(getByText('Failed to update 1 order')).toBeVisible();
        });

        it('renders dynamically added notifications', () => {
            const notification: Notification = {
                id: '1',
                type: 'success',
                header: 'Your request 1 is being processed',
                dismissible: true,
                onDismiss: jest.fn(),
            };
            const ContentNode = () => {
                const { addNotification } = useAppLayoutContext();
                return (
                    <div>
                        <button data-testid="trigger-add-notification" onClick={() => addNotification(notification)} />
                    </div>
                );
            };
            const { getByTestId, getByText, getByLabelText, queryByText } = render(
                <AppLayout header={header} navigation={navigation}>
                    <ContentNode />
                </AppLayout>
            );
            act(() => {
                fireEvent.click(getByTestId('trigger-add-notification'));
            });

            expect(getByText('Your request 1 is being processed')).toBeVisible();

            act(() => {
                fireEvent.click(getByLabelText('Close'));
            });

            expect(queryByText('Your request 1 is being processed')).toBeNull();
            expect(notification.onDismiss).toHaveBeenCalled();
        });

        it('can dismiss notifications', () => {
            const notifications: Notification[] = ['1', '2', '3', '4'].map((n) => ({
                id: n,
                type: 'success',
                header: `Your request ${n} is being processed`,
                dismissible: true,
                onDismiss: jest.fn(),
            }));
            const ContentNode = () => {
                const { addNotification, dismissNotifications } = useAppLayoutContext();
                return (
                    <div>
                        <button
                            data-testid="trigger-add-notifications"
                            onClick={() => {
                                notifications.forEach(addNotification);
                            }}
                        />
                        <button data-testid="trigger-remove-notification" onClick={() => dismissNotifications('3')} />
                        <button data-testid="trigger-remove-all-notifications" onClick={() => dismissNotifications()} />
                    </div>
                );
            };
            const { getByTestId, getByText, queryByText } = render(
                <AppLayout header={header} navigation={navigation} maxNotifications={3}>
                    <ContentNode />
                </AppLayout>
            );

            act(() => {
                fireEvent.click(getByTestId('trigger-add-notifications'));
            });

            expect(queryByText('Your request 1 is being processed')).toBeNull();
            expect(getByText('Your request 2 is being processed')).toBeVisible();
            expect(getByText('Your request 3 is being processed')).toBeVisible();
            expect(getByText('Your request 4 is being processed')).toBeVisible();

            expect(notifications[0].onDismiss).toHaveBeenCalled();

            act(() => {
                fireEvent.click(getByTestId('trigger-remove-notification'));
            });

            expect(queryByText('Your request 1 is being processed')).toBeNull();
            expect(getByText('Your request 2 is being processed')).toBeVisible();
            expect(queryByText('Your request 3 is being processed')).toBeNull();
            expect(getByText('Your request 4 is being processed')).toBeVisible();

            expect(notifications[2].onDismiss).toHaveBeenCalled();

            act(() => {
                fireEvent.click(getByTestId('trigger-remove-all-notifications'));
            });

            expect(queryByText('Your request 1 is being processed')).toBeNull();
            expect(queryByText('Your request 2 is being processed')).toBeNull();
            expect(queryByText('Your request 3 is being processed')).toBeNull();
            expect(queryByText('Your request 4 is being processed')).toBeNull();

            expect(notifications[1].onDismiss).toHaveBeenCalled();
            expect(notifications[3].onDismiss).toHaveBeenCalled();
        });
    });
});
