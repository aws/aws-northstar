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
import React from 'react';
import useScrollPosition from '.';
import { renderHook, act } from '@testing-library/react-hooks';

jest.useFakeTimers();

describe('useScrollPosition', () => {
    it('should return the element position', () => {
        const callback = jest.fn();
        jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { x: 0, y: 0 } });
        const element = {
            current: {
                scrollLeft: 200,
                scrollTop: 100,
            },
        };
        const { result } = renderHook(() => useScrollPosition(callback, element, 0));
        act(() => {
            result.current.handleScroll();
        });

        expect(callback).toHaveBeenCalledWith({
            x: 200,
            y: 100,
        });
    });

    it('should not callback if the position is not changed', () => {
        const callback = jest.fn();
        jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { x: 200, y: 100 } });
        const element = {
            current: {
                scrollLeft: 200,
                scrollTop: 100,
            },
        };
        const { result } = renderHook(() => useScrollPosition(callback, element, 0));
        act(() => {
            result.current.handleScroll();
        });

        expect(callback).not.toHaveBeenCalled();
    });

    it('should wait to callback if wait is set', async () => {
        const callback = jest.fn();
        jest.spyOn(React, 'useRef').mockReturnValueOnce({ current: { x: 0, y: 0 } });

        const element = {
            current: {
                scrollLeft: 200,
                scrollTop: 100,
            },
        };
        const { result, waitForNextUpdate } = renderHook(() => useScrollPosition(callback, element, 200));
        act(() => {
            result.current.handleScroll();
        });

        expect(setTimeout).toHaveBeenCalled();
        expect(callback).not.toHaveBeenCalled();

        act(() => {
            jest.runAllTimers();
        });

        expect(callback).toHaveBeenCalled();
    });
});
