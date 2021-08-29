### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/buttondropdown" target="_blank">NorthStar Storybook</a>.


```jsx
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Standard Button Dropdown">
    <ButtonDropdown
        content="Button"
        items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]} />
</Container>
```
```jsx
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Primary Button">
    <ButtonDropdown
        content="Button"
        items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]} 
        variant="primary"
        />
</Container>
```
```jsx
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Disabled Button">
    <ButtonDropdown
        content="Button"
        items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]}
        disabled={true}
    />
</Container>
```
```jsx
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Loading Button">
    <ButtonDropdown
        content="Button"
        items={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]}
        loading={true}
    />
</Container>
```
```jsx
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Disabled items">
    <ButtonDropdown
        content="Button"
        items={[{ text: 'One', disabled: true }, { text: 'Two', disabled: true }, { text: 'Three' }]}
    />
</Container>
```
```jsx
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="With sub heading">
    <ButtonDropdown
        content="Button"
        items={[{
            text: 'Instance size', items: [
                { text: 'Small' },
                { text: 'Medium' },
                { text: 'Large' }
            ],
        }, 
        {
            text: 'Instance type', items: [
                { text: 'Ubuntu' },
                { text: 'Amazon Linux' },
                { text: 'RedHat' }
            ],
        }
    
    ]}
    />
</Container>
```

```jsx padded
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="With disabled sub heading">
    <ButtonDropdown
        content="Button"
        items={[{
            text: 'Instances', disabled: true, items: [
                { text: 'Small' },
                { text: 'Medium' },
                { text: 'Large' }
            ]
        } ]}
    />
</Container>
```

```jsx
import ButtonDropdown from 'aws-northstar/components/ButtonDropdown';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="With sub heading and disabled items">
    <ButtonDropdown
        content="Button"
        items={[{
            text: 'Instances', items: [
                { text: 'Small', disabled: true },
                { text: 'Medium' , disabled: true},
                { text: 'Large' }
            ]
        } ]}
    />
</Container>
```