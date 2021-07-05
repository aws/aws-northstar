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
import { Option } from '../../types';
import Checkbox from '../../../Checkbox';
import FormField from '../../../FormField';
import Stack from '../../../../layouts/Stack';
import { getControlId } from '../../getContolId';
import { getErrorText } from '../../getErrorText';

interface CheckboxMappingProps {
    option: Option;
    name: string;
}

const CheckboxMapping: FunctionComponent<CheckboxMappingProps> = ({ option, name }) => {
    const { input } = useFieldApi({ name, type: 'checkbox', value: option.value });
    return (
        <Checkbox {...input} key={option.value} value={option.value} name={name} disabled={option.disabled}>
            {option.label}
        </Checkbox>
    );
};

const CheckboxGroupMapping: FunctionComponent<UseFieldApiConfig> = (props) => {
    const {
        label,
        description,
        helperText,
        isDisabled,
        input,
        options,
        validateOnMount,
        stretch,
        showError,
        meta: { error, submitFailed },
    } = useFieldApi(props);
    const controlId = getControlId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);
    if (options?.length > 0) {
        return (
            <FormField
                controlId={controlId}
                label={label}
                description={description}
                hintText={helperText}
                errorText={errorText}
                stretch={stretch}
            >
                <Stack spacing="xs">
                    {options.map((option: Option) => (
                        <CheckboxMapping option={option} name={controlId} key={option.value} />
                    ))}
                </Stack>
            </FormField>
        );
    } else {
        return (
            <FormField controlId={controlId} errorText={errorText} stretch={stretch}>
                <Checkbox
                    {...input}
                    name={controlId}
                    controlId={controlId}
                    disabled={isDisabled}
                    description={description}
                >
                    {label}
                </Checkbox>
            </FormField>
        );
    }
};

export default CheckboxGroupMapping;
