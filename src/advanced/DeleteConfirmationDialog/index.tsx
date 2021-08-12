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

import React, { ReactNode, FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import Inline from '../../layouts/Inline';
import Stack from '../../layouts/Stack';
import Box from '../../layouts/Box';
import Modal from '../../components/Modal';
import FormField from '../../components/FormField';
import Input from '../../components/Input';
import Button from '../../components/Button';

export interface DeleteConfirmationDialogProps {
    /**
     * Determines whether the Delete Confirmation Dialog is displayed on the screen. <br/>
     * The Delete Confirmation Dialog is hidden by default. Set this property to true to show it.
     */
    visible?: boolean;
    /**
     * Calls when a user closes the dialog by using the close icon button or clicing the Cancel button.
     */
    onCancelClicked?: () => void;
    /**
     * Calls when a user clicks the Delete button.
     */
    onDeleteClicked?: () => void;
    /**
     * Renders the Delete button as being in a loading state.
     */
    loading?: boolean;
    /**
     * The title of the Delete Confirmation Dialog.
     */
    title: string;
    /**
     * The label of the input field.
     */
    label?: ReactNode;
    /**
     * Content displayed below the title and above the input field.
     */
    children?: ReactNode;
    /**
     * The placeholder text of the input field.
     */
    placeholderText?: string;
    /**
     * The hint text of the input field.
     */
    hintText?: string;
    /**
     * The confirmation text that is expected from users to type in the input field.
     */
    confirmationText?: string;
    /**
     * Override the Delete button label.
     */
    deleteButtonText?: string;
}

/**
 * A model dialog used to verify users truly intend to perform deletion or some kind of destructive action.
 * */
const DeleteConfirmationDialog: FunctionComponent<DeleteConfirmationDialogProps> = ({
    visible,
    onDeleteClicked,
    onCancelClicked,
    loading,
    title,
    label,
    placeholderText,
    hintText,
    confirmationText = 'delete',
    children,
    deleteButtonText,
}) => {
    const [confirmation, setConfirmation] = useState('');
    const [isMatched, setIsMatched] = useState(false);

    const handleDelete = useCallback(() => {
        setConfirmation('');
        onDeleteClicked?.();
    }, [onDeleteClicked]);

    const handleCancel = useCallback(() => {
        setConfirmation('');
        onCancelClicked?.();
    }, [onCancelClicked]);

    const actions = useMemo(
        () => (
            <Box display="flex" width="100%" justifyContent="flex-end">
                <Inline>
                    <Button label="close" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        label="delete"
                        variant="primary"
                        disabled={!isMatched || loading}
                        loading={loading}
                        onClick={handleDelete}
                    >
                        {deleteButtonText || 'Delete'}
                    </Button>
                </Inline>
            </Box>
        ),
        [deleteButtonText, handleCancel, handleDelete, loading, isMatched]
    );

    useEffect(() => {
        setIsMatched(confirmationText === confirmation);
    }, [setIsMatched, confirmation, confirmationText]);

    return (
        <Modal visible={visible} title={title} footer={actions} onClose={handleCancel}>
            <Stack>
                {children}
                <FormField
                    label={
                        label || (
                            <>
                                To confirm deletion, type <i>delete</i> below
                            </>
                        )
                    }
                    controlId="confirmation"
                    hintText={hintText}
                >
                    <Input
                        type="text"
                        placeholder={placeholderText || confirmationText}
                        value={confirmation}
                        onChange={setConfirmation}
                    />
                </FormField>
            </Stack>
        </Modal>
    );
};

export default DeleteConfirmationDialog;
