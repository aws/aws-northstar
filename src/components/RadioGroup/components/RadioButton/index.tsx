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

import React, { FunctionComponent, ChangeEvent } from 'react';
import { makeStyles, Theme, Radio as MaterialRadioButton, FormControlLabel } from '@material-ui/core';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
export interface RadioButtonProps {
    /** Use this property to name the radio buttons.*/
    name?: string;
    /**
     * Holds the radio button's value. This is the value the radio
     * group will get when the radio button is selected.
     */
    value?: string;
    /**
     * Specifies that the element should be disabled, preventing the user from
     * modifying its state.AngularJS: Use data-disabled instead.
     */
    disabled?: boolean;
    /**
     * The id of the internal input.
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility.
     * See example in FormField for more details.
     */
    controlId?: string;
    /** Whether the component is currently checked. */
    checked?: boolean;
    /**
     * Adds aria-labelledby on the native input.
     * Use this only with form fields that contain multiple controls under the same label.
     */
    ariaLabelledby?: string;
    /**
     * Adds aria-describedby on the native input.
     * Use this only with form fields that contain multiple controls under the same label.
     */
    ariaDescribedby?: string;
    /**
     * Adds an aria-label to the native input.
     * Only use this when you do not have a
     * visible label for this control.
     */
    ariaLabel?: string;
    /** Fired when the radio button changes its state. */
    onChange?: (event?: ChangeEvent<HTMLInputElement>, checked?: boolean) => void;
    /** Extra description shown below the label. */
    description?: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 0,
        '&:not(:first-child)': {
            marginTop: theme.spacing(0.5),
        },
    },
    radio: {
        display: 'inline-block',
        padding: '0',
        '& .MuiSvgIcon-root': {
            width: '16px',
            height: '16px',
            marginTop: '2px',
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        paddingLeft: theme.spacing(1),
    },
    withDescription: {
        alignSelf: 'flex-start',
    },
    description: {
        fontSize: '12px',
        color: theme.palette.grey['600'],
    },
}));

/**
 * Radio buttons allow the user to select one option from a set.
 */
const RadioButton: FunctionComponent<RadioButtonProps> = ({
    name,
    value,
    disabled,
    controlId,
    checked,
    ariaLabelledby,
    ariaDescribedby,
    ariaLabel,
    onChange,
    children,
    description,
}) => {
    const classes = useStyles();
    return (
        <FormControlLabel
            key={uuidv4()}
            className={classes.root}
            control={
                <MaterialRadioButton
                    id={controlId}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={onChange}
                    inputProps={{
                        'aria-describedby': ariaDescribedby,
                        'aria-label': ariaLabel,
                        'aria-labelledby': ariaLabelledby,
                        name,
                    }}
                    className={clsx(classes.radio, { [classes.withDescription]: description })}
                />
            }
            label={
                <div className={clsx(classes.container)}>
                    <span>{children}</span>
                    <span className={clsx(classes.description)}>{description}</span>
                </div>
            }
        />
    );
};

export default RadioButton;
