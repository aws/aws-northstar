### Examples

```jsx
import Button from 'aws-northstar/components/Button';
import Inline from 'aws-northstar/layouts/Inline';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Text Buttons">
  <Inline>
    <Button>Normal Button</Button>
    <Button variant="primary">Primary Button</Button>
    <Button variant="link" href="">Internal Link</Button>
  </Inline>
</Container>
```

```jsx
import Button from 'aws-northstar/components/Button';
import Inline from 'aws-northstar/layouts/Inline';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title="Buttons with different sizes">
  <Inline>
    <Button variant="primary" size="small">Small Button</Button>
    <Button variant="primary" size="medium">Medium Button</Button>
    <Button variant="primary" size="large">Large Button</Button>
  </Inline>
</Container>
```

```jsx
import Button from 'aws-northstar/components/Button';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';

<Container headingVariant='h4' title="Buttons with icons">
  <Inline>
    <Button variant="icon" icon="settings" label="settings" />
    <Button variant="primary" icon="settings">Settings</Button>
    <Button variant="primary" iconAlign="right" icon="add_plus">Add</Button>
    <Button icon="external">Launch</Button>
    <Button icon="folder" iconAlign="right">Folder</Button>
    <Button icon="Cloud" iconAlign="right">Cloud</Button>
    <Button icon="AccountCircleTwoTone" iconAlign="right">Account</Button>
    <Button icon="Remove" iconAlign="right">Remove</Button>
  </Inline>
</Container>
```

```jsx
import Button from 'aws-northstar/components/Button';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';

<Container headingVariant='h4' title="Disabled buttons">
  <Inline>
    <Button disabled>Normal Button</Button>
    <Button disabled variant="primary">Primary Button</Button>
    <Button disabled variant="link" href="">Internal Link</Button>
    <Button disabled variant="icon" icon="settings" disabled></Button>
  </Inline>
</Container>
```

```jsx
import Button from 'aws-northstar/components/Button';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';
const [loading, setLoading] = React.useState(false);

<Container headingVariant='h4' title="Button with loading prop">
  <Inline>
    <Button
        variant="primary"
        icon="add_plus"
        loading={loading}
        onClick={() => setLoading(true)}
    >
      Add
    </Button>

    <Button onClick={() => setLoading(false)} disabled={!loading}>Stop loading</Button>
  </Inline>
</Container>
```

```jsx
import Button from 'aws-northstar/components/Button';
import Container from 'aws-northstar/layouts/Container';
import Inline from 'aws-northstar/layouts/Inline';
const [loading, setLoading] = React.useState(false);

<Container headingVariant='h4' title="Icon button with loading prop">
    <Inline>
      <Button
        variant="icon"
        label="refresh"
        icon="refresh"
        loading={loading}
        onClick={() => setLoading(true)}
      />
      <Button onClick={() => setLoading(false)} disabled={!loading}>Stop loading</Button>
    </Inline>
</Container>
```
