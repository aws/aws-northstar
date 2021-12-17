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
import React, { FunctionComponent } from 'react';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import TreeView from '../../../TreeView';
import FormField from '../../../FormField';
import useUniqueId from '../../../../hooks/useUniqueId';
import { getErrorText } from '../../utils/getErrorText';

const TreeViewMapping: FunctionComponent<UseFieldApiConfig> = (props) => {
    const {
        label,
        description,
        helperText,
        isReadOnly,
        input,
        validateOnMount,
        stretch,
        showError,
        meta: { error, submitFailed },
        multiSelect, // from TreeView
        treeItems, // from TreeView
        onNodeToggle, // from TreeView
        defaultExpanded, // from TreeView
        ...rest
    } = useFieldApi(props);

    const controlId = useUniqueId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);
    input.readOnly = isReadOnly;

    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            hintText={helperText}
            errorText={errorText}
            stretch={stretch}
        >
            <TreeView
                {...rest}
                root={treeItems}
                multiSelect={multiSelect}
                defaultSelected={input.value || []}
                defaultExpanded={defaultExpanded}
                onNodeSelect={(_: React.ChangeEvent<{}>, nodeIds: string[]) => input.onChange(nodeIds || [])}
                onNodeToggle={onNodeToggle}
            />
        </FormField>
    );
};

export default TreeViewMapping;
