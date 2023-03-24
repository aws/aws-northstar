### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/layouts-container--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import Container from 'aws-northstar/layouts/Container';
import Text from 'aws-northstar/components/Text';

<Container headingVariant='h4' 
    title="Container example" 
    subtitle="description">
    <Text>This is my text body...</Text>
</Container>
```

```jsx
import Container from 'aws-northstar/layouts/Container';
import Text from 'aws-northstar/components/Text';
import Button from 'aws-northstar/components/Button';

<Container
    title="Container example"
    subtitle="description"
    footerContent={<Text>Footer content</Text>}
    headerContent={<Text>Header content</Text>}
    actionGroup={<Button variant='primary'>Action</Button>}
>
    <Text>This is my text body...</Text>
</Container>
```

