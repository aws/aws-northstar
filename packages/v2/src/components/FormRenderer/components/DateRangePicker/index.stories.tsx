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
import { ComponentMeta } from '@storybook/react';
import { DateRangePickerProps } from '@cloudscape-design/components/date-range-picker';
import FormRenderer, { componentTypes, validatorTypes } from '../..';
import { Template, DEFAULT_ARGS } from '../../index.stories';

export default {
    ...DEFAULT_ARGS,
    title: 'Components/FormRenderer/DateRangePicker',
} as ComponentMeta<typeof FormRenderer>;

export const Default = Template.bind({});
Default.args = {
    schema: {
        header: (
            <>
                Data driven form with{' '}
                <a target="_blank" href="https://cloudscape.design/components/date-range-picker" rel="noreferrer">
                    Date Range Picker
                </a>
            </>
        ),
        description: 'Define your form in JSON format',
        fields: [
            {
                component: componentTypes.DATA_RANGE_PICKER,
                name: 'dateRange',
                label: 'Date Range',
                description: 'This is description',
                helperText: 'This is helper text',
                placeholder: 'Filter by a date and time range',
                'data-testid': 'testId',
                relativeOptions: [
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
                ],
                isValidRange: (range: DateRangePickerProps.Value) => {
                    if (!range) {
                        return {
                            valid: false,
                            message: 'Null',
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
                                errorMessage:
                                    'The selected date range is invalid. The start date must be before the end date.',
                            };
                        }
                    }

                    return { valid: true };
                },
                i18nStrings: {
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
                    dateTimeConstraintText:
                        'Range is 6 to 30 days. For date, use YYYY/MM/DD. For time, use 24 hr format.',
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
                },
                validate: [
                    {
                        type: validatorTypes.REQUIRED,
                    },
                ],
            },
        ],
    },
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
    ...Default.args,
    initialValues: {
        dateRange: {
            amount: 5,
            key: 'previous-5-minutes',
            type: 'relative',
            unit: 'minute',
        },
    },
};
