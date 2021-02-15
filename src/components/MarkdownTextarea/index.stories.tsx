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
import MarkdownTextarea from '.';
import { action } from '@storybook/addon-actions';

export default {
    component: MarkdownTextarea,
    title: 'MarkdownTextarea',
};

export const Default = () => <MarkdownTextarea value="This is a textarea" />;

export const DefaultPreview = () => <MarkdownTextarea preview="preview" value="# This is a preview" />;

export const DefaultNoToolbar = () => <MarkdownTextarea hideToolbar={true} value="This is a textarea" />;

export const DefaultHigh = () => <MarkdownTextarea height={800} value="This is a textarea" />;

export const Disabled = () => <MarkdownTextarea disabled={true} value="I am disabled" />;

export const ReadOnly = () => (
    <MarkdownTextarea readOnly={true} onChange={action('onChange')} value={'# This is read only'} />
);

export const WithOnChange = () => <MarkdownTextarea onChange={action('onChange')} />;
