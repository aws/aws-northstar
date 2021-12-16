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

import Form from '.';

describe('Form', () => {
    const requiredProps = {
        header: 'From header',
        actions: null,
    };

    it('renders header', () => {
        const { getByText } = render(<Form {...requiredProps} />);

        expect(getByText(requiredProps.header)).toBeInTheDocument();
    });

    it('renders actions', () => {
        const props = {
            ...requiredProps,
            actions: <button>action</button>,
        };
        const { getByRole } = render(<Form {...props} />);

        expect(getByRole('button')).toHaveTextContent('action');
    });

    it('renders description', () => {
        const props = {
            ...requiredProps,
            description: 'Some description',
        };
        const { getByText } = render(<Form {...props} />);

        expect(getByText(props.description)).toBeInTheDocument();
    });

    it('renders errorText', () => {
        const props = {
            ...requiredProps,
            errorText: 'Some error',
        };
        const { getByText } = render(<Form {...props} />);

        expect(getByText(props.errorText)).toBeInTheDocument();
    });

    it('renders content', () => {
        const { getByLabelText } = render(
            <Form {...requiredProps}>
                <label>
                    Username <input id="name" />
                </label>
            </Form>
        );

        expect(getByLabelText('Username')).toHaveAttribute('id', 'name');
    });

    it('passes additional props to form', () => {
        const props = {
            ...requiredProps,
            name: 'user-form',
            method: 'post',
            action: '/user',
            'data-testid': 'form-element',
        };
        const { getByRole, getByTestId } = render(<Form {...props} />);

        expect(getByRole('form')).toHaveAttribute('method', 'post');
        expect(getByRole('form')).toHaveAttribute('action', '/user');
        expect(getByTestId('form-element')).toBeInTheDocument();
    });
});
