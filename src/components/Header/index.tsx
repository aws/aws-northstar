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

import React, { ReactNode } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '../../layouts/Box';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '65px',
        justifyContent: 'center',
    },
    paddedChildren: {
        '& > *': {
            paddingRight: theme.spacing(1),
        },
    },
    flexGrow: {
        flexGrow: 1,
    },
    title: {
        fontSize: '28px',
        color: theme.palette.primary.contrastText,
    },
    img: {
        verticalAlign: 'middle',
        maxHeight: '42px',
    },
}));

export interface HeaderProps {
    /** The title of the app */
    title: string;
    /** The url of the logo */
    logoPath?: string;
    /** The content at the top right corner */
    rightContent?: ReactNode;
    /** Hide the header below the given breakpoint */
    hideHeaderBelow?: 'xs' | 'sm' | 'md' | 'lg';
}

/**
 * A header bar for an application
 */
const Header = ({ title, logoPath, rightContent = null, hideHeaderBelow }: HeaderProps) => {
    const classes = useStyles({});
    const theme = useTheme();
    const matched = useMediaQuery(theme.breakpoints.up(hideHeaderBelow || 'sm'));
    return (
        <AppBar className={classes.root} position="static" elevation={0}>
            <Toolbar className={classes.paddedChildren}>
                {logoPath && (
                    <a href="/">
                        <img alt="Logo" src={logoPath} className={classes.img} />
                    </a>
                )}
                {(!hideHeaderBelow || matched) && (
                    <Typography component="span" className={clsx(classes.flexGrow, classes.title)}>
                        {title}
                    </Typography>
                )}
                {rightContent && <Box>{rightContent}</Box>}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
