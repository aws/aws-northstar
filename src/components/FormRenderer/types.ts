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
import basicComponentTypes from '@data-driven-forms/react-form-renderer/component-types';
import { Schema as FormRendererSchema } from '@data-driven-forms/react-form-renderer/common-types';
import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/common-types/form-template-render-props';

export interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

export type Schema = Omit<FormRendererSchema, 'title'> & {
    header?: FormRendererSchema['title'];
    cancelLabel?: string;
    canCancel?: boolean;
    resetLabel?: string;
    canReset?: boolean;
    submitLabel?: string;
};

export type RenderProps = Omit<FormTemplateRenderProps, 'schema'> & {
    schema: Schema;
};

export const componentTypes = {
    ...basicComponentTypes,
    TREE_VIEW: 'TREE_VIEW',
    EXPANDABLE_SECTION: 'EXPANDABLE_SECTION',
    TABLE: 'TABLE',
    REVIEW: 'REVIEW',
    MARKDOWN_EDITOR: 'MARKDOWN_EDITOR',
    CUSTOM: 'CUSTOM',
};
