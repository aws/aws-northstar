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
import Checkbox from '.';

export default {
    component: Checkbox,
    title: 'Components/Checkbox',
};

export const Default = () => <Checkbox />;
export const WithLabel = () => <Checkbox>Label</Checkbox>;
export const WithLabelAndDescription = () => <Checkbox description="label description">Label</Checkbox>;
export const Checked = () => <Checkbox checked={true} />;
export const Unchecked = () => <Checkbox checked={false} />;
export const Indeterminate = () => <Checkbox indeterminate={true} />;
export const DisabledChecked = () => <Checkbox disabled={true} checked={true} />;
export const DisabledUnchecked = () => <Checkbox disabled={true} checked={false} />;
export const DisabledIndeterminate = () => <Checkbox disabled={true} indeterminate={true} />;
