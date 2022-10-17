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

import Checkbox from '.';
import { axe } from 'jest-axe';

describe('Checkbox', () => {
    beforeEach(() => jest.clearAllMocks());

    const onChangeMockFn = jest.fn();

    describe('by default', () => {
        it('renders unchecked', () => {
            const { getByRole } = render(<Checkbox />);
            expect(getByRole('checkbox')).toHaveProperty('checked', false);
        });

        it('renders children as label', () => {
            const { getByText } = render(<Checkbox>Label</Checkbox>);

            expect(getByText('Label')).toBeVisible();
        });

        it('toggles between checked and unchecked when clicked', () => {
            const { getByRole } = render(<Checkbox />);
            getByRole('checkbox').click();
            expect(getByRole('checkbox')).toHaveProperty('checked', true);

            getByRole('checkbox').click();
            expect(getByRole('checkbox')).toHaveProperty('checked', false);
        });
    });

    describe('with props', () => {
        describe('onChange', () => {
            it('invokes the event handler when clicked', () => {
                const { getByRole } = render(<Checkbox onChange={onChangeMockFn} />);
                getByRole('checkbox').click();
                expect(onChangeMockFn).toHaveBeenCalled();
            });
        });

        describe('checked', () => {
            it('passes through the checked value', () => {
                const { getByRole } = render(<Checkbox checked={true} />);
                expect(getByRole('checkbox')).toHaveProperty('checked', true);
            });
        });

        describe('disabled', () => {
            it('passes through the disabled attribute', () => {
                const { getByRole } = render(<Checkbox disabled={true} />);
                expect(getByRole('checkbox')).toHaveProperty('disabled', true);
            });
        });

        describe('description', () => {
            it('renders children as label', () => {
                const { getByText } = render(<Checkbox description="Description">Label</Checkbox>);

                expect(getByText('Description')).toBeVisible();
            });
        });
    });

    it('can be accessed by custom test-id', () => {
        const { getByTestId } = render(<Checkbox data-testid="checkbox-1" />);
        expect(getByTestId('checkbox-1')).toBeInTheDocument();
    });

    it('renders accessible component', async () => {
        const { container } = render(<Checkbox>label</Checkbox>);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
