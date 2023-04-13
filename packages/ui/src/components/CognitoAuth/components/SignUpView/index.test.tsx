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
import { render, act, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from './index.stories';

const { Default, WithRequiredAttributes } = composeStories(stories);

const username = 'TestUsername';
const password = 'TestPassword';

export const TEST_ATTRIBUTES = {
    email: 'test@test.com',
    phone_number: '+012345678',
    family_name: 'TestFamilyName',
    given_name: 'TestGivenNames',
};

describe('SignUpView', () => {
    it('should render SignUp form', async () => {
        const handleSignUp = jest.fn();
        render(<Default onSignUp={handleSignUp} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Username'), username);
            userEvent.type(screen.getByLabelText('Password'), password);
            userEvent.type(screen.getByLabelText('Confirm Password'), password);
            userEvent.click(screen.getByText('Sign up'));
        });

        expect(handleSignUp).toHaveBeenCalledWith({
            username,
            password,
            confirmPassword: password,
        });
    });

    it('should render required attributes', async () => {
        const handleSignUp = jest.fn();
        render(<WithRequiredAttributes onSignUp={handleSignUp} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Username'), username);
            userEvent.type(screen.getByLabelText('Password'), password);
            userEvent.type(screen.getByLabelText('Confirm Password'), password);
            userEvent.type(screen.getByLabelText('Family Name'), TEST_ATTRIBUTES.family_name);
            userEvent.type(screen.getByLabelText('Given Name(s)'), TEST_ATTRIBUTES.given_name);
            userEvent.type(screen.getByLabelText('Email'), TEST_ATTRIBUTES.email);
            userEvent.type(screen.getByLabelText('Phone Number'), TEST_ATTRIBUTES.phone_number);
            userEvent.click(screen.getByText('Sign up'));
        });

        expect(handleSignUp).toHaveBeenCalledWith({
            username,
            password,
            confirmPassword: password,
            attributes: TEST_ATTRIBUTES,
        });
    });

    it('should validate 2 passwords match', async () => {
        const handleSignUp = jest.fn();
        render(<Default onSignUp={handleSignUp} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Password'), 'Password1');
            userEvent.type(screen.getByLabelText('Confirm Password'), 'Password2');
            userEvent.click(screen.getByText('Sign up'));
        });

        expect(screen.getByText('Passwords do NOT match')).toBeVisible();
    });
});
