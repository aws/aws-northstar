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
import React, { FunctionComponent, memo, useCallback, useMemo } from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import Table from '../../../Table';
import FormField from '../../../FormField';

const TableMapping = (props: any) => {
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
        ...rest
    } = useFieldApi(props);
    const controlId = input.name || uuidv4();
    const errorText = ((validateOnMount || submitFailed || showError) && error) || '';
    const handleSelectionChange = useCallback(
        (selectedItems: any[]) => {
            input.onChange(selectedItems);
        },
        [input]
    );
    const selectedRowIds = useMemo(() => {
        if (getRowId && input.value) {
            return input.value.map(getRowId);
        }
        return [];
    }, [input.value, getRowId]);
    return (
        <FormField controlId={controlId} errorText={errorText} stretch={stretch}>
            <Table
                tableTitle={label}
                tableDescription={description}
                items={items}
                selectedRowIds={selectedRowIds}
                columnDefinitions={columnDefinitions}
                onSelectionChange={handleSelectionChange}
                getRowId={getRowId}
                {...rest}
            />
        </FormField>
    );
};

export default memo(TableMapping);
