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
import RadioButton from '.';

export default {
    component: RadioButton,
    title: 'RadioButton',
};

export const Default = () => <RadioButton />;
export const WithLabel = () => <RadioButton controlId="my-radio">check me</RadioButton>;
export const Disabled = () => <RadioButton disabled={true} />;
export const WithValue = () => <RadioButton value="two">Two</RadioButton>;
export const WithDescription = () => (
    <RadioButton value="one" description={'Description text'}>
        One
    </RadioButton>
);
export const WithLabelAndDisabled = () => (
    <RadioButton value="three" disabled={true}>
        Disabled
    </RadioButton>
);
export const WithOnClickHandler = () => (
    <RadioButton value="alert" onChange={() => window.alert('Close me')}>
        onClick alert
    </RadioButton>
);
