### Examples

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
