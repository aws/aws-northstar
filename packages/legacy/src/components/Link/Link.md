### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-link--normal" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import Link from 'aws-northstar/components/Link';
import { BrowserRouter } from 'react-router-dom';
import Container from 'aws-northstar/layouts/Container';

<BrowserRouter>
    <Container headingVariant='h4' title='Normal link' subtitle='For navigating from one page to another within the service, a simple anchor tag will be rendered.'>
        <Link href="/route1">Normal link</Link>
    </Container>
</BrowserRouter>
```

```jsx
import Link from 'aws-northstar/components/Link';
import { BrowserRouter } from 'react-router-dom';
import Container from 'aws-northstar/layouts/Container';

<BrowserRouter>
    <Container headingVariant='h4' title='Navigation panel link' subtitle='For links inside the Navigation Panel, the underline text decoration when hover should be disabled.'>
        <Link href="/route1" underlineHover={false}>Navigation link</Link>
    </Container>
</BrowserRouter>
```

```jsx
import Link from 'aws-northstar/components/Link';
import { BrowserRouter } from 'react-router-dom';
import Container from 'aws-northstar/layouts/Container';

<BrowserRouter>
    <Container headingVariant='h4' title='External link' subtitle='For navigating outside of the service, a normal link with an external icon after it will be rendered'>
        <Link href="https://www.amazon.com/">External link</Link>
    </Container>
</BrowserRouter>
```