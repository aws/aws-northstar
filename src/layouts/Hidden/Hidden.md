### Examples

```jsx
import Hidden from 'aws-northstar/layouts/Hidden';
import Placeholder from 'aws-northstar/components/Placeholder';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='You should not see a me below breakpoint sm'>
    <Hidden smDown={true}>
        <Placeholder/>
    </Hidden>
</Container>
```