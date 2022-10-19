### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/timepicker" target="_blank">NorthStar Storybook</a>.

```jsx
import TimePicker from 'aws-northstar/components/TimePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="Default">
  <TimePicker />
</Container>
```

```jsx
import TimePicker from 'aws-northstar/components/TimePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="24h Clock">
  <TimePicker twentyFourHourClock />
</Container>
```

```jsx
import TimePicker from 'aws-northstar/components/TimePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="Disabled">
  <TimePicker disabled={true}/>
</Container>
```

```jsx
import TimePicker from 'aws-northstar/components/TimePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="Read only">
  <TimePicker readOnly={true} value={new Date()} />
</Container>
```

```jsx
import TimePicker from 'aws-northstar/components/TimePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="With placeholder text">
  <TimePicker placeholder={"custom placeholder"}/>
</Container>
```
