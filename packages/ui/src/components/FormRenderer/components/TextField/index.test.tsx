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
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';

const { Default, Disabled, ReadOnly, Hidden, CustomProps } = composeStories(stories);

const handleCancel = jest.fn();
const handleSubmit = jest.fn();

describe('TextField', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render text field', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByText('Define your form in JSON format')).toBeVisible();

        expect(screen.getByText('Email Address')).toBeVisible();
        expect(screen.getByText('Enter a valid email address')).toBeVisible();

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith({ email: 'test@test.com' }, expect.any(Object), expect.any(Function));
    });

    it('should trigger validation', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(screen.getByText('Required')).toBeVisible();
        expect(handleSubmit).not.toBeCalled();
    });

    it('should trigger custom validation', async () => {
        render(<Default onSubmit={handleSubmit} onCancel={handleCancel} />);

        await act(async () => {
            await userEvent.type(screen.getByLabelText('Email'), 'test');
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(screen.getByText('Invalid email address')).toBeVisible();
        expect(handleSubmit).not.toBeCalled();
    });

    it('should pass the isDisabled prop', async () => {
        render(<Disabled onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByLabelText('Email')).toBeDisabled();
    });

    it('should pass the isReadOnly prop', async () => {
        render(<ReadOnly onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByLabelText('Email')).toHaveAttribute('readonly');
        expect(screen.getByLabelText('Email')).toHaveValue('test@test.com');
    });

    it('should be hidden if hideField is true', async () => {
        render(<Hidden onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByLabelText('Email')).not.toBeVisible();

        await act(async () => {
            await userEvent.click(screen.getByText('Submit'));
        });

        expect(handleSubmit).toHaveBeenCalledWith({ email: 'test@test.com' }, expect.any(Object), expect.any(Function));
    });

    it('should pass custom props', async () => {
        render(<CustomProps onSubmit={handleSubmit} onCancel={handleCancel} />);

        expect(screen.getByLabelText('Email')).toHaveAttribute('aria-describedby', 'Input ariaDescribedby');
        expect(screen.getByLabelText('Email')).toHaveAttribute('aria-label', 'Input ariaLabel');
        expect(screen.getByLabelText('Email')).toHaveAttribute('placeholder', 'This is placeholder text');
        expect(screen.getByLabelText('Email')).toHaveAttribute('autocomplete', 'off');
    });
});
