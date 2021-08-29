### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/piechart" target="_blank">NorthStar Storybook</a>.

```jsx
import PieChart, { Pie, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/PieChart';
import Container from 'aws-northstar/layouts/Container';

const sampleData = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

<Container>
    <PieChart title="Simple Pie Chart" width={450} height={200}>
        <Pie data={sampleData} 
        dataKey="value" 
        fill={NORTHSTAR_COLORS.ORANGE}
        stroke={NORTHSTAR_COLORS.WHITE}/>
    </PieChart>
</Container>
```

```jsx
import PieChart, { Pie, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/PieChart';
import Container from 'aws-northstar/layouts/Container';

const sampleData = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 }
];

<Container>
    <PieChart title="Pie chart - with legend" width={450} height={200}>
        <Pie data={sampleData} dataKey="value" 
          fill={NORTHSTAR_COLORS.BLUE}
          stroke={NORTHSTAR_COLORS.WHITE} 
          label/>
        <Legend/>
    </PieChart>
</Container>
```

```jsx
import PieChart, { Pie, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/PieChart';
import Container from 'aws-northstar/layouts/Container';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, 
  { name: 'Group D', value: 200 },
];

const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

<Container>
    <PieChart title="Complex Pie Chart - two data series" width={450} height={250}>
        <Pie data={data01} dataKey="value" outerRadius={60} 
          fill={NORTHSTAR_COLORS.BLUE} 
          stroke={NORTHSTAR_COLORS.WHITE} />
        <Pie data={data02} dataKey="value" 
          stroke={NORTHSTAR_COLORS.WHITE} 
          fill={NORTHSTAR_COLORS.ORANGE} 
          innerRadius={70} 
          outerRadius={90} label/>
    </PieChart>
</Container>
```

#### More examples
Please refer to [Rechart Examples page](https://recharts.org/en-US/examples/TwoLevelPieChart) for more examples. 