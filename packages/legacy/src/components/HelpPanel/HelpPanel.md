### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-helppanel--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

Default
```jsx
import { BrowserRouter } from 'react-router-dom';
import Link from 'aws-northstar/components/Link';
import Text from 'aws-northstar/components/Text';
import Heading from 'aws-northstar/components/Heading';

const footerLinks = [
    <Link href="/docs">Link to internal documentation</Link>,
    <Link href="https://www.amazon.com">Link to external documentation</Link>,
];

const content = (
    <>
        <Text variant="p">
            This is a paragraph with some <b>bold text</b> and also some <i>italic text.</i>
        </Text>
        <Heading variant="h4">h4 section header</Heading>
        <Heading variant="h5">h5 section header</Heading>
    </>
);

<BrowserRouter>
    <HelpPanel header="Help panel title" learnMoreFooter={footerLinks}>
        {content}
    </HelpPanel>
</BrowserRouter>
```

Loading
```jsx
<HelpPanel loading={true} />
```