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
import React, { FunctionComponent, useCallback, useMemo, useRef, useState } from 'react';
import Button from '../Button';
import FileTokenLabel from './components/FileTokenLabel';
import FormField, { BaseFormFieldProps } from '../FormField';
import TokenGroup from '../TokenGroup';
import { FileMetadata } from './types';

export interface FileUploadProps extends BaseFormFieldProps {
    /**
     * Indicating whether to enable users to upload multiple files.
     */
    multiple?: boolean;
    /**
     * One or more <a herf='https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers' target='_blank'>
     * unique file type specifiers</a> describing file types to allow
     */
    accept?: string;
    /**
     * The label text displayed on choose file button.
     */
    buttonText?: string;
    /**
     * The name of the input used in HTML forms.
     * */
    name?: string;
    /**
     * The list of choosen files.
     */
    files?: FileMetadata[];
    /**
     * Event handler for the file selection change event.
     */
    onChange?: (files: (File | FileMetadata)[]) => void;
}

/**
 * File upload is a form element that enables users to select one or multiple local files to upload.
 * The file(s) can then be uploaded upon form submission or processed further in the browser.
 */
const FileUpload: FunctionComponent<FileUploadProps> = ({
    description,
    label,
    controlId,
    name,
    hintText,
    errorText,
    multiple = false,
    accept,
    buttonText,
    files = [],
    onChange,
}) => {
    const [selectedFiles, setSelectedFiles] = useState<(File | FileMetadata)[]>(files);
    const inputElement = useRef<HTMLInputElement | null>(null);
    const displayedButtonText = useMemo(() => {
        if (buttonText) {
            return buttonText;
        }

        if (multiple) {
            return 'Choose files';
        }

        return 'Choose file';
    }, [buttonText]);

    const handleFileSelectionDismiss = useCallback(
        (dismissedItem) => {
            const newFiles = selectedFiles.filter((file) => file.name != dismissedItem.value);

            setSelectedFiles(newFiles);
            if (onChange) {
                onChange(newFiles);
            }
        },
        [selectedFiles, setSelectedFiles, onChange]
    );

    const footer = useMemo(() => {
        if (!selectedFiles || selectedFiles.length === 0) {
            return null;
        }

        if (!multiple) {
            return (
                <FileTokenLabel
                    name={selectedFiles[0].name}
                    size={selectedFiles[0].size}
                    lastModified={selectedFiles[0].lastModified}
                />
            );
        }

        const items = selectedFiles.map((file) => ({
            label: <FileTokenLabel name={file.name} size={file.size} lastModified={file.lastModified} />,
            value: file.name,
        }));

        return <TokenGroup items={items} onDismiss={handleFileSelectionDismiss} inline={false} />;
    }, [selectedFiles, handleFileSelectionDismiss]);

    const handleFileSelectionButtonClick = useCallback(() => {
        if (inputElement.current) {
            inputElement.current.click();
        }
    }, [inputElement.current]);

    const handleFileSelectionChange = useCallback(
        (event) => {
            let newFiles = [];
            if (multiple) {
                newFiles = [...selectedFiles, ...event.target.files];
            } else {
                newFiles = [...event.target.files];
            }

            setSelectedFiles(newFiles);
            if (onChange) {
                onChange(newFiles);
            }
        },
        [selectedFiles, setSelectedFiles, onChange]
    );

    return (
        <FormField
            controlId={controlId}
            description={description}
            label={label}
            footer={footer}
            hintText={hintText}
            errorText={errorText}
        >
            <input
                ref={(input) => {
                    inputElement.current = input;
                }}
                id={controlId}
                name={name}
                style={{ display: 'none' }}
                type="file"
                multiple={multiple}
                accept={accept}
                onChange={handleFileSelectionChange}
                data-testid="input-file"
            />
            <Button icon="CloudUpload" onClick={handleFileSelectionButtonClick}>
                {displayedButtonText}
            </Button>
        </FormField>
    );
};

export default FileUpload;
