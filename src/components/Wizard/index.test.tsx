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
import Wizard from '.';
import { axe } from 'jest-axe';
import { Default } from './index.stories';
import { Placeholder } from '..';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const steps = [
    {
        title: 'Step Title 1',
        description: 'Enter general information',
        content: <Placeholder data-testid="step1" />,
    },
    {
        title: 'Step Title 2',
        content: <Placeholder data-testid="step2" />,
    },
    {
        title: 'Step Title 3',
        content: <Placeholder data-testid="step3" />,
        isOptional: true,
    },
];

describe('Wizard', () => {
    afterEach(cleanup);

    it('renders Wizard step 1', () => {
        const history = createMemoryHistory();
        const { getByText, getAllByText, getByTestId } = render(
            <Router history={history}>
                <Wizard steps={steps} />
            </Router>
        );

        expect(getAllByText('Step Title 1')).toHaveLength(2); // nav + main content
        expect(getByText('Enter general information')).toBeInTheDocument();
        expect(getByTestId('step1')).toBeInTheDocument();
    });

    it('should navigate between steps', () => {
        const history = createMemoryHistory();
        const { getByText, getByTestId } = render(
            <Router history={history}>
                <Wizard steps={steps} />
            </Router>
        );
        fireEvent.click(getByText('Next'));
        expect(getByTestId('step2')).toBeInTheDocument();
        fireEvent.click(getByText('Next'));
        expect(getByTestId('step3')).toBeInTheDocument();
        fireEvent.click(getByText('Previous'));
        expect(getByTestId('step2')).toBeInTheDocument();
    });

    describe('Event handler', () => {
        it('should trigger onCancelButtonClick event', () => {
            const history = createMemoryHistory();
            const handleCancel = jest.fn();
            const { getByText } = render(
                <Router history={history}>
                    <Wizard steps={steps} onCancelButtonClick={handleCancel} />
                </Router>
            );
            fireEvent.click(getByText('Cancel'));
            expect(handleCancel).toHaveBeenCalled();
        });

        it('should trigger onNextButtonClick event', () => {
            const history = createMemoryHistory();
            const handleNext = jest.fn();
            const { getByText } = render(
                <Router history={history}>
                    <Wizard steps={steps} onNextButtonClick={handleNext} />
                </Router>
            );
            fireEvent.click(getByText('Next'));
            expect(handleNext).toHaveBeenCalledWith({ requestedStepIndex: 1 });
        });

        it('should trigger onPreviousButtonClick event', () => {
            const history = createMemoryHistory();
            const handlePrevious = jest.fn();
            const { getByText } = render(
                <Router history={history}>
                    <Wizard steps={steps} onPreviousButtonClick={handlePrevious} />
                </Router>
            );
            fireEvent.click(getByText('Next'));
            fireEvent.click(getByText('Previous'));
            expect(handlePrevious).toHaveBeenCalledWith({ requestedStepIndex: 0 });
        });

        it('should trigger onSubmitButtonClick event', () => {
            const history = createMemoryHistory();
            const handleSubmit = jest.fn();
            const { getByText, getByTestId } = render(
                <Router history={history}>
                    <Wizard steps={steps} onSubmitButtonClick={handleSubmit} />
                </Router>
            );
            fireEvent.click(getByText('Next'));
            expect(getByTestId('step2')).toBeInTheDocument();
            fireEvent.click(getByText('Next'));
            expect(getByTestId('step3')).toBeInTheDocument();
            fireEvent.click(getByText('Submit'));
            expect(handleSubmit).toHaveBeenCalled();
        });

        it('should trigger onStepNavigationClick event', () => {
            const history = createMemoryHistory();
            const handleStepNavigationClick = jest.fn();
            const { getByText, getByTestId } = render(
                <Router history={history}>
                    <Wizard steps={steps} onStepNavigationClick={handleStepNavigationClick} />
                </Router>
            );
            fireEvent.click(getByText('Next'));
            expect(getByTestId('step2')).toBeInTheDocument();
            fireEvent.click(getByText('Step Title 1'));
            expect(getByTestId('step1')).toBeInTheDocument();
            expect(handleStepNavigationClick).toHaveBeenCalledWith({ requestedStepIndex: 0 });
        });
    });

    describe('Button labels', () => {
        it('should render the default values', () => {
            const history = createMemoryHistory();
            const { getByText } = render(
                <Router history={history}>
                    <Wizard steps={steps} />
                </Router>
            );
            expect(getByText('Cancel')).toBeInTheDocument();
            expect(getByText('Next')).toBeInTheDocument();
            fireEvent.click(getByText('Next'));
            expect(getByText('Previous')).toBeInTheDocument();
            fireEvent.click(getByText('Next'));
            expect(getByText('Submit')).toBeInTheDocument();
        });

        it('should be customized', () => {
            const history = createMemoryHistory();
            const { getByText } = render(
                <Router history={history}>
                    <Wizard
                        steps={steps}
                        cancelButtonText="Cancel label"
                        nextButtonText="Next label"
                        previousButtonText="Previous label"
                        submitButtonText="Submit label"
                    />
                </Router>
            );
            expect(getByText('Cancel label')).toBeInTheDocument();
            expect(getByText('Next label')).toBeInTheDocument();
            fireEvent.click(getByText('Next label'));
            expect(getByText('Previous label')).toBeInTheDocument();
            fireEvent.click(getByText('Next label'));
            expect(getByText('Submit label')).toBeInTheDocument();
        });
    });

    it('renders accessible component', async () => {
        const { container, getByText } = render(<Default />);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
