### Examples

```jsx
import FileUpload from 'aws-northstar/components/FileUpload';
import Container from 'aws-northstar/layouts/Container';

<Container title="Upload Single File">
    <FileUpload
        controlId="file1"
        label="Form field label"
        description="This is a description"
        hintText="This is hint text with file requirements and constraints"
        onChange={console.log}
    ></FileUpload>
</Container>
```

```jsx
import FileUpload from 'aws-northstar/components/FileUpload';
import Container from 'aws-northstar/layouts/Container';

<Container title="Upload Multiple Files">
    <FileUpload
        controlId="file2"
        label="Form field label"
        description="This is a description"
        hintText="This is hint text with file requirements and constraints"
        multiple={true}
        accept='image/*'
        onChange={console.log}
    ></FileUpload>
</Container>
```