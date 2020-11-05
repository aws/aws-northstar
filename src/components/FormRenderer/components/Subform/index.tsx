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
import React, { FunctionComponent, memo, useMemo } from 'react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';
import FormSection from '../../../FormSection';
import Box from '../../../../layouts/Box';
import { ExpandableSectionVariant } from '../../../ExpandableSection';

export interface SubformProps {
    fields: any;
    title: string;
    description?: string;
    expandable?: boolean;
    expanded?: boolean;
    expandableSectionVariant: ExpandableSectionVariant;
    showError?: boolean;
}

const Subform: FunctionComponent<SubformProps> = ({ title, description, ...props }) => {
    const { renderForm } = useFormApi();

    const fields = useMemo(() => {
        return props.fields.map((field: any) => ({
            ...field,
            showError: props.showError,
        }));
    }, [props.fields, props.showError]);

    return (
        <Box mb={2}>
            <FormSection header={title} description={description}>
                {renderForm(fields)}
            </FormSection>
        </Box>
    );
};

export default memo(Subform);
