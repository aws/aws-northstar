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
import React, { FunctionComponent, useMemo } from 'react';
import { FileMetadata } from './types';
import Box from '../../layouts/Box';
import Button from '../Button';
import FileTokenLabel from './components/FileTokenLabel';
import FormField, { BaseFormFieldProps } from '../FormField';
import TokenGroup from '../TokenGroup';

export interface FileUploadProps extends BaseFormFieldProps {
    /**
     * Indicating whether to enable users to upload multiple files.
     */
    multiFile?: boolean;
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
    multiFile = false,
    buttonText,
    files = [],
}) => {
    const displayedButtonText = useMemo(() => {
        if (buttonText) {
            return buttonText;
        }

        if (multiFile) {
            return 'Choose files';
        }

        return 'Choose file';
    }, []);

    const footer = useMemo(() => {
        if (!files || files.length === 0) {
            return null;
        }

        if (files.length === 1) {
            return <FileTokenLabel {...files[0]} />;
        }

        const items = files.map(file => ({
            label: <FileTokenLabel {...file} />,
            value: file.name,
        }));

        return <TokenGroup items={items} onDismiss={() => {}} inline={false} />;
    }, []);

    return (
        <FormField
            controlId={controlId}
            description={description}
            label={label}
            footer={footer}
            hintText={hintText}
            errorText={errorText}
        >
            <input id={controlId} name={name} style={{ display: 'none' }} type="file" />
            <Button icon="CloudUpload">{displayedButtonText}</Button>
        </FormField>
    );
};

export default FileUpload;
