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
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { v4 as uuidv4 } from 'uuid';
import FormField from '../../../FormField';
import TimePicker from '../../../TimePicker';

const TimePickerMapping: FunctionComponent = (props: any) => {
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
    // Coerce value (ISO 8601 string) to Date. Handle invalid dates by setting to undefined
    const dateValue = new Date(input.value);
    const value = dateValue.toString() !== 'Invalid Date' ? dateValue : undefined;
    return (
        <FormField
            controlId={controlId}
            label={label}
            description={description}
            hintText={helperText}
            errorText={errorText}
            stretch={stretch}
        >
            <TimePicker
                {...input}
                value={value}
                onChange={(date?: Date) => {
                    // Coerce to a string for the formrenderer onChange event. Wrap in try catch in case user inputs invalid
                    // time, eg 99:99.
                    try {
                        input.onChange(date?.toISOString());
                    } catch (e) {
                        input.onChange(undefined);
                    }
                }}
                placeholder={placeholder}
                controlId={controlId}
                disabled={isDisabled}
                required={isRequired}
                readonly={isReadOnly}
            />
        </FormField>
    );
};

export default TimePickerMapping;
