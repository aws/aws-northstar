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

import React, { Fragment, FunctionComponent, ReactElement, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';
import LaunchOutlined from '@material-ui/icons/LaunchOutlined';
import Stack from '../../layouts/Stack';
import Link from '../Link';
import Box from '../../layouts/Box';
import LoadingIndicator from '../LoadingIndicator';
import Heading from '../Heading';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        fontSize: '18px',
        padding: '20px 56px 20px 30px',
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    content: {
        paddingTop: '10px',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    divider: {
        marginTop: '25px',
        marginBottom: '25px',
    },
    learnMore: {
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            marginLeft: theme.spacing(0.5),
        },
    },
}));

export interface HelpPanelProps {
    /** Header to display */
    header?: string;
    /** List of links to documentation */
    learnMoreFooter?: ReactElement<typeof Link>[];
    /** Renders the help panel in a loading state */
    loading?: boolean;
}

/** A help panel, designed to be rendered as part of the App Layout */
const HelpPanel: FunctionComponent<HelpPanelProps> = ({
    header: headerLabel = '',
    children,
    learnMoreFooter,
    loading = false,
}) => {
    const styles = useStyles();

    const header = useMemo(() => {
        return (
            <Box className={styles.header}>
                <Heading variant="h2">{headerLabel}</Heading>
            </Box>
        );
    }, [headerLabel, styles]);

    const content = useMemo(() => {
        return (
            <Box className={styles.content}>
                {children}
                {learnMoreFooter && (
                    <>
                        <Divider className={styles.divider} />
                        <Stack spacing="s">
                            <Typography variant="h3" className={styles.learnMore}>
                                Learn more <LaunchOutlined fontSize="small" />
                            </Typography>
                            {learnMoreFooter.map((link, index) => (
                                <Fragment key={index}>{link}</Fragment>
                            ))}
                        </Stack>
                    </>
                )}
            </Box>
        );
    }, [children, learnMoreFooter, styles]);

    return (
        <Box>
            {loading && <LoadingIndicator />}
            {!loading && (
                <>
                    {header}
                    <Divider />
                    {content}
                </>
            )}
        </Box>
    );
};

export default HelpPanel;
