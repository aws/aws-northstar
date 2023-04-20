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
import { render, screen, cleanup, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';
import delay from '../../../../utils/delay';

const { Default } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('CodeEditor', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render code editor', async () => {
        const { container } = render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('This is description')).toBeVisible();
        expect(screen.getByText('This is helper text')).toBeVisible();

        const codeEditor = wrapper(container).findCodeEditor();

        await waitFor(() => expect(codeEditor?.findEditor()).not.toBeNull());

        await delay(3000);

        await act(async () => {
            codeEditor?.setValue(stories.TEXT_CONTENT);
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            { codeEditor: stories.TEXT_CONTENT },
            expect.any(Object),
            expect.any(Function)
        );
    });
});
