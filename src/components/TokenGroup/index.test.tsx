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
import { fireEvent, render, act } from '@testing-library/react';

import TokenGroup from '.';

describe('TokenGroup', () => {
    const items = [
        {
            label: 'itemLabel1',
            value: 'itemId1',
        },
        {
            label: 'itemLabel2',
            value: 'itemId2',
        },
        {
            label: 'itemLabel3',
            value: 'itemId3',
        },
    ];
    it('should display a list of items inline', () => {
        const handleDismiss = jest.fn();
        const { getByText, getByTestId } = render(<TokenGroup items={items} onDismiss={handleDismiss} />);

        expect(getByText('itemLabel1')).toBeVisible();
        expect(getByText('itemLabel2')).toBeVisible();
        expect(getByText('itemLabel3')).toBeVisible();
        expect(getByTestId('layout-inline')).toBeInTheDocument();
    });

    it('should handle dismiss event', () => {
        const handleDismiss = jest.fn();
        const { queryByText, container } = render(<TokenGroup items={items} onDismiss={handleDismiss} />);

        act(() => {
            const dismissButtons = container.querySelectorAll('.MuiChip-deleteIcon');
            fireEvent.click(dismissButtons[1]);
        });

        expect(handleDismiss).toHaveBeenCalledWith(items[1]);
    });

    it('should display a list of items in stack layout when inline is false', () => {
        const handleDismiss = jest.fn();
        const { getByText, getByTestId } = render(
            <TokenGroup items={items} onDismiss={handleDismiss} inline={false} />
        );

        expect(getByText('itemLabel1')).toBeVisible();
        expect(getByText('itemLabel2')).toBeVisible();
        expect(getByText('itemLabel3')).toBeVisible();
        expect(getByTestId('layout-stack')).toBeInTheDocument();
    });
});
