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
import { Box, CircularProgress, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import StatusIndicator from '../StatusIndicator';
import Button from '../Button';
import Heading from '../Heading';
import Text from '../Text';

const useStyles = makeStyles((theme: Theme) => ({
    colorPrimary: {
        marginTop: '8px',
    },
    circularColorPrimary: {
        color: theme.palette.info.dark,
    },
    barColorPrimary: {
        backgroundColor: theme.palette.info.dark,
    },
    label: {
        color: theme.palette.text.primary,
    },
    description: {
        padding: theme.spacing(0.3, 0),
        color: theme.palette.text.secondary,
    },
    body: {
        display: 'inline-flex',
    },
    icon: {
        paddingTop: '4px',
    },
    resultButton: {
        marginLeft: '10px',
    },
}));

export interface ProgressBarProps {
    /** Percentage value of the progress */
    value?: number;
    /**
     * Use "in-progress" to display a progress bar.
     * "success" and "error" are result states and replace the progress element with a status indicator,
     * resultText and, if set, with a button containing resultButtonText.
     * */
    status?: 'in-progress' | 'success' | 'error';
    /**
     * Text for the button that gets displayed when status is set to "error" or "success".
     * If resultButtonText is empty, no button will be displayed. */
    resultButtonText?: string;
    /** Short information summarizing the operation */
    label?: string;
    /** More detailed information about the operation, rendered between the progress bar and label. */
    description?: string;
    /** Information that is displayed below the progress bar. */
    additionalInfo?: string;
    /** Content that is displayed whenever status is set to "error" or "success". */
    resultText?: string;
    /** Indicate whether to display heading above the progress bar */
    displayHeading?: boolean;
    /** Indicate whether to display value on the right end */
    displayValue?: boolean;
    /** Fired when the user triggers the result state button. */
    resultButtonClick?: () => void;
    /** Indicate what type of progress bar to render */
    variant?: 'linear' | 'circular';
}

interface ProgressBarComponentProps {
    value: number;
    displayValue: boolean;
    props?: any[];
}

const statusMapping: { [key in 'error' | 'success']: 'negative' | 'positive' } = {
    error: 'negative',
    success: 'positive',
};

const LinearProgressComponent: React.FunctionComponent<ProgressBarComponentProps> = ({
    value,
    displayValue,
    ...props
}) => {
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item xs={value && displayValue ? 11 : 12}>
                <LinearProgress
                    variant="determinate"
                    value={value || 100}
                    classes={{
                        colorPrimary: classes.colorPrimary,
                        barColorPrimary: classes.barColorPrimary,
                    }}
                    {...props}
                />
            </Grid>
            {displayValue && value && (
                <Grid item xs={1}>
                    <Text>{value}%</Text>
                </Grid>
            )}
        </Grid>
    );
};

const CircularProgressWithLabel: React.FunctionComponent<ProgressBarComponentProps> = ({
    value,
    displayValue,
    ...props
}) => {
    const classes = useStyles();

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                variant="static"
                value={value}
                classes={{ colorPrimary: classes.circularColorPrimary }}
                {...props}
            />
            {displayValue ? (
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                        value || 100
                    )}%`}</Typography>
                </Box>
            ) : (
                <></>
            )}
        </Box>
    );
};

/**
 * A progress bar is a horizontal progress-bar for indicating progress and activity.
 */
const ProgressBar: FunctionComponent<ProgressBarProps> = ({
    value,
    displayValue = true,
    status = 'in-progress',
    variant = 'linear',
    label,
    description,
    additionalInfo,
    resultText,
    resultButtonText,
    resultButtonClick,
}) => {
    const classes = useStyles();

    const progressBody = (
        ProgressBarComponent: React.FunctionComponent<ProgressBarComponentProps>
    ): React.ReactNode => {
        if (status === 'error' || status === 'success') {
            return (
                <div className={classes.body}>
                    <div className={classes.icon}>
                        <StatusIndicator statusType={statusMapping[status]}>{resultText}</StatusIndicator>
                    </div>
                    {resultButtonText && (
                        <div className={classes.resultButton}>
                            <Button onClick={resultButtonClick}>{resultButtonText}</Button>
                        </div>
                    )}
                </div>
            );
        }

        return <ProgressBarComponent value={value || 100} displayValue={displayValue} />;
    };

    const ProgressBarComponent = useMemo(
        () => (variant === 'linear' ? LinearProgressComponent : CircularProgressWithLabel),
        [variant]
    );

    return (
        <>
            {label && <Heading variant="h3">{label || ''}</Heading>}
            {description && (
                <Typography className={classes.description} variant="body1">
                    {description}
                </Typography>
            )}
            {progressBody(ProgressBarComponent)}
            {additionalInfo && (
                <Typography className={classes.description} variant="body1">
                    {additionalInfo}
                </Typography>
            )}
        </>
    );
};

export default ProgressBar;
