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

import Text from '.';

describe('Text', () => {
    it('should render text', () => {
        const { getByText, container } = render(<Text>sometext</Text>);

        expect(getByText('sometext')).toBeInTheDocument();
        expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('should render text as p', () => {
        const { container } = render(<Text variant="p">sometext</Text>);
        expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('should render children component', () => {
        const { getByText } = render(
            <Text>
                <p>sometext</p>
            </Text>
        );

        expect(getByText('sometext')).toContainHTML('<p>sometext</p>');
    });

    it('can be accessed by custom test-id', () => {
        const { getByTestId } = render(<Text data-testid="text-1">sometext</Text>);
        expect(getByTestId('text-1')).toBeInTheDocument();
    });
});
