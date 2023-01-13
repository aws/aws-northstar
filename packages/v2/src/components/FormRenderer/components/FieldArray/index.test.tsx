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

describe('FieldArray', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render field array', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('This is description')).toBeVisible();
        expect(screen.getByText('This is helper text')).toBeVisible();
        expect(screen.getByText('Tags')).toBeVisible();
        expect(screen.getByText('Add new item')).toBeVisible();

        const element = await screen.findByTestId('form-renderer');
        const attributeEditor = wrapper(element).findAttributeEditor();

        for (let i = 0; i < 2; i++) {
            await act(async () => {
                await userEvent.click(attributeEditor?.findAddButton().getElement()!);
            });
            await waitFor(() => expect(screen.getByTestId(`field-array[${i}].key`)).toBeVisible());
            await act(async () => {
                await userEvent.type(screen.getByTestId(`field-array[${i}].key`).firstElementChild!, `Key${i + 1}`);
                await userEvent.type(screen.getByTestId(`field-array[${i}].value`).firstElementChild!, `Value${i + 1}`);
            });
        }

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            {
                keyValuePairs: [
                    {
                        key: 'Key1',
                        value: 'Value1',
                    },
                    {
                        key: 'Key2',
                        value: 'Value2',
                    },
                ],
            },
            expect.any(Object),
            expect.any(Function)
        );
    });

    it('should trigger required validation', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(screen.getByText('Required')).toBeVisible();
        expect(handleSubmit).not.toBeCalled();
    });

    it('should trigger field validation', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        const element = await screen.findByTestId('form-renderer');
        const attributeEditor = wrapper(element).findAttributeEditor();

        await act(async () => {
            userEvent.click(attributeEditor?.findAddButton().getElement()!);
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(screen.queryAllByText('Required')).toHaveLength(2);
        expect(handleSubmit).not.toBeCalled();
    });

    it('should disable the add button when maxItems meets', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        const element = await screen.findByTestId('form-renderer');
        const attributeEditor = wrapper(element).findAttributeEditor();

        const addButton = attributeEditor?.findAddButton().getElement();

        await act(async () => {
            userEvent.click(addButton!);
            userEvent.click(addButton!);
            userEvent.click(addButton!);
            userEvent.click(addButton!);
        });

        expect(addButton).toBeDisabled();
    });

    it('should be populated with initial value', async () => {
        render(<WithInitialValue onSubmit={handleSubmit} onCancel={handleCancel} />);

        const element = await screen.findByTestId('form-renderer');
        const attributeEditor = wrapper(element).findAttributeEditor();

        expect(attributeEditor?.findRows()).toHaveLength(2);

        expect(screen.getByDisplayValue('Key1')).toBeVisible();
        expect(screen.getByDisplayValue('Value1')).toBeVisible();
        expect(screen.getByDisplayValue('Key2')).toBeVisible();
        expect(screen.getByDisplayValue('Value2')).toBeVisible();

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith(
            {
                keyValuePairs: [
                    {
                        key: 'Key1',
                        value: 'Value1',
                    },
                    {
                        key: 'Key2',
                        value: 'Value2',
                    },
                ],
            },
            expect.any(Object),
            expect.any(Function)
        );
    });
});
