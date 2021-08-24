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
export type MessageType = 'error' | 'info' | 'success' | 'warning';

export interface FlashbarMessage {
    /**Message id */
    id?: string;
    /**Heading text. */
    header: string;
    /**Primary text displayed in the element.*/
    content?: string;
    /**Indicates the type of the message to be displayed. Allowed values: success, error, warning, info (default: "info").*/
    type?: MessageType;
    /**Replaces the status icon with a spinner and forces the type of alert to info. */
    loading?: boolean;
    /**If true, the component will include a close button icon in the UI. By default, the close button is not included in the UI. */
    dismissible?: boolean;
    /**When set, a normal action button is displayed with the specified text. **/
    buttonText?: string;
    /**The event fired when a user clicks on the close icon that is displayed when the dismissible property is set to true. */
    onDismiss?: () => void;
    /**The event fired when a user clicks on the action button.*/
    onButtonClick?: () => void;
}
