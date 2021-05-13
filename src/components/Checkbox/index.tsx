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

import React, { FunctionComponent, ChangeEvent, ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, Checkbox as MaterialCheckbox, FormControlLabel, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    checkbox: {
        marginRight: theme.spacing(0.4),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-checked': {
            color: theme.palette.info.dark,
        },
        '& .MuiSvgIcon-root': {
            height: '16px',
            width: '16px',
        },
    },
    checkboxWithDesc: {
        alignSelf: 'flex-start',
    },
    checkboxLabel: {
        marginLeft: 0,
    },
    checkboxLabelWitDesc: {
        '& > .MuiFormControlLabel-label': {
            marginTop: '-2px',
        },
    },
}));

export interface CheckboxProps {
    /** Label for the input */
    children?: ReactNode;
    /** Specifies whether the component is checked.*/
    checked?: boolean;
    /** Specifies that the input should be disabled, preventing the user from
     * modifying the value and excluding the value from being included with a form submit. */
    disabled?: boolean;
    /** Specifies that the component is in an indeterminate state.
     * The checkbox will display indeterminate state only if checked is false. Once an
     * indeterminate checkbox is clicked, it will become checked. */
    indeterminate?: boolean;
    /** Extra description shown below the label. */
    description?: string;
    /**Id of the internal input.
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility.
     * See example in <a href='/#/Components/FormField'>FormField</a> for more details.
     * */
    controlId?: string;
    /** Adds aria-labelledby on the native input. Use this only with form fields that
     * contain multiple controls under the same label. Define a custom id inside the labelRefer to
     * that label from every single control under that label using this property. */
    ariaLabelledby?: string;
    /** Adds aria-describedby on the native input. Use this only with form fields that
     * contain multiple controls under the same label.Define custom ids inside the description,
     *  hint and error textRefer to these from every single control under that label using this
     *  propertyRefer to any other hint/description text that you provide */
    ariaDescribedby?: string;
    /** Adds an aria-label to the native input. Only use this when you do not have a visible label for this control. */
    ariaLabel?: string;
    /** The name of the control used in HTML forms. */
    name?: string;
    /** The value of the form control*/
    value?: string;
    /** Fired when the user changes the component state.
     * The event detail contains the current value for the checked property.
     */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * A Checkboxes allow the user to select one or more items from a set.
 */
const Checkbox: FunctionComponent<CheckboxProps> = ({
    children,
    checked,
    disabled,
    description,
    indeterminate = false,
    onChange,
    controlId,
    ariaDescribedby,
    ariaLabel,
    ariaLabelledby,
    name,
    value,
}) => {
    const classes = useStyles();

    const label = (
        <>
            {children}
            {description && (
                <Typography variant="subtitle1" component="div">
                    {description}
                </Typography>
            )}
        </>
    );

    const muiCheckBox = (
        <MaterialCheckbox
            disableRipple
            className={clsx(classes.checkbox, { [classes.checkboxWithDesc]: description })}
            id={controlId}
            checked={checked}
            disabled={disabled}
            indeterminate={indeterminate}
            onChange={onChange}
            value={value}
            inputProps={{
                'aria-describedby': ariaDescribedby,
                'aria-label': ariaLabel,
                'aria-labelledby': ariaLabelledby,
                name,
            }}
        />
    );

    return (
        <FormControlLabel
            control={muiCheckBox}
            label={label}
            className={clsx(classes.checkboxLabel, { [classes.checkboxLabelWitDesc]: description })}
        />
    );
};

export default Checkbox;
