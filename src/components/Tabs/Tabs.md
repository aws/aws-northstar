### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/tabs" target="_blank">NorthStar Storybook</a>.

#### Default Tabs

```jsx
import Tabs from 'aws-northstar/components/Tabs';
import Text from 'aws-northstar/components/Text';

const tabs = [
    {
        label: 'First tab label',
        id: 'first',
        content: <Text>First tab content area</Text>
    },
    {
        label: 'Second tab label',
        id: 'second',
        content: <Text>Second tab content area</Text>
    }
];

<Tabs tabs={tabs} />
```

#### Container Tabs

```jsx
import Tabs from 'aws-northstar/components/Tabs';
import Text from 'aws-northstar/components/Text';

const tabs = [
    {
        label: 'First tab label',
        id: 'first',
        content: <Text>First tab content area</Text>
    },
    {
        label: 'Second tab label',
        id: 'second',
        content: <Text>Second tab content area</Text>
    }
];

<Tabs tabs={tabs} variant="container" />
```
