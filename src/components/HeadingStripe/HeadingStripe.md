### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/headingstripe" target="_blank">NorthStar Storybook</a>.

```jsx
import Container from 'aws-northstar/layouts/Container';
import Button from 'aws-northstar/components/Button';
import Inline from 'aws-northstar/layouts/Inline';

const actionButtons = (
    <Inline>
        <Button>Action</Button>
    </Inline>
);

<HeadingStripe title="Applications" actionButtons={actionButtons} />;
```
