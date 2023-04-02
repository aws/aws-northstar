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
import { FC, memo, useMemo, useCallback } from 'react';
import DateRangePickerComponent, { DateRangePickerProps } from '@cloudscape-design/components/date-range-picker';
import withDataDrivenFormField, { DataDrivenFormFieldProps } from '../../withDataDrivenFormField';

const DEFAULT_RELATIVE_OPTIONS: DateRangePickerProps.RelativeOption[] = [
    {
        key: 'previous-5-minutes',
        amount: 5,
        unit: 'minute',
        type: 'relative',
    },
    {
        key: 'previous-30-minutes',
        amount: 30,
        unit: 'minute',
        type: 'relative',
    },
    {
        key: 'previous-1-hour',
        amount: 1,
        unit: 'hour',
        type: 'relative',
    },
    {
        key: 'previous-6-hours',
        amount: 6,
        unit: 'hour',
        type: 'relative',
    },
];

const DEFAULT_RESOURCE_STRINGS: DateRangePickerProps.I18nStrings = {
    todayAriaLabel: 'Today',
    nextMonthAriaLabel: 'Next month',
    previousMonthAriaLabel: 'Previous month',
    customRelativeRangeDurationLabel: 'Duration',
    customRelativeRangeDurationPlaceholder: 'Enter duration',
    customRelativeRangeOptionLabel: 'Custom range',
    customRelativeRangeOptionDescription: 'Set a custom range in the past',
    customRelativeRangeUnitLabel: 'Unit of time',
    formatRelativeRange: (e: any) => {
        const n = 1 === e.amount ? e.unit : `${e.unit}s`;
        return `Last ${e.amount} ${n}`;
    },
    formatUnit: (e: any, n: number) => (1 === n ? e : `${e}s`),
    dateTimeConstraintText: 'For date, use YYYY/MM/DD. For time, use 24 hr format.',
    relativeModeTitle: 'Relative range',
    absoluteModeTitle: 'Absolute range',
    relativeRangeSelectionHeading: 'Choose a range',
    startDateLabel: 'Start date',
    endDateLabel: 'End date',
    startTimeLabel: 'Start time',
    endTimeLabel: 'End time',
    clearButtonLabel: 'Clear and dismiss',
    cancelButtonLabel: 'Cancel',
    applyButtonLabel: 'Apply',
};

const DEFAULT_PLACEHOLDER = 'Filter by a date and time range';

const DateRangePicker: FC<DataDrivenFormFieldProps> = (props) => {
    const resourceStrings = useMemo(() => {
        return {
            ...DEFAULT_RESOURCE_STRINGS,
            ...props.i18nStrings,
        };
    }, [props.i18nStrings]);

    const isValidRange: DateRangePickerProps.ValidationFunction = useCallback(
        (range: DateRangePickerProps.Value | null) => {
            if (!range) {
                return {
                    valid: false,
                    errorMessage: 'Choose a date range',
                };
            }

            if (range.type === 'absolute') {
                const [startDateWithoutTime] = range.startDate.split('T');
                const [endDateWithoutTime] = range.endDate.split('T');
                if (!startDateWithoutTime || !endDateWithoutTime) {
                    return {
                        valid: false,
                        errorMessage:
                            'The selected date range is incomplete. Select a start and end date for the date range.',
                    };
                }
                if (new Date(range.startDate).getTime() - new Date(range.endDate).getTime() > 0) {
                    return {
                        valid: false,
                        errorMessage: 'The selected date range is invalid. The start date must be before the end date.',
                    };
                }
            }

            return { valid: true };
        },
        []
    );

    return (
        <DateRangePickerComponent
            relativeOptions={DEFAULT_RELATIVE_OPTIONS}
            isValidRange={isValidRange}
            placeholder={DEFAULT_PLACEHOLDER}
            {...props}
            {...props.input}
            controlId={props.controlId}
            disabled={props.isDisabled}
            readOnly={props.isReadOnly}
            invalid={!!props.errorText}
            i18nStrings={resourceStrings}
            onChange={({ detail }) => props.input.onChange(detail.value)}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
        />
    );
};

export default memo(withDataDrivenFormField(DateRangePicker));
