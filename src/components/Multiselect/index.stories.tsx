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
import Multiselect from '.';
import FormField from '../FormField';
import { awsServices } from '../Autosuggest/data/data';

export default {
    component: Multiselect,
    title: 'Multiselect',
};

export const Default = () => (
    <FormField label="Form field label" controlId="formFieldId1">
        <Multiselect
            options={awsServices}
            controlId="formFieldId1"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
            onFocus={action('onFocus')}
            onBlur={action('onBlur')}
        />
    </FormField>
);

export const WithCheckboxes = () => (
    <FormField label="Form field label" controlId="formFieldId2">
        <Multiselect
            options={awsServices}
            controlId="formFieldId2"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
            checkboxes={true}
        />
    </FormField>
);

export const WithInitialValue = () => (
    <FormField label="Form field label" controlId="formFieldId2">
        <Multiselect
            options={awsServices}
            controlId="formFieldId2"
            ariaDescribedby="This is a description"
            onChange={action('onChange')}
            checkboxes={true}
            value={[
                {
                    value: 'EC2',
                    label: 'EC2 - Amazon Elastic Compute Cloud',
                },
            ]}
        />
    </FormField>
);
