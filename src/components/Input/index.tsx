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

import React, { FunctionComponent, ReactElement, useEffect, useMemo } from 'react';
import MaterialInput from '@material-ui/core/OutlinedInput';
import { OutlinedInputProps as MaterialInputProps } from '@material-ui/core/OutlinedInput';
import { v4 as uuidv4 } from 'uuid';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import { InputAdornment } from '@material-ui/core';

export interface InputProps {
    /** Text entered into the form element. */
    value?: any;
    /** Type of control to render */
    type?: 'text' | 'password' | 'search' | 'number' | 'email';
    /** The name of the control used in HTML forms. */
    name?: string;
    /** Set input field to be required */
    required?: boolean;
    /** Placeholder text rendered when the value is an empty string. */
    placeholder?: string;
    /**
     * Specifies that the input should be disabled, preventing the user from modifying the value
     * and preventing the value from being included in a form submission. A disabled input cannot receive focus.
     * */
    disabled?: boolean;
    /**
     * Specifies that the input should be readonly, preventing the user from modifying the value
     * but including it in a form submission. A readonly input can receive focus.
     * */
    readonly?: boolean;
    /** Shows that there is an error with an input that the user entered into the input field */
    invalid?: boolean;
    /** Specifies whether browsers should enable autocomplete for this input */
    autocomplete?: boolean;
    /**
     * Setting this to true will disable any native browser capabilities to automatically correct user input,
     * such as autocorrect and autocapitalize. If unset, behavior will be the default behavior of the respective browser.
     * */
    disableBrowserAutocorrect?: boolean;
    /**
     * Allows you to indicate that the control is to be focused as soon as the load event triggers, allowing the
     * user to just start typing without having to manually focus the input
     * */
    autofocus?: boolean;
    /**
     * Id of the internal input.
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility.
     * See example in FormField for more details.
     * It defaults to an automatically generated id if not provided.
     * */
    controlId?: string;
    /**
     * Adds aria-labelledby on the native input. Use this only with form fields that contain
     * multiple controls under the same label.
     * */
    ariaLabelledby?: string;
    /**
     * Adds aria-describedby on the native input. Use this only with form fields that contain multiple
     * controls under the same label.
     * */
    ariaDescribedby?: string;
    /**
     * Mimics the native change event on inputs.
     */
    onChange?: (value: string) => void;
}

const mapProps = ({
    type = 'text',
    required = false,
    autocomplete = true,
    disableBrowserAutocorrect = false,
    ...props
}: InputProps): MaterialInputProps => {
    const autoCorrectString: string = disableBrowserAutocorrect ? 'off' : 'on';
    const autoCompleteString: string = autocomplete ? 'on' : 'off';
    const inputProps = {
        'aria-labelledby': props.ariaLabelledby,
        'aria-describedby': props.ariaDescribedby,
        'aria-required': required,
    };

    const mappedInputProps: MaterialInputProps = {
        type,
        name: props.name,
        required,
        placeholder: props.placeholder,
        disabled: props.disabled,
        readOnly: props.readonly,
        error: props.invalid,
        autoComplete: autoCompleteString,
        autoCorrect: autoCorrectString,
        autoFocus: props.autofocus,
        inputProps,
    };
    return mappedInputProps;
};

/**
 * Enables users to input text in a single-line control.
 */
const Input: FunctionComponent<InputProps> = ({ onChange = () => {}, ...props }): ReactElement => {
    const [showClearInputButton, setShowClearInputButton] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(props.value || '');
    const id: string = props.controlId || uuidv4();

    useEffect(() => {
        setInputValue(props.value || '');
    }, [props.value]);

    const handleChange = (value: string): void => {
        onChange(value);
        setShowClearInputButton(true);
        setInputValue(value);
    };

    const clearSearchInput = (): ReactElement => (
        <InputAdornment position="start">
            <ClearIcon
                color="action"
                data-testid="clear-input"
                onClick={() => {
                    setShowClearInputButton(false);
                    setInputValue('');
                    handleChange('');
                }}
            />
        </InputAdornment>
    );

    return (
        <MaterialInput
            id={id}
            fullWidth={true}
            {...mapProps(props)}
            startAdornment={
                props.type == 'search' && (
                    <InputAdornment position="start">
                        <SearchIcon color="action" />
                    </InputAdornment>
                )
            }
            endAdornment={props.type == 'search' && showClearInputButton && clearSearchInput()}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
        />
    );
};

export default Input;
