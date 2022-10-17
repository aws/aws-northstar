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
import MaterialAlert from '@material-ui/lab/Alert';
import MaterialAlertTitle from '@material-ui/lab/AlertTitle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../../../Button';
import Box from '../../../../layouts/Box';
import useUniqueId from '../../../../hooks/useUniqueId';

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
    ...props
}) => {
    const styles = useStyles({});
    const [show, setShow] = React.useState(true);
    const id = useUniqueId(props.id);

    const testId = props['data-testid'] || `flashbar-item-${id}`;

    const actions = useMemo(() => {
        return (
            <Box className={styles.button}>
                {buttonText && <Button onClick={onButtonClick}>{buttonText}</Button>}
                {dismissible && (
                    <IconButton
                        aria-label="Close"
                        data-testid={`${testId}-dismiss-button`}
                        onClick={() => {
                            onDismiss?.();
                            setShow(false);
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </Box>
        );
    }, [buttonText, styles.button, onDismiss, onButtonClick, setShow, dismissible, testId]);

    const body = useMemo(() => {
        const props = {
            severity: loading ? 'info' : type,
            iconMapping,
            action: actions,
            'data-testid': `${testId}-body`,
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
    }, [type, actions, header, content, loading, styles, testId]);

    return <Box data-testid={testId}>{show && body}</Box>;
};

export default FlashbarItem;
