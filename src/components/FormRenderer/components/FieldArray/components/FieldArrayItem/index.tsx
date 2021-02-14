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
import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import Box from '../../../../../../layouts/Box';
import Button from '../../../../../Button';
import ColumnLayout, { Column } from '../../../../../../layouts/ColumnLayout';

export interface FieldArrayItemProps {
    fields?: any[];
    fieldIndex: number;
    name?: string;
    onRemove: (index: number) => void;
    length?: number;
    minItems?: number;
    removeLabel: string;
    showError?: boolean;
    isReadOnly: boolean;
}

const FieldArrayItem: FunctionComponent<FieldArrayItemProps> = ({
    fields = [],
    fieldIndex,
    name,
    onRemove,
    removeLabel,
    showError,
    isReadOnly,
}) => {
    const formOptions = useFormApi();
    const editedFields = useMemo(() => {
        return fields.map((field: any) => {
            const computedName = field.name ? `${name}.${field.name}` : uuidv4();
            return {
                ...field,
                showError,
                name: computedName,
                key: computedName,
                stretch: true,
                label: fieldIndex === 0 ? field.label : null,
            };
        });
    }, [fields, name, fieldIndex, showError]);

    return (
        <Box display="flex">
            <Box flexGrow={1}>
                {
                    <ColumnLayout renderDivider={false}>
                        {editedFields.map((field) => (
                            <Column key={field.key}>
                                <Box width="100%" pr={1}>
                                    {formOptions.renderForm([field], formOptions)}
                                </Box>
                            </Column>
                        ))}
                    </ColumnLayout>
                }
            </Box>
            {!isReadOnly && (
                <Box display="flex" alignItems="flex-start" pt={fieldIndex === 0 ? 2.5 : 0.5}>
                    <Button
                        onClick={() => {
                            onRemove(fieldIndex);
                        }}
                    >
                        {removeLabel}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default FieldArrayItem;
