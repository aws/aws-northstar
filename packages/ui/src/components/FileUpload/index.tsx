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
import FormField, { FormFieldProps } from '@cloudscape-design/components/form-field';
import Button from '@cloudscape-design/components/button';
import TokenGroup, { TokenGroupProps } from '@cloudscape-design/components/token-group';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { FC, useCallback, useRef, useMemo, useState } from 'react';
import { FileMetadata } from './types';
import useUniqueId from '../../hooks/useUniqueId';
import FileTokenLabel from './components/FileTokenLabel';
import SpaceBetween from '@cloudscape-design/components/space-between';
import getDisplaySize from './utils/getDisplaySize';
import getDisplayLastModified from './utils/getDisplayLastModified';
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events';

export interface FileUploadProps extends FormFieldProps {
    /**
     * Indicating whether to enable users to upload multiple files.
     */
    multi?: boolean;
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
    files?: (File | FileMetadata)[];
    /**
     * Event handler for the file selection change event.
     */
    onChange?: (files: (File | FileMetadata)[]) => void;
}

/**
 * File upload is a form element that enables users to select one or multiple local files to upload.
 * The file(s) can then be uploaded upon form submission or processed further in the browser.
 */
const FileUpload: FC<FileUploadProps> = ({
    controlId,
    multi,
    label,
    description,
    constraintText,
    secondaryControl,
    errorText,
    info,
    buttonText,
    name,
    accept,
    onChange,
    files,
    ...props
}) => {
    const [selectedFiles, setSelectedFiles] = useState<(File | FileMetadata)[]>(files || []);
    const id = useUniqueId(controlId);
    const inputElement = useRef<HTMLInputElement | null>(null);
    const displayedButtonText = useMemo(() => {
        return buttonText || `Choose ${multi ? 'files' : 'file'}`;
    }, [buttonText, multi]);

    const testId = props['data-testid'] || 'file-upload';

    const handleFileSelectionDismiss: NonCancelableEventHandler<TokenGroupProps.DismissDetail> = useCallback(
        ({ detail: { itemIndex } }) => {
            const newFiles = [...selectedFiles.slice(0, itemIndex), ...selectedFiles.slice(itemIndex + 1)];

            setSelectedFiles(newFiles);
            onChange?.(newFiles);
        },
        [selectedFiles, setSelectedFiles, onChange]
    );

    const footer = useMemo(() => {
        if (!selectedFiles || selectedFiles.length === 0) {
            return null;
        }

        if (!multi) {
            return (
                <FileTokenLabel
                    name={selectedFiles[0].name}
                    size={selectedFiles[0].size}
                    lastModified={selectedFiles[0].lastModified}
                />
            );
        }

        const items: TokenGroupProps.Item[] = selectedFiles.map((file) => ({
            label: file.name,
            description: getDisplaySize(file.size),
            tags: file.lastModified ? [getDisplayLastModified(file.lastModified)] : [],
            iconSvg: <StatusIndicator type="success" />,
        }));

        return (
            <div
                style={{
                    display: 'flex',
                }}
            >
                <TokenGroup items={items} onDismiss={handleFileSelectionDismiss} alignment="vertical" />
            </div>
        );
    }, [selectedFiles, multi, handleFileSelectionDismiss]);

    const handleFileSelectionButtonClick = useCallback(() => {
        inputElement.current?.click();
    }, []);

    const handleFileSelectionChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            const newSelectedFiles: File[] = [];

            if (event.target.files) {
                const targetFiles = event.target.files;
                const len = targetFiles.length;
                for (let i = 0; i < len; i++) {
                    const file = targetFiles.item(i);
                    if (file) {
                        newSelectedFiles.push(file);
                    }
                }
            }

            const newFiles = multi ? [...selectedFiles, ...newSelectedFiles] : [...newSelectedFiles];

            setSelectedFiles(newFiles);
            onChange?.(newFiles);
        },
        [selectedFiles, setSelectedFiles, onChange, multi]
    );

    return (
        <SpaceBetween direction="vertical" size="m">
            <FormField
                {...props}
                controlId={id}
                label={label}
                info={info}
                description={description}
                constraintText={constraintText}
                secondaryControl={secondaryControl}
                errorText={errorText}
                data-testid={testId}
            >
                <input
                    ref={inputElement}
                    id={id}
                    name={name}
                    style={{ display: 'none' }}
                    type="file"
                    multiple={multi}
                    accept={accept}
                    onChange={handleFileSelectionChange}
                    data-testid={`${testId}-input`}
                />
                <Button data-testid={`${testId}-button`} iconName="upload" onClick={handleFileSelectionButtonClick}>
                    {displayedButtonText}
                </Button>
            </FormField>
            {footer}
        </SpaceBetween>
    );
};

export default FileUpload;
