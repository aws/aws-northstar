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

import React, { FunctionComponent, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import {
    makeStyles,
    Link as MuiLink,
    Select as MuiSelect,
    SelectProps as MuiSelectProps,
    MenuItem,
    ListSubheader,
    Theme,
} from '@material-ui/core';
import LoadingIndicator from '../LoadingIndicator';
import StatusIndicator from '../StatusIndicator';
import { ButtonIcon, ButtonIconType } from '../Button';
import { AriaBaseProps } from '../../props/common';
export type StatusType = 'loading' | 'error' | 'finished';

export interface SelectBaseProps {
    /**
     * Array of objects, each can represent a simple option with the following properties: <br/>
     * - <b>label (string)</b> a short title shown in the select to describe this item. <br/>
     * - <b>value (string)</b> the value of the item (not shown to the user). <br/>
     * - <b>disabled: (boolean)</b> whether this item is disabled. <br/>
     * - <b>iconName (string)</b> the name of the icon. <br/>
     * <br/>
     * Options can be grouped by specifying the given option as a group of options: <br/>
     * - <b>label (string)</b> description of the group. <br/>
     * - <b>options (array)</b> array of simple options. <br/>
     * - <b>disabled (boolean)</b> whether the whole group is disabled. <br/>
     */
    options?: SelectOption[];
    /**
     * Specifies the current status of data fetching: <br/>
     * - loading: data fetching is in progress. <br/>
     * - error: an error occurred during fetch. You should provide user an option to recover, see examples for more details.
     * - finished: data fetched
     */
    statusType?: StatusType;
    /** Adds aria-label on the select. */
    label?: string;
    /** Text to be displayed when options is an empty list */
    empty?: string;
    /** Whether the whole select should be disabled. */
    disabled?: boolean;
    /** Hint text displayed in the field when no option has been selected. */
    placeholder?: string;
    /** Text to be displayed when in loading state. */
    loadingText?: string;
    /** Text to be displayed in case of a data fetching error. Make sure to also provide the recoveryText and onRecoveryClick. */
    errorText?: string;
    /** Text for the recovery button. Displayed next to the error text. Use the recoveryClick event to do a recovery action, for example, retrying the request. */
    recoveryText?: string;
    /**
     * Id of the internal input.
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility.
     * See example in FormField for more details.
     * It defaults to an automatically generated id if not provided.
     * */
    controlId?: string;
    /** Shows that there is an error with the select */
    invalid?: boolean;
    /**
     * Fired when the user clicks the recovery button placed at the bottom of the dropdown list in the error state.
     * Use this to retry a failed request or provide another option for the user to recover from the error.
     */
    onRecoveryClick?: (event: React.SyntheticEvent) => void;
}

export interface SelectProps extends SelectBaseProps, AriaBaseProps {
    /** Currently selected option. Id is used to match which option will be selected */
    selectedOption?: SelectOption;
    /** Fired whenever the user selects an option. The event detail contains the current selectedId and selectedOption. */
    onChange?: MuiSelectProps['onChange'];
    /** Fired when the select is opened. */
    onFocus?: MuiSelectProps['onOpen'];
    /** Fired when input focus is removed from the UI control. */
    onBlur?: MuiSelectProps['onClose'];
}

export interface SelectOption {
    label?: string;
    value?: string;
    disabled?: boolean;
    iconName?: ButtonIconType;
    group?: string;
    options?: SelectOption[];
}

const useStyles = makeStyles((theme: Theme) => ({
    iconMenuItem: {
        marginRight: theme.spacing(0.4),
    },
    groupMenuItem: {
        paddingLeft: theme.spacing(3),
    },
    subheaderMenuItem: {
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'none',
    },
    recoveryLink: {
        pointerEvents: 'auto',
    },
    errorText: {
        marginRight: theme.spacing(0.4),
    },
    placeholder: {
        display: 'none',
    },
}));

const renderOptions = (
    options: SelectOption[],
    classes: { [key: string]: string },
    disabled = false,
    groupItem = false
): any => {
    return options.map((option: SelectOption) => {
        if (option.options) {
            return [
                <ListSubheader key={option.label}>{option.label}</ListSubheader>,
                ...renderOptions(option.options, classes, option.disabled, true),
            ];
        } else {
            return (
                <MenuItem
                    key={option.value || option.label}
                    value={option.value}
                    disabled={option.disabled || disabled}
                    className={clsx(groupItem && classes.groupMenuItem)}
                >
                    {option.iconName && (
                        <span className={classes.iconMenuItem}>
                            <ButtonIcon type={option.iconName} />
                        </span>
                    )}
                    {option.label}
                </MenuItem>
            );
        }
    });
};

const muiSelectProps = ({
    ariaDescribedby,
    ariaLabelledby,
    ariaRequired,
    controlId,
    disabled,
    invalid,
    label,
    onBlur,
    onChange,
    onFocus,
    selectedOption = { value: '' },
}: SelectProps): MuiSelectProps => {
    const muiSelectProps: MuiSelectProps = {
        disabled,
        error: invalid,
        id: controlId,
        onChange,
        onClose: onBlur,
        onOpen: onFocus,
        value: selectedOption.value,
    };

    if (ariaLabelledby) {
        muiSelectProps['aria-labelledby'] = ariaLabelledby;
    }

    if (ariaDescribedby) {
        muiSelectProps['aria-describedby'] = ariaDescribedby;
    }

    if (label) {
        muiSelectProps['aria-label'] = label;
    }

    if (ariaRequired) {
        muiSelectProps['aria-required'] = ariaRequired;
    }

    return muiSelectProps;
};

/**
 * Select components are used for collecting user provided information from a list of options.
 */
const Select: FunctionComponent<SelectProps> = ({
    ariaDescribedby,
    ariaLabelledby,
    ariaRequired,
    controlId = uuidv4(),
    disabled = false,
    empty,
    errorText,
    invalid = false,
    label,
    loadingText,
    onBlur,
    onChange,
    onFocus,
    onRecoveryClick,
    options = [],
    placeholder,
    recoveryText,
    selectedOption,
    statusType = 'finished',
}) => {
    const classes = useStyles();

    const onRecoveryClickHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        onRecoveryClick && onRecoveryClick(event);
        event.stopPropagation();
    };

    return (
        <MuiSelect
            variant="outlined"
            displayEmpty
            fullWidth
            {...muiSelectProps({
                ariaDescribedby,
                ariaLabelledby,
                ariaRequired,
                controlId,
                disabled,
                invalid,
                label,
                onBlur,
                onChange,
                onFocus,
                selectedOption,
            })}
            MenuProps={{
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                transitionDuration: 0,
                getContentAnchorEl: null,
            }}
            data-testid="select"
        >
            {placeholder && (
                <MenuItem key="__placeholder__" value="" disabled className={classes.placeholder}>
                    {placeholder}
                </MenuItem>
            )}
            {empty && !options.length && (
                <ListSubheader key="__status__" className={classes.subheaderMenuItem}>
                    {empty}
                </ListSubheader>
            )}
            {statusType !== 'finished' && (
                <ListSubheader className={classes.subheaderMenuItem} key="__status__">
                    {statusType === 'loading' && <LoadingIndicator label={loadingText} />}
                    {statusType === 'error' && (
                        <>
                            <span className={classes.errorText}>
                                <StatusIndicator statusType="negative">{errorText}</StatusIndicator>
                            </span>
                            {recoveryText && (
                                <MuiLink href="#" onClick={onRecoveryClickHandler} className={classes.recoveryLink}>
                                    {recoveryText}
                                </MuiLink>
                            )}
                        </>
                    )}
                </ListSubheader>
            )}
            {statusType === 'finished' && renderOptions(options, classes)}
        </MuiSelect>
    );
};

export default Select;
