### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path==/story/charts-areachart--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import AreaChart, { Area, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/AreaChart';
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
    <AreaChart title="Simple Area Chart" width={450} height={200} data={sampleData}>
        <Area dataKey="pv" fill={NORTHSTAR_COLORS.ORANGE} stroke={NORTHSTAR_COLORS.ORANGE}/>
        <XAxis dataKey="name" angle={30} dy={10}/>
        <YAxis />
        <Tooltip />
    </AreaChart>
</Container>
```

```jsx
import AreaChart, { Area, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/AreaChart';
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
    <AreaChart title="Area Chart - two data series" width={450} height={200} data={sampleData}>
        <Area dataKey="pv" fill={NORTHSTAR_COLORS.GREEN} stroke={NORTHSTAR_COLORS.GREEN}/>
        <Area dataKey="uv" fill={NORTHSTAR_COLORS.BLUE} stroke={NORTHSTAR_COLORS.BLUE}/>
        <XAxis dataKey="name" angle={30} dy={10}/>
        <YAxis />
        <Tooltip />
    </AreaChart>
</Container>
```

```jsx
import AreaChart, { Area, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend, CartesianGrid } from 'aws-northstar/charts/AreaChart';
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
<Container headingVariant='h4' title='Area Chart - with X/Y axis, tooltips and legend'>
    <AreaChart title="Simple Area Chart" width={450} height={200} data={sampleData}>
        <Area dataKey="pv" fill={NORTHSTAR_COLORS.CHARCOAL} stroke={NORTHSTAR_COLORS.CHARCOAL}/>
        <Area dataKey="uv" fill={NORTHSTAR_COLORS.ORANGE} stroke={NORTHSTAR_COLORS.ORANGE}/>
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="1 1" />
        <YAxis/>
        <Tooltip />
        <Legend/>
        <YAxis />
        <Tooltip />
    </AreaChart>
</Container>
```

#### More examples
Please refer to [Rechart Examples page](https://recharts.org/en-US/examples/SimpleAreaChart) for more examples. 
