### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-formfield--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import FormField from 'aws-northstar/components/FormField';
import Container from 'aws-northstar/layouts/Container';
import Input from 'aws-northstar/components/Input';

<Container headingVariant='h4' title='A simple from field'>
    <FormField label="Form field label" controlId="formFieldId1">
        <Input type="text" controlId="formFieldId1" />
    </FormField>
</Container>
```

```jsx
import FormField from 'aws-northstar/components/FormField';
import Container from 'aws-northstar/layouts/Container';
import Input from 'aws-northstar/components/Input';

<Container headingVariant='h4' title='FormField with hint text and description'>
    <FormField
        label="Form field label"
        controlId="formFieldId2"
        description="This is description"
        hintText="Requirements and constrains for the field"
    >
        <Input type="text" controlId="formFieldId2" />
    </FormField>
</Container>
```

```jsx
import Container from 'aws-northstar/layouts/Container';
import Input from 'aws-northstar/components/Input';

<Container headingVariant='h4' title='Form field with error text'>
    <FormField
        label="Form field label"
        controlId="formFieldId3"
        errorText="This is an error message"
    >
        <Input type="text" controlId="formFieldId3" invalid/>
    </FormField>
</Container>
```

```jsx
import FormField from 'aws-northstar/components/FormField';
import Container from 'aws-northstar/layouts/Container';
import Input from 'aws-northstar/components/Input';
import Button from 'aws-northstar/components/Button';

<Container headingVariant='h4' title='Form field with secondary control'>
    <FormField
        label="Form field label"
        controlId="formFieldId4"
        secondaryControl={<Button>Add</Button>}
    >
        <Input type="text" controlId="formFieldId4" />
    </FormField>
</Container>
```

```jsx
import FormField from 'aws-northstar/components/FormField';
import Container from 'aws-northstar/layouts/Container';
import Input from 'aws-northstar/components/Input';
import Button from 'aws-northstar/components/Button';

<Container headingVariant='h4' title='Stretched form field'>
    <FormField
        label="Form field label"
        controlId="formFieldId5"
        secondaryControl={<Button>Add</Button>}
        stretch={true}
    >
        <Input type="text" controlId="formFieldId5" />
    </FormField>
</Container>
```

```jsx
import FormField from 'aws-northstar/components/FormField';
import Container from 'aws-northstar/layouts/Container';
import Input from 'aws-northstar/components/Input';

<Container headingVariant='h4' title='Expandable form field'>
    <FormField
        label="Form field label"
        description="This is description text"
        controlId="formFieldId6"
        stretch={true}
        expandable={true}
    >
        <Input type="text" controlId="formFieldId6" />
    </FormField>
</Container>
```
