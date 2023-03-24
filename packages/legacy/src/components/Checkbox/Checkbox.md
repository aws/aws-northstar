### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-checkbox--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import Checkbox from 'aws-northstar/components/Checkbox';
import Container from 'aws-northstar/layouts/Container';
<Container headingVariant='h4' title="Different states">
    <Checkbox>Default checkbox</Checkbox>
    <Checkbox checked={true}>Checked</Checkbox>
    <Checkbox checked={false}>Unchecked</Checkbox>
    <Checkbox disabled={true}>Disabled</Checkbox>
    <Checkbox indeterminate={true}>Indeterminate</Checkbox>
</Container>
```

```jsx
import Checkbox from 'aws-northstar/components/Checkbox';
import Container from 'aws-northstar/layouts/Container';
<Container headingVariant='h4' title="Checkbox with description">
    <Checkbox description="With description">Label</Checkbox>
</Container>
```
