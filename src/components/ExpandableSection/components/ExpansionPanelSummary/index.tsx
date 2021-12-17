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
import React, { FunctionComponent, ReactNode, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { Variant } from '../../types';
import Box from '../../../../layouts/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        '&:hover': {
            color: theme.palette.grey[900],
        },
    },
    rootContainer: {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[900],
        '& .MuiAccordionSummary-content': {
            padding: '10px 16px',
            margin: 0,
        },
    },
    header: {
        fontSize: '14px',
    },
    headerContainer: {
        fontWeight: 700,
    },
}));

interface ExpansionPanelSummaryProps {
    variant: Variant;
    expanded: boolean;
    header: ReactNode;
    description?: ReactNode;
}

const ExpansionPanelSummary: FunctionComponent<ExpansionPanelSummaryProps> = ({
    variant,
    expanded,
    header,
    description,
    ...props
}) => {
    const styles = useStyles();
    const isContainer = variant === 'container';
    return (
        <AccordionSummary
            {...props}
            className={clsx({
                [styles.rootContainer]: isContainer,
                [styles.root]: !isContainer,
            })}
        >
            <Box width="100%">
                <Box display="flex" alignItems="center">
                    {expanded ? <ExpandLess transform="rotate(180)" /> : <ExpandMore transform="rotate(-90)" />}
                    {typeof header === 'string' ? (
                        <Typography
                            className={clsx(
                                { [styles.header]: !isContainer },
                                { [styles.headerContainer]: isContainer }
                            )}
                            variant="h3"
                        >
                            {header}
                        </Typography>
                    ) : (
                        header
                    )}
                </Box>
                <Box pl={2.4}>
                    {description && typeof description === 'string' ? (
                        <Typography variant="body2" component="span">
                            {description}
                        </Typography>
                    ) : (
                        description
                    )}
                </Box>
            </Box>
        </AccordionSummary>
    );
};

export default memo(ExpansionPanelSummary);
