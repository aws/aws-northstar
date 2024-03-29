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

const { Default } = composeStories(stories);

describe('MFASelectionView', () => {
    it('should render MFASelection form and select SMS_MFA', async () => {
        const handleConfirm = jest.fn();
        render(<Default onConfirm={handleConfirm} />);

        act(() => {
            userEvent.click(screen.getByText('SMS'));
            userEvent.click(screen.getByText('Continue'));
        });

        expect(handleConfirm).toHaveBeenCalledWith({
            mfaMethod: 'SMS_MFA',
        });
    });

    it('should render MFASelection form and select SOFTWARE_TOKEN_MFA', async () => {
        const handleConfirm = jest.fn();
        render(<Default onConfirm={handleConfirm} />);

        act(() => {
            userEvent.click(screen.getByText('Authenticator app'));
            userEvent.click(screen.getByText('Continue'));
        });

        expect(handleConfirm).toHaveBeenCalledWith({
            mfaMethod: 'SOFTWARE_TOKEN_MFA',
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
