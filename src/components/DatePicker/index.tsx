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

import React from 'react';
import 'date-fns';
import { FunctionComponent, useState } from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker as MaterialKeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';

export interface DatePickerProps {
    /**
     * The current input value. This should be provided in YYYY-MM-DD format.
     * */
    value?: string;
    /**
     * Placeholder text rendered when the value is an empty string.
     * */
    placeholder?: string;
    /**
     * A function that defines whether a particular date should be enabled in the calendar or not. <br/>
     * Note that <b>disabling a date in the calendar still allows users to enter this date via keyboard</b>. <br/>
     * We therefore recommend that you also validate these constraints client- and server-side, in the
     * same way as for other form elements.
     * */
    isDateDisabled?: (date: any) => boolean;
    /**
     * The locale to be used for rendering month names and defining the starting date of the week. <br/>
     * If not provided, it will be determined from the page and browser locales. <br/>
     * Supported values and formats are as-per the JavaScript Intl API specification.
     * */
    locale?: Locales;
    /**
     * By default the starting day of the week is defined by the locale, but you can override it using this property. <br/>
     * [0-6] maps to [Sunday-Saturday]
     * */
    startOfWeek?: number;
    /**
     * Used as part of the aria label for today's date in the calendar.
     * */
    todayLabel?: string;
    /**
     * An aria label for the 'next month' button.
     * */
    nextMonthLabel?: string;
    /**
     * An aria label for the 'previous month' button.
     * */
    previousMonthLabel?: string;
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
     * Overrides invalidation state. */
    invalid?: boolean;
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
     * Fires when the date changes.
     * */
    onChange?: (e?: any) => void;
}

const localeMap = {
    en: enLocale,
    fr: frLocale,
    ru: ruLocale,
};

type Locales = 'en' | 'fr' | 'ru';

/**
 * A date picker control provide a simple way to select a date from calendar.
 **/
const DatePicker: FunctionComponent<DatePickerProps> = ({
    placeholder = 'YYYY/MM/DD',
    locale = 'en',
    disabled = false,
    isDateDisabled = (_) => false,
    onChange = () => {},
    value,
    name,
    readOnly,
    ...props
}: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState(value || null);

    const handleDateChange = (date?: any) => {
        setSelectedDate(date);
        onChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap[locale]}>
            <MaterialKeyboardDatePicker
                id={props.controlId}
                PopoverProps={{
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'left',
                    },
                }}
                variant="inline"
                inputVariant="outlined"
                disableToolbar={true}
                name={name}
                readOnly={readOnly}
                value={selectedDate}
                disabled={disabled}
                placeholder={placeholder}
                onChange={(date) => handleDateChange(date)}
                format="yyyy/MM/dd"
                shouldDisableDate={isDateDisabled}
                inputProps={{
                    'aria-label': props.label,
                    'aria-labelledby': props.ariaLabelledby,
                    'aria-describedby': props.ariaDescribedby,
                    'aria-required': props.ariaRequired,
                }}
            />
        </MuiPickersUtilsProvider>
    );
};

export default DatePicker;
