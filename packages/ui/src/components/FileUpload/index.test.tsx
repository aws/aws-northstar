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
import wrapper from '@cloudscape-design/components/test-utils/dom';
import * as stories from './index.stories';
import getDisplayLastModified from './utils/getDisplayLastModified';

const { Default, WithValue, Error, Multi, MultiWithValue } = composeStories(stories);

describe('FileUpload', () => {
    it('should render file upload control', async () => {
        render(<Default />);
        expect(screen.getByText('Form field label')).toBeVisible();
        expect(screen.getByText('Description')).toBeVisible();
        expect(screen.getByText('Hint text for file requirements')).toBeVisible();

        const content = 'hello world';
        const lastModified = new Date(2022, 1, 1).getTime();

        await act(() => {
            userEvent.upload(
                screen.getByLabelText('Form field label'),
                new File([new Blob([content])], 'test.png', {
                    type: 'image/png',
                    lastModified,
                })
            );
        });

        expect(screen.getByText('test.png')).toBeVisible();
        expect(screen.getByText(`Size: ${content.length} bytes`)).toBeVisible();
        expect(screen.getByText(getDisplayLastModified(lastModified))).toBeVisible();
    });

    it('should render file upload control with initial value', async () => {
        render(<WithValue />);

        expect(screen.getByText('file_name.file_type')).toBeVisible();
        expect(screen.getByText('Size: 1 KB')).toBeVisible();
    });

    it('should render error message', async () => {
        render(<Error />);

        expect(screen.getByText('Error message')).toBeVisible();
    });

    it('should render file upload control for uploading multiple files', async () => {
        render(<Multi />);

        const fileName1 = 'test1.png';
        const content1 = 'hello world';
        const lastModified1 = new Date(2022, 1, 1).getTime();

        await act(() => {
            userEvent.upload(
                screen.getByLabelText('Form field label'),
                new File([new Blob([content1])], fileName1, {
                    type: 'image/png',
                    lastModified: lastModified1,
                })
            );
        });

        const fileName2 = 'test2.png';
        const content2 = 'some randome content';
        const lastModified2 = new Date(2022, 2, 1).getTime();

        await act(() => {
            userEvent.upload(
                screen.getByLabelText('Form field label'),
                new File([new Blob([content2])], fileName2, {
                    type: 'image/png',
                    lastModified: lastModified2,
                })
            );
        });

        expect(screen.getByText(fileName1)).toBeVisible();
        expect(screen.getByText(`Size: ${content1.length} bytes`)).toBeVisible();
        expect(screen.getByText(getDisplayLastModified(lastModified1))).toBeVisible();

        expect(screen.getByText(fileName2)).toBeVisible();
        expect(screen.getByText(`Size: ${content2.length} bytes`)).toBeVisible();
        expect(screen.getByText(getDisplayLastModified(lastModified2))).toBeVisible();
    });

    it('should render file upload control for uploading multiple files with initial values', async () => {
        const { container } = render(<MultiWithValue />);

        const tokenGroup = wrapper(container).findTokenGroup();

        const tokens = tokenGroup?.findTokens();
        expect(tokens).toHaveLength(3);

        expect(tokens![0].findLabel().getElement()).toHaveTextContent(
            'very_long_long_long_long_long_long_long_long_long_file_name1.file_type1'
        );
        expect(tokens![1].findLabel().getElement()).toHaveTextContent('file_name2.file_type2');
        expect(tokens![2].findLabel().getElement()).toHaveTextContent('file_name3.file_type3');

        await act(async () => {
            await userEvent.click(tokens![1].findDismiss().getElement());
        });

        expect(tokenGroup?.findTokens()).toHaveLength(2);
        expect(screen.queryByText('file_name2.file_type2')).toBeNull();
    });
});
