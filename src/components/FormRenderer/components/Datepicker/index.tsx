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
import { v4 as uuidv4 } from 'uuid';
import FormField from '../../../FormField';
import Datepicker from '../../../DatePicker';

const DatepickerMapping: FunctionComponent<UseFieldApiConfig> = (props) => {
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
        meta: { error, submitFailed },
    } = useFieldApi(props);
    const controlId = input.name || uuidv4();
    const errorText = ((validateOnMount || submitFailed || showError) && error) || '';
    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            hintText={helperText}
            errorText={errorText}
            stretch={stretch}
        >
            <Datepicker
                {...input}
                placeholder={placeholder}
                controlId={controlId}
                disabled={isDisabled}
                required={isRequired}
                readOnly={isReadOnly}
                invalid={!!errorText}
            />
        </FormField>
    );
};

export default DatepickerMapping;
