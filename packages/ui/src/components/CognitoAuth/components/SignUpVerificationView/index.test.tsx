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

const { Default } = composeStories(stories);

describe('SignUpVerificationView', () => {
    it('should render SignUpVerification form', async () => {
        const handleConfirm = jest.fn();
        render(<Default onConfirm={handleConfirm} />);

        act(() => {
            userEvent.type(screen.getByLabelText('Code'), '1234');
            userEvent.click(screen.getByText('Confirm'));
        });

        expect(handleConfirm).toHaveBeenCalledWith({
            verificationCode: '1234',
        });
    });

    it('should handle resendCode', async () => {
        const handleConfirm = jest.fn();
        const handleResendCode = jest.fn();
        render(<Default onConfirm={handleConfirm} onResendCode={handleResendCode} />);

        act(() => {
            userEvent.click(screen.getByText('Resend'));
        });

        expect(handleResendCode).toHaveBeenCalled();
    });
});
