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

    <Container headingVariant='h4' title="Error">
        <MarkdownTextarea placeholder="Error" invalid={true} />
    </Container>

    <Container headingVariant='h4' title="Read Only">
        <MarkdownTextarea placeholder="This is a readOnly textarea" readonly={true} />
    </Container>

    <Container headingVariant='h4' title="Disabled">
        <MarkdownTextarea placeholder="This is a disabled textarea" disabled={true} />
    </Container>

    <Container headingVariant='h4' title="With onChange">
        <>
        <MarkdownTextarea placeholder="This is a disabled textarea" onChange={(e) => setContent(e.target.value)} />
        <div>
            Content: {content}
        </div>
        </>
    </Container>
</Stack>
```