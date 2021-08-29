### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/overlay" target="_blank">NorthStar Storybook</a>.

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
