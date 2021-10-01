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
import React, { memo, useCallback, useMemo } from 'react';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import Table from '../Table';
import FormField from '../FormField';
import useUniqueId from '../../hooks/useUniqueId';
import { getErrorText } from '../FormRenderer/utils/getErrorText';

const TableMapping = (props: UseFieldApiConfig) => {
    const {
        label,
        description,
        items = [],
        columnDefinitions = [],
        isDisabled,
        isReadOnly,
        placeholder,
        input,
        validateOnMount,
        showError,
        getRowId,
        stretch,
        meta: { error, submitFailed },
        sortBy: defaultSortBy,
        ...rest
    } = useFieldApi(props);
    const controlId = useUniqueId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);
    const handleSelectedRowIdsChange = useCallback(
        (selectedIds) => {
            const selectedItems = items.filter((i: any[]) => {
                const id = getRowId?.(i) || i['id'];
                return id && selectedIds.includes(id);
            });
            input.onChange(selectedItems);
        },
        [input]
    );
    const selectedRowIds = useMemo(() => {
        return (input.value && getRowId && input.value.map(getRowId)) || [];
    }, [input.value, getRowId]);

    const sortBy = useMemo(() => {
        if (selectedRowIds?.length > 0) {
            return [
                ...(defaultSortBy || []),
                ...[
                    {
                        id: '_selection_',
                        desc: true,
                    },
                ],
            ];
        }

        return undefined;
    }, [defaultSortBy, selectedRowIds]);

    return (
        <FormField controlId={controlId} errorText={errorText} stretch={stretch}>
            <Table
                tableTitle={label}
                tableDescription={description}
                items={items}
                selectedRowIds={selectedRowIds}
                columnDefinitions={columnDefinitions}
                onSelectedRowIdsChange={handleSelectedRowIdsChange}
                getRowId={getRowId}
                sortBy={sortBy}
                {...rest}
            />
        </FormField>
    );
};

export default memo(TableMapping);
