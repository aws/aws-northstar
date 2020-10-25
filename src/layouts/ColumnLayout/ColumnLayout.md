### Examples

ColumnLayout with dividers

```jsx 
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import Box from 'aws-northstar/layouts/Box';

const DemoBox = ({content, bgcolor}) => {
    return <Box display="flex" width='100%' height='300px' bgcolor={bgcolor} alignItems="center" justifyContent="center">
        {content}
    </Box>;
}

<ColumnLayout>
    <Column key="column1">
       <DemoBox content='Column 1' bgcolor='grey.100'/>
    </Column>
    <Column key="column2">
        <DemoBox content='Column 2' bgcolor='grey.200'/>
    </Column>
    <Column key="column3">
        <DemoBox content='Column 3' bgcolor='grey.300'/>
    </Column>
</ColumnLayout>
```


ColumnLayout without dividers

```jsx 
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import Box from 'aws-northstar/layouts/Box';

const DemoBox = ({content, bgcolor}) => {
    return <Box display="flex" width='100%' height='300px' bgcolor={bgcolor} alignItems="center" justifyContent="center">
        {content}
    </Box>;
}

<ColumnLayout renderDivider={false}>
    <Column key="column1">
       <DemoBox content='Column 1' bgcolor='grey.100'/>
    </Column>
    <Column key="column2">
        <DemoBox content='Column 2' bgcolor='grey.200'/>
    </Column>
    <Column key="column3">
        <DemoBox content='Column 3' bgcolor='grey.300'/>
    </Column>
</ColumnLayout>
```

```jsx
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import Container from 'aws-northstar/layouts/Container';
import Link from 'aws-northstar/components/Link';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Stack from 'aws-northstar/layouts/Stack';

const ExternalLink = (
    <Link href="https://www.amazon.com" target="_blank">
        Value with external link
    </Link>
);

const Status = <StatusIndicator statusType="positive">Available</StatusIndicator>;

<Container headingVariant='h4' title="key value pairs with column layout">
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