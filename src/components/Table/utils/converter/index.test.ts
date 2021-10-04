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

import { convertArrayToBooleanObject, convertBooleanObjectToArray } from '.';

describe('converter', () => {
    describe('convertArrayToBooleanObject', () => {
        it('converts string array to boolean object', () => {
            const input = ['1', '3', '5', '11'];
            const output = convertArrayToBooleanObject(input);
            const expectedOutput = {
                '1': true,
                '3': true,
                '5': true,
                '11': true,
            };
            expect(output).toEqual(expectedOutput);
        });
    });

    describe('convertBooleanObjectToArray', () => {
        it('converts boolean object to string array', () => {
            const input = {
                '1': true,
                '3': true,
                '5': true,
                '7': false,
                '11': true,
            };
            const output = convertBooleanObjectToArray(input);
            const expectedOutput = ['1', '3', '5', '11'];
            expect(output).toEqual(expectedOutput);
        });
    });
});
