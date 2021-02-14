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

import RadioGroup from '.';
import RadioButton from './components/RadioButton';

describe('RadioButtonGroup', () => {
    beforeEach(() => jest.clearAllMocks());

    const onChangeMockFn = jest.fn((event) => event);

    describe('by default', () => {
        it('renders RadioGroup with radio buttons as children', () => {
            const { getAllByRole } = render(
                <RadioGroup
                    items={[
                        <RadioButton key="1">radio</RadioButton>,
                        <RadioButton key="2">radio</RadioButton>,
                        <RadioButton key="3">radio</RadioButton>,
                    ]}
                />
            );
            expect(getAllByRole('radio')).toHaveLength(3);
        });

        it('renders 0 radio buttons when ', () => {
            const { queryByRole } = render(<RadioGroup />);
            expect(queryByRole('radio')).toBeNull();
        });
    });

    describe('with props', () => {
        describe('onChange', () => {
            it('invokes the event handler when clicked with the child RadioButton event and value', () => {
                const { getByRole } = render(
                    <RadioGroup onChange={onChangeMockFn} items={[<RadioButton key="1" value="the value" />]} />
                );
                getByRole('radio').click();
                expect(onChangeMockFn).toHaveBeenCalledWith(expect.anything(), 'the value');
            });
        });
    });
});
