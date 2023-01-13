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

const { Default, WithInitialValue } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('Wizard', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render wizard', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('Form container header')).toBeVisible();

        const element = await screen.findByTestId('form-renderer');
        const wizard = wrapper(element).findWizard();

        expect(wizard?.findHeader()?.getElement()).toHaveTextContent('Step 1');

        await act(async () => {
            await userEvent.click(wizard?.findPrimaryButton().getElement()!);
        });
        expect(screen.getByText('Required')).toBeVisible();

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Config 1'), 'Config 1 Content');
            await userEvent.click(wizard?.findPrimaryButton().getElement()!);
        });

        await waitFor(() => expect(wizard?.findHeader()?.getElement()).toHaveTextContent('Step 2'));

        await act(async () => {
            await userEvent.click(wizard?.findPrimaryButton().getElement()!);
        });
        expect(screen.getByText('Required')).toBeVisible();

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Config 2'), 'Config 2 Content');
            await userEvent.click(wizard?.findPrimaryButton().getElement()!);
        });

        await waitFor(() => expect(wizard?.findHeader()?.getElement()).toHaveTextContent('Step 3'));

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Config 3'), 'Config 3 Content');
            await userEvent.click(wizard?.findPrimaryButton().getElement()!);
        });

        await waitFor(() => expect(wizard?.findHeader()?.getElement()).toHaveTextContent('Review'));

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            {
                config1: 'Config 1 Content',
                config2: 'Config 2 Content',
                config3: 'Config 3 Content',
            },
            expect.any(Object),
            expect.any(Function)
        );
    });

    it('should trigger cancel when cancel button is click', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.click(screen.getByText('Cancel'));
        });

        expect(handleCancel).toHaveBeenCalled();
    });

    it('should be populated with initial value', async () => {
        render(<WithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

        const element = await screen.findByTestId('form-renderer');
        const wizard = wrapper(element).findWizard();

        expect(screen.getByLabelText('Config 1')).toHaveValue('Config 1 Content');

        await act(async () => {
            await userEvent.click(wizard?.findPrimaryButton().getElement()!);
        });
        await waitFor(() => expect(wizard?.findHeader()?.getElement()).toHaveTextContent('Step 2'));

        expect(screen.getByLabelText('Config 2')).toHaveValue('Config 2 Content');

        await act(async () => {
            await userEvent.click(wizard?.findPrimaryButton().getElement()!);
        });
        await waitFor(() => expect(wizard?.findHeader()?.getElement()).toHaveTextContent('Step 3'));

        expect(screen.getByLabelText('Config 3')).toHaveValue('Config 3 Content');

        await act(async () => {
            await userEvent.click(wizard?.findPrimaryButton().getElement()!);
        });

        await waitFor(() => expect(wizard?.findHeader()?.getElement()).toHaveTextContent('Review'));

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            {
                config1: 'Config 1 Content',
                config2: 'Config 2 Content',
                config3: 'Config 3 Content',
            },
            expect.any(Object),
            expect.any(Function)
        );
    });
});
