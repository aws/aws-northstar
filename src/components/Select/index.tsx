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

import React, { FunctionComponent, SyntheticEvent, ReactNode } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import MuiLink from '@material-ui/core/Link';
import MuiSelect, { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import LoadingIndicator from '../LoadingIndicator';
import StatusIndicator from '../StatusIndicator';
import { ButtonIcon } from '../Button';
import { AriaBaseProps } from '../../props/common';
import { SelectBaseProps, SelectOption, StatusType } from './types';
import useUniqueId from '../../hooks/useUniqueId';

export interface SelectProps extends SelectBaseProps, AriaBaseProps {
    /** Currently selected option. Value is used to match which option will be selected */
    selectedOption?: SelectOption;
    /** Fired whenever the user selects an option. The event detail contains the current selectedId and selectedOption. */
    onChange?: MuiSelectProps['onChange'];
    /** Fired when the select is opened. */
    onFocus?: (event?: React.FocusEvent<HTMLElement>) => void;
    /** Fired when input focus is removed from the UI control. */
    onBlur?: (event?: React.FocusEvent<HTMLElement>) => void;
}

const useStyles = makeStyles((theme) => ({
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
    renderOption: SelectBaseProps['renderOption'],
    disabled = false,
    groupItem = false
): ReactNode[] => {
    return options.map((option: SelectOption) => {
        if (option.options) {
            const key = typeof option.label === 'string' ? option.label : uuidv4();
            return [
                <ListSubheader key={key}>{option.label}</ListSubheader>,
                ...renderOptions(option.options, classes, renderOption, option.disabled, true),
            ];
        } else {
            const key = option.value || uuidv4();
            return (
                <MenuItem
                    key={key}
                    value={option.value}
                    disabled={option.disabled || disabled}
                    className={clsx({ [classes.groupMenuItem]: groupItem })}
                >
                    {option.iconName && (
                        <span className={classes.iconMenuItem}>
                            <ButtonIcon type={option.iconName} />
                        </span>
                    )}
                    {renderOption?.(option) || option.label || option.value}
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
    selectedOption,
    placeholder,
}: SelectProps): MuiSelectProps => {
    return {
        disabled,
        error: invalid,
        id: controlId,
        onChange,
        placeholder,
        onClose: onBlur as MuiSelectProps['onClose'],
        onOpen: onFocus as MuiSelectProps['onOpen'],
        value: selectedOption?.value || '',
        ...(ariaLabelledby && { 'aria-labelledby': ariaLabelledby }),
        ...(ariaDescribedby && { 'aria-describedby': ariaDescribedby }),
        ...(label && { 'aria-label': label }),
        ...(ariaRequired && { 'aria-required': ariaRequired }),
    };
};

/**
 * Select components are used for collecting user provided information from a list of options.
 */
const Select: FunctionComponent<SelectProps> = ({
    ariaDescribedby,
    ariaLabelledby,
    ariaRequired,
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
    recoveryText,
    renderOption,
    placeholder,
    selectedOption,
    statusType = 'finished',
    ...props
}) => {
    const classes = useStyles();
    const controlId = useUniqueId(props.controlId);

    const onRecoveryClickHandler = (event: SyntheticEvent) => {
        event.preventDefault();
        onRecoveryClick?.(event);
        event.stopPropagation();
    };

    const testId = props['data-testid'] || 'select';

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
            data-testid={testId}
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
            {statusType === 'finished' && renderOptions(options, classes, renderOption)}
        </MuiSelect>
    );
};

export default Select;

export type { SelectBaseProps, SelectOption, StatusType };
