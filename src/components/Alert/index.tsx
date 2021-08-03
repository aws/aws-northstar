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

import React, { ReactNode, FunctionComponent, useCallback, useMemo } from 'react';
import MaterialAlert, { AlertProps as MaterialAlertProps } from '@material-ui/lab/Alert';
import MaterialAlertTitle from '@material-ui/lab/AlertTitle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import Button from '../Button';
import Box from '../../layouts/Box';

export type AlertType = 'error' | 'info' | 'success' | 'warning';

const useStyles = makeStyles((theme: Theme) => ({
    muiAlertMessageOverride: {
        justifyContent: 'flex-start',
        whiteSpace: 'pre-wrap',
    },
    childrenContainer: {
        flexDirection: 'row',
        wordWrap: 'break-word',
    },
    noBorderRadius: {
        borderRadius: 0,
    },
}));

const iconMapping = {
    success: <CheckCircleOutlineIcon fontSize="inherit" titleAccess="success" />,
    warning: <ReportProblemOutlinedIcon fontSize="inherit" titleAccess="warning" />,
    error: <CancelOutlinedIcon fontSize="inherit" titleAccess="error" />,
    info: <InfoOutlinedIcon fontSize="inherit" titleAccess="info" />,
};

export interface AlertProps {
    /** Indicates the type of the message to be displayed. Available options 'error' | 'info' | 'success' | 'warning' */
    type?: AlertType;
    /** Determines whether the alert is displayed to the user or not. */
    visible?: boolean;
    /** If true, the component will include a close button in the UI. */
    dismissible?: boolean;
    /** Aria-label for the dismiss button */
    dismissAriaLabel?: string;
    /** Heading text */
    header?: string;
    /** Alert content*/
    children?: ReactNode;
    /** Displays an action button next to the message area when set. */
    buttonText?: string;
    /** Determines whether the border has radius.*/
    borderRadius?: boolean;
    /**
     * Fired when the user clicks on the close icon that is displayed
     * and dismissible property is set to true.
     */
    onDismiss?: () => void;
    /** Fired when the user clicks on the action button. */
    onButtonClick?: () => void;
}

/**
    An alert helps the user know when they need to pay attention to a relatively small piece of information or when they need to take a special action.
**/
const Alert: FunctionComponent<AlertProps> = ({
    visible = true,
    onDismiss,
    onButtonClick,
    dismissAriaLabel = 'Close',
    buttonText = '',
    borderRadius = true,
    ...props
}: AlertProps) => {
    const styles = useStyles({});
    const [show, setShow] = React.useState(true);

    const handleButtonClick = useCallback(
        (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            event.preventDefault();
            onButtonClick?.();
        },
        [onButtonClick]
    );

    const actionButton = useMemo(
        () => <>{buttonText && <Button onClick={handleButtonClick}>{buttonText}</Button>}</>,
        [buttonText, handleButtonClick]
    );

    const closeButton = useMemo(
        () => (
            <>
                {actionButton}
                {show && (
                    <IconButton
                        aria-label={dismissAriaLabel}
                        onClick={() => {
                            setShow(false);
                            onDismiss?.();
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                )}
            </>
        ),
        [actionButton, dismissAriaLabel, show, onDismiss, setShow]
    );

    const mapProps = useCallback(
        (alertType: 'dismissible' | 'pinned', { type = 'info' }: AlertProps): MaterialAlertProps => {
            return {
                severity: type,
                iconMapping,
                action: alertType === 'dismissible' ? closeButton : actionButton,
            };
        },
        [closeButton, actionButton]
    );

    const renderAlertBody = useCallback(
        ({ header, children }: AlertProps, materialProps: MaterialAlertProps): ReactNode => (
            <MaterialAlert
                variant="outlined"
                {...materialProps}
                classes={{
                    message: styles.muiAlertMessageOverride,
                    root: clsx({ [styles.noBorderRadius]: !borderRadius }),
                }}
            >
                {header && (
                    <div role="heading" aria-level={1}>
                        <MaterialAlertTitle>{header}</MaterialAlertTitle>
                    </div>
                )}
                <div className={styles.childrenContainer}>{children}</div>
            </MaterialAlert>
        ),
        [styles, borderRadius]
    );

    const renderAlert = useCallback(
        ({ dismissible, ...props }: AlertProps): ReactNode =>
            renderAlertBody(props, mapProps(dismissible ? 'dismissible' : 'pinned', props)),
        [renderAlertBody, mapProps]
    );

    return (
        <Box data-testid={props.type} width="100%">
            {visible && show && renderAlert(props)}
        </Box>
    );
};

export default Alert;
