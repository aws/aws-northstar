### Examples

```jsx
import Badge from 'aws-northstar/components/Badge';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';

<Container headingVariant='h4' title='Numbers'>
    <Inline>
        <Badge content={10} />
        <Badge content={20} color="blue" />
        <Badge content={30} color="green" />
        <Badge content={40} color="red" />
    </Inline>
</Container>
```

```jsx
import Badge from 'aws-northstar/components/Badge';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';

<Container headingVariant='h4' title='String content'>
    <Inline>
        <Badge content="grey badge" />
        <Badge content="blue badge" color="blue" />
        <Badge content="green badge" color="green" />
        <Badge content="red badge" color="red" />
    </Inline>
</Container>
```
