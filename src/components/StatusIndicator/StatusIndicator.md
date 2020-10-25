### Examples

``` jsx
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
import Inline from 'aws-northstar/layouts/Inline';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Examples'>
    <Inline>
        <StatusIndicator statusType="negative">Error</StatusIndicator>
        <StatusIndicator statusType="warning">Warning</StatusIndicator>
        <StatusIndicator statusType="positive">Success</StatusIndicator>
        <StatusIndicator statusType="info">Info</StatusIndicator>
    </Inline>
</Container>
```