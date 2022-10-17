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

import KeyValuePair from '.';

describe('KeyValuePair', () => {
    it('renders label', () => {
        const { getByText } = render(<KeyValuePair label="Property Label" />);
        expect(getByText('Property Label')).toBeInTheDocument();
    });

    it('renders "-" when value is not provided', () => {
        const { getByTestId } = render(<KeyValuePair label="Property Label" />);
        expect(getByTestId('value')).toHaveTextContent('-');
    });

    it('renders value string when value is string', () => {
        const { getByTestId } = render(<KeyValuePair label="Property Label" value="Property Value" />);
        expect(getByTestId('value')).toHaveTextContent('Property Value');
    });

    it('renders value number when value is number', () => {
        const { getByTestId } = render(<KeyValuePair label="Property Label" value={100} />);
        expect(getByTestId('value')).toHaveTextContent('100');
    });

    it('renders value node when value is node', () => {
        const value = <div data-testid="valuenode">Value</div>;
        const { getByTestId } = render(<KeyValuePair label="Property Label" value={value} />);
        expect(getByTestId('value')).toContainElement(getByTestId('valuenode'));
    });

    it('can be accessed by custom test-id', () => {
        const { getByTestId } = render(
            <KeyValuePair label="Property Label" value="Property Value" data-testid="key-value-pair-1" />
        );
        expect(getByTestId('key-value-pair-1')).toBeInTheDocument();
    });
});
