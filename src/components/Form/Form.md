### Examples

```jsx
import Form from 'aws-northstar/components/Form';
import Container from 'aws-northstar/layouts/Container';
import Button from 'aws-northstar/components/Button';

<Container headingVariant='h4' title='A simple form'>
    <Form
        header="Form header"
        description="Some description"
        actions={
            <div>
                <Button variant="link">Cancel</Button>
                <Button variant="primary">Submit</Button>
            </div>
    }>
    </Form>
</Container>
```

```jsx
import Form from 'aws-northstar/components/Form';
import Container from 'aws-northstar/layouts/Container';
import Button from 'aws-northstar/components/Button';

<Container headingVariant='h4' title='Form with error text'>
    <Form
        header="Form header"
        description="Some description"
        errorText="Some error description"
        actions={
            <div>
                <Button variant="link">Cancel</Button>
                <Button variant="primary">Submit</Button>
            </div>
    }>
    </Form>
</Container>
```

```jsx
import Form from 'aws-northstar/components/Form';
import Button from 'aws-northstar/components/Button';
import Checkbox from 'aws-northstar/components/Checkbox';
import Container from 'aws-northstar/layouts/Container';
import FormField from 'aws-northstar/components/FormField'
import FormGroup from 'aws-northstar/components/FormGroup';
import FormSection from 'aws-northstar/components/FormSection';
import Input from 'aws-northstar/components/Input';
import Select from 'aws-northstar/components/Select';
import Textarea from 'aws-northstar/components/Textarea';
import Toggle from 'aws-northstar/components/Toggle';

<Form
    header="Form with some controls"
    description="You can view source to see how components are put together"
    actions={
        <div>
            <Button variant="link">Cancel</Button>
            <Button variant="primary">Submit</Button>
        </div>
}>
    <FormSection header='Section header'>
        <FormField label="Example text input" hintText="Input constraint goes here. e.g. 1,000 characters maximum" controlId="formFieldId1">
            <Input type="text" controlId="formFieldId1" />
        </FormField>
        <FormField label="Example textarea" controlId="formFieldId2">
            <Textarea controlId="formFieldId2"/>
        </FormField>
        <FormField label="Example select" controlId="formFieldId3">
           <Select
                placeholder="Choose an option"
                controlId="formFieldId3"
                options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' }
                ]}
            />
        </FormField>
        <FormField controlId="formFieldId4">
            <Toggle label="Check me out" />
        </FormField>
        <FormField controlId="formFieldId5">
            <Checkbox>Check me out</Checkbox>
        </FormField>
    </FormSection>
</Form>
```
