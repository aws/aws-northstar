### Examples

```jsx
import Textarea from 'aws-northstar/components/Textarea';
import Container from 'aws-northstar/layouts/Container';
import Stack from 'aws-northstar/layouts/Stack';

const [content, setContent] = React.useState('');
<Stack>
    <Container headingVariant='h4' title="Default">
        <Textarea />
    </Container>

    <Container headingVariant='h4' title="Default with value">
        <Textarea value="This is a textarea"/>
    </Container>

    <Container headingVariant='h4' title="Error">
        <Textarea placeholder="Error" invalid={true} />
    </Container>

    <Container headingVariant='h4' title="Read Only">
        <Textarea placeholder="This is a readOnly textarea" readonly={true} />
    </Container>

    <Container headingVariant='h4' title="Disabled">
        <Textarea placeholder="This is a disabled textarea" disabled={true} />
    </Container>

    <Container headingVariant='h4' title="With onChange">
        <>
        <Textarea placeholder="This is a disabled textarea" onChange={(e) => setContent(e.target.value)} />
        <div>
            Content: {content}
        </div>
        </>
    </Container>

    <Container headingVariant='h4' title="With onKeyUp">
        <>
            <Textarea placeholder="This is a textarea with onKeyUp" onKeyUp={(e) => setContent(e.key)} />
            <div>
                Key Down: {content}
            </div>
        </>
    </Container>

    <Container headingVariant='h4' title="With onKeyDown">
        <>
            <Textarea placeholder="This is a textarea with onKeyDown" onKeyDown={(e) => setContent(e.key)} />
            <div>
                Key Up: {content}
            </div>
        </>
    </Container>
</Stack>
```