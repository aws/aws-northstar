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
import Modal from '.';

describe('Model', () => {
    afterEach(cleanup);

    it('should renders title and children', () => {
        const { getByText } = render(<Modal title="modal title">model body</Modal>);
        expect(getByText('modal title')).toBeInTheDocument();
        expect(getByText('model body')).toBeInTheDocument();
    });

    it('should renders subtitle', () => {
        const { getByText } = render(
            <Modal title="modal title" subtitle="modal subtitle">
                model body
            </Modal>
        );
        expect(getByText('modal subtitle')).toBeInTheDocument();
    });

    it('should renders footer', () => {
        const { getByText } = render(
            <Modal title="modal title" footer="footer content">
                model body
            </Modal>
        );
        expect(getByText('footer content')).toBeInTheDocument();
    });

    it('should have 600px width by derfault', () => {
        const { getByTestId } = render(<Modal title="modal title">model body</Modal>);
        expect(getByTestId('modal-inner')).toHaveStyle({ width: '600px' });
    });

    it('should have custom width when width is provided', () => {
        const { getByTestId } = render(
            <Modal title="modal title" width="1000px">
                model body
            </Modal>
        );
        expect(getByTestId('modal-inner')).toHaveStyle({ width: '1000px' });
    });

    it('should be invisible by default', () => {
        const { getByTestId, getByText } = render(<Modal title="modal title">model body</Modal>);
        expect(getByTestId('modal').className).not.toMatch(/cycloramaActive/);
        expect(getByText('modal title')).not.toBeVisible();
        expect(getByText('model body')).not.toBeVisible();
    });

    it('should be visible when visible is true', () => {
        const { getByTestId, getByText } = render(
            <Modal title="modal title" visible>
                model body
            </Modal>
        );
        expect(getByTestId('modal').className).toMatch(/cycloramaActive/);
        expect(getByText('modal title')).toBeVisible();
        expect(getByText('model body')).toBeVisible();
    });

    it('should hide when clicking the close button', () => {
        const handleClose = jest.fn();
        const { getByTestId, getByRole } = render(
            <Modal title="modal title" visible onClose={handleClose}>
                model body
            </Modal>
        );
        fireEvent.click(getByRole('button'));
        expect(getByTestId('modal').className).not.toMatch(/cycloramaActive/);
        expect(handleClose).toHaveBeenCalled();
    });
});
