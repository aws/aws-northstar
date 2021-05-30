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
import { useRef } from 'react';

const isBrowser = typeof window != undefined;

export interface ScrollPosition {
    x: number;
    y: number;
}

const getScrollPosition = ({ element }: any): ScrollPosition => {
    if (!isBrowser) {
        return {
            x: 0,
            y: 0,
        };
    }
    const target = element?.current || document.body;

    return {
        x: target.scrollLeft || 0,
        y: target.scrollTop || 0,
    };
};

const useScrollPosition = (effect: any, element: any, wait: number) => {
    const position = useRef(getScrollPosition({}));

    let throttleTimeout: any = null;

    const callBack = () => {
        const currPos = getScrollPosition({ element });
        if (currPos.x !== position.current.x || currPos.y !== position.current.y) {
            effect(currPos);
            position.current = currPos;
        }

        throttleTimeout = null;
    };

    const handleScroll = () => {
        if (wait) {
            if (throttleTimeout === null) {
                throttleTimeout = setTimeout(callBack, wait);
            }
        } else {
            callBack();
        }
    };

    return {
        handleScroll,
    };
};

export default useScrollPosition;
