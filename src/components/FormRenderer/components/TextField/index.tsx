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
import React, { FunctionComponent, memo } from 'react';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import Input, { InputProps } from '../../../Input';
import FormField from '../../../FormField';
import useUniqueId from '../../../../hooks/useUniqueId';
import { getErrorText } from '../../utils/getErrorText';

const TextFieldMapping: FunctionComponent<UseFieldApiConfig> = (props) => {
    const {
        label,
        description,
        helperText,
        isRequired,
        isDisabled,
        isReadOnly,
        placeholder,
        input,
        validateOnMount,
        stretch,
        showError,
        secondaryControl,
        meta: { error, submitFailed },
        ...rest
    } = useFieldApi(props);
    const controlId = useUniqueId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);

    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            hintText={helperText}
            errorText={errorText}
            stretch={stretch}
            secondaryControl={secondaryControl}
        >
            <Input
                {...rest}
                {...input}
                type={input.type as InputProps['type']}
                placeholder={placeholder}
                controlId={controlId}
                disabled={isDisabled}
                required={isRequired}
                readonly={isReadOnly}
                invalid={!!errorText}
            />
        </FormField>
    );
};

export default memo(TextFieldMapping);
