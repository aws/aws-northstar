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
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '../../layouts/Box';
import Text from '../Text';

export interface LoadingIndicatorProps {
    /** Size of the spinner. Choose one of the defaults or specify a size in pixels. */
    size?: 'normal' | 'big' | 'large' | number;
    /** The label next to the spinner. */
    label?: string;
}

/** A compact, looped animation giving the user feedback that a process is currently running. */
const LoadingIndicator: FunctionComponent<LoadingIndicatorProps> = ({
    label,
    size = 'normal',
    ...props
}): React.ReactElement => {
    const normal = 16;
    const sizes = {
        normal,
        big: 2 * normal,
        large: 3 * normal,
    };
    const testId = props['data-testid'] || 'loading-indicator';
    return (
        <Box display="flex" alignItems="center" data-testid={testId}>
            <CircularProgress size={sizes[size] || size} />
            {label && (
                <Box ml={1}>
                    <Text>{label}</Text>
                </Box>
            )}
        </Box>
    );
};

export default LoadingIndicator;
