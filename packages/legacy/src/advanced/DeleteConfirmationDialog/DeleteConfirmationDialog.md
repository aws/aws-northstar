### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/advanced-components-deleteconfirmationdialog--delete-with-friction" target="_blank" rel="noreferrer noopener">NorthStar Storybook</a>.


#### Delete with Friction - Default

Help prevent accidental, high-severity deletions by adding friction during the deletion process. Always use the delete with friction pattern when deleting multiple resources or when deleting a resource removes other resources. 

```jsx
import React, { useState, useCallback } from 'react';
import DeleteConfirmationDialog from 'aws-northstar/advanced/DeleteConfirmationDialog';
import Button from 'aws-northstar/components/Button';
import Alert from 'aws-northstar/components/Alert';

const [deleteConfirmationDialogVisible, setDeleteConfirmationDialogVisiable] = useState(false);
const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);
const handleDelete = useCallback(() => {
    setIsDeleteProcessing(true);
    setTimeout(() => {
        setDeleteConfirmationDialogVisiable(false);
        setIsDeleteProcessing(false);
    }, 3000);
}, []);

<>
    <Button onClick={() => setDeleteConfirmationDialogVisiable(true)}>Delete</Button>
    <DeleteConfirmationDialog
        visible={deleteConfirmationDialogVisible}
        title="Delete #001"
        onCancelClicked={() => setDeleteConfirmationDialogVisiable(false)}
        onDeleteClicked={handleDelete}
        loading={isDeleteProcessing}
    >
         <Alert type="warning">
                This will delete the sale order #001. All associated sales order history associated with this
                order will be deleted.{' '}
        </Alert>    
    </DeleteConfirmationDialog>
</>
```

#### Delete with Confirmation

Provide a layer of confirmation before deleting a resource. 

```jsx
import React, { useState, useCallback } from 'react';
import DeleteConfirmationDialog from 'aws-northstar/advanced/DeleteConfirmationDialog';
import Button from 'aws-northstar/components/Button';
import Text from 'aws-northstar/components/Text';

const [deleteConfirmationDialogVisible, setDeleteConfirmationDialogVisiable] = useState(false);
    const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);
    const handleDelete = useCallback(() => {
        setIsDeleteProcessing(true);
        setTimeout(() => {
            setDeleteConfirmationDialogVisiable(false);
            setIsDeleteProcessing(false);
        }, 3000);
    }, []);

<>
    <Button onClick={() => setDeleteConfirmationDialogVisiable(true)}>Delete</Button>
    <DeleteConfirmationDialog
        variant="confirmation"
        visible={deleteConfirmationDialogVisible}
        title="Delete #001"
        onCancelClicked={() => setDeleteConfirmationDialogVisiable(false)}
        onDeleteClicked={handleDelete}
        loading={isDeleteProcessing}
    >
        <Text>Delete <b>sales order #001</b> permenantly? This action cannot be undone.</Text>
    </DeleteConfirmationDialog>
</>

```

