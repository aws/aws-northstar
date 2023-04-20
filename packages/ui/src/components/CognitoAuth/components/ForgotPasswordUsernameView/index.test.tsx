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
import { render, act, screen, waitFor } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import userEvent from '@testing-library/user-event';
import * as stories from './index.stories';

const { Default } = composeStories(stories);

describe('ForgotPasswordUsername', () => {
    it('should render ForgotPasswordUsername form', async () => {
        const handleSendCode = jest.fn();
        const { container } = render(<Default onSendCode={handleSendCode} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Username'), 'TestUsername');
            userEvent.click(screen.getByText('Send code'));
        });

        const submitBtn = wrapper(container).findButton("[type='submit']");
        expect(submitBtn?.findLoadingIndicator()).not.toBeNull();
        await waitFor(() => expect(submitBtn?.findLoadingIndicator()).toBeNull());

        expect(handleSendCode).toHaveBeenCalledWith({
            username: 'TestUsername',
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
