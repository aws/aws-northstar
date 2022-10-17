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
import useUniqueId from '.';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

const { v4 } = require('uuid');

describe('useUniqueId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the defaultId if defaultId is specified', () => {
        const { result } = renderHook(() => useUniqueId('defaultId'));
        expect(result.current).toBe('defaultId');
    });

    it('should return an unique id if defaultId is not specified', () => {
        v4.mockReturnValue('random_uuid');
        const { result } = renderHook(() => useUniqueId());
        expect(result.current).toBe('random_uuid');
    });

    it('should not change unique id value after rerender', () => {
        v4.mockReturnValueOnce('random_uuid1').mockReturnValueOnce('random_uuid2');
        const { result, rerender } = renderHook(() => useUniqueId());
        const initialValue = result.current;
        expect(initialValue).toBe('random_uuid1');
        rerender();
        const postRerenderValue = result.current;
        expect(postRerenderValue).toBe('random_uuid1');
    });
});
