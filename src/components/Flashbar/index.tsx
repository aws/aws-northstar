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

import React, { FunctionComponent } from 'react';
import Box from '../../layouts/Box';
import { FlashbarMessage as _FlashbarMessage } from './types';
import FlashbarItem from './component/FlashbarItem';
import { v4 as uuidv4 } from 'uuid';
import { ComponentBaseProps } from '../../props/common';

export type FlashbarMessage = _FlashbarMessage;

export interface FlashbarProps extends ComponentBaseProps {
    /**
     * A list of flash notifications.
     */
    items?: FlashbarMessage[];
    /**
     * Maximum number of items displayed.
     */
    maxItemsDisplayed?: number;
}

/**
 * A flashbar component shows one or more page-level flash notifications to communicate a user action's status, such as failed, successful, and so on.
 * Flashbar is rendered as part of AppLayout.
 **/
const Flashbar: FunctionComponent<FlashbarProps> = ({ items = [], maxItemsDisplayed = Number.MAX_VALUE, ...props }) => {
    const renderedItems = items.slice(0, Math.min(maxItemsDisplayed, items.length));
    return (
        <Box data-testid={props['data-testid']}>
            {renderedItems.map((item) => (
                <FlashbarItem {...item} key={item.id || uuidv4()} />
            ))}
        </Box>
    );
};

export default Flashbar;
