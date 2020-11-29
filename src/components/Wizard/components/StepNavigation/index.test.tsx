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
import { render, fireEvent } from '@testing-library/react';
import StepNavigation from '.';
import { WizardStepInfo } from '../../types';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('StepNavigation', () => {
    it('should render title as heading', () => {
        const steps: WizardStepInfo[] = [
            {
                title: 'Step Title 1',
                isOptional: false,
            },
            {
                title: 'Step Title 2',
                isOptional: false,
            },
            {
                title: 'Step Title 3',
                isOptional: false,
            },
        ];
        const history = createMemoryHistory();
        const { getAllByTestId, getByText } = render(
            <Router history={history}>
                <StepNavigation
                    steps={steps}
                    getStepNumberLabel={(stepNumber: number) => `Step ${stepNumber}`}
                    activeStepIndex={0}
                    maxStepIndex={2}
                    optionalText="Optional"
                    disableStepNavigation={false}
                />
            </Router>
        );

        expect(getAllByTestId('stepNavBox')).toHaveLength(steps.length);
        expect(getByText('Step Title 1')).toBeInTheDocument();
        expect(getByText('Step Title 1').closest('b')).toBeInTheDocument();
        expect(getByText('Step Title 1').closest('a')).toBeNull();
        expect(getByText('Step Title 2')).toBeInTheDocument();
        expect(getByText('Step Title 2').closest('a')).toBeInTheDocument();
        expect(getByText('Step Title 3')).toBeInTheDocument();
        expect(getByText('Step Title 3').closest('a')).toBeInTheDocument();
        expect(getByText('Step 1')).toBeInTheDocument();
        expect(getByText('Step 2')).toBeInTheDocument();
        expect(getByText('Step 3')).toBeInTheDocument();
    });

    it('should render active nav', () => {
        const steps: WizardStepInfo[] = [
            {
                title: 'Step Title 1',
                isOptional: false,
            },
            {
                title: 'Step Title 2',
                isOptional: false,
            },
            {
                title: 'Step Title 3',
                isOptional: false,
            },
        ];
        const history = createMemoryHistory();
        const { getAllByTestId, getByText } = render(
            <Router history={history}>
                <StepNavigation
                    steps={steps}
                    getStepNumberLabel={(stepNumber: number) => `Step ${stepNumber}`}
                    activeStepIndex={1}
                    maxStepIndex={2}
                    optionalText="Optional"
                    disableStepNavigation={false}
                />
            </Router>
        );

        expect(getAllByTestId('stepNavBox')).toHaveLength(steps.length);
        expect(getByText('Step Title 1').closest('a')).toBeInTheDocument();
        expect(getByText('Step Title 2').closest('b')).toBeInTheDocument();
        expect(getByText('Step Title 3').closest('a')).toBeInTheDocument();
    });

    it('should not render as link when > maxStepIndex', () => {
        const steps: WizardStepInfo[] = [
            {
                title: 'Step Title 1',
                isOptional: false,
            },
            {
                title: 'Step Title 2',
                isOptional: false,
            },
            {
                title: 'Step Title 3',
                isOptional: false,
            },
        ];
        const history = createMemoryHistory();
        const { getAllByTestId, getByText } = render(
            <Router history={history}>
                <StepNavigation
                    steps={steps}
                    getStepNumberLabel={(stepNumber: number) => `Step ${stepNumber}`}
                    activeStepIndex={0}
                    maxStepIndex={1}
                    optionalText="Optional"
                    disableStepNavigation={false}
                />
            </Router>
        );

        expect(getAllByTestId('stepNavBox')).toHaveLength(steps.length);
        expect(getByText('Step Title 3').closest('a')).toBeNull();
    });

    it('should render optional label', () => {
        const steps: WizardStepInfo[] = [
            {
                title: 'Step Title 1',
                isOptional: true,
            },
            {
                title: 'Step Title 2',
                isOptional: false,
            },
        ];
        const history = createMemoryHistory();
        const { getByText } = render(
            <Router history={history}>
                <StepNavigation
                    steps={steps}
                    getStepNumberLabel={(stepNumber: number) => `Step ${stepNumber}`}
                    activeStepIndex={0}
                    maxStepIndex={2}
                    optionalText="Optional label"
                    disableStepNavigation={false}
                />
            </Router>
        );
        expect(getByText('Optional label', { exact: false })).toBeInTheDocument();
    });

    it('should disable navigation when disableStepNavigation is true', () => {
        const steps: WizardStepInfo[] = [
            {
                title: 'Step Title 1',
                isOptional: false,
            },
            {
                title: 'Step Title 2',
                isOptional: false,
            },
        ];
        const history = createMemoryHistory();
        const { container } = render(
            <Router history={history}>
                <StepNavigation
                    steps={steps}
                    getStepNumberLabel={(stepNumber: number) => `Step ${stepNumber}`}
                    activeStepIndex={0}
                    maxStepIndex={2}
                    optionalText="Optional label"
                    disableStepNavigation={true}
                />
            </Router>
        );
        expect(container.querySelectorAll('a')).toHaveLength(0);
    });

    it('should navigate between steps', () => {
        const steps: WizardStepInfo[] = [
            {
                title: 'Step Title 1',
                isOptional: false,
            },
            {
                title: 'Step Title 2',
                isOptional: false,
            },
            {
                title: 'Step Title 3',
                isOptional: false,
            },
        ];
        const history = createMemoryHistory();
        const handleStepNavigationClick = jest.fn();
        const { getByText } = render(
            <Router history={history}>
                <StepNavigation
                    steps={steps}
                    getStepNumberLabel={(stepNumber: number) => `Step ${stepNumber}`}
                    activeStepIndex={0}
                    maxStepIndex={2}
                    optionalText="Optional label"
                    disableStepNavigation={false}
                    onStepNavigationClick={handleStepNavigationClick}
                />
            </Router>
        );

        fireEvent.click(getByText('Step Title 2'));
        expect(handleStepNavigationClick).toHaveBeenCalledWith({ requestedStepIndex: 1 });
    });
});
