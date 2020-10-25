### Examples

Default
```jsx
import Flashbar from 'aws-northstar/components/Flashbar';

const item = {
    header: 'Your order is being processed',
    content: 'This may take up to an hour. You may navigate away from this page.',
    dismissible: true,
};

<Flashbar items={[item]} />
```

Stacked Messages
```jsx
import Flashbar from 'aws-northstar/components/Flashbar';

const items = [
    {
        header: 'Successfully updated 4 orders',
        type: 'success',
        content: 'This is a success flash message.',
        dismissible: false,
    },
    {
        header: 'Failed to update 1 order',
        type: 'error',
        content: 'This is a dismissible error message with a button.',
        buttonText: 'Retry',
        onButtonClick: console.log,
        dismissible: true,
    },
    {
        header: 'Warning',
        type: 'warning',
        content: 'This is warning content',
        dismissible: false,
    },
];

<Flashbar items={items} />
```

Loading 
```jsx
import Flashbar from 'aws-northstar/components/Flashbar';

const item = {
    header: 'Your order is being processed',
    content: 'This may take up to an hour. You may navigate away from this page',
    dismissible: true,
    loading: true,
};
    
<Flashbar items={[item]} />
```

