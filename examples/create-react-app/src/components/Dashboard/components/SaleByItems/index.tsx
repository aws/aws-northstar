import React from 'react';
import BarChart, { Bar, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend } from 'aws-northstar/charts/BarChart';
import { sumByItem } from '../../../../data';

const SaleByItems = () => {
    return (
        <BarChart title="Revenue and discount by items" width={350} height={250} data={sumByItem}>
            <XAxis dataKey="item" />
            <YAxis />
            <Tooltip/>
            <Legend />
            <Bar dataKey="amount" 
                fill={NORTHSTAR_COLORS.BLUE} 
                stroke={NORTHSTAR_COLORS.BLUE}
                stackId="a" name="revenue"/>
            <Bar dataKey="discount" 
                fill={NORTHSTAR_COLORS.ORANGE} 
                stroke={NORTHSTAR_COLORS.ORANGE}
                stackId="a"/>
        </BarChart>
    )
}

export default SaleByItems;
