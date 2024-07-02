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
import getDisplayLastModified from '.';

describe('getDisplayLastModified', () => {
    it('should return the displayed last modified date text of the date object', () => {
        const date = new Date(2022, 0, 1, 1, 1);
        expect(getDisplayLastModified(date, 'en-US')).toBe('Last modified: 1/1/2022, 1:01:00 AM');
    });

    it('should return the displayed last modified date text of the date number', () => {
        const date = new Date(2022, 0, 1, 1, 1).getTime();
        expect(getDisplayLastModified(date, 'en-US')).toBe('Last modified: 1/1/2022, 1:01:00 AM');
    });
});
