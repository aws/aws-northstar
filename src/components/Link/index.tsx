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

import React, { ReactNode, FunctionComponent, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as MaterialLink } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Launch from '@material-ui/icons/Launch';
import clsx from 'clsx';

export interface LinkProps {
    /** The link's destination */
    href: string;
    /** The node to be displayed */
    children: ReactNode;
    /** Where to open the linked document */
    target?: string;
    /** Indicates whether the text is decorated with an underline when hovered */
    underlineHover?: boolean;
    /** Callback when the link is clicked */
    onClick?: () => void;
    /** Whether to render the link as external link to open in the new tab if it is an internal link */
    forceExternal?: boolean;
}

const externalPattern = /^((https?):\/\/)/;

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
    launchIcon: {
        verticalAlign: 'middle',
        width: '16px',
        marginLeft: '3px',
    },
    noneDecorationHover: {
        '&:hover': {
            textDecoration: 'none',
        },
    },
}));

/** A link is an anchor tag that defines a hyperlink, which a user can click to find out more information about a concept, task, or field. */
const Link: FunctionComponent<LinkProps> = ({
    target = '_self',
    children,
    href,
    underlineHover = true,
    forceExternal = false,
    onClick = () => {},
}) => {
    const classes = useStyles({});
    const isExternal = useMemo(() => forceExternal || externalPattern.test(href), [forceExternal, href]);

    const renderExternalIcon = (isExternal: boolean) =>
        isExternal ? <Launch className={classes.launchIcon} titleAccess="launch" /> : null;

    return (
        <MaterialLink
            component={!isExternal ? RouterLink : 'a'}
            className={clsx(classes.link, { [classes.noneDecorationHover]: !underlineHover })}
            target={target}
            href={href}
            to={href}
            variant="body1"
            rel={isExternal ? 'noreferrer' : ''}
            onClick={onClick}
        >
            {children}
            {renderExternalIcon(isExternal)}
        </MaterialLink>
    );
};

export default Link;
