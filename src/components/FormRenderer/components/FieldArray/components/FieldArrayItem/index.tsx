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
import { v4 as uuidv4 } from 'uuid';
import Box from '../../../../../../layouts/Box';
import Button from '../../../../../Button';
import ColumnLayout, { Column } from '../../../../../../layouts/ColumnLayout';
import { Grid } from '../../../../../../layouts';

export interface FieldArrayItemProps {
    fields?: Field[];
    fieldIndex: number;
    name?: string;
    onRemove: (index: number) => void;
    length?: number;
    minItems?: number;
    removeLabel: string;
    showError?: boolean;
    isReadOnly: boolean;
    layout?: 'grid' | 'column';
}

const FieldArrayItem: FunctionComponent<FieldArrayItemProps> = ({
    fields = [],
    fieldIndex,
    name,
    onRemove,
    removeLabel,
    showError,
    isReadOnly,
    layout,
}) => {
    const formOptions = useFormApi();
    const editedFields = useMemo(() => {
        return fields.map((field) => {
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

    const getBox = (field: Field) => (
        <Box width="100%" pr={1}>
            {formOptions.renderForm([field])}
        </Box>
    );

    return (
        <Box display="flex">
            <Box flexGrow={1}>
                {layout === 'grid' ? (
                    <Grid container>
                        {editedFields.map((field) => (
                            <Grid item key={field.key} xs={3}>
                                {getBox(field)}
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <ColumnLayout renderDivider={false}>
                        {editedFields.map((field) => (
                            <Column key={field.key}>{getBox(field)}</Column>
                        ))}
                    </ColumnLayout>
                )}
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
