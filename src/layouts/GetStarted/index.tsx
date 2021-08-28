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
import React, { FunctionComponent, ReactNode, useRef, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Stack from '../Stack';
import Text from '../../components/Text';

const useStyles = makeStyles<Theme, { sidebarMarginTop: number }>((theme: Theme) => ({
    root: {},
    headerRow: {
        backgroundColor: theme.palette.primary.main,
        paddingTop: theme.spacing(4),
    },
    header: {
        padding: theme.spacing(1),
        color: theme.palette.primary.contrastText,
    },
    title: {
        fontSize: '44px',
        lineHeight: '50px',
    },
    subTitle: {
        fontSize: '44px',
        lineHeight: '50px',
        fontWeight: 300,
    },
    action: {
        padding: theme.spacing(1),
    },
    contentArea: {
        padding: theme.spacing(1),
        color: theme.palette.grey[900],
        marginBottom: theme.spacing(1),
    },
    sidebarArea: ({ sidebarMarginTop }) => ({
        padding: theme.spacing(1),
        marginTop: `${sidebarMarginTop}px`,
    }),
}));

export interface GetStartedProps {
    /**The category of the application, displayed in the header */
    category: string;
    /**The title of the application, displayed in the header */
    title: string;
    /**The subtitle of the application, displayed in the header */
    subTitle: string;
    /**The short description of the application, displayed in the header */
    description: string;
    /**The action for getting started with the application */
    action: ReactNode;
    /**The sidebar content for the application */
    sidebar: ReactNode;
    /**Main content area */
    children: ReactNode;
}

/**
 * Basic layout for Get Started page, with place holders for main content, sidebar and action.
 */
const GetStarted: FunctionComponent<GetStartedProps> = ({
    category,
    title,
    subTitle,
    description,
    action,
    sidebar,
    children,
}) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const actionRef = useRef<HTMLDivElement>(null);
    const [sidebarMarginTop, setSidebarMarginTop] = useState(-40);
    useEffect(() => {
        if (headerRef.current?.offsetHeight && actionRef.current?.offsetHeight) {
            const calc =
                (actionRef.current?.offsetTop || 0) +
                (actionRef.current?.offsetHeight || 0) -
                ((headerRef.current?.offsetTop || 0) + (headerRef.current?.offsetHeight || 0)) +
                10;
            setSidebarMarginTop(calc);
        }
    }, [
        setSidebarMarginTop,
        actionRef.current?.offsetTop,
        headerRef.current?.offsetTop,
        actionRef.current?.offsetHeight,
        headerRef.current?.offsetHeight,
    ]);
    const styles = useStyles({ sidebarMarginTop });

    return (
        <Grid container className={styles.root}>
            <Grid item xs={12} className={styles.headerRow}>
                <Grid container justify="center" ref={headerRef}>
                    <Grid item xs={10} lg={8} className={styles.header}>
                        <Text>{category}</Text>
                    </Grid>
                    <Grid item xs={10} sm={6} lg={5} xl={6} className={styles.header}>
                        <Stack>
                            <Typography variant="h1" className={styles.title}>
                                {title}
                            </Typography>
                            <Typography className={styles.subTitle}>{subTitle}</Typography>
                            <Text>{description}</Text>
                        </Stack>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3} xl={2} className={styles.action}>
                        <div ref={actionRef}>{action}</div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container justify="center">
                    <Grid item xs={10} sm={6} lg={5} xl={6} className={styles.contentArea}>
                        {children}
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3} xl={2} className={styles.sidebarArea}>
                        {sidebar}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GetStarted;
