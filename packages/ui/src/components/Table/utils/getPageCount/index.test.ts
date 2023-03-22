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
import getPageCount from '.';

describe('getPageCount', () => {
    it('should return the page count', () => {
        expect(getPageCount()).toBe(0);
        expect(getPageCount(undefined, 10)).toBe(0);
        expect(getPageCount(10)).toBe(0);
        expect(getPageCount(0, 0)).toBe(0);
        expect(getPageCount(0, 10)).toBe(0);
        expect(getPageCount(10, 0)).toBe(0);
        expect(getPageCount(9, 10)).toBe(1);
        expect(getPageCount(100, 10)).toBe(10);
        expect(getPageCount(101, 10)).toBe(11);
        expect(getPageCount(109, 11)).toBe(10);
    });
});
