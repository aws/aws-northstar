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
import { makeStyles, TextareaAutosize, Theme, TextareaAutosizeProps } from '@material-ui/core';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme: Theme) => ({
    textarea: {
        fontSize: theme.typography.fontSize,
        borderRadius: '2px',
        border: `1px solid ${theme.palette.grey[400]}`,
        width: '100%',
        padding: '4px 10px',
        '&:focus:not([class*="invalid"])': {
            outline: '2px dotted transparent',
            boxShadow: `0 0 0 1px ${theme.palette.info.dark}`,
            border: `1px solid ${theme.palette.info.dark}`,
        },
        '&:hover:not([class*="invalid"]):not([disabled])': {
            border: `1px solid ${theme.palette.info.dark}`,
        },
    },
    invalid: {
        border: `1px solid ${theme.palette.error.dark}`,
        boxShadow: 'none',
        outline: 'none',
        '&:focus': {
            outline: '2px dotted transparent',
            boxShadow: `0 0 0 1px ${theme.palette.error.dark}`,
            border: `1px solid ${theme.palette.error.dark}`,
        },
    },
}));

export interface TextareaProps {
    /** Text entered into the element. */
    value?: string;
    /** Placeholder text rendered when the value is an empty string. */
    placeholder?: string;
    /** The name of the control used in HTML forms. */
    name?: string;
    /**
     * Specifies that the textarea should be disabled, preventing
     * the user from modifying the value and preventing the value from being
     * included in a form submission. A disabled textarea cannot receive focus.
     * */
    disabled?: boolean;
    /**
     * Specifies that the textarea should be readonly, preventing the user from
     * modifying the value but including it in a form submission. A readonly textarea can receive focus.
     * */
    readonly?: boolean;
    /** Overrides invalidation state */
    invalid?: boolean;
    /**
     * Setting this to true will disable any native browser capabilities to automatically
     * correct user input, such as autocorrect and autocapitalize
     * */
    disableBrowserAutocorrect?: boolean;
    /**
     * Allows you to indicate that the control is to be focused as soon as the load event triggers, allowing the user
     * to just start typing without having to manually focus the input.
     * */
    autofocus?: boolean;
    /**
     * Id of the internal input.
     * Use in conjunction with Form Field to relate a label element "for" attribute to this control for better web accessibility.
     * See example in FormField for more details.
     * It defaults to an automatically generated id if not provided.
     * */
    controlId?: string;
    /** The number of lines of text to set the height to. */
    rows?: number;
    /** Adds aria-describedby on the native textarea */
    ariaDescribedby?: string;
    /** Adds aria-required on the native input */
    ariaRequired?: boolean;
    /** Handler for the onChange event */
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    /** Handler for the onFocus event */
    onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    /** Handler for the onBlur event */
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    /** Handler for the onKeyDown event */
    onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    /** Handler for the onKeyUp event */
    onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    /** Additional styling class to the root element of the component */
    className?: string;
}

const mapTextareaProps = ({
    rows = 3,
    controlId,
    invalid = false,
    disableBrowserAutocorrect = false,
    ...props
}: TextareaProps): TextareaAutosizeProps => {
    const id = controlId || uuidv4();

    const autoCompleteString = disableBrowserAutocorrect ? 'off' : 'on';

    return {
        id,
        rowsMin: rows,
        required: props.ariaRequired,
        value: props.value,
        placeholder: props.placeholder,
        name: props.name,
        disabled: props.disabled,
        readOnly: props.readonly,
        autoComplete: autoCompleteString,
        autoCapitalize: autoCompleteString,
        autoFocus: props.autofocus,
        'aria-label': props.value || props.placeholder || id,
        'aria-describedby': props.ariaDescribedby,
        'aria-required': props.ariaRequired,
        onChange: props.onChange,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        onKeyDown: props.onKeyDown,
        onKeyUp: props.onKeyUp,
    };
};

/** A Textarea is a multi-line text input control. */
const Textarea: FunctionComponent<TextareaProps> = ({ invalid, ...props }) => {
    const classes = useStyles();
    return (
        <TextareaAutosize
            {...mapTextareaProps(props)}
            className={clsx(classes.textarea, { [classes.invalid]: invalid }, props.className)}
        />
    );
};

export { mapTextareaProps };

export default Textarea;
