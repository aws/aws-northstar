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
import { action } from '@storybook/addon-actions';
import FileUpload from '.';
import Container from '../../layouts/Container';
import { FileMetadata } from './types';

export default {
    component: FileUpload,
    title: 'FileUpload',
};

const singleFile: FileMetadata[] = [
    {
        name: 'file_name.file_type',
        size: '100 bytes',
        lastModifiedDate: 'last date modified',
    },
];

const multiFiles: FileMetadata[] = [
    {
        name: 'very_long_long_long_long_long_long_long_long_long_file_name1.file_type1',
        size: '10 kb',
        lastModifiedDate: 'last date modified',
    },
    {
        name: 'file_name2.file_type2',
        size: '10 kb',
        lastModifiedDate: 'last date modified',
    },
    {
        name: 'file_name3.file_type3',
        size: '10 kb',
        lastModifiedDate: 'last date modified',
    },
];

export const SingleFile = () => {
    return (
        <Container title="Upload Single File">
            <FileUpload
                controlId="file"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
            ></FileUpload>
        </Container>
    );
};

export const MultipleFiles = () => {
    return (
        <Container title="Upload Multiple Files">
            <FileUpload
                controlId="file"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
                multiFile={true}
            ></FileUpload>
        </Container>
    );
};

export const ExistingSingleFile = () => {
    return (
        <Container title="Upload Single File">
            <FileUpload
                controlId="file"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
                files={singleFile}
            ></FileUpload>
        </Container>
    );
};

export const ExistingMultipleFiles = () => {
    return (
        <Container title="Upload Multiple Files">
            <FileUpload
                controlId="file"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
                files={multiFiles}
                multiFile={true}
            ></FileUpload>
        </Container>
    );
};

export const Error = () => {
    return (
        <Container title="Upload Single File">
            <FileUpload
                controlId="file"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
                errorText="This is an error message"
            ></FileUpload>
        </Container>
    );
};
