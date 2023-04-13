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
import { render, screen, act } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import userEvent from '@testing-library/user-event';
import * as stories from './index.stories';

const { Default, AuthApp } = composeStories(stories);

describe('MFA', () => {
    it('should render SMS_MFA form', async () => {
        const handleConfirm = jest.fn();
        render(<Default onConfirm={handleConfirm} />);
        expect(screen.getByText('A code has been sent to +0123456789')).toBeVisible();
        expect(screen.getByText('Confirm SMS Code')).toBeVisible();

        act(() => {
            userEvent.type(screen.getByLabelText('Code'), '1234');
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(handleConfirm).toHaveBeenCalledWith({
            confirmationCode: '1234',
        });
    });

    it('should render SOFTWARE_TOKEN_MFA form', async () => {
        const handleConfirm = jest.fn();
        render(<AuthApp onConfirm={handleConfirm} />);

        expect(screen.getByText('Please enter the code from your Authenticator app')).toBeVisible();
        expect(screen.getByText('Confirm Code')).toBeVisible();

        act(() => {
            userEvent.type(screen.getByLabelText('Code'), '1234');
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(handleConfirm).toHaveBeenCalledWith({
            confirmationCode: '1234',
        });
    });

    it('should handle Back to Sign In button click', async () => {
        const handleBackToSignIn = jest.fn();
        render(<Default onBackToSignIn={handleBackToSignIn} />);

        act(() => {
            userEvent.click(screen.getByText('Back to Sign In'));
        });

        expect(handleBackToSignIn).toHaveBeenCalled();
    });
});
