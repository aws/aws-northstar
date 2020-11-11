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
import Icon from '.';

export default {
    component: Icon,
    title: 'Icon',
};

export const DefaultExample = () => <Icon name="AcUnit" />;

export const WithoutVariant = () => <Icon name="MenuRounded" />;

export const OutlinedIcon = () => <Icon name="Cloud" variant="Outlined" />;

export const RoundedIcon = () => <Icon name="Cloud" variant="Rounded" />;

export const TwoToneIcon = () => <Icon name="Cloud" variant="TwoTone" />;

export const SharpIcon = () => <Icon name="Cloud" variant="Sharp" />;

export const htmlColor = () => <Icon name="Cloud" variant="Sharp" htmlColor="#00FFFF" />;

export const FullExample = () => <Icon name="Dns" variant="TwoTone" color="error" fontSize="large" />;
