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

describe('MFATotpSetup', () => {
    beforeAll(() => {
        jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(async (secretCode: any) => {
            expect(secretCode).toBe(Default.args?.secretCode);
        });
    });

    afterAll(() => {
        (navigator.clipboard.writeText as jest.Mock).mockRestore();
    });

    it('should render MFATotpSetup form', async () => {
        const handleConfirm = jest.fn();
        render(<Default onConfirm={handleConfirm} />);

        act(() => {
            userEvent.click(screen.getByText('Copy secret key'));
        });

        act(() => {
            userEvent.type(screen.getByLabelText('Code'), '1234');
            userEvent.click(screen.getByText('Continue'));
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
