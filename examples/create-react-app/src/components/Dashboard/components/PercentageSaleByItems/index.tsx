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
import PieChart, { Pie, NORTHSTAR_COLORS, Tooltip, Cell } from 'aws-northstar/charts/PieChart';
import { sumByItem } from '../../../../data';

const COLORS = [NORTHSTAR_COLORS.BLUE, NORTHSTAR_COLORS.ORANGE, NORTHSTAR_COLORS.GREY_500, NORTHSTAR_COLORS.GREEN];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="#545b64" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${sumByItem[index].item} (${(percent * 100).toFixed(0)}%)`}
        </text>
    );
};

const PercentageSaleByItems: FunctionComponent = () => {
    return (
        <PieChart title="Revenue by items (%)" width={380} height={250}>
            <Pie
                data={sumByItem}
                label={renderCustomizedLabel}
                fill={NORTHSTAR_COLORS.BLUE}
                dataKey="amount"
                nameKey="item"
            >
                {sumByItem.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default PercentageSaleByItems;
