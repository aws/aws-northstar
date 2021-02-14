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

import React, { useState, SyntheticEvent, useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import MaterialUIAutocomplete from '@material-ui/lab/Autocomplete';
import Link from '@material-ui/core/Link';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, InputAdornment, Theme } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import LoadingIndicator from '../LoadingIndicator';
import StatusIndicator from '../StatusIndicator';
import { AriaBaseProps } from '../../props/common';
import { SelectBaseProps, SelectOption } from '../Select';
import Icon, { IconName } from '../Icon';

export interface AutosuggestProps extends SelectBaseProps, AriaBaseProps {
    /**
     * Text entered into the form element
     * */
    value?: SelectOption;
    /**
     * Determines how filtering is applied to the list of options
     * */
    filteringType?: 'auto' | 'manual';
    /**
     * The name of the control used in HTML forms.
     * */
    name?: string;
    /**
     * Id of the internal input.<br/>
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility. <br/>
     * See example in <a href='/#/Components/FormField'>FormField</a> for more details. </a>
     * It defaults to an automatically generated id if not provided.
     * */
    controlId?: string;
    /**
     * Setting this to true will disable any native browser capabilities to
     * automatically correct user input, such as autocorrect and autocapitalize.
     * */
    disableBrowserAutocorrect?: boolean;
    /**
     * If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
     */
    freeSolo?: boolean;
    /**
     * If `true`, the input can't be cleared.
     */
    disableClearable?: boolean;
    /**
     * Define the Icon to be used for the text input
     */
    icon?: false | IconName;
    /**
     * Callback fired when the value changes.
     * */
    onChange?: (value: SelectOption | null) => void;
    /**
     * Callback fired when the input value changes.
     * */
    onInputChange?: (e: React.ChangeEvent<{}>, value: string, reason: string) => void;
    /**
     * Callback fired when the popup requests to be opened
     * */
    onFocus?: (event: React.ChangeEvent<{}>) => void;
    /**
     * Callback fired when the popup requests to be closed
     * */
    onBlur?: (event: React.ChangeEvent<{}>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        display: 'inline-block',
        marginRight: '20px',
    },
    recoveryLink: {
        pointerEvents: 'auto',
    },
    muiAutocompleteOverride: {
        paddingRight: '30px !important',
    },
}));

/**
 * An autosuggest control is a normal text input enhanced by a panel of suggested options.
 * */
export default function Autosuggest({
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
    ariaRequired = false,
    freeSolo = false,
    disableClearable = false,
    icon = undefined,
    ariaDescribedby,
    ariaLabelledby,
    onChange = () => {},
    onInputChange = () => {},
    onFocus = () => {},
    onBlur = () => {},
    onRecoveryClick = () => {},
    disableBrowserAutocorrect = false,
    statusType = 'finished',
}: AutosuggestProps) {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState<SelectOption | null>(value || null);
    const [open, setOpen] = React.useState(false);
    const autoCompleteString: string = disableBrowserAutocorrect ? 'off' : 'on';

    const onRecoveryClickHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        onRecoveryClick(event);
        event.stopPropagation();
    };

    const flattenOptions = useMemo((): SelectOption[] => {
        const optionArray: SelectOption[] = [];
        options.forEach((option) => {
            if (option.options) {
                option.options.map((o) => {
                    optionArray.push({ label: o.label || o.value, value: o.value, group: option.label });
                });
            } else {
                optionArray.push({ label: option.label || option.value, value: option.value });
            }
        });

        return optionArray;
    }, [options]);

    const handleOnChange = (event: React.ChangeEvent<{}>, value: SelectOption | null): void => {
        onChange(value);
        setInputValue(value);
    };

    const handleOnInput = (event: React.ChangeEvent<{}>, value: string, reason: string): void => {
        if (filteringType === 'manual') {
            onInputChange(event, value, reason);
        }
    };

    const loadingAndErrorText = (
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
    );

    const textfield = (params: any): React.ReactNode => (
        <TextField
            autoCorrect={autoCompleteString}
            placeholder={placeholder}
            required={ariaRequired}
            error={statusType === 'error' || invalid ? true : false}
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
                type: 'search',
                startAdornment: (
                    <InputAdornment position="start">
                        {icon === undefined && <SearchIcon color="action" />}
                        {icon && <Icon name={icon} color="action" />}
                    </InputAdornment>
                ),
            }}
        />
    );

    return (
        <div>
            <MaterialUIAutocomplete
                data-testid="autosuggest"
                disabled={disabled}
                autoHighlight
                popupIcon={null}
                freeSolo={freeSolo}
                disableClearable={disableClearable}
                open={statusType === 'error' || statusType === 'loading' ? true : open}
                id={controlId}
                value={inputValue}
                noOptionsText={empty}
                options={flattenOptions}
                groupBy={(option) => option.group || ''}
                loadingText={loadingAndErrorText}
                onChange={handleOnChange}
                onInputChange={handleOnInput}
                onOpen={(e) => {
                    setOpen(true);
                    onFocus(e);
                }}
                onClose={(e) => {
                    setOpen(false);
                    onBlur(e);
                }}
                loading={statusType !== 'finished'}
                getOptionLabel={(option) => option.label || ''}
                renderInput={textfield}
                classes={{ inputRoot: classes.muiAutocompleteOverride }}
            />
        </div>
    );
}
