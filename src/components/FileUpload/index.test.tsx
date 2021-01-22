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
import React from 'react';
import { fireEvent, render, act } from '@testing-library/react';

import FileUpload from '.';

describe('FileUpload', () => {
    const baseProps = {
        controlId: 'controlId',
        label: 'Form field label',
        description: 'This is a description',
        hintText: 'This is hint text with file requirements and constraints',
    };

    it('renders label, desription and hint text', () => {
        const { getByText, getByLabelText } = render(<FileUpload {...baseProps} />);

        expect(getByLabelText(baseProps.label)).toBeInTheDocument();
        expect(getByText(baseProps.label)).toBeVisible();
        expect(getByText(baseProps.description)).toBeVisible();
        expect(getByText(baseProps.hintText)).toBeVisible();
        expect(getByText('Choose file')).toBeVisible();
    });

    it('should set the accept attribute of the input', () => {
        const { getByTestId } = render(<FileUpload {...baseProps} accept="image/*" />);

        expect(getByTestId('input-file')).toHaveAttribute('accept', 'image/*');
    });

    it('should set the button text if provided', () => {
        const { getByText } = render(<FileUpload {...baseProps} buttonText="Custom button text" />);

        expect(getByText('Custom button text')).toBeVisible();
    });

    describe('should be used for uploading single file', () => {
        it('should allow users to choose a file to upload', () => {
            const handleChange = jest.fn();
            const lastModifiedDate = Date.now();
            const selectedFile = {
                name: 'fileName1',
                size: 1000 * 3.05,
                lastModified: lastModifiedDate,
            };
            const event = {
                target: {
                    files: [selectedFile],
                },
            };

            const { getByTestId, getByText } = render(<FileUpload {...baseProps} onChange={handleChange} />);

            act(() => {
                fireEvent.change(getByTestId('input-file'), event);
            });

            expect(handleChange).toHaveBeenLastCalledWith([selectedFile]);

            expect(getByText('fileName1')).toBeVisible();
            expect(getByText('Size: 3.05 KB')).toBeVisible();
            const expectedTime = `Last modified: ${new Date(lastModifiedDate).toLocaleString()}`;
            expect(getByText(expectedTime)).toBeVisible();
        });

        it('should display the existing file when it is provided', () => {
            const files = [
                {
                    name: 'fileName1',
                    size: 1010,
                },
            ];

            const { getByText } = render(<FileUpload {...baseProps} files={files} />);

            expect(getByText('fileName1')).toBeVisible();
            expect(getByText('Size: 1.01 KB')).toBeVisible();
        });

        it('should display the new selected file when users change selection', () => {
            const handleChange = jest.fn();
            const lastModifiedDate = Date.now();
            const selectedFile1 = {
                name: 'fileName1',
                size: 1000 * 3,
                lastModified: lastModifiedDate,
            };
            const event1 = {
                target: {
                    files: [selectedFile1],
                },
            };

            const { getByTestId, getByText, queryByText } = render(
                <FileUpload {...baseProps} onChange={handleChange} />
            );

            act(() => {
                fireEvent.change(getByTestId('input-file'), event1);
            });

            expect(handleChange).toHaveBeenLastCalledWith([selectedFile1]);

            const selectedFile2 = {
                name: 'fileName2',
                size: 1000 * 1000 * 3.1,
                lastModified: lastModifiedDate,
            };
            const event2 = {
                target: {
                    files: [selectedFile2],
                },
            };

            act(() => {
                fireEvent.change(getByTestId('input-file'), event2);
            });

            expect(handleChange).toHaveBeenLastCalledWith([selectedFile2]);

            expect(queryByText('fileName1')).toBeNull();
            expect(getByText('fileName2')).toBeVisible();
            expect(getByText('Size: 3.1 MB')).toBeVisible();
        });
    });

    describe('should be used for uploading multiple files', () => {
        const selectedFile1 = {
            name: 'fileName1',
            size: 100,
            lastModified: 10000,
        };
        const selectedFile2 = {
            name: 'fileName2',
        };
        const selectedFile3 = {
            name: 'fileName3',
        };

        it('should have Choose files as default button text', () => {
            const { getByText } = render(<FileUpload {...baseProps} multiple />);

            expect(getByText('Choose files')).toBeVisible();
        });

        it('should set the multiple attribute of the input', () => {
            const { getByTestId } = render(<FileUpload {...baseProps} multiple />);

            expect(getByTestId('input-file')).toHaveAttribute('multiple');
        });

        it('should allow users to choose multiple files to upload', () => {
            const handleChange = jest.fn();

            const event = {
                target: {
                    files: [selectedFile1, selectedFile2, selectedFile3],
                },
            };

            const { getByTestId, getByText } = render(<FileUpload {...baseProps} onChange={handleChange} multiple />);

            act(() => {
                fireEvent.change(getByTestId('input-file'), event);
            });

            expect(handleChange).toHaveBeenLastCalledWith([selectedFile1, selectedFile2, selectedFile3]);

            expect(getByText('fileName1')).toBeVisible();
            expect(getByText('Size: 100 bytes')).toBeVisible();
            const expectedTime = `Last modified: ${new Date(selectedFile1.lastModified).toLocaleString()}`;
            expect(getByText(expectedTime)).toBeVisible();

            expect(getByText('fileName2')).toBeVisible();
            expect(getByText('fileName3')).toBeVisible();
        });

        it('should display the existing files when it is provided', () => {
            const { getByText } = render(
                <FileUpload {...baseProps} files={[selectedFile1, selectedFile2, selectedFile3]} multiple />
            );

            expect(getByText('fileName1')).toBeVisible();
            expect(getByText('fileName2')).toBeVisible();
            expect(getByText('fileName3')).toBeVisible();
        });

        it('should display the new selected file when users add selections', () => {
            const handleChange = jest.fn();

            const event1 = {
                target: {
                    files: [selectedFile2],
                },
            };

            const { getByTestId, getByText } = render(
                <FileUpload {...baseProps} onChange={handleChange} files={[selectedFile1]} multiple />
            );

            act(() => {
                fireEvent.change(getByTestId('input-file'), event1);
            });

            expect(handleChange).toHaveBeenLastCalledWith([selectedFile1, selectedFile2]);

            const event2 = {
                target: {
                    files: [selectedFile3],
                },
            };

            act(() => {
                fireEvent.change(getByTestId('input-file'), event2);
            });

            expect(handleChange).toHaveBeenLastCalledWith([selectedFile1, selectedFile2, selectedFile3]);

            expect(getByText('fileName1')).toBeVisible();
            expect(getByText('fileName2')).toBeVisible();
            expect(getByText('fileName3')).toBeVisible();
        });

        it('should be able to dismiss a selection', () => {
            const handleChange = jest.fn();

            const event = {
                target: {
                    files: [selectedFile1, selectedFile2, selectedFile3],
                },
            };

            const { getByTestId, getByText, queryByText, container } = render(
                <FileUpload {...baseProps} onChange={handleChange} multiple />
            );

            act(() => {
                fireEvent.change(getByTestId('input-file'), event);
            });

            expect(getByText('fileName1')).toBeVisible();
            expect(getByText('fileName2')).toBeVisible();
            expect(getByText('fileName3')).toBeVisible();

            act(() => {
                const dismissButton = container.querySelectorAll('.MuiChip-deleteIcon')[1];
                fireEvent.click(dismissButton!);
            });

            expect(handleChange).toHaveBeenLastCalledWith([selectedFile1, selectedFile3]);

            expect(getByText('fileName1')).toBeVisible();
            expect(queryByText('fileName2')).toBeNull();
            expect(getByText('fileName3')).toBeVisible();
        });
    });
});
