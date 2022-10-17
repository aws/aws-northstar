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

import { BooleanObject } from '../../types';

export const convertArrayToBooleanObject = (arr: string[]): BooleanObject =>
    arr.reduce((map, id) => ({ ...map, [id]: true }), {});

export const convertBooleanObjectToArray = (selectedRowIdsMap: BooleanObject): string[] =>
    Object.keys(selectedRowIdsMap).reduce(
        (arr: string[], key: string) => [...arr, ...(selectedRowIdsMap[key] ? [key] : [])],
        []
    );
