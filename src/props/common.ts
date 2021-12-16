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
export interface AriaBaseProps {
    /**
     * Adds aria-describedby on the select. Use this only with form fields that contain multiple controls under the same label. <br/>
     * 1. Define custom ids inside the description, hint and error text <br/>
     * 2. Refer to these from every single control under that label using this property <br/>
     * 3. Refer to any other hint/description text that you provide
     */
    ariaDescribedby?: string;
    /** Adds aria-required on the native input */
    ariaRequired?: boolean;
    /**
     * Adds aria-labelledby on the select. <br/>
     * 1. Define a custom id inside the label of the form field <br/>
     * 2. Refer to that label using this property
     */
    ariaLabelledby?: string;
}
