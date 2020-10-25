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
import FormGroup from '.';
import Checkbox from '../Checkbox';

export default {
    component: FormGroup,
    title: 'FormGrouup',
};

export const Default = () => (
    <FormGroup>
        <Checkbox>Default checkbox</Checkbox>
        <Checkbox checked={true}>Checked</Checkbox>
        <Checkbox checked={false}>Unchecked</Checkbox>
        <Checkbox disabled={true}>Disabled</Checkbox>
        <Checkbox indeterminate={true}>Indeterminate</Checkbox>
    </FormGroup>
);

export const Row = () => (
    <FormGroup row>
        <Checkbox>Default checkbox</Checkbox>
        <Checkbox checked={true}>Checked</Checkbox>
        <Checkbox checked={false}>Unchecked</Checkbox>
        <Checkbox disabled={true}>Disabled</Checkbox>
        <Checkbox indeterminate={true}>Indeterminate</Checkbox>
    </FormGroup>
);
