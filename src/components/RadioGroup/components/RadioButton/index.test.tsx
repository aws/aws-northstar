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

import RadioButton from '.';

describe('RadioButton', () => {
    beforeEach(() => jest.clearAllMocks());

    const onChangeMockFn = jest.fn();

    describe('by default', () => {
        it('renders', () => {
            const { getByRole } = render(<RadioButton />);
            expect(getByRole('radio')).toBeInTheDocument();
        });

        it('adds a description when provided', () => {
            const { getByText } = render(<RadioButton description="the description" />);
            expect(getByText('the description')).toBeInTheDocument();
        });
    });

    describe('with props', () => {
        const tests = [
            { propKey: 'ariaDescribedby', propValue: 'the description', attribute: 'aria-describedBy' },
            { propKey: 'ariaLabelledby', propValue: 'the label by', attribute: 'aria-labelledBy' },
            { propKey: 'ariaLabel', propValue: 'the label', attribute: 'aria-label' },
            { propKey: 'controlId', propValue: 'the id', attribute: 'id' },
            { propKey: 'name', propValue: 'the name', attribute: 'name' },
        ];

        tests.forEach((t) => {
            describe(t.propKey, () => {
                it(`adds the ${t.attribute} attribute with the value`, () => {
                    const { getByRole } = render(<RadioButton {...{ [t.propKey]: t.propValue }} />);
                    expect(getByRole('radio')).toHaveAttribute(t.attribute, `${t.propValue}`);
                });
            });
        });

        //TODO: Figure out correct targeting
        describe.skip('disabled', () => {
            it('to have disabled attribute', () => {
                const { getByRole } = render(<RadioButton disabled={true} />);
                expect(getByRole('radio')).toHaveClass('Mui-disabled');
            });
        });

        //TODO: Figure out correct targeting
        describe.skip('checked', () => {
            it('to have checked attribute', () => {
                const { getByRole } = render(<RadioButton checked={true} />);
                expect(getByRole('radio')).toHaveClass('Mui-checked');
            });
        });

        describe('onChange', () => {
            const checked = true;
            it('invokes the handler when clicked with the event and checked value', () => {
                const { getByRole } = render(<RadioButton onChange={onChangeMockFn} />);
                getByRole('radio').click();
                expect(onChangeMockFn).toHaveBeenCalledWith(expect.anything(), checked);
            });
        });
    });
});
