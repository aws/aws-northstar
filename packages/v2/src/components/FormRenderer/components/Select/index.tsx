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
import { FC, memo, PropsWithChildren } from 'react';
import SelectComponent from '@cloudscape-design/components/select';
import FormField from '@cloudscape-design/components/form-field';
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import useUniqueId from '../../../../hooks/useUniqueId';
import getErrorText from '../../utils/getErrorText';
import Multiselect from '@cloudscape-design/components/multiselect';
import Autosuggest from '@cloudscape-design/components/autosuggest';

const Select: FC<UseFieldApiConfig> = (props) => {
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

        isMulti,
        isSearchable,

        enteredTextLabel,

        validateOnMount,
        meta: { error, submitFailed },
        showError,

        ...rest
    } = useFieldApi(props);
    const controlId = useUniqueId(input.name);
    const errorText = getErrorText(validateOnMount, submitFailed, showError, error);

    console.log('select', input.value);

    const FormFieldWrapper: FC<PropsWithChildren> = ({ children }) => (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            errorText={errorText}
            constraintText={helperText}
            info={info}
            i18nStrings={i18nStrings}
            stretch={stretch}
            secondaryControl={secondaryControl}
        >
            {children}
        </FormField>
    );

    const baseComponentProps = {
        ...rest,
        ...input,
        controlId,
        disabled: isDisabled,
        ariaRequired: isRequired,
        invalid: !!errorText,
        options: options,
        onBlur: () => input.onBlur(),
        onFocus: () => input.onFocus(),
    };

    if (isMulti) {
        return (
            <FormFieldWrapper>
                <Multiselect
                    {...baseComponentProps}
                    selectedOptions={input.value || []}
                    onChange={({ detail }) => input.onChange(detail.selectedOptions)}
                />
            </FormFieldWrapper>
        );
    }

    if (isSearchable) {
        return (
            <FormFieldWrapper>
                <Autosuggest
                    {...baseComponentProps}
                    enteredTextLabel={enteredTextLabel || ((value) => `Use: "${value}"`)}
                    value={input.value || ''}
                    onChange={({ detail }) => input.onChange(detail.value)}
                />
            </FormFieldWrapper>
        );
    }

    return (
        <FormFieldWrapper>
            <SelectComponent
                {...baseComponentProps}
                selectedOption={input.value}
                onChange={({ detail }) => input.onChange(detail.selectedOption)}
            />
        </FormFieldWrapper>
    );
};

export default memo(Select);
