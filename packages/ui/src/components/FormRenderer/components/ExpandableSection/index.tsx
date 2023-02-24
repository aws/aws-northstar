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
import { FC, memo, useMemo, useState, useEffect } from 'react';
import { Field } from '@data-driven-forms/react-form-renderer';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import ExpandableSectionComponent from '@cloudscape-design/components/expandable-section';
import SpaceBetween from '@cloudscape-design/components/space-between';

const ExpandableSection: FC<UseFieldApiConfig> = (props) => {
    const {
        fields,

        title,
        description,
        headerVariant,
        variant = 'default',

        input,

        isReadOnly,
        isDisabled,

        validateOnMount,
        showError,
        meta: { submitFailed, error },

        expanded: propsExpanded,
        ...rest
    } = useFieldApi(props);
    const { renderForm } = useFormApi();
    const editedFields = useMemo(() => {
        return fields.map((field: Field) => ({
            isReadOnly,
            isDisabled,
            ...field,
            showError,
            name: `${input.name}.${field.name}`,
        }));
    }, [fields, input.name, showError, isReadOnly, isDisabled]);

    const [expanded, setExpanded] = useState(propsExpanded || false);
    useEffect(() => {
        if (!expanded) {
            const isError = (validateOnMount || submitFailed || showError) && !!error;
            if (isError || input.value) {
                setExpanded(true);
            }
        }
    }, [validateOnMount, submitFailed, error, expanded, showError, input.value]);

    return (
        <ExpandableSectionComponent
            {...rest}
            headerText={title}
            headerDescription={description}
            headingTagOverride={headerVariant}
            variant={variant}
            expanded={expanded}
            onChange={({ detail }) => {
                setExpanded(detail.expanded);
            }}
        >
            <SpaceBetween direction="vertical" size="s">
                {renderForm(editedFields)}
            </SpaceBetween>
        </ExpandableSectionComponent>
    );
};

export default memo(ExpandableSection);
