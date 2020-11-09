### Examples

```jsx
import Input from 'aws-northstar/components/Input';
import Stack from 'aws-northstar/layouts/Stack';
import Container from 'aws-northstar/layouts/Container';

<Stack>
    <Container headingVariant='h4' title='Text Input'>
        <Input placeholder="Text" type="text" />
    </Container>

    <Container headingVariant='h4' title='Password Input'>
        <Input placeholder="Password" type="password" />
    </Container>

    <Container headingVariant='h4' title='Search Input'>
        <Input placeholder="Search" type="search" />
    </Container>

    <Container headingVariant='h4' title='Number Input'>
        <Input placeholder="Number" type="number" />
    </Container>

    <Container headingVariant='h4' title='Email Input'>
        <Input placeholder="Email" type="email" />
    </Container>
</Stack>
```

```jsx
import Input from 'aws-northstar/components/Input';
import Stack from 'aws-northstar/layouts/Stack';
import Container from 'aws-northstar/layouts/Container';

<Stack>
    <Container headingVariant='h4' title='Autocomplete disabled'>
        <Input value="Autocomplete disabled" type="text" autocomplete={false} />
    </Container>

    <Container headingVariant='h4' title='Read Only Input'>
        <Input value="Read only" readonly={true} type="text" />
    </Container>

    <Container headingVariant='h4' title='Disabled Input'>
        <Input value="Disable" disabled={true} type="text" />
    </Container>

    <Container headingVariant='h4' title='Invalid Input'>
        <Input value="Text" invalid={true} type="text"/>
    </Container>

    <Container headingVariant='h4' title='Required Input'>
        <Input placeholder="Required" controlId="standard-required" required={true} type="text" />
    </Container>
</Stack>
```

```jsx
import Input from 'aws-northstar/components/Input';
import Container from 'aws-northstar/layouts/Container';
<Container headingVariant='h4' title='Input with onChange event'>
    <Input placeholder="Text with onChange" type="text" onChange={(value) => console.log(`This is the new value of field myField: ${value}`)} />
</Container>
```
