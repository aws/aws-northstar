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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Box from '../../src/layouts/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(1),
    },
}));

export interface ParaRendererProps {
    semantic?: 'p' | 'div';
    children: React.ReactNode;
}

const ParaRenderer: React.FC<ParaRendererProps> = ({ children, semantic = 'p' }) => {
    const styles = useStyles();
    if (semantic === 'p') {
        return (
            <Typography variant="body1" className={styles.root}>
                {children}
            </Typography>
        );
    }

    return <Box className={styles.root}>{children}</Box>;
};

export default ParaRenderer;
