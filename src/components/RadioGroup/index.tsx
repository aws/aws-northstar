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

import React, { ReactElement, FunctionComponent, ChangeEvent, Fragment } from 'react';
import { makeStyles, RadioGroup as MaterialRadioButtonGroup } from '@material-ui/core';
import clsx from 'clsx';
import RadioButton from './components/RadioButton';

const useStyles = makeStyles((theme) => ({
    root: {},
    div: {
        extend: 'root',
        textAlign: 'center',
        width: 'fit-content',
    },
    radio: {
        transform: 'scale(1)',
    },
}));

export interface RadioGroupProps {
    /** The value of the selected RadioButton */
    value?: string;
    /**
     * Use this property to name the value of the control.
     * If not provided, the control name will be randomly generated.
     */
    name?: string;
    /** A list of RadioButton components to be used in the group.*/
    items?: ReactElement<typeof RadioButton>[];
    /** Fired when the user selects a different radio button. The event detail contains the current value */
    onChange?: (event?: ChangeEvent<HTMLInputElement>, value?: string) => void;
}

/**
 * RadioGroup is a helpful wrapper used to group Radio components.
 */

const RadioGroup: FunctionComponent<RadioGroupProps> = ({ name, value, items = [], onChange }) => {
    const classes = useStyles();
    return (
        <div className={clsx(classes.root, classes.div)}>
            <MaterialRadioButtonGroup className={clsx(classes.radio)} value={value} name={name} onChange={onChange}>
                {items.map((item, index) => (
                    <Fragment key={index}>{item}</Fragment>
                ))}
            </MaterialRadioButtonGroup>
        </div>
    );
};

export default RadioGroup;
export { RadioButton };
