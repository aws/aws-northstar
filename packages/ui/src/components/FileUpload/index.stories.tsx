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
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FileUpload from '.';

export default {
    component: FileUpload,
    title: 'Components/FileUpload',
    argTypes: {
        onChange: { action: true },
    },
} as ComponentMeta<typeof FileUpload>;

const Template: ComponentStory<typeof FileUpload> = (args) => {
    return <FileUpload {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    label: 'Form field label',
    description: 'Description',
    constraintText: 'Hint text for file requirements',
};

export const Error = Template.bind({});
Error.args = {
    ...Default.args,
    errorText: 'Error message',
};

export const WithValue = Template.bind({});
WithValue.args = {
    ...Default.args,
    files: [
        {
            name: 'file_name.file_type',
            size: 1001,
            lastModified: 1611275279000,
        },
    ],
};

export const Multi = Template.bind({});
Multi.args = {
    ...Default.args,
    multi: true,
};

export const MultiWithValue = Template.bind({});
MultiWithValue.args = {
    ...Default.args,
    multi: true,
    files: [
        {
            name: 'very_long_long_long_long_long_long_long_long_long_file_name1.file_type1',
            size: 10011,
            lastModified: 1611275279000,
        },
        {
            name: 'file_name2.file_type2',
            size: 1022222,
            lastModified: 1622275279000,
        },
        {
            name: 'file_name3.file_type3',
            size: 103333333,
            lastModified: 1641231243243,
        },
    ],
};
