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
import React, { FunctionComponent, useMemo, ReactNode } from 'react';
import Drawer from '@mui/material/Drawer';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles<Theme, SidebarProps>((theme) => ({
    drawer: {
        height: '100%',
        flexShrink: 0,
        width: (props) => props.sidebarWidth,
    },
    drawerPaper: {
        [theme.breakpoints.up('sm')]: {
            height: '100%',
            position: 'relative',
            width: (props) => props.sidebarWidth,
        },
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            zIndex: theme.zIndex.modal + 10,
        },
    },
    closeDrawer: {
        position: 'absolute',
        right: '20px',
        top: '15px',
        zIndex: 1,
        '& > button': {
            padding: 0,
        },
        '& > button > span': {
            padding: 0,
            display: 'inline',
            lineHeight: 1.5,
        },
    },
    sidebar: {
        display: 'flex',
        borderRadius: 0,
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.grey['200']}`,
        minWidth: '50px',
    },
}));

export enum SidebarType {
    SIDE_NAVIGATION = 'SIDE_NAVIGATION',
    HELP_PANEL = 'HELP_PANEL',
}

export interface SidebarProps {
    sidebarWidth: number;
    isSidebarOpen: string;
    displayIcon: boolean;
    setIsSidebarOpen: (open: string) => void;
    type: SidebarType;
    renderIcon: (rootClasses: string) => ReactNode;
}

const Sidebar: FunctionComponent<SidebarProps> = (props) => {
    const classes = useStyles(props);

    const isOpen = useMemo(() => {
        return props.isSidebarOpen === 'true';
    }, [props.isSidebarOpen]);

    const handleDrawerClose = () => {
        props.setIsSidebarOpen('false');
    };

    return (
        <>
            {props.displayIcon &&
                props.type === SidebarType.SIDE_NAVIGATION &&
                !isOpen &&
                props.renderIcon(classes.sidebar)}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor={props.type === SidebarType.SIDE_NAVIGATION ? 'left' : 'right'}
                open={isOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
                SlideProps={{
                    timeout: 0,
                }}
            >
                <div className={classes.closeDrawer}>
                    <IconButton onClick={handleDrawerClose} size="large">
                        <Close />
                    </IconButton>
                </div>
                {props.children}
            </Drawer>
            {props.displayIcon && props.type === SidebarType.HELP_PANEL && !isOpen && props.renderIcon(classes.sidebar)}
        </>
    );
};

export default Sidebar;
