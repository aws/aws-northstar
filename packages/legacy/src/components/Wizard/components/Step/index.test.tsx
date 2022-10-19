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
import { render } from '@testing-library/react';
import Step from '.';
import { WizardStep } from '../../types';
import Placeholder from '../../../Placeholder';

describe('Step', () => {
    it('should render title as heading and content', () => {
        const step: WizardStep = {
            title: 'Step Title',
            isOptional: false,
            content: <Placeholder />,
        };
        const { getByText, getByTestId } = render(<Step step={step} />);

        expect(getByText('Step Title')).toBeInTheDocument();
        expect(getByText('Step Title').closest('h1')).toBeInTheDocument();
        expect(getByTestId('placeholder')).toBeInTheDocument();
    });

    it('should render optional when optional is true', () => {
        const step: WizardStep = {
            title: 'Step Title',
            isOptional: true,
            content: <Placeholder />,
        };
        const { getByText } = render(<Step step={step} />);

        expect(getByText('- Optional')).toBeInTheDocument();
    });

    it('should render description when it is provided', () => {
        const step: WizardStep = {
            title: 'Step Title',
            description: 'Step description',
            isOptional: true,
            content: <Placeholder />,
        };
        const { getByText } = render(<Step step={step} />);

        expect(getByText('Step description')).toBeInTheDocument();
    });
});
