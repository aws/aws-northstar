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
import React, { FunctionComponent, useMemo, useState, useEffect } from 'react';
import { useFormApi, useFieldApi } from '@data-driven-forms/react-form-renderer';
import ExpandableSection from '../../../ExpandableSection';
import Stack from '../../../../layouts/Stack';
import Box from '../../../../layouts/Box';

const ExpandableSectionMapping: FunctionComponent = (props) => {
    const {
        fields,
        title,
        description,
        variant = 'default',
        input,
        validateOnMount,
        showError,
        meta: { submitFailed, error },
        ...rest
    } = useFieldApi(props);
    const { renderForm } = useFormApi();
    const editedFields = useMemo(() => {
        return fields.map((field: any) => ({
            ...field,
            showError,
            name: `${input.name}.${field.name}`,
        }));
    }, [fields, showError]);

    const [expanded, setExpanded] = useState(rest.expanded || false);
    useEffect(() => {
        if (!expanded) {
            const isError = (validateOnMount || submitFailed || showError) && !!error;
            if (isError || input.value) {
                setExpanded(true);
            }
        }
    }, [validateOnMount, submitFailed, error, expanded, showError, input.value]);

    return (
        <Box mb={2}>
            <ExpandableSection
                header={title}
                variant={variant}
                description={description}
                expanded={expanded}
                onChange={(open) => {
                    setExpanded(open);
                }}
            >
                <Box width="100%">
                    <Stack>{renderForm(editedFields)}</Stack>
                </Box>
            </ExpandableSection>
        </Box>
    );
};

export default ExpandableSectionMapping;
