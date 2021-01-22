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
import { getByText, render } from '@testing-library/react';

import FormField from '.';

describe('FormField', () => {
    const requiredProps = {
        controlId: 'formFieldId1',
        label: 'Form field label',
    };

    const Input = () => <input type="text" id={requiredProps.controlId} />;

    it('renders label', () => {
        const { getByLabelText } = render(
            <FormField {...requiredProps}>
                <Input />
            </FormField>
        );

        expect(getByLabelText(requiredProps.label)).toBeVisible();
    });

    it('renders input children', () => {
        const { getByRole } = render(
            <FormField {...requiredProps}>
                <Input />
            </FormField>
        );

        expect(getByRole('textbox')).toBeVisible();
        expect(getByRole('textbox')).toHaveAttribute('id', requiredProps.controlId);
    });

    it('renders description', () => {
        const props = {
            ...requiredProps,
            description: 'This is description',
        };

        const { getByText } = render(
            <FormField {...props}>
                <Input />
            </FormField>
        );

        expect(getByText(props.description)).toBeVisible();
    });

    it('renders hint text', () => {
        const props = {
            ...requiredProps,
            hintText: 'This is description',
        };

        const { getByText } = render(
            <FormField {...props}>
                <Input />
            </FormField>
        );

        expect(getByText(props.hintText)).toBeVisible();
    });

    it('renders secondary control', () => {
        const props = {
            ...requiredProps,
            secondaryControl: <button>Add</button>,
        };

        const { getByRole } = render(
            <FormField {...props}>
                <Input />
            </FormField>
        );

        expect(getByRole('button')).toBeVisible();
    });

    it('renders footer control if provided', () => {
        const props = {
            ...requiredProps,
            footer: <>This is footer content</>,
        };

        const { getByText } = render(
            <FormField {...props}>
                <Input />
            </FormField>
        );

        expect(getByText('This is footer content')).toBeVisible();
    });

    describe('stretch', () => {
        it('uses 9:3 Grid when stretch is false', () => {
            const props = {
                ...requiredProps,
                secondaryControl: <button>Add</button>,
                stretch: false,
            };

            const { getByRole } = render(
                <FormField {...props}>
                    <Input />
                </FormField>
            );

            expect(getByRole('textbox').parentNode).toHaveClass('MuiGrid-grid-xs-12 MuiGrid-grid-sm-9');
            expect(getByRole('button').parentNode).toHaveClass('MuiGrid-grid-xs-12 MuiGrid-grid-sm-3');
        });

        it('uses 12:12 Grid when stretch is true', () => {
            const props = {
                ...requiredProps,
                stretch: true,
            };

            const { getByRole } = render(
                <FormField {...props}>
                    <Input />
                </FormField>
            );

            expect(getByRole('textbox').parentNode).toHaveClass('MuiGrid-grid-xs-12 MuiGrid-grid-sm-12');
        });
    });
});
