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
import { render, cleanup } from '@testing-library/react';
import ExpandableSection from '.';

describe('ExpandableSection', () => {
    beforeEach(() => jest.clearAllMocks());
    afterEach(cleanup);

    describe('when collapsed', () => {
        it('shows the header', () => {
            const { getByText } = render(<ExpandableSection header="the header">the content</ExpandableSection>);
            expect(getByText('the header')).toBeInTheDocument();
        });

        it('hides the content', () => {
            const { getByText } = render(<ExpandableSection header="the header">the content</ExpandableSection>);
            expect(getByText('the content')).not.toBeVisible();
        });
    });

    describe('when expanded', () => {
        it('shows the expanded content when clicked', () => {
            const { getByText } = render(<ExpandableSection header="the header">the content</ExpandableSection>);
            expect(getByText('the header')).toBeInTheDocument();
            getByText('the header').click();
            expect(getByText('the content')).toBeVisible();
        });
    });

    it('can be accessed by custom test-id', () => {
        const { getByTestId } = render(
            <ExpandableSection data-testid="expandable-section-1" header="the header">
                the content
            </ExpandableSection>
        );
        expect(getByTestId('expandable-section-1')).toBeInTheDocument();
        expect(getByTestId('expandable-section-1-header')).toBeInTheDocument();
        expect(getByTestId('expandable-section-1-content')).toBeInTheDocument();
    });
});
