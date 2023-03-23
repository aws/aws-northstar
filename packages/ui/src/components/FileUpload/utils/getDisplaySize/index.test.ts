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
import getDisplaySize from '.';

describe('getDisplaySie', () => {
    it('should return the displayed file size', () => {
        expect(getDisplaySize(11)).toBe('Size: 11 bytes');
        expect(getDisplaySize(1011)).toBe('Size: 1.01 KB');
        expect(getDisplaySize(1011000)).toBe('Size: 1.01 MB');
        expect(getDisplaySize(1011000000)).toBe('Size: 1.01 GB');
        expect(getDisplaySize(null)).toBeUndefined();
        expect(getDisplaySize()).toBeUndefined();
    });
});
