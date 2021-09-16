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
import React, { ReactNode } from 'react';
import { ButtonIconType } from '../Button';

export type StatusType = 'loading' | 'error' | 'finished';

export interface SelectOption {
    /**
     * The string label for the option.
     */
    label?: string;
    /**
     * The value of the option.
     */
    value?: string;
    /**
     * Determine whether the option is disabled.
     */
    disabled?: boolean;
    /**
     * The name of the icon or a Material Icon type.
     */
    iconName?: ButtonIconType;
    /**
     * The nested options.
     */
    options?: SelectOption[];
    group?: string;
}

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
    /**
     * Render the option. If not provided, <i>label</i> is rendered.
     */
    renderOption?: (option: SelectOption) => ReactNode;
}
