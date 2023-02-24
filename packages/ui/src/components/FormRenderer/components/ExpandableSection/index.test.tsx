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
import { render, screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';

const { Default, WithInitialValue } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('ExpandableSection', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render expandable sections', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('Section 1')).toBeVisible();
        expect(screen.getByText('Section 2')).toBeVisible();
        expect(screen.getByText('Section 3')).toBeVisible();

        const element = screen.getByTestId('form-renderer');
        const section1 = wrapper(element).findExpandableSection("[data-testid='section1']");
        expect(section1?.findExpandedContent()).toBeNull();

        const section2 = wrapper(element).findExpandableSection("[data-testid='section2']");
        expect(section2?.findExpandedContent()).toBeNull();

        const section3 = wrapper(element).findExpandableSection("[data-testid='section3']");
        expect(section3?.findExpandedContent()).not.toBeNull();

        await act(async () => {
            await userEvent.click(screen.getByText('Section 1'));
        });

        expect(section1?.findExpandedContent()).not.toBeNull();

        await act(async () => {
            await userEvent.click(screen.getByText('Section 2'));
        });

        expect(section2?.findExpandedContent()).not.toBeNull();

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Textfield'), 'TextFieldContent');
            await userEvent.type(screen.getByLabelText('Textarea 1'), 'TextareaContent');
            await userEvent.type(screen.getByLabelText('Textarea 2'), 'TextareaContent');
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            {
                section1: {
                    textfield: 'TextFieldContent',
                },
                section2: {
                    textarea1: 'TextareaContent',
                },
                section3: {
                    textarea2: 'TextareaContent',
                },
            },
            expect.any(Object),
            expect.any(Function)
        );
    });

    it('should trigger validation', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(screen.queryAllByText('Required')).toHaveLength(3);

        const element = screen.getByTestId('form-renderer');
        const section1 = wrapper(element).findExpandableSection("[data-testid='section1']");
        expect(section1?.findExpandedContent()).not.toBeNull();

        const section2 = wrapper(element).findExpandableSection("[data-testid='section2']");
        expect(section2?.findExpandedContent()).not.toBeNull();

        const section3 = wrapper(element).findExpandableSection("[data-testid='section3']");
        expect(section3?.findExpandedContent()).not.toBeNull();

        expect(handleSubmit).not.toBeCalled();
    });

    it('should be populated with initial value', async () => {
        render(<WithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

        const element = screen.getByTestId('form-renderer');
        const section1 = wrapper(element).findExpandableSection("[data-testid='section1']");
        expect(section1?.findExpandedContent()).not.toBeNull();
        expect(screen.getByLabelText('Textfield')).toHaveValue('TextFieldContent');

        const section2 = wrapper(element).findExpandableSection("[data-testid='section2']");
        expect(section2?.findExpandedContent()).not.toBeNull();
        expect(screen.getByLabelText('Textarea 1')).toHaveValue('TextareaContent');

        const section3 = wrapper(element).findExpandableSection("[data-testid='section3']");
        expect(section3?.findExpandedContent()).not.toBeNull();
        expect(screen.getByLabelText('Textarea 2')).toHaveValue('TextareaContent');

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            {
                section1: {
                    textfield: 'TextFieldContent',
                },
                section2: {
                    textarea1: 'TextareaContent',
                },
                section3: {
                    textarea2: 'TextareaContent',
                },
            },
            expect.any(Object),
            expect.any(Function)
        );
    });
});
