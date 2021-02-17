### Examples
```jsx
import Popover from 'aws-northstar/components/Popover';
import Stack from 'aws-northstar/layouts/Stack';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
import Button from 'aws-northstar/components/Button';
<Stack>
    <Popover
        position="right"
        size="small"
        triggerType="custom"
        content={
            <StatusIndicator statusType="positive">
                Code snippet copied
            </StatusIndicator>
        }
    >
        <Button>Copy</Button>
    </Popover>
</Stack>
```

```jsx
import Popover from 'aws-northstar/components/Popover';
import Stack from 'aws-northstar/layouts/Stack';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
<Stack>
    <Popover
        position="bottom"
        size="medium"
        showDismissButton
        header="Memory Error"
        triggerType="text"
        content={
            <span>This instance contains insufficient memory. Stop the instance, choose a different instance type with more memory, and restart it.</span>
        }
    >
        <StatusIndicator statusType="negative">
            Error
        </StatusIndicator>
    </Popover>
</Stack>
```

```jsx
import Popover from 'aws-northstar/components/Popover';
import Stack from 'aws-northstar/layouts/Stack';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
<Stack>
    <Popover
        position="right"
        size="large"
        showDismissButton
        dismissAriaLabel="Close"
        fixedWidth={true}
        header="Network interface eth0"
        triggerType="text"
        content={
            <ColumnLayout>
                <Column key="column2">
                    <Stack>
                        <KeyValuePair label="Status" value={<StatusIndicator statusType="positive">Available</StatusIndicator>}></KeyValuePair>
                        <KeyValuePair label="Interface ID" value="eni-055da457bed9bbbe6"></KeyValuePair>
                        <KeyValuePair label="VPC ID" value="vpc-626163728"></KeyValuePair>
                    </Stack>
                </Column>
                <Column key="column3">
                    <Stack>
                        <KeyValuePair label="Private IP address" value="172.31.34.247"></KeyValuePair>
                        <KeyValuePair label="Private DNS name" value="ip-172-31-34-247.us-east-2-compute.internal"></KeyValuePair>
                        <KeyValuePair label="Public IP address" value="18.216.153.9"></KeyValuePair>
                    </Stack>
                </Column>
            </ColumnLayout>
        }
    >
        eth0
    </Popover>
</Stack>
```
