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
        <MarkdownTextarea value="# This is a MarkdownTextarea\n\rSo nice to have markdown 😀 "/>
    </Container>

    <Container headingVariant='h4' title="Read Only">
        <MarkdownTextarea readOnly={true} value="# I am a read only MarkdownTextarea" />
    </Container>

    <Container headingVariant='h4' title="Without Preview">
        <MarkdownTextarea visible={false} value="# This is a MarkdownTextarea with no preview" />
    </Container>

    <Container headingVariant='h4' title="With onChange">
        <>
        <MarkdownTextarea value={content} onChange={(editor, data, value) => setContent(value)} />
        <div>
            Content: {content}
        </div>
        </>
    </Container>
</Stack>
```