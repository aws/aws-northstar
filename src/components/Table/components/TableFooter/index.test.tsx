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
import TableFooter from '.';

const styles = {
    footerCell: 'footerCell',
    cellAlign: 'cellAlign',
    leftSpace: 'leftSpace',
};

describe('TableFooter', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders default table footer ', () => {
        const { getByText } = render(
            <table>
                <TableFooter colSpan={10} styles={styles} />
            </table>
        );

        expect(getByText('No records found')).toBeVisible();
    });

    it('renders loading state', () => {
        const { getByText, getByRole } = render(
            <table>
                <TableFooter colSpan={10} styles={styles} loading={true} />
            </table>
        );

        expect(getByRole('progressbar')).toBeVisible();
        expect(getByText('Loading...')).toBeVisible();
    });

    it('renders error state', () => {
        const { getByText } = render(
            <table>
                <TableFooter colSpan={10} styles={styles} errorText={'Error'} />
            </table>
        );

        expect(getByText('Error')).toBeVisible();
    });

    it('renders nothing when there is data row', () => {
        const { container } = render(<TableFooter colSpan={10} styles={styles} pageLength={10} />);

        expect(container.childElementCount).toBe(0);
    });
});
