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
import { useFormApi, componentTypes } from '@data-driven-forms/react-form-renderer';
import Form from '../../../Form';
import Button from '../../../Button';
import Inline from '../../../../layouts/Inline';

export interface FormTemplateProps {
    formFields: any;
    schema: any;
    cancelLabel?: string;
    submitLabel?: string;
}

const FormTemplate: FunctionComponent<FormTemplateProps> = ({
    formFields,
    schema: { cancelLabel = 'Cancel', submitLabel = 'Submit' },
    schema,
}) => {
    const { handleSubmit, onCancel } = useFormApi();

    const actions = (
        <Inline spacing="s">
            <Button variant="link" onClick={onCancel}>
                {cancelLabel}
            </Button>
            <Button
                variant="primary"
                onClick={(event) => {
                    event.preventDefault();
                    handleSubmit(event);
                }}
            >
                {submitLabel}
            </Button>
        </Inline>
    );

    const actionsVisible = useMemo(() => {
        if (schema.fields && schema.fields.length > 0 && schema.fields[0].component === componentTypes.WIZARD) {
            return false; // Hide the actions for Wizard
        }
        return true;
    }, []);

    return (
        <Form header={schema.header} description={schema.description} actions={actionsVisible ? actions : undefined}>
            {formFields}
        </Form>
    );
};

export default FormTemplate;
