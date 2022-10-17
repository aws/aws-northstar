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
import FormField from '.';
import Input from '../Input';
import Button from '../Button';
import Select from '../Select';
import Stack from '../../layouts/Stack';
export default {
    component: FormField,
    title: 'Components/FormField',
};

export const Default = () => {
    return (
        <Stack>
            <FormField label="Form field label" controlId="formFieldId1">
                <Input type="text" controlId="formFieldId1" />
            </FormField>
            <FormField label="Form field label" controlId="formFieldId2">
                <Select
                    placeholder="Choose an option"
                    controlId="formFieldId2"
                    options={[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                        { label: 'Option 3', value: '3' },
                    ]}
                />
            </FormField>
        </Stack>
    );
};

export const WithDescriptionAndHintText = () => {
    return (
        <FormField
            label="Form field label"
            controlId="formFieldId1"
            description="This is description"
            hintText="Requirements and constrains for the field"
        >
            <Input type="text" controlId="formFieldId1" />
        </FormField>
    );
};

export const WithActions = () => {
    return (
        <FormField
            label="Form field label"
            controlId="formFieldId1"
            description="This is description"
            hintText="Requirements and constrains for the field"
            secondaryControl={<Button>Add</Button>}
        >
            <Input type="text" controlId="formFieldId1" />
        </FormField>
    );
};

export const WithReloadAndCreateNew = () => {
    return (
        <FormField
            label="Form field label"
            controlId="formFieldId1"
            description="This is description"
            hintText="Requirements and constrains for the field"
            renderReload={true}
            onReloadClick={action('Reload')}
            createNewLink="Create a new record"
            createNewLinkHref="/records/new"
        >
            <Input type="text" controlId="formFieldId1" />
        </FormField>
    );
};

export const WithErrorText = () => {
    return (
        <FormField
            label="Form field label"
            controlId="formFieldId1"
            description="This is description"
            hintText="Requirements and constrains for the field"
            errorText="This is an error message"
            secondaryControl={<Button>Add</Button>}
        >
            <Input type="text" controlId="formFieldId1" invalid />
        </FormField>
    );
};

export const StretchedFromField = () => {
    return (
        <FormField
            label="Form field label"
            controlId="formFieldId1"
            description="This is description"
            hintText="Requirements and constrains for the field"
            stretch={true}
        >
            <Input type="text" controlId="formFieldId1" />
        </FormField>
    );
};

export const Expandable = () => {
    return (
        <FormField
            label="Form field label"
            controlId="formFieldId1"
            description="This is description"
            hintText="Requirements and constrains for the field"
            expandable={true}
        >
            <Input type="text" controlId="formFieldId1" />
        </FormField>
    );
};

export const ExpandableWithError = () => {
    return (
        <FormField
            label="Form field label"
            controlId="formFieldId1"
            description="This is description"
            hintText="Requirements and constrains for the field"
            errorText="Required"
            expandable={true}
        >
            <Input type="text" controlId="formFieldId1" invalid={true} />
        </FormField>
    );
};
