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
import React, { FunctionComponent, useMemo, useCallback, ReactNode } from 'react';
import { Field } from '@data-driven-forms/react-form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import Box from '../../../../../../layouts/Box';
import Button from '../../../../../Button';
import ColumnLayout, { Column } from '../../../../../../layouts/ColumnLayout';
import Grid from '../../../../../../layouts/Grid';
import Stack from '../../../../../../layouts/Stack';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';

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
    displayLablePerItem: boolean;
    layout?: 'grid' | 'column';
    collapse: boolean;
    gridStyle: string;
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
    displayLablePerItem,
    collapse,
    gridStyle,
}) => {
    const formOptions = useFormApi();

    const getFieldKey = useCallback((fieldName: string) => `${name}.${fieldName}`, [name]);

    const editedFields = useMemo(() => {
        return fields.map((field) => {
            return {
                ...field,
                showError,
                name: getFieldKey(field.name),
                key: getFieldKey(field.name),
                stretch: true,
                label: (collapse || displayLablePerItem) && field.label,
                description: (collapse || displayLablePerItem) && field.description,
            };
        });
    }, [fields, showError, collapse, getFieldKey, displayLablePerItem]);

    const getBox = useCallback(
        (field: Field) => (
            <Box width="100%" pr={1}>
                {formOptions.renderForm([field])}
            </Box>
        ),
        [formOptions]
    );

    const getHeader = useCallback(
        (field: Field) => (
            <Box>
                {field.label && <InputLabel htmlFor={getFieldKey(field.name)}>{field.label}</InputLabel>}
                {field.description && (
                    <Typography variant="subtitle1" component="div">
                        {field.description}
                    </Typography>
                )}
            </Box>
        ),
        [getFieldKey]
    );

    const renderRow = useCallback(
        (list: Field[], getContent: (field: Field) => ReactNode, isHeaderRow = false) => {
            const buttonBoxProps = isHeaderRow
                ? {
                      visibility: 'hidden',
                      height: '1px',
                  }
                : collapse
                ? {
                      display: 'flex',
                      alignItems: 'center',
                  }
                : {
                      display: 'flex',
                      alignItems: 'flex-start',
                      pt: 0.3,
                  };
            const getKey = (field: Field) => (isHeaderRow ? `${field.name}-header` : field.key);
            return (
                <Box>
                    {fieldIndex !== 0 && collapse && <Divider orientation="horizontal" />}
                    <Box display="flex">
                        <Box flexGrow={1}>
                            {collapse ? (
                                <Stack spacing="xs">
                                    {list.map((field) => (
                                        <Box key={getKey(field)}>{getContent(field)}</Box>
                                    ))}
                                </Stack>
                            ) : layout === 'grid' ? (
                                <Grid container className={gridStyle}>
                                    {list.map((field) => (
                                        <Grid item key={getKey(field)} xs={field.column}>
                                            {getContent(field)}
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <ColumnLayout renderDivider={false}>
                                    {list.map((field) => (
                                        <Column key={getKey(field)}>{getContent(field)}</Column>
                                    ))}
                                </ColumnLayout>
                            )}
                        </Box>
                        {!isReadOnly && (
                            <Box {...buttonBoxProps}>
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
                </Box>
            );
        },
        [isReadOnly, removeLabel, onRemove, layout, collapse, fieldIndex, gridStyle]
    );

    return (
        <>
            {fieldIndex === 0 && !collapse && !displayLablePerItem && renderRow(fields, getHeader, true)}
            {renderRow(editedFields, getBox)}
        </>
    );
};

export default FieldArrayItem;
