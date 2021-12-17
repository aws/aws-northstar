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
import FormField from '../../../FormField';
import RadioGroup, { RadioButton } from '../../../RadioGroup';
import useUniqueId from '../../../../hooks/useUniqueId';
import { getErrorText } from '../../utils/getErrorText';

interface RadioButtonMappingProps {
    option: Option;
    name: string;
    description?: string;
}

const RadioButtonMapping: FunctionComponent<RadioButtonMappingProps> = ({ option, name, description, ...rest }) => {
    const { input } = useFieldApi({ description, name, type: 'radio', value: option.value });
    return (
        <RadioButton
            {...input}
            value={option.value}
            name={name}
            description={description}
            data-testid={rest['data-testid']}
        >
            {option.label}
        </RadioButton>
    );
};

const RadioGroupMapping: FunctionComponent<UseFieldApiConfig> = (props) => {
    const {
        label,
        description,
        helperText,
        input,
        options,
        validateOnMount,
        stretch,
        showError,
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
        >
            <RadioGroup
                {...rest}
                {...input}
                items={options.map((option: Option) => (
                    <RadioButtonMapping
                        option={option}
                        name={input.name}
                        description={option.description}
                        key={option.value}
                        data-testid={rest['data-testid'] ? `${rest['data-testid']}-${option.value}` : undefined}
                    />
                ))}
            />
        </FormField>
    );
};

export default RadioGroupMapping;
