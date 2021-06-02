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
import React, { FunctionComponent, ComponentType, useMemo } from 'react';
import {
    FormRenderer as ReactFormRenderer,
    FormRendererProps as ReactFormRendererProps,
} from '@data-driven-forms/react-form-renderer';
import { FormSubscription as ReactFormSubscription } from 'final-form';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
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
import MarkdownEditor from './components/MarkdownEditor';
import { componentTypes, Schema, RenderProps } from './types';

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
    [componentTypes.MARKDOWN_EDITOR]: MarkdownEditor,
};

export interface FormRendererProps {
    /** A schema which defines structure of the form. */
    schema: Schema;
    /** An object of fields names as keys and values as their values. */
    initialValues?: object;
    /** A submit callback which receives two arguments: values and formApi. */
    onSubmit: ReactFormRendererProps['onSubmit'];
    /** A cancel callback, which receives values as the first argument. */
    onCancel?: () => void;
    /** When true, the submit button is disabled with a loading spinner */
    isSubmitting?: boolean;
    /** The subscription for the formstate change so the form is rerendered each time the subscription value changed*/
    subscription?: ReactFormSubscription;
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
    isSubmitting,
    initialValues,
    subscription,
    customComponentWrapper,
}) => {
    const WrappedFormTemplate = useMemo(
        () => (props: RenderProps) => <FormTemplate isSubmitting={isSubmitting} {...props} />,
        [isSubmitting]
    );

    return (
        <ReactFormRenderer
            componentMapper={{ ...componentMapper, ...customComponentWrapper }}
            FormTemplate={WrappedFormTemplate}
            schema={schema}
            onSubmit={onSubmit}
            onCancel={onCancel}
            subscription={subscription}
            initialValues={initialValues}
        />
    );
};
export default FormRenderer;

export { componentTypes, validatorTypes };
