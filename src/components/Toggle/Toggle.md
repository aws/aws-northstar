### Examples

```jsx
import Toggle from 'aws-northstar/components/Toggle';
import Stack from 'aws-northstar/layouts/Stack';
import Container from 'aws-northstar/layouts/Container';

<Stack>
    <Container headingVariant='h4' title='Default Toggle'>
        <Toggle label="Default" />
    </Container>

    <Container headingVariant='h4' title='Toggle with a short description'>
        <Toggle label="Default" description="short description" />
    </Container>
</Stack>
```

```jsx
import Toggle from 'aws-northstar/components/Toggle';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Toggle default to checked status'>
    <Toggle label="Checked" checked={true} />
</Container>
```


```jsx
import Toggle from 'aws-northstar/components/Toggle';
import Container from 'aws-northstar/layouts/Container';

<Container headingVariant='h4' title='Disabled Toggle'>
    <Toggle label="Disabled" disabled={true} description="short description" />
</Container>
```
