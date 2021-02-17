### Examples

```jsx
import MarkdownTextarea from 'aws-northstar/components/MarkdownTextarea';
import Container from 'aws-northstar/layouts/Container';
import Stack from 'aws-northstar/layouts/Stack';

const [content, setContent] = React.useState('');
<Stack>
    <Container headingVariant='h4' title="Default">
        <MarkdownTextarea />
    </Container>

    <Container headingVariant='h4' title="Default with value">
        <MarkdownTextarea value="This is a textarea"/>
    </Container>

    <Container headingVariant='h4' title="Read Only">
        <MarkdownTextarea readOnly={true} value="# I am read only" />;
    </Container>

    <Container headingVariant='h4' title="Without Preview">
        <<MarkdownTextarea preview={false} hideToolbar={true} value="# This is a textarea with no preview" />;
    </Container>

    <Container headingVariant='h4' title="With No Toolbar">
        <MarkdownTextarea hideToolbar={true} value="# This is a textarea with no toolbar" />;
    </Container>

    <Container headingVariant='h4' title="With onChange">
        <>
        <MarkdownTextarea value={value} onChange={(e) => setContent(e.target.value)} />
        <div>
            Content: {content}
        </div>
        </>
    </Container>
</Stack>
```