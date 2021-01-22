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

export default {
    component: FileUpload,
    title: 'FileUpload',
};

const singleFile = [
    {
        name: 'file_name.file_type',
        size: 1001,
        lastModified: 1611275279000,
    },
];

const multiFiles = [
    {
        name: 'very_long_long_long_long_long_long_long_long_long_file_name1.file_type1',
        size: 10011,
        lastModified: 1611275279000,
    },
    {
        name: 'file_name2.file_type2',
        size: 1022222,
        lastModified: 1611275279000,
    },
    {
        name: 'file_name3.file_type3',
        size: 103333333,
        lastModified: 1611275279000,
    },
];

export const SingleFile = () => {
    return (
        <Container title="Upload Single File">
            <FileUpload
                controlId="file1"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
                onChange={action('File Selection Change')}
            ></FileUpload>
        </Container>
    );
};

export const MultipleFiles = () => {
    return (
        <Container title="Upload Multiple Files">
            <FileUpload
                controlId="file2"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
                multiple={true}
                onChange={action('File Selection Change')}
            ></FileUpload>
        </Container>
    );
};

export const ExistingSingleFile = () => {
    return (
        <Container title="Upload Single File">
            <FileUpload
                controlId="file3"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
                files={singleFile}
                onChange={action('File Selection Change')}
            ></FileUpload>
        </Container>
    );
};

export const ExistingMultipleFiles = () => {
    return (
        <Container title="Upload Multiple Files">
            <FileUpload
                controlId="file4"
                label="Form field label"
                description="This is a description"
                hintText="This is hint text with file requirements and constraints"
                files={multiFiles}
                multiple={true}
                accept="image/*"
                onChange={action('File Selection Change')}
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
