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
import Inline from '.';

describe('Inline', () => {
    it('renders 1 item', () => {
        const { getAllByTestId } = render(
            <Inline>
                <Placeholder />
            </Inline>
        );

        expect(getAllByTestId('placeholder')).toHaveLength(1);
    });

    it('renders a list of items', () => {
        const { getByTestId, getAllByTestId } = render(
            <Inline data-testid="inline-element">
                <Placeholder />
                <Placeholder />
                <Placeholder />
            </Inline>
        );
        expect(getByTestId('inline-element')).toBeInTheDocument();
        expect(getAllByTestId('placeholder')).toHaveLength(3);
    });

    it('renders a list of items containing null', () => {
        const { getByTestId } = render(
            <Inline>
                <Placeholder />
                <></>
                {null}
                <Placeholder />
            </Inline>
        );

        expect(getByTestId('layout-inline').children).toHaveLength(3);
    });
});
