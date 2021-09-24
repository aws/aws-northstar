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
import React, { MouseEvent, FunctionComponent, useState, useCallback, useRef, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Close from '@material-ui/icons/Close';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import Fullscreen from '@material-ui/icons/Fullscreen';
import DragHandle from '@material-ui/icons/DragHandle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '../../../Box';

const useStyles = makeStyles<
    Theme,
    {
        height: number;
    }
>((theme) => ({
    drawerPaper: {
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            zIndex: theme.zIndex.modal + 10,
        },
    },
    content: ({ height }) => ({
        height,
    }),
    dragHandle: {
        padding: 0,
        margin: 0,
        cursor: 'row-resize',
    },
    control: {
        position: 'absolute',
        right: 0,
        top: '5px',
        zIndex: 1,
        '& > button': {
            padding: 0,
            marginRight: '5px',
        },
        '& > button > span': {
            padding: 0,
            display: 'inline',
            lineHeight: 1.5,
        },
    },
    controlBar: {
        position: 'relative',
        display: 'flex',
        borderRadius: 0,
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.grey['200']}`,
        minHeight: '40px',
    },
}));

export interface SplitPanelProps {
    defaultSplitPanelHeight?: number;
    isSplitPanelOpen: boolean;
    fullMode: boolean;
    setIsSplitPanelOpen: (open: boolean) => void;
}

const SplitPanel: FunctionComponent<SplitPanelProps> = ({
    children,
    defaultSplitPanelHeight = 300,
    isSplitPanelOpen,
    setIsSplitPanelOpen,
    fullMode,
}) => {
    const [height, setHeight] = useState(defaultSplitPanelHeight);
    const mouseMoveListener = useRef<any | null>();
    const mouseUpListener = useRef<any>();
    const styles = useStyles({
        height,
    });
    useEffect(() => {
        setHeight(defaultSplitPanelHeight);
    }, [defaultSplitPanelHeight]);

    const [minimized, setMinimized] = useState(false);
    const handleDrawerClose = useCallback(() => {
        setIsSplitPanelOpen(false);
    }, [setIsSplitPanelOpen]);

    const handleToggleResize = useCallback(() => {
        setMinimized((currentValue) => !currentValue);
    }, []);

    const handleMouseDown = useCallback(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const offsetBottom = document.body.offsetHeight - (e.clientY - document.body.offsetTop);
            let minHeight = 50;
            let maxHeight = document.body.offsetHeight * 0.5;
            if (offsetBottom > minHeight && offsetBottom < maxHeight) {
                setHeight(offsetBottom - 50);
            }
        };

        const handleMouseUp = () => {
            if (mouseMoveListener.current) {
                document.removeEventListener('mousemove', mouseMoveListener.current);
                mouseMoveListener.current = null;
            }
            if (mouseUpListener.current) {
                document.removeEventListener('mouseup', mouseUpListener.current);
                mouseUpListener.current = null;
            }
        };

        mouseUpListener.current = handleMouseUp;
        document.addEventListener('mouseup', mouseUpListener.current);
        mouseMoveListener.current = handleMouseMove;
        document.addEventListener('mousemove', mouseMoveListener.current);
    }, [setHeight]);

    return isSplitPanelOpen ? (
        <Drawer
            variant="persistent"
            anchor="bottom"
            open={isSplitPanelOpen}
            classes={{
                paper: styles.drawerPaper,
            }}
            SlideProps={{
                timeout: 0,
            }}
        >
            <Box className={styles.controlBar}>
                {fullMode && (
                    <Box display="flex" justifyContent="center" width="100%">
                        {!minimized && (
                            <IconButton onMouseDown={handleMouseDown} className={styles.dragHandle}>
                                <DragHandle />
                            </IconButton>
                        )}
                    </Box>
                )}
                <Box className={styles.control}>
                    {fullMode && (
                        <IconButton onClick={handleToggleResize}>
                            {minimized ? <Fullscreen /> : <FullscreenExit />}
                        </IconButton>
                    )}
                    <IconButton onClick={handleDrawerClose}>
                        <Close />
                    </IconButton>
                </Box>
            </Box>
            {!minimized && (
                <Box p={1} overflow="auto" className={styles.content}>
                    {children}
                </Box>
            )}
        </Drawer>
    ) : null;
};

export default SplitPanel;
