### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/formsection" target="_blank">NorthStar Storybook</a>.

```jsx
import FormSection from 'aws-northstar/components/FormSection';
import FormField from 'aws-northstar/components/FormField';
import Input from 'aws-northstar/components/Input';

<FormSection header="Form section header" description="form section description">
    <FormField label="Form field label" controlId="formFieldId1">
        <Input type="text" controlId="formFieldId1" />
    </FormField>
</FormSection>
```