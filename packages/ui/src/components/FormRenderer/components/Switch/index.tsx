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
import Toggle from '@cloudscape-design/components/toggle';
import withDataDrivenFormField, { DataDrivenFormFieldProps } from '../../withDataDrivenFormField';

const Switch: FC<DataDrivenFormFieldProps> = (props) => {
    const { label, description, input, onBlur, onFocus, ...rest } = props;

    return (
        <Toggle
            {...rest}
            {...input}
            description={description}
            checked={input.value || false}
            onChange={({ detail }) => input.onChange(detail.checked)}
            onBlur={onBlur}
            onFocus={onFocus}
        >
            {label}
        </Toggle>
    );
};

export default memo(withDataDrivenFormField(Switch));
