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
import { FC } from 'react';
import {
    FormRenderer as ReactFormRenderer,
    FormRendererProps as ReactFormRendererProps,
} from '@data-driven-forms/react-form-renderer';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import { ValidatorMapper, ActionMapper } from '@data-driven-forms/react-form-renderer';
import { componentTypes, Schema } from './types';
import { FormRendererContext } from './formRendererContext';
import basicComponentMapper from './componentMapper';
import FormTemplate from './components/FormTemplate';

export interface FormRendererProps extends Omit<ReactFormRendererProps, 'componentMapper' | 'FormTemplate'> {
    /** A schema which defines structure of the form. */
    schema: Schema;
    /** When true, the submit button is disabled with a loading spinner */
    isSubmitting?: boolean;
    /** Specifies a form-level validation message */
    errorText?: string;
    /** Custom component wrappers*/
    customComponentWrapper?: {
        [key: string]: React.ComponentType | React.FunctionComponent | React.ElementType;
    };
}

/**
 * FormRenderer converts JSON form definitions into fully functional React forms.
 * <br/>
 * It leverages [Data Driven Form](https://data-driven-forms.org/) with customer component mappings to use Cloudscape form controls.
 */
const FormRenderer: FC<FormRendererProps> = ({ isSubmitting, errorText, customComponentWrapper, ...rest }) => {
    return (
        <FormRendererContext.Provider value={{ isSubmitting, errorText }}>
            <ReactFormRenderer
                {...rest}
                componentMapper={{ ...basicComponentMapper, ...customComponentWrapper }}
                FormTemplate={FormTemplate}
            />
        </FormRendererContext.Provider>
    );
};

export default FormRenderer;

export { componentTypes, validatorTypes };
export type { ValidatorMapper, Schema, ActionMapper };
export type { Field } from '@data-driven-forms/react-form-renderer/common-types';
export type { FieldInputProps } from 'react-final-form';
