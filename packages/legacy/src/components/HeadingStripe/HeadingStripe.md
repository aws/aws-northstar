### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-headingstripe--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

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
