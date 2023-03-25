### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-loadingindicator--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Default'>
    <LoadingIndicator/>
</Container>
```

```jsx
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='With label'>
    <LoadingIndicator label='Loading'/>
</Container>
```


```jsx
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Big'>
    <LoadingIndicator size='big'/>
</Container>
```

```jsx
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Large'>
    <LoadingIndicator size='large'/>
</Container>
```

```jsx
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Custom Size'>
    <LoadingIndicator size={10} />
</Container>
```