### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/barchart" target="_blank">NorthStar Storybook</a>.

```jsx
import BarChart, { Bar, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/BarChart';
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
    <BarChart title="Bar Chart - two data series" width={400} height={200} data={sampleData}>
        <Bar dataKey="pv" fill={NORTHSTAR_COLORS.ORANGE} stroke={NORTHSTAR_COLORS.ORANGE} />
        <Bar dataKey="uv" fill={NORTHSTAR_COLORS.BLUE} stroke={NORTHSTAR_COLORS.BLUE}/>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
    </BarChart>
</Container>
```

```jsx
import BarChart, { Bar, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/BarChart';
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
<Container headingVariant='h4' title='Spark Bar Chart'>
    <BarChart width={150} height={40} data={sampleData}>
        <Bar dataKey="uv" fill={NORTHSTAR_COLORS.GREEN} stroke={NORTHSTAR_COLORS.GREEN}/>
    </BarChart>
</Container>
```

#### More examples
Please refer to [Rechart Examples page](https://recharts.org/en-US/examples/SimpleBarChart) for more examples. 


