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
import Tabs from '.';
import { action } from '@storybook/addon-actions';

export default {
    component: Tabs,
    title: 'Tabs',
};

const tabs = [
    {
        label: 'First tab label',
        id: 'first',
        content: 'First tab content area',
    },
    {
        label: 'Second tab label',
        id: 'second',
        content: 'Second tab content area',
    },
    {
        label: 'Third tab label',
        id: 'third',
        content: 'Third tab content area',
        disabled: true,
    },
];

export const Default = () => <Tabs tabs={tabs} onChange={action('onChange')} />;

export const Container = () => <Tabs tabs={tabs} onChange={action('onChange')} activeId="second" variant="container" />;
