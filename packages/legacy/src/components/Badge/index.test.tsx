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

import Badge from '.';
import { axe } from 'jest-axe';

describe('Badge', () => {
    it('renders the given content', () => {
        const { getByText } = render(<Badge content="badge text" />);

        expect(getByText('badge text')).toBeInTheDocument();
    });

    it('renders when content is number', () => {
        const { getByText } = render(<Badge content={0} />);

        expect(getByText('0')).toBeInTheDocument();
    });

    it('renders when color prop is given', () => {
        const { getByText } = render(<Badge content={0} color="red" />);

        expect(getByText('0')).toBeInTheDocument();
    });

    it('can be accessed by testid', async () => {
        const { getByTestId } = render(<Badge content="some text" data-testid="badge"></Badge>);
        expect(getByTestId('badge')).toBeInTheDocument();
    });

    it('renders accessible component', async () => {
        const { container } = render(<Badge content="some text"></Badge>);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
