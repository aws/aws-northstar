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

import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    blue: {
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.info.contrastText,
    },
    grey: {
        backgroundColor: theme.palette.grey[600],
        color: theme.palette.info.contrastText,
    },
    green: {
        backgroundColor: theme.palette.success.dark,
        color: theme.palette.success.contrastText,
    },
    red: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.error.contrastText,
    },
}));

export interface BadgeProps {
    /** Indicates the badge color. */
    color?: 'blue' | 'grey' | 'green' | 'red';
    /** Text displayed inside the badge. */
    content: string | number;
}

/**
 * A badge is a small color-coded visual element, containing letters or numbers, that you can use to label, categorize or organize items.
 */
const Badge: FunctionComponent<BadgeProps> = ({ color = 'grey', content, ...props }) => {
    const classes = useStyles();
    return <Chip className={classes[color]} label={content} data-testid={props['data-testid']} />;
};

export default Badge;
