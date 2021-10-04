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

import isEqual from '.';

describe('isEqual', () => {
    describe('performs deep comparision on two string arrays', () => {
        it('returns true for two empty arrays', () => {
            const arr1: string[] = [];
            const arr2: string[] = [];
            const result = isEqual(arr1, arr2);
            expect(result).toEqual(true);
        });

        it('returns true for two arrays have identical length and identical items', () => {
            const arr1 = ['1', '2', '3', '4'];
            const arr2 = ['1', '2', '3', '4'];
            const result = isEqual(arr1, arr2);
            expect(result).toEqual(true);
        });

        it('returns true for two arrays have identical length and identical items but in different order', () => {
            const arr1 = ['1', '4', '3', '3'];
            const arr2 = ['4', '3', '3', '1'];
            const result = isEqual(arr1, arr2);
            expect(result).toEqual(true);
        });

        it('returns false when two arrays have different lengths', () => {
            const arr1 = ['1', '3', '5', '11'];
            const arr2 = ['3', '5'];
            const result = isEqual(arr1, arr2);
            expect(result).toEqual(false);
        });

        it('returns false when two arrays are different in items', () => {
            const arr1 = ['1', '3', '5', '11'];
            const arr2 = ['a', 'b', 'c', 'd'];
            const result = isEqual(arr1, arr2);
            expect(result).toEqual(false);
        });

        it('returns false when two arrays are differents in even one item', () => {
            const arr1 = ['1', '3', '5', '11'];
            const arr2 = ['1', '3', '5', '1'];
            const result = isEqual(arr1, arr2);
            expect(result).toEqual(false);
        });
    });
});
