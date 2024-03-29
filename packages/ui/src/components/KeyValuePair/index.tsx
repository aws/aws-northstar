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
import { ReactNode, FC } from 'react';
import Box from '@cloudscape-design/components/box';

export interface KeyValuePairProps {
    /** The property label */
    label: string;
    /** The property value. Empty value will be displayed as "-" (minus sign) */
    value?: ReactNode;
}

/**
 * A key/value pair represents a key followed by the corresponding value.
 */
const KeyValuePair: FC<KeyValuePairProps> = ({ label, value, ...props }) => {
    return (
        <div {...props}>
            <Box variant="awsui-key-label">{label}</Box>
            <Box>{!value ? '-' : value}</Box>
        </div>
    );
};

export default KeyValuePair;
