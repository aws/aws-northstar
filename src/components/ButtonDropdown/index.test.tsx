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
import ButtonDropdown from '.';
import { axe } from 'jest-axe';

describe('ButtonDropdown', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders an enabled button with the content by default', () => {
        const { getByText } = render(<ButtonDropdown content="the content" />);
        expect(getByText('the content')).toBeInTheDocument();
    });

    it('renders items props as children', () => {
        const props = { content: 'some content', items: [{ text: 'the item' }] };
        const { getByText } = render(<ButtonDropdown {...props} />);

        expect(getByText(props.items[0].text)).toBeInTheDocument();
    });

    it('renders accessible component', async () => {
        const { container } = render(<ButtonDropdown content="some content" />);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
