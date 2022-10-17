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
const isEqual = (arr1?: string[] | null, arr2?: string[] | null) => {
    if (!arr1 && !arr2) {
        return true;
    }

    if (!arr1 || !arr2) {
        return false;
    }

    if (arr1!.length !== arr2!.length) {
        return false;
    }

    const array2Sorted = [...arr2!].sort();
    return [...arr1!].sort().every((value, index) => value === array2Sorted[index]);
};

export default isEqual;
