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
import wrapper from '@cloudscape-design/components/test-utils/dom';
import { cleanup, waitFor, render, act } from '@testing-library/react';
import * as stories from './index.stories';
import { composeStories } from '@storybook/react';
import userEvent from '@testing-library/user-event';

const { Default } = composeStories(stories);

describe('InfiniteQuerySelect', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should fetch pages of options', async () => {
        const { container } = render(<Default />);
        const select = wrapper(container).findSelect();

        // Click on the select box
        await act(() => {
            userEvent.click(select!.findDropdown().find('button')!.getElement());
        });

        const dropdown = select?.findDropdown();

        // It should load the first 3 items
        await waitFor(() => expect(dropdown?.findOptions() ?? []).toHaveLength(3));
        expect(dropdown?.findOption(1)!.findLabel().getElement()).toHaveTextContent('Item 1');
        expect(dropdown?.findOption(2)!.findLabel().getElement()).toHaveTextContent('Item 2');
        expect(dropdown?.findOption(3)!.findLabel().getElement()).toHaveTextContent('Item 3');

        // Then fetch another page of 3 more items shortly afterwards
        await waitFor(() => expect(dropdown?.findOptions() ?? []).toHaveLength(6));
        expect(dropdown?.findOption(4)!.findLabel().getElement()).toHaveTextContent('Item 4');
        expect(dropdown?.findOption(5)!.findLabel().getElement()).toHaveTextContent('Item 5');
        expect(dropdown?.findOption(6)!.findLabel().getElement()).toHaveTextContent('Item 6');
    });
});
