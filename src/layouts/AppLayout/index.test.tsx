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

const mockSetLocalStorage = jest.fn();

jest.mock('react-use-localstorage', () => ({
    __esModule: true,
    default: () => ['false', mockSetLocalStorage],
}));

const header = <Header title="App Title" />;

const navigation = <div>App Name</div>;

const helpPanel = <div>Help</div>;

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
        it('renders the nav sidebar node hide', () => {
            const { getByText } = render(<AppLayout header={header} navigation={navigation} />);

            expect(getByText('App Name')).toBeInTheDocument();
            expect(getByText('App Name')).not.toBeVisible();
        });

        it('should open the nav sidebar drawer when users click the button', () => {
            const { getAllByTestId } = render(<AppLayout header={header} navigation={navigation} />);
            act(() => {
                fireEvent.click(getAllByTestId('open-nav-drawer')[1]);
            });

            expect(mockSetLocalStorage).toBeCalledWith('true');
        });
    });

    describe('HelpPanel', () => {
        it('renders the help panel node', () => {
            const { getByText } = render(<AppLayout header={header} helpPanel={helpPanel} />);

            expect(getByText('Help')).toBeInTheDocument();
            expect(getByText('Help')).not.toBeVisible();
        });

        it('should open the help panel drawer when users click the button', () => {
            const { getAllByTestId } = render(<AppLayout header={header} navigation={navigation} />);
            act(() => {
                fireEvent.click(getAllByTestId('open-nav-drawer')[1]);
            });

            expect(mockSetLocalStorage).toBeCalledWith('true');
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
                <AppLayout header={header} navigation={navigation}>
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
                <AppLayout header={header} navigation={navigation}>
                    <ContentNode />
                </AppLayout>
            );
            act(() => {
                fireEvent.click(getByTestId('trigger-close'));
            });

            expect(mockSetLocalStorage).toBeCalledWith('false');
        });
    });

    describe('Notifications', () => {
        it('renders notifications', () => {
            const { getByText } = render(<AppLayout header={header} notifications={notifications} />);

            expect(getByText('Failed to update 1 order')).toBeVisible();
        });
    });
});
