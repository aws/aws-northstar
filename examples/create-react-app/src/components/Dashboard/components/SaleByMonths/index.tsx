import React, { FunctionComponent } from 'react';
import LineChart, { Line, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend } from 'aws-northstar/charts/LineChart';
import { sumByDate } from '../../../../data';

const SaleByMonths: FunctionComponent = () => {
    return (
        <LineChart title="Revenue timeline" width={350} height={250} data={sumByDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip/>
            <Legend />
            <Line dataKey="amount" 
                fill={NORTHSTAR_COLORS.BLUE} 
                stroke={NORTHSTAR_COLORS.BLUE} name="revenue" />
            <Line dataKey="discount" 
                fill={NORTHSTAR_COLORS.ORANGE} 
                stroke={NORTHSTAR_COLORS.ORANGE} />
        </LineChart>
    )
}

export default SaleByMonths;
