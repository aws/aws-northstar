/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
  
  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  
      http://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.                                                                              *
 ******************************************************************************************************************** */

import React, { useState, useCallback } from 'react';
import DeleteConfirmationDialog from '.';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

export default {
    component: DeleteConfirmationDialog,
    title: 'DeleteConfirmationDialog',
};

export const Default = () => {
    const [deleteConfirmationDialogVisible, setDeleteConfirmationDialogVisiable] = useState(false);
    const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);
    const handleDelete = useCallback(() => {
        setIsDeleteProcessing(true);
        setTimeout(() => {
            setDeleteConfirmationDialogVisiable(false);
            setIsDeleteProcessing(false);
        }, 3000);
    }, []);

    return (
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
                    This will delete the sale order #001. All associated sales order history associated with this order
                    will be deleted.{' '}
                </Alert>
            </DeleteConfirmationDialog>
        </>
    );
};
