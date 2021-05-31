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

import React, { ReactNode } from 'react';
import { AreaChart as Chart, Area as AreaComponent, AreaProps } from 'recharts';
import { makeStyles } from '@material-ui/core';
import Box from '../../layouts/Box';
import Stack from '../../layouts/Stack';
import Heading from '../../components/Heading';
import withNorthStarChart from '../withNorthStarChart';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        width: 'fit-content',
        padding: '10px',
    },
});

/**
 * Area Chart properties.
 */
export interface AreaChartProps {
    /** Title of the chart */
    title?: string;
    /** The width of the chart container in px. */
    width: number;
    /** The height of the chart container in px. */
    height?: number;
    /** The source data, in which each element is an object. [{name: 'a', value: 12, ....}] */
    data: any[];
    /** Children to render */
    children: ReactNode;
}

/**
 * Renders an Area Chart.
 */
function AreaChart(props: AreaChartProps) {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Stack>
                {props.title && <Heading variant="h3">{props.title}</Heading>}
                <Chart {...props}>{props.children}</Chart>
            </Stack>
        </Box>
    );
}

const Area = withNorthStarChart<AreaProps>(AreaComponent, 'monotone');

export default AreaChart;
export { Area };
export { NORTHSTAR_COLORS } from '../../themes';
export {
    Tooltip,
    Legend,
    ReferenceArea,
    ReferenceDot,
    Customized,
    Brush,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Label,
    LabelList,
} from 'recharts';
