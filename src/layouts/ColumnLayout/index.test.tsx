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
import Placeholder from '../../components/Placeholder';
import ColumnLayout, { Column } from '.';

jest.mock('@material-ui/core/useMediaQuery', () => jest.fn(() => true));

describe('ColumnLayout', () => {
    it('renders 1 column', () => {
        const { getAllByTestId } = render(
            <ColumnLayout>
                <Column>
                    <Placeholder />
                </Column>
            </ColumnLayout>
        );

        expect(getAllByTestId('column')).toHaveLength(1);
    });

    it('renders 3 columns', () => {
        const { getAllByTestId } = render(
            <ColumnLayout>
                <Column>
                    <Placeholder />
                </Column>
                <Column>
                    <Placeholder />
                </Column>
                <Column>
                    <Placeholder />
                </Column>
            </ColumnLayout>
        );

        expect(getAllByTestId('column')).toHaveLength(3);
    });

    it('renders the divider by default when there are more than 1 column', () => {
        const { container } = render(
            <ColumnLayout>
                <Column>
                    <Placeholder />
                </Column>
                <Column>
                    <Placeholder />
                </Column>
            </ColumnLayout>
        );

        expect(container.querySelector('hr')).toBeInTheDocument();
    });

    it('does not render the divider when renderDivider is false', () => {
        const { container } = render(
            <ColumnLayout renderDivider={false}>
                <Column>
                    <Placeholder />
                </Column>
                <Column>
                    <Placeholder />
                </Column>
            </ColumnLayout>
        );

        expect(container.querySelector('hr')).not.toBeInTheDocument();
    });
});
