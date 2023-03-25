### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/charts-linechart--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import LineChart, { Line, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/LineChart';
import Container from 'aws-northstar/layouts/Container';

const sampleData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
];

<Container>
    <LineChart title="Line Chart - two data series" width={450} height={200} data={sampleData}>
        <Line dataKey="pv" fill={NORTHSTAR_COLORS.ORANGE} />
        <Line dataKey="uv" fill={NORTHSTAR_COLORS.BLUE} />
        <XAxis dataKey="name" angle={30} dy={10}/>
        <YAxis />
        <Tooltip />
    </LineChart>
</Container>
```

```jsx
import LineChart, { Line, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/LineChart';;
import Container from 'aws-northstar/layouts/Container';

const sampleData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
];

<Container>
    <LineChart title="Line Chart - with title, grid and legend" width={450} height={200} data={sampleData}>
            <XAxis dataKey="name" />
            <CartesianGrid strokeDasharray="1 1" />
            <YAxis/>
            <Tooltip />
            <Legend/>
            <Line dataKey="pv" stroke={NORTHSTAR_COLORS.ORANGE} fill={NORTHSTAR_COLORS.ORANGE}/>
            <Line dataKey="uv" stroke={NORTHSTAR_COLORS.BLUE} fill={NORTHSTAR_COLORS.BLUE}/>
        </LineChart>
</Container>
```

```jsx
import LineChart, { Line, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/LineChart';;
import Container from 'aws-northstar/layouts/Container';

const sampleData = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
];

<Container headingVariant='h4' title='Spark Line Chart'>
    <LineChart width={150} height={40} data={sampleData}>
            <Line dataKey="uv" fill={NORTHSTAR_COLORS.GREEN} stroke={NORTHSTAR_COLORS.BLUE}/>
    </LineChart>
</Container>
```

#### More examples
Please refer to [Rechart Examples page](https://recharts.org/en-US/examples/SimpleLineChart) for more examples. 
