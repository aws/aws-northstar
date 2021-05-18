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
import React, { FunctionComponent, useMemo } from 'react';
import { Field } from '@data-driven-forms/react-form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import Form from '../../../Form';
import Button from '../../../Button';
import Inline from '../../../../layouts/Inline';
import { componentTypes, Schema, RenderProps } from '../../types';

export interface FormTemplateProps {
    formFields: Field[];
    schema: Schema;
    isSubmitting?: boolean;
}

const FormTemplate: FunctionComponent<RenderProps> = ({ formFields, schema, isSubmitting }) => {
    const { handleSubmit, onCancel } = useFormApi();
    const { cancelLabel = 'Cancel', submitLabel = 'Submit', fields, header, description } = schema;

    const actions = (
        <Inline spacing="s">
            <Button variant="link" onClick={onCancel} disabled={isSubmitting}>
                {cancelLabel}
            </Button>
            <Button
                variant="primary"
                loading={isSubmitting}
                onClick={(event) => {
                    event.preventDefault();
                    handleSubmit();
                }}
            >
                {submitLabel}
            </Button>
        </Inline>
    );

    const actionsVisible = useMemo(() => {
        return !(fields.length > 0 && fields[0].component === componentTypes.WIZARD);
    }, [fields]);

    return (
        <Form header={header} description={description} actions={actionsVisible ? actions : undefined}>
            {formFields}
        </Form>
    );
};

export default FormTemplate;
