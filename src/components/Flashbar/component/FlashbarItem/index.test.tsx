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
import { render, cleanup, fireEvent } from '@testing-library/react';
import FlashbarItem from '.';
import { FlashbarMessage, MessageType } from '../../types';

describe('FlashbarItem', () => {
    const messageTypes = ['success', 'warning', 'error', 'info'] as MessageType[];

    afterEach(cleanup);

    messageTypes.forEach((messageType) => {
        describe(`with the ${messageType} type`, () => {
            it(`should render the ${messageType} styled FlashbarItem`, () => {
                const { getByTestId } = render(<FlashbarItem type={messageType} header="header" content="content" />);
                expect(getByTestId(messageType)).toBeInTheDocument();
            });

            it(`should render ${messageType} icon`, () => {
                const { getByTitle } = render(<FlashbarItem type={messageType} header="header" content="content" />);
                expect(getByTitle(messageType)).toBeInTheDocument();
            });

            it('it renders with the header', () => {
                const { queryByRole } = render(<FlashbarItem type={messageType} header="header" />);
                expect(queryByRole('heading')).toBeInTheDocument();
            });

            describe('and is dismissible', () => {
                const dismissible = true;

                it('renders the close icon', () => {
                    const { queryByRole } = render(
                        <FlashbarItem type={messageType} header="header" dismissible={dismissible} />
                    );
                    expect(queryByRole('button')).toBeInTheDocument();
                });

                it('fires dismiss event', () => {
                    const mockDismissEvent = jest.fn();
                    const { getByRole } = render(
                        <FlashbarItem
                            type={messageType}
                            dismissible={dismissible}
                            header="header"
                            onDismiss={mockDismissEvent}
                        />
                    );
                    fireEvent.click(getByRole('button'));
                    expect(mockDismissEvent).toHaveBeenCalledTimes(1);
                });

                describe('with button text', () => {
                    const buttonText = 'the button text';
                    it('renders a custom button with the button text', () => {
                        const { queryByText } = render(
                            <FlashbarItem
                                type={messageType}
                                header="header"
                                dismissible={dismissible}
                                buttonText={buttonText}
                            />
                        );
                        expect(queryByText(buttonText)).toBeInTheDocument();
                    });

                    it('fires buttonClick event', () => {
                        const mockButtonClickEvent = jest.fn();
                        const { getByText } = render(
                            <FlashbarItem
                                type={messageType}
                                header="header"
                                buttonText={buttonText}
                                onButtonClick={mockButtonClickEvent}
                            />
                        );
                        fireEvent.click(getByText(buttonText));
                        expect(mockButtonClickEvent).toHaveBeenCalledTimes(1);
                    });

                    it('fires buttonClick event for dismissible FlashbarItem', () => {
                        const mockButtonClickEvent = jest.fn();
                        const { getByText } = render(
                            <FlashbarItem
                                type={messageType}
                                header="header"
                                dismissible={dismissible}
                                buttonText={buttonText}
                                onButtonClick={mockButtonClickEvent}
                            />
                        );
                        fireEvent.click(getByText(buttonText));
                        expect(mockButtonClickEvent).toHaveBeenCalledTimes(1);
                    });
                });
            });
        });
    });
});
