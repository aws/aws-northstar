### Examples

```jsx
import Paper from 'aws-northstar/layouts/Paper';
import Stack from 'aws-northstar/layouts/Stack';
import Box from 'aws-northstar/layouts/Box';
import Text from 'aws-northstar/components/Text';

<Paper>
    <Box p={1} width="100%">
        <Stack spacing="xs">
            <Text>
                <b>Feature Name</b>
            </Text>
            <Text variant="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            <Text variant="small">Type: Advanced</Text>
        </Stack>
    </Box>
</Paper>
```

