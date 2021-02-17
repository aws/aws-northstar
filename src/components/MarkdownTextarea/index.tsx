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
import MarkdownEditor, { IMarkdownEditor } from '@uiw/react-markdown-editor';
export interface MarkdownTextareaProps extends IMarkdownEditor {
    /**
     * The name of the control used in HTML forms.
     * */
    name?: string;
    /**
     * Specifies that the textarea should be disabled, preventing
     * the user from modifying the value and preventing the value from being
     * included in a form submission. A disabled textarea cannot receive focus.
     * */
    disabled?: boolean;
    /**
     * Shows a preview that will be converted to html.
     */
    visible?: boolean;
    /**
     * Specifies that the textarea should be readonly, preventing the user from
     * modifying the value but including it in a form submission. A readonly textarea can receive focus.
     * */
    readonly?: boolean;
    /**
     * Specifies the height of the editor in pixels
     */
    height?: number;
    /** Overrides invalidation state */
    invalid?: boolean;
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
    /** specifies if in read only mode */
    readOnly?: boolean;
}

/** A MarkdownTextarea is a markdown input text control withg preview. */
const MarkdownTextarea: FunctionComponent<MarkdownTextareaProps> = ({ invalid, ...props }) => {
    return (
        <MarkdownEditor
            height={200}
            visible={true}
            visibleEditor={true}
            {...props}
            cursorBlinkRate={0} /** do not change - there is a bug in code mirror  */
            options={{ ...props.options, readOnly: props.readOnly }}
        />
    );
};

export default MarkdownTextarea;
