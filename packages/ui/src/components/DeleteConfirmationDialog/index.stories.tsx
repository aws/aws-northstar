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
import Button from '@cloudscape-design/components/button';
import Alert from '@cloudscape-design/components/alert';
import TextContent from '@cloudscape-design/components/text-content';
import SpaceBetween from '@cloudscape-design/components/space-between';

export default {
    component: DeleteConfirmationDialog,
    title: 'Components/DeleteConfirmationDialog',
};

export const DeleteWithFriction = () => {
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
                title="Delete #001"
                onCancelClicked={() => setDeleteConfirmationDialogVisiable(false)}
                onDeleteClicked={handleDelete}
                loading={isDeleteProcessing}
            >
                <Alert type="warning">
                    This will delete the sale order #001. All associated sales order history associated with this order
                    will be deleted. This action cannot be undone.
                </Alert>
            </DeleteConfirmationDialog>
        </>
    );
};

export const DeleteWithConfirmation = () => {
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
                variant="confirmation"
                visible={deleteConfirmationDialogVisible}
                title="Delete #001"
                onCancelClicked={() => setDeleteConfirmationDialogVisiable(false)}
                onDeleteClicked={handleDelete}
                loading={isDeleteProcessing}
            >
                <TextContent>
                    Delete <b>sales order #001</b> permenantly? This action cannot be undone.
                </TextContent>
            </DeleteConfirmationDialog>
        </>
    );
};

export const DeleteWithPreDeleteAction = () => {
    const [deleteConfirmationDialogVisible, setDeleteConfirmationDialogVisiable] = useState(false);
    const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);
    const [isDisableProcessing, setIsDisabledProcessing] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [enabledDelete, setEnabledDelete] = useState(false);
    const handleDelete = useCallback(() => {
        setIsDeleteProcessing(true);
        setTimeout(() => {
            setDeleteConfirmationDialogVisiable(false);
            setIsDeleteProcessing(false);
        }, 3000);
    }, []);
    const handleDisable = useCallback(() => {
        setIsDisabledProcessing(true);
        setTimeout(() => {
            setIsDisabledProcessing(false);
            setEnabledDelete(true);
            setDisabled(true);
        }, 3000);
    }, []);

    return (
        <>
            <Button
                onClick={() => {
                    setDisabled(false);
                    setDeleteConfirmationDialogVisiable(true);
                }}
            >
                Delete
            </Button>
            <DeleteConfirmationDialog
                variant="confirmation"
                visible={deleteConfirmationDialogVisible}
                title="Delete #001"
                onCancelClicked={() => setDeleteConfirmationDialogVisiable(false)}
                onDeleteClicked={handleDelete}
                loading={isDeleteProcessing}
                enabled={enabledDelete}
            >
                <SpaceBetween direction="vertical" size="s">
                    <TextContent>
                        Delete <b>record #001</b> permenantly? This action cannot be undone.
                    </TextContent>
                    <TextContent>You must firstly disable the record before deleting it.</TextContent>
                    <Button
                        variant="primary"
                        onClick={handleDisable}
                        loading={isDisableProcessing}
                        disabled={isDisableProcessing || disabled}
                    >
                        Disable record
                    </Button>
                </SpaceBetween>
            </DeleteConfirmationDialog>
        </>
    );
};
