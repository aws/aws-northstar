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

import React, { ReactNode, FunctionComponent } from 'react';
import Box from '../../layouts/Box';
import Text from '../Text';

export interface KeyValuePairProps {
    /** The property label */
    label: string;
    /** The property value. Empty value will be displayed as "-" (minus sign) */
    value?: string | number | ReactNode;
}

/**
 * Key/value pairs are lists of properties (keys) followed by the corresponding value.
 */
const KeyValuePair: FunctionComponent<KeyValuePairProps> = ({ label, value }) => {
    return (
        <Box>
            <Box color="grey.600" fontSize="body1.fontSize">
                {label}
            </Box>
            <Box data-testid="value" color="text.primary">
                {!value ? (
                    <Text>-</Text>
                ) : typeof value === 'string' || typeof value === 'number' ? (
                    <Text>{value}</Text>
                ) : (
                    <>{value}</>
                )}
            </Box>
        </Box>
    );
};

export default KeyValuePair;
