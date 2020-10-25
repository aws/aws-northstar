### Examples

```jsx
import { useState, useCallback } from 'react';
import Box from 'aws-northstar/layouts/Box';

const defaultNotifications = [
    {
        id: '1',
        severity: 'INFO',
        title: 'Info title',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
    {
        id: '2',
        severity: 'ERROR',
        title: 'Error title',
    },
    {
        id: '3',
        severity: 'WARNING',
        title: 'Warning long long long long title',
    },
];

const WithNotifications = () => {
    const [notifications, setNotifications] = useState(defaultNotifications);
    const handleDismissNotifications = useCallback((id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    }, [notifications, setNotifications]);

    return (
        <Box
            color="primary.contrastText"
            bgcolor="primary.main"
            width="100%"
            height="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <NotificationButton notifications={notifications} onDismissNotification={handleDismissNotifications} />
        </Box>
    );
};

<WithNotifications />


```