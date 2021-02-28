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
import React, { FunctionComponent, useState, setState } from 'react';
import { useFormApi, useFieldApi } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import FormField from '../../../FormField';
import Input from '../../../Input';
import MarkdownViewer from '../../../MarkdownViewer';
import Inline from '../../../../layouts/Inline'
import Textarea, { TextareaProps } from '../../../Textarea';
import Container from '../../../../layouts/Container';
import Grid from '../../../../layouts/Grid';


const MarkdownEditorMapping: FunctionComponent = (props: any) => {
    const {
        label,
        description,
        helperText,
        isRequired,
        isDisabled,
        isReadOnly,
        placeholder,
        validateOnMount,
        input,
        rows,
        stretch,
        showError,
        secondaryControl,
        value,
        meta: { error, submitFailed },
    } = useFieldApi(props);

    const { getState } = useFormApi();
    const [content, setContent] = useState(value || placeholder)
    const controlId = input.name || uuidv4();
    const errorText = ((validateOnMount || submitFailed || showError) && error) || '';

    const updateState = (e: any) => {
        e.persist();
        setContent(e.target.value);
    }

    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            hintText={helperText}
            errorText={errorText}
            stretch={stretch}
            secondaryControl={secondaryControl}
        >
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Textarea
                        {...input}
                        rows={rows || 10}
                        value={content}
                        placeholder={placeholder}
                        controlId={controlId}
                        disabled={isDisabled}
                        required={isRequired}
                        readonly={isReadOnly}
                        invalid={!!errorText}
                        onChange={updateState}
                    /></Grid>
                <Grid item xs={6}>
                    <Container>
                        <MarkdownViewer>{content}</MarkdownViewer>
                    </Container>
                </Grid>
            </Grid>
        </FormField>
    );
};

export default MarkdownEditorMapping;
