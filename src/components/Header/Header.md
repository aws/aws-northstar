### Examples
Default
```jsx padded
import Header from 'aws-northstar/components/Header';

<Header title='HelloWorld App' logoPath='img/logo-light-short.png'/>
```

With notification icon
```jsx padded
import Header from 'aws-northstar/components/Header';
import Box from 'aws-northstar/layouts/Box';
import { NotificationsIcon } from 'aws-northstar/icons';

<Header title='HelloWorld App' rightContent={<Box display='flex' alignItems='center'><NotificationsIcon/></Box>}/>
```

With notification button and user dropdown
```jsx padded
import Header from 'aws-northstar/components/Header';
import Box from 'aws-northstar/layouts/Box';
import NotificationButton from 'aws-northstar/advanced/NotificationButton';
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';

const menuItems = [
    { text: 'My account', onClick: () => console.log('My account') },
    { text: 'My orders', onClick: () => console.log('My orders') },
    { text: 'Sign Out', onClick: () => console.log('Sign out')}
];

const rightContent = (<Box display="flex" alignItems='center'>
            <NotificationButton onDismissNotification={console.log}/>
            <ButtonDropdown content='Username' items={menuItems} darkTheme />
    </Box>);

<Header title='HelloWorld App' rightContent={rightContent}/>
```

With notifications
```jsx padded
import Header from 'aws-northstar/components/Header';
import Box from 'aws-northstar/layouts/Box';
import NotificationButton from 'aws-northstar/advanced/NotificationButton';
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';

const menuItems = [
    { text: 'My account', onClick: () => console.log('My account') },
    { text: 'My orders', onClick: () => console.log('My orders') },
    { text: 'Sign Out', onClick: () => console.log('Sign out')}
];

const notifications = [
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

const rightContent = (<Box display="flex" alignItems='center'>
            <NotificationButton notifications={notifications} onDismissNotification={console.log}/>
            <ButtonDropdown content='Username' items={menuItems} darkTheme />
    </Box>);

<Header title='HelloWorld App' rightContent={rightContent}/>
```