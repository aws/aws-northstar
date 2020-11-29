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
import Wizard from '.';
import FormSection from '../FormSection';
import FormField from '../FormField';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';
import Toggle from '../Toggle';

export default {
    component: Wizard,
    title: 'Wizard',
};

export const Default = () => {
    const steps = [
        {
            title: 'Step 1',
            description: 'Enter general information',
            content: (
                <FormSection header="Form section">
                    <FormField
                        label="Example text input"
                        hintText="Input constraint goes here. e.g. 1,000 characters maximum"
                        controlId="formFieldId1"
                    >
                        <Input type="text" controlId="formFieldId1" />
                    </FormField>
                    <FormField label="Example textarea" controlId="formFieldId2">
                        <Textarea controlId="formFieldId2" />
                    </FormField>
                    <FormField label="Example select" controlId="formFieldId3">
                        <Select
                            placeholder="Choose an option"
                            controlId="formFieldId3"
                            options={[
                                { label: 'Option 1', value: '1' },
                                { label: 'Option 2', value: '2' },
                                { label: 'Option 3', value: '3' },
                            ]}
                        />
                    </FormField>
                </FormSection>
            ),
        },
        {
            title: 'Step 2',
            content: (
                <FormSection header="Form section">
                    <FormField label="Example select" controlId="formFieldId5">
                        <Select
                            placeholder="Choose an option"
                            controlId="formFieldId4"
                            options={[
                                { label: 'Option 1', value: '1' },
                                { label: 'Option 2', value: '2' },
                                { label: 'Option 3', value: '3' },
                            ]}
                        />
                    </FormField>
                </FormSection>
            ),
        },
        {
            title: 'Step 3',
            content: (
                <FormSection header="Form section">
                    <FormField label="Example select" controlId="formFieldId6">
                        <Select
                            placeholder="Choose an option"
                            controlId="formFieldId7"
                            options={[
                                { label: 'Option 1', value: '1' },
                                { label: 'Option 2', value: '2' },
                                { label: 'Option 3', value: '3' },
                            ]}
                        />
                    </FormField>
                    <Toggle label="Check me out" />
                </FormSection>
            ),
            isOptional: true,
        },
    ];

    return <Wizard steps={steps} />;
};
