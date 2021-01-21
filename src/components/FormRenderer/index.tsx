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
import React, { FunctionComponent, ComponentType } from 'react';
import FormRender, { validatorTypes } from '@data-driven-forms/react-form-renderer';
import Checkbox from './components/Checkbox';
import Custom from './components/Custom';
import Datepicker from './components/Datepicker';
import ExpandableSection from './components/ExpandableSection';
import FieldArray from './components/FieldArray';
import FormTemplate from './components/FormTemplate';
import Radio from './components/Radio';
import Review from './components/Review';
import Select from './components/Select';
import Subform from './components/Subform';
import Switch from './components/Switch';
import Table from './components/Table';
import Textarea from './components/Textarea';
import TextField from './components/TextField';
import TimePicker from './components/TimePicker';
import TreeView from './components/TreeView';
import Wizard from './components/Wizard';
import { componentTypes } from './types';

const componentMapper = {
    [componentTypes.TEXT_FIELD]: TextField,
    [componentTypes.CHECKBOX]: Checkbox,
    [componentTypes.SUB_FORM]: Subform,
    [componentTypes.RADIO]: Radio,
    [componentTypes.DATE_PICKER]: Datepicker,
    [componentTypes.TIME_PICKER]: TimePicker,
    [componentTypes.SWITCH]: Switch,
    [componentTypes.TEXTAREA]: Textarea,
    [componentTypes.SELECT]: Select,
    [componentTypes.WIZARD]: Wizard,
    [componentTypes.FIELD_ARRAY]: FieldArray,
    [componentTypes.TREE_VIEW]: TreeView,
    [componentTypes.EXPANDABLE_SECTION]: ExpandableSection,
    [componentTypes.TABLE]: Table,
    [componentTypes.REVIEW]: Review,
    [componentTypes.CUSTOM]: Custom,
};

export interface FormRendererProps {
    /** A schema which defines structure of the form. */
    schema: any;
    /** An object of fields names as keys and values as their values. */
    initialValues?: any;
    /** A submit callback which receives two arguments: values and formApi. */
    onSubmit: (values: any) => void;
    /** A cancel callback, which receives values as the first argument. */
    onCancel?: () => void;
    /** Custom component wrappers*/
    customComponentWrapper?: {
        [componentType: string]: ComponentType;
    };
}

/**
 * FormRenderer converts JSON form definitions into fully functional React forms.
 *
 * It leverages [Data Driven Form](https://data-driven-forms.org/) with customer component mappings to use our own form controls.
 */
const FormRenderer: FunctionComponent<FormRendererProps> = ({
    schema,
    onSubmit,
    onCancel,
    initialValues,
    customComponentWrapper,
}) => {
    return (
        <FormRender
            componentMapper={{ ...componentMapper, ...customComponentWrapper }}
            FormTemplate={FormTemplate}
            schema={schema}
            onSubmit={onSubmit}
            onCancel={onCancel}
            initialValues={initialValues}
        />
    );
};
export default FormRenderer;

export { componentTypes, validatorTypes };
