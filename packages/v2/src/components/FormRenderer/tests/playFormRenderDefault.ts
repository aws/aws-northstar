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
import { PlayFunction } from '@storybook/csf';
import { ReactFramework } from '@storybook/react';
import { expect } from '@storybook/jest';
import { userEvent, within, waitFor } from '@storybook/testing-library';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import { FormRendererProps } from '..';

export const TEST_DATA = {
    email: 'test@test.com',
    password: 'password',
    number: 10,
    textarea: 'textarea',
    checkbox: ['1', '2'],
    switch: true,
    radio: '3',
    select: { label: 'Option 2', value: '2' },
    autosugguest: {
        value: 'Lambda',
        label: 'Lambda - Amazon Lambda',
    },
    multiselect: [
        {
            value: 'EC2',
            label: 'EC2 - Amazon Elastic Compute Cloud',
        },
        {
            value: 'Lambda',
            label: 'Lambda - Amazon Lambda',
        },
    ],
    confirm: true,
    datePicker: '2022-01-01',
};

const playFormRenderDefault: PlayFunction<ReactFramework, FormRendererProps> = async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText('Email'), TEST_DATA.email);
    await userEvent.type(canvas.getByLabelText('Password'), TEST_DATA.password);
    await userEvent.type(canvas.getByLabelText('Number'), TEST_DATA.number.toString());

    await userEvent.click(canvas.queryAllByText('Option 1')![0]);
    await waitFor(() => expect(canvas.queryAllByLabelText('Option 1')![0]).toBeChecked());

    await userEvent.click(canvas.queryAllByText('Option 2')![0]);
    await waitFor(() => expect(canvas.queryAllByLabelText('Option 2')![0]).toBeChecked());

    await userEvent.click(canvas.queryAllByText('Option 3')![1]);
    await waitFor(() => expect(canvas.queryAllByLabelText('Option 3')![1]).toBeChecked());

    const select = wrapper(canvasElement).findSelect();
    select?.openDropdown();
    select?.selectOptionByValue('2');
    select?.closeDropdown();

    await userEvent.type(canvas.getByLabelText('Autosuggest'), 'Lambda');
    const autosugguest = wrapper(canvasElement).findAutosuggest();
    const dropdown = autosugguest?.findDropdown();
    await waitFor(() => expect(dropdown?.findOptionByValue('Lambda')?.getElement()).toBeVisible());
    await userEvent.click(dropdown?.findOptionByValue('Lambda')?.getElement()!);

    const multiSelect = wrapper(canvasElement).findMultiselect();
    multiSelect?.openDropdown();
    multiSelect?.selectOptionByValue('EC2');
    multiSelect?.selectOptionByValue('Lambda');
    multiSelect?.closeDropdown();
    multiSelect?.blur();

    await userEvent.type(canvas.getByLabelText('Textarea'), TEST_DATA.textarea);
    await userEvent.type(canvas.getByText('Switch'), TEST_DATA.textarea);

    wrapper(canvasElement).findDatePicker()?.setInputValue('2022/01/01');

    await userEvent.click(canvas.getByLabelText('I understand the terms and condition'));
    await userEvent.click(canvas.getByText('Submit'));

    expect(args.onSubmit).toHaveBeenCalledWith(TEST_DATA, expect.anything(), expect.anything());
};

export default playFormRenderDefault;
