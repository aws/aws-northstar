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
import {
    Schema as FormRendererSchema,
    Field as FormRendererField,
} from '@data-driven-forms/react-form-renderer/common-types';
import { FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer/common-types/form-template-render-props';
import { HeaderProps } from '@cloudscape-design/components/header';
import { FormFieldProps as CloudscapeFormFieldProps } from '@cloudscape-design/components/form-field';
import { FormProps } from '@cloudscape-design/components/form';

export const componentTypes = {
    ...basicComponentTypes,
    ALERT: 'ALERT',
    CODE_EDITOR: 'CODE_EDITOR',
    COLUMN_LAYOUT: 'COLUMN_LAYOUT',
    CUSTOM: 'CUSTOM',
    CUSTOM_LAYOUT: 'CUSTOM_LAYOUT',
    DATA_RANGE_PICKER: 'DATA_RANGE_PICKER',
    DATE_INPUT: 'DATE_INPUT',
    EXPANDABLE_SECTION: 'EXPANDABLE_SECTION',
    FIELD_GROUP: 'FIELD_GROUP',
    MARKDOWN_EDITOR: 'MARKDOWN_EDITOR',
    REVIEW: 'REVIEW',
    TIME_INPUT: 'TIME_INPUT',
};

export interface FormFieldProps
    extends Pick<CloudscapeFormFieldProps, 'label' | 'description' | 'i18nStrings' | 'stretch' | 'secondaryControl'> {
    helperText?: CloudscapeFormFieldProps['constraintText'];
}

export interface Field extends FormRendererField, FormFieldProps {}

export type Schema = Omit<FormRendererSchema, 'title'> & {
    header?: FormRendererSchema['title'];
    headerVariant?: HeaderProps['variant'];
    variant?: FormProps['variant'];
    info?: HeaderProps['info'];
    cancelLabel?: string;
    canCancel?: boolean;
    resetLabel?: string;
    canReset?: boolean;
    submitLabel?: string;
    fields: Field[];
};

export type RenderProps = Omit<FormTemplateRenderProps, 'schema'> & {
    schema: Schema;
};

export interface Option {
    label: string;
    value: string;
    description: string;
    disabled?: boolean;
}
