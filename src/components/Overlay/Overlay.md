### Examples

```jsx
import Box from 'aws-northstar/layouts/Box';
import Container from 'aws-northstar/layouts/Container';
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';

const mainContent = (
    <Box width="100%" height="1000px" position="relative">
        Main Content
        <Overlay>
            <LoadingIndicator size="large" />
        </Overlay>
    </Box>
);

<Container title="Default">{mainContent}</Container>;
```
