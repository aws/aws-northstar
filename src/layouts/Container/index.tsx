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

import React, { CSSProperties, ReactNode, FunctionComponent } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles<Theme, Partial<ContainerProps>>((theme: Theme) => ({
    containerRoot: {
        marginBottom: theme.spacing(2),
        boxShadow: '0 1px 1px 0 rgba(0,28,36,.3), 1px 1px 1px 0 rgba(0,28,36,.15), -1px 1px 1px 0 rgba(0,28,36,.15)',
    },
    containerHeader: {
        backgroundColor: theme.palette.grey[100],
        padding: (props) => (props.headerGutters ? '1rem 1rem 0.5rem 1rem' : 0),
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
    containerHeaderStripe: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '5px',
    },
    containerHeaderTitle: {
        maxWidth: '100%',
    },
    containerContent: {
        backgroundColor: theme.palette.background.paper,
        overflowX: 'auto',
        padding: (props) => (props.gutters ? '0.9rem 1rem' : 0),
    },
    containerSubtitle: {
        marginTop: '5px',
    },
    containerFooter: {
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        padding: '1rem',
        background: theme.palette.background.paper,
        display: 'flex',
        justifyContent: 'end',
    },
    noLineHeight: {
        lineHeight: 'initial',
    },
}));

export interface ContainerProps {
    /** Title of the stateful. */
    title?: string;
    /** Subtitle of the stateful. */
    subtitle?: string | ReactNode;
    /** Children components to render in the right portion of the header. Typically action buttons. */
    actionGroup?: ReactNode;
    /** Header content to display under the title. */
    headerContent?: ReactNode;
    /** Footer content to display under the main content. */
    footerContent?: ReactNode;
    /** Parameter to include gutters in content. */
    gutters?: boolean;
    /** Parameter to include gutters in header. */
    headerGutters?: boolean;
    /** The heading level */
    headingVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
    /** Style to apply */
    style?: CSSProperties;
}

/**
 * Containers allow users to view a group of related content.
 */
const Container: FunctionComponent<ContainerProps> = ({
    children,
    title,
    subtitle,
    actionGroup,
    headerContent,
    footerContent,
    gutters = true,
    headerGutters = true,
    headingVariant = 'h2',
    style,
}) => {
    const classes = useStyles({ gutters, headerGutters });
    return (
        <div style={style} className={classes.containerRoot}>
            {!title && !subtitle && !actionGroup && !headerContent ? null : (
                <div className={classes.containerHeader}>
                    <div className={classes.containerHeaderStripe}>
                        <div className={clsx(classes.containerHeaderTitle, classes.noLineHeight)}>
                            {title && (
                                <Typography variant={headingVariant} className={classes.noLineHeight}>
                                    {title}
                                </Typography>
                            )}
                            {subtitle && (
                                <Typography
                                    variant="subtitle1"
                                    component="div"
                                    className={clsx(classes.noLineHeight, classes.containerSubtitle)}
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </div>
                        <div>{actionGroup}</div>
                    </div>
                    {headerContent}
                </div>
            )}
            <div className={classes.containerContent}>{children}</div>
            {!footerContent ? '' : <div className={classes.containerFooter}>{footerContent}</div>}
        </div>
    );
};

export default Container;
