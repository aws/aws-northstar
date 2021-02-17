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
import React, { useState } from 'react';
import MarkdownTextarea from '.';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/addons'


export default {
    component: MarkdownTextarea,
    title: 'MarkdownTextarea',
};

export const Default = () => <MarkdownTextarea value={'# This is a textarea'} onChange={action('onChange')} />

export const ReadOnly = () => <MarkdownTextarea readOnly={true} value="# I am read only" />;

export const DefaultNoPreview = () => <MarkdownTextarea preview={false} hideToolbar={true} value="This is a textarea" />;

export const DefaultNoToolbar = () => <MarkdownTextarea hideToolbar={true} value="This is a textarea" />;
