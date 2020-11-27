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

import React, { FunctionComponent, ReactNode, MouseEvent } from 'react';
import MUICard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Text from '../Text';

export interface CardProps {
    /**
     * Title of the card
     * */
    title?: string;
    /**
     * Subtitle of the card
     * */
    subtitle?: string;
    /**
     * Content of the card
     * */
    children?: ReactNode;
    /**
     * Determine whether to highlight the card when mouse pointer is hovered on the card.
     */
    withHover?: boolean;
    /**
     * These props will be forwarded to the title
     */
    titleTypographyProps?: any;
    /**
     * Fired when the user clicks on the card.
     */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    /**
     * Fired when the mouse pointer is moved onto the card, or onto one of its children.
     */
    onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
    /**
     * Fired when moving the mouse pointer onto the card.
     */
    onMouseMove?: (event: MouseEvent<HTMLDivElement>) => void;
    /**
     * Fired when moving the mouse pointer out of the card.
     */
    onMouseOut?: (event: MouseEvent<HTMLDivElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: ({ withHover }: any) =>
        withHover && {
            '&:hover': {
                backgroundColor: theme.palette.info.light,
            },
        },
}));

/**
 * A Card renders the basic information of a resource
 * */
const Card: FunctionComponent<CardProps> = ({
    title = '',
    subtitle = '',
    titleTypographyProps = {},
    children,
    onClick,
    onMouseEnter,
    onMouseMove,
    onMouseOut,
    withHover,
}) => {
    const styles = useStyles({ withHover });
    const content = (
        <CardContent>
            {typeof children === 'string' ? <Text variant="p">{children}</Text> : <>{children}</>}
        </CardContent>
    );
    return (
        <MUICard
            className={styles.root}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseOut={onMouseOut}
        >
            <CardHeader title={title} subheader={subtitle} titleTypographyProps={titleTypographyProps} />
            {content}
        </MUICard>
    );
};

export default Card;
