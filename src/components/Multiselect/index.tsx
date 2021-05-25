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

import React, { useState, SyntheticEvent, useMemo, useEffect, useCallback, FunctionComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import MaterialUIAutocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete';
import Link from '@material-ui/core/Link';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, InputAdornment, Theme } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import Checkbox from '../Checkbox';
import LoadingIndicator from '../LoadingIndicator';
import StatusIndicator from '../StatusIndicator';
import { AriaBaseProps } from '../../props/common';
import { SelectBaseProps, SelectOption } from '../Select';
import Stack from '../../layouts/Stack';
import TokenGroup from '../TokenGroup';
import { getFlattenOptions } from '../../getFlattenOptions';

export interface MultiselectProps extends SelectBaseProps, AriaBaseProps {
    /** The selected values */
    value?: SelectOption[];
    /** Determines how filtering is applied to the list of options */
    filteringType?: 'auto' | 'manual';
    /** The name of the control used in HTML forms. */
    name?: string;
    /**
     * Id of the internal input.
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility.
     * See example in FormField for more details.
     * It defaults to an automatically generated id if not provided.
     * */
    controlId?: string;
    /**
     * Setting this to true will disable any native browser capabilities to
     * automatically correct user input, such as autocorrect and autocapitalize.
     * */
    disableBrowserAutocorrect?: boolean;
    /**
     * Whether to display checkboxes in dropdown options.
     * The default value is false, but we highly recommend to set this to true.
     */
    checkboxes?: boolean;
    /**
     * If `true`, the Multiselect is free solo, meaning that the user input is not bound to provided options.
     */
    freeSolo?: boolean;
    /** Callback fired when the value changes. */
    onChange?: (value: SelectOption[]) => void;
    /** Callback fired when the input value changes. */
    onInputChange?: (e: React.ChangeEvent<{}>, value: string, reason: string) => void;
    /** Callback fired when the popup requests to be opened */
    onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
    /** Callback fired when the popup requests to be closed */
    onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        display: 'inline-block',
        marginRight: '20px',
    },
    recoveryLink: {
        pointerEvents: 'auto',
    },
    textfield: {
        paddingRight: '30px',
    },
}));

/** The multiselect is a normal text input enhanced by a panel of suggested options. */
const Multiselect: FunctionComponent<MultiselectProps> = ({
    options = [],
    value,
    filteringType = 'auto',
    loadingText = 'Loading ...',
    errorText = 'Error fetching',
    recoveryText,
    name,
    controlId = uuidv4(),
    empty,
    disabled,
    placeholder,
    invalid,
    checkboxes = false,
    freeSolo = false,
    ariaRequired = false,
    ariaDescribedby,
    ariaLabelledby,
    onChange,
    onInputChange,
    onRecoveryClick,
    onFocus,
    onBlur,
    disableBrowserAutocorrect = false,
    statusType = 'finished',
}) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState<SelectOption[]>([]);
    const [open, setOpen] = React.useState(false);
    const autoCompleteString: string = useMemo(() => (disableBrowserAutocorrect ? 'off' : 'on'), [
        disableBrowserAutocorrect,
    ]);

    useEffect(() => {
        setInputValue(value || []);
    }, [value, setInputValue]);

    const onRecoveryClickHandler = useCallback(
        (event: SyntheticEvent) => {
            event.preventDefault();
            onRecoveryClick?.(event);
            event.stopPropagation();
        },
        [onRecoveryClick]
    );

    const flattenOptions = useMemo((): SelectOption[] => {
        return getFlattenOptions(options);
    }, [options]);

    const handleOnChange = useCallback(
        (event: React.ChangeEvent<{}>, values: (string | SelectOption)[] | null): void => {
            const valuesAsOptions: SelectOption[] = (values || []).map((value) =>
                typeof value === 'string' ? { value, label: value } : value
            );
            onChange?.(valuesAsOptions);
            setInputValue(valuesAsOptions);
        },
        [onChange, setInputValue]
    );

    const handleOnInput = useCallback(
        (event: React.ChangeEvent<{}>, value: string, reason: string): void => {
            if (filteringType === 'manual') {
                onInputChange?.(event, value, reason);
            }
        },
        [onInputChange, filteringType]
    );

    const loadingAndErrorText = useMemo(
        () => (
            <>
                {statusType === 'loading' && <LoadingIndicator label={loadingText} />}

                {statusType === 'error' && (
                    <StatusIndicator statusType="negative">
                        {errorText}.
                        {recoveryText && (
                            <span>
                                <Link href="#" onClick={onRecoveryClickHandler} className={classes.recoveryLink}>
                                    {recoveryText}
                                </Link>
                            </span>
                        )}
                    </StatusIndicator>
                )}
            </>
        ),
        [statusType, loadingText, errorText, recoveryText, onRecoveryClickHandler, classes]
    );

    const textfield = useCallback(
        (params: AutocompleteRenderInputParams): React.ReactNode => (
            <TextField
                autoCorrect={autoCompleteString}
                placeholder={placeholder}
                required={ariaRequired}
                error={!!(statusType === 'error' || invalid)}
                {...params}
                variant="outlined"
                size="small"
                margin="normal"
                name={name}
                InputProps={{
                    'aria-required': ariaRequired,
                    'aria-describedby': ariaDescribedby,
                    'aria-labelledby': ariaLabelledby,
                    ...params.InputProps,
                    className: classes.textfield,
                    type: 'search',
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />
        ),
        [
            autoCompleteString,
            placeholder,
            statusType,
            name,
            invalid,
            ariaRequired,
            ariaDescribedby,
            ariaLabelledby,
            classes.textfield,
        ]
    );

    const renderOption = useCallback(
        (option: SelectOption): React.ReactNode => {
            if (checkboxes) {
                return (
                    <Checkbox
                        checked={inputValue.map((input) => input.value).includes(option.value)}
                        value={option.value}
                    >
                        {option.label}
                    </Checkbox>
                );
            }

            return option.label;
        },
        [checkboxes, inputValue]
    );

    const handleDeleteOption = useCallback(
        (option) => {
            const tempData = inputValue.filter((o) => o.value !== option.value);
            setInputValue(tempData);
            onChange?.(tempData);
        },
        [inputValue, setInputValue, onChange]
    );

    return (
        <Stack>
            <MaterialUIAutocomplete
                multiple
                disabled={disabled}
                autoHighlight
                popupIcon={null}
                id={controlId}
                freeSolo={freeSolo}
                noOptionsText={empty}
                value={inputValue}
                getOptionSelected={(opt: any, v: any) => opt.value === v.value}
                open={statusType === 'error' || statusType === 'loading' ? true : open}
                options={flattenOptions}
                loadingText={loadingAndErrorText}
                onChange={handleOnChange}
                onInputChange={handleOnInput}
                loading={statusType !== 'finished'}
                renderInput={textfield}
                renderOption={renderOption}
                onBlur={onBlur}
                onFocus={onFocus}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                getOptionLabel={(option) => option.label || ''}
                data-testid="multiselect"
            />
            <TokenGroup items={inputValue || []} onDismiss={handleDeleteOption} />
        </Stack>
    );
};

export default Multiselect;
