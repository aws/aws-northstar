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
import React, { FunctionComponent, useState } from 'react';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export interface TimePickerProps {
    /**
     * The current input value as a date. Only the time part of the date is relevant
     * */
    value?: Date;
    /**
     * Placeholder text rendered when the value is an empty string.
     * */
    placeholder?: string;
    /**
     * Whether to use a 24h clock or one with AM/PM. Default is AM/PM.
     */
    twentyFourHourClock?: boolean;
    /**
     * The name of the control used in HTML forms.
     * */
    name?: string;
    /**
     * Specifies that the input should be disabled, preventing the user from modifying the value
     * and preventing the value from being included in a form submission.
     * */
    disabled?: boolean;
    /**
     * Specifies that the input should be readonly, preventing the user from modifying the value but including it in a form submission. <br/>
     * A readonly input can receive focus.
     * Do not use readonly inputs outside of a form.
     * */
    readOnly?: boolean;
    /**
     * Allows you to indicate that the control is to be focused as soon as the load event triggers,
     *  allowing the user to just start typing without having to manually focus the input.
     * Don't use this option in pages that allow for the field to be scrolled out of the viewport.
     * */
    autofocus?: boolean;
    /**
     * Id of the internal input.<br/>
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility.
     * See example in <a href='/#/Components/FormField'>FormField</a> for more details.
     * */
    controlId?: string;
    /**
     * Adds an aria-label on the native input.
     * */
    label?: string;
    /**
     * Adds aria-labelledby on the native input. <br/>
     * Use this only with form fields that contain multiple controls under the same label.<br/>
     * Define a custom id inside the label.<br/>
     * Refer to that label from every single control under that label using this property.
     * */
    ariaLabelledby?: string;
    /**
     * Adds aria-describedby on the native input. <br/>
     * Use this only with form fields that contain multiple controls under the same label. <br/>
     * Define custom ids inside the description, hint and error text. <br/>
     * Refer to these from every single control under that label using this property.<br/>
     * Refer to any other hint/description text that you provide.
     * */
    ariaDescribedby?: string;
    /**
     * Adds aria-required on the native input
     * */
    ariaRequired?: boolean;
    /**
     * Fires when the time changes.
     * */
    onChange?: (e?: Date) => void;
}

/**
 * A time picker control provides a simple way to select a time of day. Time is represented by an ISO 8601 date string,
 * where the date part can be ignored.
 */
const TimePicker: FunctionComponent<TimePickerProps> = ({
    value,
    placeholder = 'HH:MM',
    twentyFourHourClock,
    name,
    disabled,
    readOnly,
    autofocus,
    controlId,
    label,
    ariaLabelledby,
    ariaDescribedby,
    ariaRequired,
    onChange = () => {},
}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

    const handleDateChange = (date?: any) => {
        onChange(date);
        setSelectedDate(date || null);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                id={controlId}
                PopoverProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                }}
                variant="inline"
                inputVariant="outlined"
                disableToolbar={false}
                ampm={!twentyFourHourClock}
                name={name}
                readOnly={readOnly}
                value={selectedDate}
                disabled={disabled}
                placeholder={placeholder}
                autoFocus={autofocus}
                onChange={handleDateChange}
                inputProps={{
                    'aria-label': label,
                    'aria-labelledby': ariaLabelledby,
                    'aria-describedby': ariaDescribedby,
                    'aria-required': ariaRequired,
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default TimePicker;
