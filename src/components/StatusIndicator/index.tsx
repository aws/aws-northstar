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

import React, { FunctionComponent, ReactNode } from 'react';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '../../layouts/Box';
import Text from '../Text';

export interface StatusIndicatorProps {
    /** The state of the resource */
    statusType: 'positive' | 'negative' | 'warning' | 'info';
    /** Content to show in the status indicator */
    children?: ReactNode | string;
}

const getIconByStatusType = (statusType: string, title?: string) => {
    const icons = {
        positive: CheckCircleOutlineOutlinedIcon,
        negative: CancelOutlinedIcon,
        warning: ReportProblemOutlinedIcon,
    };
    const IconComponent = icons[statusType] ?? InfoOutlinedIcon;
    return <IconComponent fontSize="small" titleAccess={title} />;
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& span': {
            marginLeft: '2px',
        },
    },
    positive: {
        color: theme.palette.success.dark,
    },
    negative: {
        color: theme.palette.warning.dark,
    },
    info: {
        color: theme.palette.info.dark,
    },
}));

/**
 * A status indicator is a small component that communicates the state of a resource (either in its entirety,
 * or a particular facet of a resource) in a compact form that is easily embedded in a card, table, list or header view.
 */
const StatusIndicator: FunctionComponent<StatusIndicatorProps> = ({ statusType, children }) => {
    const styles = useStyles({});
    const variantMap = {
        positive: styles.positive,
        negative: styles.negative,
        warning: styles.negative,
        info: styles.info,
    };
    const className = clsx(styles.root, variantMap[statusType]);
    return (
        <Box className={className}>
            {getIconByStatusType(statusType, children?.toString())}
            <Text>{children}</Text>
        </Box>
    );
};

export default StatusIndicator;
