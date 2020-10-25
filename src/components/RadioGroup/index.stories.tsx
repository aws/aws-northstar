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
import RadioGroup from '.';
import RadioButton from './components/RadioButton';

export default {
    component: RadioGroup,
    title: 'RadioGroup',
};

export const WithDifferetnRadioButtons = () => (
    <RadioGroup
        items={[
            <RadioButton key={1} value="none"></RadioButton>,
            <RadioButton key={2} value="one" description={'Description text'}>
                One
            </RadioButton>,
            <RadioButton key={3} value="two">
                Two
            </RadioButton>,
            <RadioButton key={4} value="three" disabled={true}>
                Disabled
            </RadioButton>,
            <RadioButton key={5} value="alert" onChange={() => window.alert('Close me')}>
                onClick alert
            </RadioButton>,
        ]}
    />
);
