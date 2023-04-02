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
import DatePickerComponent from '@cloudscape-design/components/date-picker';
import withDataDrivenFormField, { DataDrivenFormFieldProps } from '../../withDataDrivenFormField';

const DatePicker: FC<DataDrivenFormFieldProps> = (props) => {
    const { input, onBlur, onFocus, ...rest } = props;
    return (
        <DatePickerComponent
            openCalendarAriaLabel={(selectedDate: string | null) =>
                selectedDate ? `, selected date is ${selectedDate}` : 'Choose date'
            }
            nextMonthAriaLabel="Next month"
            previousMonthAriaLabel="Previous month"
            todayAriaLabel="Today"
            {...rest}
            {...input}
            onChange={({ detail }) => input.onChange(detail.value)}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    );
};

export default memo(withDataDrivenFormField(DatePicker));
