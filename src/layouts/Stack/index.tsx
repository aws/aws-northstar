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
import React, { Children, FunctionComponent, ReactNode } from 'react';
import Box from '../Box';
import spacingMapping from '../../config/spacingMapping';

export interface StackProps {
    /**A list of compoents*/
    children: ReactNode;
    /**Vertical spacing between two components. <br/>
     * By default, m will be used.*/
    spacing?: 'none' | 'xs' | 's' | 'm' | 'l';
}

/**
 * Renders components vertically with consistent spacing between them.
 */
const Stack: FunctionComponent<StackProps> = ({ children, spacing = 'm' }) => {
    const stackItems = Children.toArray(children);
    const lastIndex = stackItems.length - 1;
    return (
        <Box data-testid="layout-stack">
            {stackItems.map((child, index) => (
                <Box key={index} mb={index === lastIndex ? 'undefined' : spacingMapping[spacing]}>
                    {child}
                </Box>
            ))}
        </Box>
    );
};

export default Stack;
