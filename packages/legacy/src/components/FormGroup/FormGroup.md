### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/formgroup" target="_blank">NorthStar Storybook</a>.

```jsx
import FormGroup from 'aws-northstar/components/FormGroup';
import Checkbox from 'aws-northstar/components/Checkbox';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Default'>
    <FormGroup>
        <Checkbox>Default checkbox</Checkbox>
        <Checkbox checked={true}>Checked</Checkbox>
        <Checkbox checked={false}>Unchecked</Checkbox>
        <Checkbox disabled={true}>Disabled</Checkbox>
        <Checkbox indeterminate={true}>Indeterminate</Checkbox>
    </FormGroup>
</Container>
```

```jsx
import FormGroup from 'aws-northstar/components/FormGroup';
import Checkbox from 'aws-northstar/components/Checkbox';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Row'>
    <FormGroup row>
        <Checkbox>Default checkbox</Checkbox>
        <Checkbox checked={true}>Checked</Checkbox>
        <Checkbox checked={false}>Unchecked</Checkbox>
        <Checkbox disabled={true}>Disabled</Checkbox>
        <Checkbox indeterminate={true}>Indeterminate</Checkbox>
    </FormGroup>
</Container>
```



