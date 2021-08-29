### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/keyvaluepair" target="_blank">NorthStar Storybook</a>.

```jsx
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import Link from 'aws-northstar/components/Link';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
import Stack from 'aws-northstar/layouts/Stack';

const ExternalLink = (
    <Link href="https://www.amazon.com" target="_blank">
        Value with external link
    </Link>
);

const Status = <StatusIndicator statusType="positive">Available</StatusIndicator>;

<Container headingVariant='h4' title="Examples" subtitle="A list of key value pairs with empty value, string value, status indicator value and external link value">
    <ColumnLayout>
        <Column key="column1">
            <Stack>
                <KeyValuePair label="Distribution Id" value="SLCCSMWOHOFUY0"></KeyValuePair>
                <KeyValuePair label="Domain name" value="bbb.cloudfront.net"></KeyValuePair>
                <KeyValuePair label="ARN" value={ExternalLink}></KeyValuePair>
            </Stack>
        </Column>
        <Column key="column2">
            <Stack>
                <KeyValuePair label="Status" value={Status}></KeyValuePair>
                <KeyValuePair label="Price class" value="Use only US, Canada, Europe, and Asia"></KeyValuePair>
                <KeyValuePair label="CNAMEs"></KeyValuePair>
            </Stack>
        </Column>
        <Column key="column3">
            <Stack>
                <KeyValuePair label="SSL certificate" value="Default CloudFront SSL certificate"></KeyValuePair>
                <KeyValuePair label="Custom SSL client support"></KeyValuePair>
                <KeyValuePair label="Logging" value="Off"></KeyValuePair>
            </Stack>
        </Column>
    </ColumnLayout>
</Container> 
```