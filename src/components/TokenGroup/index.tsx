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
import React, { FunctionComponent, useMemo } from 'react';
import Inline from '../../layouts/Inline';
import Stack from '../../layouts/Stack';
import Token, { Item } from './components/Token';

export interface TokenGroupProps {
    /**
     * List of items to display in the token group
     * */
    items: Item[];
    /**
     * Callback when the token is dismissed
     * */
    onDismiss: (item: Item) => void;
    /**
     * Indicates whether to display multiple tokens inline
     */
    inline?: boolean;
}

/** A token group can be used to display dismissible tags or properties */
const TokenGroup: FunctionComponent<TokenGroupProps> = ({ items, onDismiss, inline = true }) => {
    const WrapperComponent = useMemo(() => {
        if (inline) {
            return Inline;
        }

        return Stack;
    }, [inline]);
    return (
        <WrapperComponent spacing={inline ? 'm' : 's'}>
            {items.map((item) => (
                <Token key={item.value} item={item} onDismiss={onDismiss} />
            ))}
        </WrapperComponent>
    );
};

export default TokenGroup;
