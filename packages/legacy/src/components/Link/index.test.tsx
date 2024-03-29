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
import Link from '.';
import { BrowserRouter } from 'react-router-dom';

describe('Link', () => {
    it('renders an anchor', () => {
        const { getByRole } = render(
            <BrowserRouter>
                <Link href="/route1">Normal Link</Link>
            </BrowserRouter>
        );

        expect(getByRole('link')).toBeInTheDocument();
    });

    it('can be accessed by custom testid', () => {
        const { getByTestId } = render(
            <BrowserRouter>
                <Link href="/route1" data-testid="link">
                    Normal Link
                </Link>
            </BrowserRouter>
        );
        expect(getByTestId('link')).toBeInTheDocument();
    });

    describe('with external url', () => {
        it('renders external icon', () => {
            const { getByTitle } = render(
                <BrowserRouter>
                    <Link href="https://www.amazon.com">External link</Link>
                </BrowserRouter>
            );

            expect(getByTitle('launch')).toBeInTheDocument();
        });
    });
});
