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
import { makeStyles } from '@material-ui/core';
import Box from '../Box';
import spacingMapping from '../../config/spacingMapping';

const useStyles = makeStyles({
    root: {
        marginTop: '-10px',
        '&>*': {
            marginTop: '10px',
        },
    },
});

export interface InlineProps {
    /**A list of components*/
    children: ReactNode;
    /**Horizontal spacing between two components. <br/>
     * By default, m will be used.*/
    spacing?: 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';
}

/**
 * Renders components horizontally with consistent spacing between them.
 */
const Inline: FunctionComponent<InlineProps> = ({ children, spacing = 'm' }) => {
    const styles = useStyles();
    const stackItems = Children.toArray(children);
    const lastIndex = stackItems.length - 1;
    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" className={styles.root} data-testid="layout-inline">
            {stackItems.map((child, index) => (
                <Box key={index} mr={index === lastIndex ? 'undefined' : spacingMapping[spacing]}>
                    {child}
                </Box>
            ))}
        </Box>
    );
};

export default Inline;
