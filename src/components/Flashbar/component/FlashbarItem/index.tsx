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
import React, { FunctionComponent, useMemo } from 'react';
import { FlashbarMessage } from '../../types';
import MaterialAlert from '@mui/material/Alert';
import MaterialAlertTitle from '@mui/material/AlertTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import Button from '../../../Button';
import Box from '../../../../layouts/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 0,
    },
    muiAlertMessageOverride: {
        justifyContent: 'flex-start',
        borderRadius: 0,
    },
    childrenContainer: {
        flexDirection: 'row',
    },
    button: {
        '& .MuiButton-root': {
            backgroundColor: theme.palette.background.default,
        },
    },
    loading: {
        color: theme.palette.primary.contrastText,
    },
}));

const iconMapping = {
    success: <CheckCircleOutlineIcon fontSize="inherit" titleAccess="success" />,
    warning: <ReportProblemOutlinedIcon fontSize="inherit" titleAccess="warning" />,
    error: <CancelOutlinedIcon fontSize="inherit" titleAccess="error" />,
    info: <InfoOutlinedIcon fontSize="inherit" titleAccess="info" />,
};

const FlashbarItem: FunctionComponent<FlashbarMessage> = ({
    type = 'info',
    dismissible = false,
    loading = false,
    onDismiss,
    onButtonClick,
    buttonText,
    header,
    content,
}) => {
    const styles = useStyles({});
    const [show, setShow] = React.useState(true);

    const actions = useMemo(() => {
        return (
            <Box className={styles.button}>
                {buttonText && <Button onClick={onButtonClick}>{buttonText}</Button>}
                {dismissible && (
                    <IconButton
                        aria-label="Close"
                        onClick={() => {
                            onDismiss?.();
                            setShow(false);
                        }}
                        size="large"
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>
        );
    }, [buttonText, styles.button, onDismiss, onButtonClick, setShow, dismissible]);

    const body = useMemo(() => {
        const props = {
            severity: loading ? 'info' : type,
            iconMapping,
            action: actions,
            ...(loading && { icon: <CircularProgress className={styles.loading} size="16px" /> }),
        };

        return (
            <Paper>
                <MaterialAlert
                    variant="filled"
                    {...props}
                    classes={{ root: styles.root, message: styles.muiAlertMessageOverride }}
                >
                    {header && (
                        <Box role="heading" aria-level={1}>
                            <MaterialAlertTitle>{header}</MaterialAlertTitle>
                        </Box>
                    )}
                    <Box className={styles.childrenContainer}>{content}</Box>
                </MaterialAlert>
            </Paper>
        );
    }, [type, actions, header, content, loading, styles]);

    return <Box data-testid={type}>{show && body}</Box>;
};

export default FlashbarItem;
