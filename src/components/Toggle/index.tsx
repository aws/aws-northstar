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

import React, { FunctionComponent } from 'react';
import Switch, { SwitchProps } from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

/**
 * Toggle props
 */
export interface ToggleProps {
    /** Specifies whether the component is checked */
    checked?: boolean;
    /** Specifies that the input should be disabled, preventing the user from modifying the value */
    disabled?: boolean;
    /**
     * Id of the internal input. <br/>
     * Use in conjunction with <a href='/#/Components/FormField'>FormField</a> to relate a label element "for" attribute to this control for better web accessibility.<br/>
     * See example in FormField for more details.<br/>
     * It defaults to an automatically generated id if not provided.
     * */
    controlId?: string;
    /** The name of the control used in HTML forms. */
    name?: string;
    /** Adds aria-labelledby on the native input. */
    ariaLabelledby?: string;
    /** Adds aria-describedby on the native input. */
    ariaDescribedby?: string;
    /** Adds an aria-label to the native input. */
    ariaLabel?: string;
    /** Label for the input. */
    label: string;
    /** Extra description shown below the label. */
    description?: string;
    /** Handler for the change event */
    onChange?: (checked: boolean) => void;
}

/**
 * A toggle represents a switch that allows the user to turn things on or off.
 * */
const mapProps = ({ controlId = uuidv4(), ...props }: ToggleProps): SwitchProps => {
    return {
        checked: props.checked,
        disabled: props.disabled,
        name: props.name,
        id: controlId,
        'aria-labelledby': props.ariaLabelledby,
        'aria-describedby': props.ariaDescribedby,
        'aria-label': props.ariaLabel,
    };
};

const useStyles = makeStyles({
    label: {
        marginLeft: 0,
        '& > .MuiFormControlLabel-label': {
            paddingLeft: '5px',
        },
    },
    labelWitDesc: {
        '& > .MuiFormControlLabel-label': {
            paddingTop: '2px',
        },
    },
});

/**
 * A toggle represents a switch that allows the user to turn things on or off.
 * */
const Toggle: FunctionComponent<ToggleProps> = ({ onChange, ...props }) => {
    const classes = useStyles();

    const label = (
        <>
            {props.label}
            {props.description && (
                <Typography variant="subtitle1" component="div">
                    {props.description}
                </Typography>
            )}
        </>
    );

    const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        onChange?.(checked);
    };

    return (
        <FormControlLabel
            control={<Switch {...mapProps(props)} onChange={handleChange} />}
            label={label}
            className={clsx(classes.label, { [classes.labelWitDesc]: props.description })}
        />
    );
};

export default Toggle;

export { mapProps };
