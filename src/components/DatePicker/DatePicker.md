### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/datepicker" target="_blank">NorthStar Storybook</a>.

```jsx
import DatePicker from 'aws-northstar/components/DatePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="Default">
  <DatePicker />
</Container>
```

```jsx
import DatePicker from 'aws-northstar/components/DatePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="Disabled">
  <DatePicker disabled={true}/>
</Container>
```

```jsx
import DatePicker from 'aws-northstar/components/DatePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="Read only">
  <DatePicker readOnly={true} value={new Date()} />
</Container>
```

```jsx
import DatePicker from 'aws-northstar/components/DatePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="With placeholder text">
  <DatePicker placeholder={"custom placeholder"}/>
</Container>
```
```jsx
import DatePicker from 'aws-northstar/components/DatePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="With custom locale (Russian)">
  <DatePicker locale={'ru'}/>
</Container>
```

```jsx
import DatePicker from 'aws-northstar/components/DatePicker';
import Container from 'aws-northstar/layouts/Container'; 
<Container headingVariant='h4' title="With disabled days (weekends)">
  <DatePicker isDateDisabled={(date) => date.getDay() === 0 || date.getDay() === 6}/>
</Container>
```