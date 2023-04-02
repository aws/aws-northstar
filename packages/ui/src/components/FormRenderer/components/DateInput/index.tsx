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
import DateInputComponent from '@cloudscape-design/components/date-input';
import withDataDrivenFormField, { DataDrivenFormFieldProps } from '../../withDataDrivenFormField';

const DateInput: FC<DataDrivenFormFieldProps> = (props) => {
    return (
        <DateInputComponent
            {...props}
            {...props.input}
            controlId={props.controlId}
            disabled={props.isDisabled}
            readOnly={props.isReadOnly}
            ariaRequired={props.isRequired}
            invalid={!!props.errorText}
            onChange={({ detail }) => props.input.onChange(detail.value)}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
        />
    );
};

export default memo(withDataDrivenFormField(DateInput));
