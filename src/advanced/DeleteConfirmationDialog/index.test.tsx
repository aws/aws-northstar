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
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import DeleteConfirmationDialog from '.';

describe('DeleteConfirmationDialog', () => {
    afterEach(cleanup);

    it('should renders title and children', () => {
        const { getByText } = render(
            <DeleteConfirmationDialog title="dialog title">information</DeleteConfirmationDialog>
        );
        expect(getByText('dialog title')).toBeInTheDocument();
        expect(getByText('information')).toBeInTheDocument();
    });

    it('should be invisible by default', () => {
        const { getByText } = render(
            <DeleteConfirmationDialog title="dialog title">information</DeleteConfirmationDialog>
        );
        expect(getByText('dialog title')).not.toBeVisible();
        expect(getByText('information')).not.toBeVisible();
    });

    it('should be visible when visible is true', () => {
        const { getByText, getByPlaceholderText } = render(
            <DeleteConfirmationDialog title="dialog title" label="custom label" hintText="custom hint text" visible>
                information
            </DeleteConfirmationDialog>
        );
        expect(getByText('dialog title')).toBeVisible();
        expect(getByText('information')).toBeVisible();
        expect(getByText('custom label')).toBeVisible();
        expect(getByText('custom hint text')).toBeVisible();
        expect(getByPlaceholderText('delete')).toBeInTheDocument();
    });

    it('should trigger onCancelClicked when clicking the close icon button', () => {
        const handleClose = jest.fn();
        const { getAllByRole } = render(
            <DeleteConfirmationDialog title="dialog title" visible onCancelClicked={handleClose}>
                information
            </DeleteConfirmationDialog>
        );
        fireEvent.click(getAllByRole('button')[0]);
        expect(handleClose).toHaveBeenCalled();
    });

    it('should trigger onCancelClicked when clicking the Cancel button', () => {
        const handleClose = jest.fn();
        const { getByText } = render(
            <DeleteConfirmationDialog title="dialog title" visible onCancelClicked={handleClose}>
                information
            </DeleteConfirmationDialog>
        );
        fireEvent.click(getByText('Cancel'));
        expect(handleClose).toHaveBeenCalled();
    });

    it('should trigger onDeleteClicked when clicking the Delete button', () => {
        const handleClose = jest.fn();
        const handleDelete = jest.fn();
        const { getByText, getByPlaceholderText } = render(
            <DeleteConfirmationDialog
                title="dialog title"
                visible
                onCancelClicked={handleClose}
                onDeleteClicked={handleDelete}
            >
                information
            </DeleteConfirmationDialog>
        );
        expect(getByText('Delete').parentNode).toBeDisabled();
        fireEvent.change(getByPlaceholderText('delete'), {
            target: {
                value: 'del',
            },
        });
        expect(getByText('Delete').parentNode).toBeDisabled();
        fireEvent.change(getByPlaceholderText('delete'), {
            target: {
                value: 'delete',
            },
        });
        expect(getByText('Delete').parentNode).toBeEnabled();
        fireEvent.click(getByText('Delete'));
        expect(handleDelete).toHaveBeenCalled();
    });

    it('should use custom confirmation text', () => {
        const handleClose = jest.fn();
        const handleDelete = jest.fn();
        const customConfirmationText = 'order id';
        const { getByText, getByPlaceholderText } = render(
            <DeleteConfirmationDialog
                title="dialog title"
                visible
                confirmationText={customConfirmationText}
                onCancelClicked={handleClose}
                onDeleteClicked={handleDelete}
            >
                information
            </DeleteConfirmationDialog>
        );
        expect(getByText('Delete').parentNode).toBeDisabled();
        fireEvent.change(getByPlaceholderText(customConfirmationText), {
            target: {
                value: customConfirmationText,
            },
        });
        expect(getByText('Delete').parentNode).toBeEnabled();
        fireEvent.click(getByText('Delete'));
        expect(handleDelete).toHaveBeenCalled();
    });

    it('should render loading state when loading is true', () => {
        const { getByText, getByRole, getByPlaceholderText } = render(
            <DeleteConfirmationDialog title="dialog title" visible loading>
                information
            </DeleteConfirmationDialog>
        );
        fireEvent.change(getByPlaceholderText('delete'), {
            target: {
                value: 'delete',
            },
        });
        expect(getByText('Delete').parentNode).toBeDisabled();
        expect(getByRole('progressbar')).toBeVisible();
    });

    it('should render custom Delete button text', () => {
        const { getByText } = render(
            <DeleteConfirmationDialog title="dialog title" deleteButtonText="Confirm">
                information
            </DeleteConfirmationDialog>
        );
        expect(getByText('Confirm')).toBeInTheDocument();
    });
});
