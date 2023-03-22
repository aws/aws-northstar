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
import { FC, memo } from 'react';
import CheckboxComponent from '@cloudscape-design/components/checkbox';
import FormField from '@cloudscape-design/components/form-field';
import SpaceBetween from '@cloudscape-design/components/space-between';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import { FieldInputProps } from 'react-final-form';
import useUniqueId from '../../../../hooks/useUniqueId';
import getErrorText from '../../utils/getErrorText';
import { Option } from '../../types';

interface CheckboxMappingProps {
    input: FieldInputProps<any, HTMLInputElement>;
    option: Option;
    value?: Option['value'][];
    isDisabled?: boolean;
}

const CheckboxMapping: FC<CheckboxMappingProps> = ({ input, option, isDisabled, ...rest }) => {
    return (
        <CheckboxComponent
            disabled={isDisabled}
            {...input}
            {...option}
            checked={(input.value || []).includes(option.value)}
            controlId={`${input.name}-${option.value}`}
            onBlur={() => input.onBlur()}
            onFocus={() => input.onFocus()}
            onChange={({ detail }) => {
                if (detail.checked) {
                    input.onChange([...input.value, option.value]);
                } else {
                    const newValue = (input.value || []).filter((v: string) => v !== option.value);
                    input.onChange(newValue);
                }
            }}
            data-testid={rest['data-testid'] ? `${rest['data-testid']}-${option.value}` : undefined}
        >
            {option.label}
        </CheckboxComponent>
    );
};

const Checkbox: FC<UseFieldApiConfig> = ({ component, ...props }) => {
    const {
        label,
        description,
        helperText,
        info,
        i18nStrings,
        stretch,
        secondaryControl,

        options,
        input,
        isRequired,
        isDisabled,
        isReadOnly,

        validateOnMount,
        meta: { error, submitFailed },
        showError,

        ...rest
    } = useFieldApi(props);
    const controlId = useUniqueId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);
    if (options?.length > 0) {
        return (
            <FormField
                label={label}
                description={description}
                errorText={errorText}
                constraintText={helperText}
                info={info}
                i18nStrings={i18nStrings}
                stretch={stretch}
                secondaryControl={secondaryControl}
            >
                <SpaceBetween direction="vertical" size="xs">
                    {options.map((option: Option) => (
                        <CheckboxMapping
                            isDisabled={isDisabled}
                            {...rest}
                            input={input}
                            option={option}
                            key={option.value}
                        />
                    ))}
                </SpaceBetween>
            </FormField>
        );
    }

    return (
        <FormField
            controlId={controlId}
            errorText={errorText}
            constraintText={helperText}
            i18nStrings={i18nStrings}
            stretch={stretch}
            secondaryControl={secondaryControl}
        >
            <CheckboxComponent
                {...rest}
                {...input}
                controlId={controlId}
                name={input.name}
                disabled={isDisabled}
                checked={input.value || false}
                description={description}
                onBlur={() => input.onBlur()}
                onFocus={() => input.onFocus()}
                onChange={({ detail }) => input.onChange(detail.checked)}
            >
                {label}
            </CheckboxComponent>
        </FormField>
    );
};

export default memo(Checkbox);
