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
import SpaceBetween from '@cloudscape-design/components/space-between';
import { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import { Option } from '../../types';
import withDataDrivenFormField, { DataDrivenFormFieldProps } from '../../hoc/withDataDrivenFormField';

interface CheckboxMappingProps extends DataDrivenFormFieldProps {
    option: Option;
    value?: Option['value'][];
    isDisabled?: boolean;
}

const CheckboxMapping: FC<CheckboxMappingProps> = ({ input, option, isDisabled, onBlur, onFocus, ...rest }) => {
    return (
        <CheckboxComponent
            disabled={isDisabled}
            {...input}
            {...option}
            checked={(input.value || []).includes(option.value)}
            controlId={`${input.name}-${option.value}`}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={({ detail }) => {
                const newValue = detail.checked
                    ? [...input.value, option.value]
                    : (input.value || []).filter((v: string) => v !== option.value);
                input.onChange(newValue);
            }}
            data-testid={rest['data-testid'] ? `${rest['data-testid']}-${option.value}` : undefined}
        >
            {option.label}
        </CheckboxComponent>
    );
};

const MultipleCheckbox: FC<DataDrivenFormFieldProps> = (props) => {
    const { options, input, ...rest } = props;
    return (
        <SpaceBetween direction="vertical" size="xs">
            {options.map((option: Option) => (
                <CheckboxMapping {...rest} input={input} option={option} key={option.value} />
            ))}
        </SpaceBetween>
    );
};

const WrappedMultipleCheckbox = memo(withDataDrivenFormField(MultipleCheckbox));

const SingleCheckbox: FC<DataDrivenFormFieldProps> = (props) => {
    const { options, input, label, onBlur, onFocus, ...rest } = props;
    return (
        <CheckboxComponent
            {...rest}
            {...input}
            name={input.name}
            checked={input.value || false}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={({ detail }) => input.onChange(detail.checked)}
        >
            {label}
        </CheckboxComponent>
    );
};

const WrappedSingleCheckbox = memo(withDataDrivenFormField(SingleCheckbox, true, ['label', 'description', 'info']));

const Checkbox: FC<UseFieldApiConfig> = ({ component, ...props }) => {
    return props.options?.length > 0 ? <WrappedMultipleCheckbox {...props} /> : <WrappedSingleCheckbox {...props} />;
};

export default memo(Checkbox);
