### Examples

```jsx
import Alert from 'aws-northstar/components/Alert';
import Stack from 'aws-northstar/layouts/Stack';
import Container from 'aws-northstar/layouts/Container';

<Stack>
    <Container headingVariant='h4' title='Success Alert'>
        <Alert type="success">Your instance has been successfully created</Alert>
    </Container>
    <Container headingVariant='h4' title='Info Alert'>
        <Alert type="info">Review the documentation to learn more</Alert>
    </Container>

    <Container headingVariant='h4' title='Warning Alert'>
        <Alert type="warning">Changing the configuration might require stopping the instance</Alert>
    </Container>

    <Container headingVariant='h4' title='Error Alert'>
        <Alert type="error">You instance could not be stopped</Alert>
    </Container>
</Stack>
```

```js
import Alert from 'aws-northstar/components/Alert';
import Stack from 'aws-northstar/layouts/Stack';
import Container from 'aws-northstar/layouts/Container';

<Stack>
    <Container headingVariant='h4' title='Success Alert with Header'>
        <Alert type="success" header="Success header">
            Content
        </Alert>
    </Container>

    <Container headingVariant='h4' title='Info Alert with Header'>
        <Alert type="info" header="Info header">
            Content
        </Alert>
    </Container>

    <Container headingVariant='h4' title='Warning Alert with Header'>
        <Alert type="warning" header="Warning header">
            Content
        </Alert>
    </Container>

    <Container headingVariant='h4' title='Error Alert with Header'>
        <Alert type="error" header="Error header">
            Content
        </Alert>
    </Container>
</Stack>
```

```jsx
import Alert from 'aws-northstar/components/Alert';
import Stack from 'aws-northstar/layouts/Stack';
import Container from 'aws-northstar/layouts/Container';

<Stack>
    <Container headingVariant='h4' title='Dismissible Success Alert'>
        <Alert type="success" dismissible={true}>
            Content
        </Alert>
    </Container>    

    <Container headingVariant='h4' title='Dismissible Info Alert'>
        <Alert type="info" dismissible={true}>
            Content
        </Alert>
    </Container>

    <Container headingVariant='h4' title='Dismissible Warning Alert'>
        <Alert type="warning" dismissible={true}>
            Content
        </Alert>
    </Container>

    <Container headingVariant='h4' title='Dismissible Success Alert'>
        <Alert type="error" dismissible={true}>
            Content
        </Alert>
    </Container>
</Stack>
```

```jsx
import Alert from 'aws-northstar/components/Alert';
import Stack from 'aws-northstar/layouts/Stack';
import Button from 'aws-northstar/components/Button'
import Container from 'aws-northstar/layouts/Container';
import Heading from 'aws-northstar/components/Heading';

const [count, setCount] = React.useState(0);


<Container headingVariant='h4' title='Dismissible Success Alert with Label and Button Click Event'>
    <Stack>
        <Alert 
            type="success" 
            dismissible={true} 
            buttonText="Enable counter"
            onButtonClick={() => setCount(count+1)}
        >
            Content
        </Alert>
        <Heading variant="h3">
            Counter {count}
        </Heading>
    </Stack>
</Container>
```
