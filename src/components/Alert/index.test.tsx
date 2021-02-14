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
import { axe } from 'jest-axe';

import Alert, { AlertType } from '.';
import { Success, Warning, Info, Error } from './index.stories';

describe('Alert', () => {
    const alertTypes = ['success', 'warning', 'error', 'info'] as AlertType[];

    afterEach(cleanup);

    alertTypes.forEach((alertType) => {
        describe(`with the ${alertType} type`, () => {
            it(`should render the ${alertType} styled Alert`, () => {
                const { getByTestId } = render(<Alert type={alertType} />);
                expect(getByTestId(alertType)).toBeInTheDocument();
            });

            it(`should render ${alertType} icon`, () => {
                const { getByTitle } = render(<Alert type={alertType} />);
                expect(getByTitle(alertType)).toBeInTheDocument();
            });

            describe('when there is no header', () => {
                it('doesnt render the header', () => {
                    const { queryByRole } = render(<Alert type={alertType} />);
                    expect(queryByRole('heading')).not.toBeInTheDocument();
                });
            });

            describe('when there is a header', () => {
                it('it renders with the header', () => {
                    const { queryByRole } = render(<Alert type={alertType} header={'the header'} />);
                    expect(queryByRole('heading')).toBeInTheDocument();
                });
            });

            describe('and is dismissable', () => {
                const dismissable = true;

                it('renders the close icon', () => {
                    const { queryByRole } = render(<Alert type={alertType} dismissable={dismissable} />);
                    expect(queryByRole('button')).toBeInTheDocument();
                });

                it('fires dismiss event', () => {
                    const mockDismissEvent = jest.fn();
                    const { getByRole } = render(
                        <Alert type={alertType} dismissable={dismissable} onDismiss={mockDismissEvent} />
                    );
                    fireEvent.click(getByRole('button'));
                    expect(mockDismissEvent).toHaveBeenCalledTimes(1);
                });

                describe('with a label', () => {
                    const dismissLabel = 'the label';
                    it('adds the label to the dismiss button', () => {
                        const { queryByLabelText, queryByRole } = render(
                            <Alert type={alertType} dismissable={dismissable} dissmissLabel={dismissLabel} />
                        );
                        expect(queryByRole('button')).toBeInTheDocument();
                        expect(queryByLabelText(dismissLabel)).toBeInTheDocument();
                    });
                });

                describe('with button text', () => {
                    const buttonText = 'the button text';
                    it('renders a custom button with the button text', () => {
                        const { queryByText } = render(
                            <Alert type={alertType} dismissable={dismissable} buttonText={buttonText} />
                        );
                        expect(queryByText(buttonText)).toBeInTheDocument();
                    });

                    it('fires buttonClick event', () => {
                        const mockButtonClickEvent = jest.fn();
                        const { getByText } = render(
                            <Alert type={alertType} buttonText={buttonText} onButtonClick={mockButtonClickEvent} />
                        );
                        fireEvent.click(getByText(buttonText));
                        expect(mockButtonClickEvent).toHaveBeenCalledTimes(1);
                    });

                    it('fires buttonClick event for dismissable alert', () => {
                        const mockButtonClickEvent = jest.fn();
                        const { getByText } = render(
                            <Alert
                                type={alertType}
                                dismissable={dismissable}
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

    it('renders accessible component', async () => {
        const { container } = render(
            <>
                {Success()}
                {Info()}
                {Warning()}
                {Error()}
            </>
        );
        const results = await axe(container, {
            rules: {
                'aria-required-attr': { enabled: false },
            },
        });

        expect(results).toHaveNoViolations();
    });
});
