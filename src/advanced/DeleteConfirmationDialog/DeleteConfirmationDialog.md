### Examples

**More examples** are available on <a href="https://storybook.northstar.aws-prototyping.cloud/?path=/story/deleteconfirmationdialog" target="_blank">NorthStar Storybook</a>.

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
        title="Delete sales order"
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