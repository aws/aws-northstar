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
import { makeStyles, Typography } from '@material-ui/core';
import Box from '../../src/layouts/Box';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        height: 'calc(100vh - 65px)',
    },
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    contentContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    },
});

const Landing: React.FC = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <Box className={classes.contentContainer}>
                    <Box>
                        <img src="img/logo-full.png" alt="NorthStar" width="60%" />
                    </Box>
                    <Typography variant="h1">
                        The design system for building AWS console like user experiences
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Landing;
