### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/components-wizard--default" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.

```jsx
import Wizard from 'aws-northstar/components/Wizard';
import { BrowserRouter } from 'react-router-dom';
import FormSection from 'aws-northstar/components/FormSection';
import FormField from 'aws-northstar/components/FormField'
import Input from 'aws-northstar/components/Input';
import Textarea from 'aws-northstar/components/Textarea';
import Select from 'aws-northstar/components/Select';
import Toggle from 'aws-northstar/components/Toggle';
import Container from 'aws-northstar/layouts/Container';

const steps = [
    {
        title: 'Choose instance type',
        description:
            ' Each instance type includes one or more instance sizes, allowing you to scale your resources to the requirements of your target workload.',
        content: <FormSection header="Form section">
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
        </FormSection>,
    },
    {
        title: 'Add storage',
        content: <FormSection header="Form section">
            <FormField label="Example select" controlId="formFieldId5">
                <Select
                        placeholder="Choose an option"
                        controlId="formFieldId4"
                        options={[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' }
                        ]}
                    />
            </FormField>
        </FormSection>,
    },
    {
        title: 'Configure security group',
        content: <FormSection header="Form section">
            <FormField label="Example select" controlId="formFieldId6">
                <Select
                        placeholder="Choose an option"
                        controlId="formFieldId7"
                        options={[
                            { label: 'Option 1', value: '1' },
                            { label: 'Option 2', value: '2' },
                            { label: 'Option 3', value: '3' }
                        ]}
                    />
            </FormField>
            <Toggle label="Check me out" />
        </FormSection>,
        isOptional: true,
    },
];

<BrowserRouter>
    <Container>
        <Wizard steps={steps} />
    </Container>
</BrowserRouter>
```