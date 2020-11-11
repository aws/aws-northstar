### Examples

```jsx
import Icon from 'aws-northstar/components/Icon';
import Inline from 'aws-northstar/layouts/Inline';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant="h4" title="Icons with different size">
    <Inline>
        <Icon name="Cloud" fontSize="small" />
        <Icon name="Cloud" fontSize="default" />
        <Icon name="Cloud" fontSize="large" />
        <Icon name="Cloud" style={{ fontSize: '50px' }} />
    </Inline>
</Container>;
```

```jsx
import Icon from 'aws-northstar/components/Icon';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';

<Container headingVariant="h4" title="Icons with different color">
    <Inline>
        <Icon name="Dns" fontSize="large" color="inherit" />
        <Icon name="Dns" fontSize="large" color="primary" />
        <Icon name="Dns" fontSize="large" color="secondary" style={{ backgroundColor: 'black' }} />
        <Icon name="Dns" fontSize="large" color="action" />
        <Icon name="Dns" fontSize="large" color="disabled" />
        <Icon name="Dns" fontSize="large" color="error" />
        <Icon name="Dns" fontSize="large" htmlColor="#00FFFF" />
    </Inline>
</Container>;
```

```jsx
import Icon from 'aws-northstar/components/Icon';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';

<Container headingVariant="h4" title="Icons with different variant">
    <Inline>
        <Icon name="AccountCircle" fontSize="large" variant="Filled" />
        <Icon name="AccountCircle" fontSize="large" variant="Outlined" />
        <Icon name="AccountCircle" fontSize="large" variant="Rounded" />
        <Icon name="AccountCircle" fontSize="large" variant="TwoTone" />
        <Icon name="AccountCircle" fontSize="large" variant="Sharp" />
    </Inline>
</Container>;
```

```jsx
import Icon from 'aws-northstar/components/Icon';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';

<Container headingVariant="h4" title="Icons with different variant as icon name">
    <Inline>
        <Icon name="AccountCircle" fontSize="large" />
        <Icon name="AccountCircleOutlined" fontSize="large" />
        <Icon name="AccountCircleRounded" fontSize="large" />
        <Icon name="AccountCircleTwoTone" fontSize="large" />
        <Icon name="AccountCircleSharp" fontSize="large" />
    </Inline>
</Container>;
```

```jsx
import { useState } from 'react';
import Icon from 'aws-northstar/components/Icon';
import Select from 'aws-northstar/components/Select';
import Input from 'aws-northstar/components/Input';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';

const variants = [
    { label: 'Filled', value: 'Filled' },
    { label: 'Outlined', value: 'Outlined' },
    { label: 'Rounded', value: 'Rounded' },
    { label: 'TwoTone', value: 'TwoTone' },
    { label: 'Sharp', value: 'Sharp' },
];

const colors = [
    { label: 'inherit', value: 'inherit' },
    { label: 'primary', value: 'primary' },
    { label: 'secondary', value: 'secondary' },
    { label: 'action', value: 'action' },
    { label: 'disabled', value: 'disabled' },
    { label: 'error', value: 'error' },
];

const DynamicLoad = () => {
    const [iconName, setIconName] = useState();
    const [selectedVariant, setSelectedVariant] = useState();
    const [selectedColor, setSelectedColor] = useState();

    return (
        <Container
            headingVariant="h4"
            title="Render dynamic icon"
            footerContent={
                <Icon
                    name={iconName}
                    fontSize="large"
                    color={(selectedColor || {}).value}
                    variant={(selectedVariant || {}).value}
                />
            }
        >
            <Inline>
                <Input type="text" onChange={name => setIconName(name)} placeholder="icon name. eg: GitHub" />
                <Select
                    placeholder="Choose variant"
                    options={variants}
                    selectedOption={selectedVariant}
                    onChange={e => setSelectedVariant(variants.find(q => q.value === e.target.value))}
                />
                <Select
                    placeholder="Choose color"
                    options={colors}
                    selectedOption={selectedColor}
                    onChange={e => setSelectedColor(colors.find(q => q.value === e.target.value))}
                />
            </Inline>
        </Container>
    );
};

<DynamicLoad />;
```
