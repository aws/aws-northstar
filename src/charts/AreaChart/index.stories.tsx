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
import React from 'react';
import AreaChart, { Area, YAxis, XAxis, Tooltip, NORTHSTAR_COLORS } from '.';

export default {
    component: AreaChart,
    title: 'Charts/AreaChart',
};

const sampleData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export const Default = () => (
    <AreaChart title="Simple Area Chart - With Title" width={400} height={200} data={sampleData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area dataKey="pv" fill={NORTHSTAR_COLORS.ORANGE} stroke={NORTHSTAR_COLORS.ORANGE} />
        <Area dataKey="uv" fill={NORTHSTAR_COLORS.GREEN} stroke={NORTHSTAR_COLORS.GREEN} />
        <Area dataKey="amt" fill={NORTHSTAR_COLORS.BLUE} stroke={NORTHSTAR_COLORS.BLUE} />
    </AreaChart>
);
