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
import React, { FunctionComponent, useState } from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import FormField from '../../../FormField';
import MarkdownViewer from '../../../MarkdownViewer';
import Textarea from '../../../Textarea';
import Grid from '../../../../layouts/Grid';
import { Box } from '../../../../layouts';

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
        showError,
        secondaryControl,
        value,
        onChange,
        meta: { error, submitFailed },
    } = useFieldApi(props);

    const INITIAL_ROWS = 10;

    const [content, setContent] = useState(value || placeholder);
    const controlId = input.name || uuidv4();
    const errorText = ((validateOnMount || submitFailed || showError) && error) || '';

    const updateState = (e: any) => {
        e.persist();
        setContent(e.target.value);
        onChange && onChange(e);
        input.onChange(e);
    };

    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            hintText={helperText}
            errorText={errorText}
            stretch={true}
            secondaryControl={secondaryControl}
        >
            <Grid container alignItems="stretch" spacing={3}>
                <Grid item sm={6} xs={12}>
                    <Textarea
                        {...input}
                        rows={rows || INITIAL_ROWS}
                        value={content}
                        placeholder={placeholder}
                        controlId={controlId}
                        disabled={isDisabled}
                        required={isRequired}
                        readonly={isReadOnly}
                        invalid={!!errorText}
                        onChange={updateState}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Box
                        bgcolor="grey.100"
                        height="100%"
                        p={1}
                        style={{ wordWrap: 'break-word' }}
                        overflow={'hidden'}
                        width={'100%'}
                    >
                        <MarkdownViewer>{content}</MarkdownViewer>
                    </Box>
                </Grid>
            </Grid>
        </FormField>
    );
};

export default MarkdownEditorMapping;
