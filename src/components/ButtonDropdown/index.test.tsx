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
import ButtonDropdown from '.';
import { axe } from 'jest-axe';

describe('ButtonDropdown', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders content and ArrowDropdown by default', () => {
        const { getByText, container } = render(<ButtonDropdown content="the content" />);

        expect(getByText('the content')).toBeVisible();
        expect(container.querySelector('svg')).not.toBeNull();
    });

    it('should not render ArrowDropdown if disableArrowDropdown is true', () => {
        const { getByText, container } = render(<ButtonDropdown content="the content" disableArrowDropdown={true} />);

        expect(container.querySelector('svg')).toBeNull();
    });

    it('renders one item', () => {
        const props = { content: 'the content', items: [{ text: 'the item' }] };
        const { getByText } = render(<ButtonDropdown {...props} />);

        fireEvent.click(getByText('the content'));

        expect(getByText('the item')).toBeVisible();
    });

    it('renders multiple items', () => {
        const props = { content: 'the content', items: [{ text: 'item1' }, { text: 'item2' }, { text: 'item3' }] };
        const { getByText } = render(<ButtonDropdown {...props} />);

        fireEvent.click(getByText('the content'));

        expect(getByText('item1')).toBeVisible();
        expect(getByText('item2')).toBeVisible();
        expect(getByText('item3')).toBeVisible();
    });

    it('should trigger content node onClick event when it is clicked', () => {
        const props = {
            content: 'the content',
            items: [{ text: 'item1' }, { text: 'item2' }, { text: 'item3' }],
            onClick: jest.fn(),
        };
        const { getByText } = render(<ButtonDropdown {...props} />);

        fireEvent.click(getByText('the content'));

        expect(props.onClick).toBeCalled();
    });

    it('should trigger item onClick event when it is clicked', () => {
        const handleClickMock = jest.fn();
        const props = {
            content: 'the content',
            items: [{ text: 'item1', onClick: handleClickMock }, { text: 'item2' }, { text: 'item3' }],
        };
        const { getByText } = render(<ButtonDropdown {...props} />);

        fireEvent.click(getByText('the content'));
        fireEvent.click(getByText('item1'));

        expect(handleClickMock).toBeCalled();
    });

    it('renders accessible component', async () => {
        const { container } = render(<ButtonDropdown content="some content" />);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
