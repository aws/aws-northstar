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
import { SelectOption } from '../../components/Select';

const getFlattenOptions = (options: SelectOption[]) => {
    const optionArray: SelectOption[] = [];
    options.forEach((option) => {
        if (option.options) {
            option.options.forEach((o) => {
                optionArray.push({ ...o, label: o.label || o.value, value: o.value, group: option.label });
            });
        } else {
            optionArray.push({ ...option, label: option.label || option.value, value: option.value });
        }
    });

    return optionArray;
};

export { getFlattenOptions };
