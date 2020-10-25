import React, { FunctionComponent } from 'react';
import PieChart, { Pie, NORTHSTAR_COLORS, Tooltip, Cell } from 'aws-northstar/charts/PieChart';
import { sumByItem } from '../../../../data';

const COLORS = [NORTHSTAR_COLORS.BLUE, NORTHSTAR_COLORS.ORANGE, NORTHSTAR_COLORS.GREY_500, NORTHSTAR_COLORS.GREEN];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}: any) => {
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
                {
                    sumByItem.map((entry: any, index: number) => <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}/>)
                }
            </Pie>
            <Tooltip/>
        </PieChart>
    )
}

export default PercentageSaleByItems;
