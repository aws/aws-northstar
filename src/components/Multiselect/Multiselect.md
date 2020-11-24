### Examples

Default
```jsx
import FormField from 'aws-northstar/components/FormField';
import { awsServices } from '../Autosuggest/data/data';

<FormField label="Form field label" controlId="formFieldId1">
    <Multiselect
        options={awsServices}
        controlId="formFieldId1"
        ariaDescribedby="This is a description"
    />
</FormField>
```

With Checkboxes
```jsx
import FormField from 'aws-northstar/components/FormField';
import { awsServices } from '../Autosuggest/data/data';

<FormField label="Form field label" controlId="formFieldId2">
    <Multiselect
        options={awsServices}
        controlId="formFieldId2"
        ariaDescribedby="This is a description"
        checkboxes={true}
    />
</FormField>
```

With Initial Values
```jsx
import FormField from 'aws-northstar/components/FormField';
import { awsServices } from '../Autosuggest/data/data';

<FormField label="Form field label" controlId="formFieldId3">
    <Multiselect
        options={awsServices}
        controlId="formFieldId3"
        ariaDescribedby="This is a description"
        checkboxes={true}
        value={[
            {
                value: 'EC2',
                label: 'EC2 - Amazon Elastic Compute Cloud',
            }
        ]}
    />
</FormField>
```