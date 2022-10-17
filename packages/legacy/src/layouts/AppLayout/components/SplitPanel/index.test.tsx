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
import { render, cleanup, fireEvent, act } from '@testing-library/react';
import SplitPanel from '.';

const mockSetIsSplitPanelOpen = jest.fn();

describe('SplitPanel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    it('renders the Split Panel', () => {
        const { getByText, getByTestId } = render(
            <SplitPanel fullMode isSplitPanelOpen={true} setIsSplitPanelOpen={mockSetIsSplitPanelOpen}>
                SplitPanel
            </SplitPanel>
        );

        expect(getByText('SplitPanel')).toBeVisible();
        expect(getByTestId('close-split-panel')).toBeVisible();
        expect(getByTestId('toggle-expand-split-panel')).toBeVisible();
        expect(getByTestId('resize-split-panel')).toBeVisible();
    });

    it('renders the Split Panel in mobile view', () => {
        const { getByText, getByTestId, queryByTestId } = render(
            <SplitPanel fullMode={false} isSplitPanelOpen={true} setIsSplitPanelOpen={mockSetIsSplitPanelOpen}>
                SplitPanel
            </SplitPanel>
        );

        expect(getByText('SplitPanel')).toBeVisible();
        expect(getByTestId('close-split-panel')).toBeVisible();
        expect(queryByTestId('toggle-expand-split-panel')).toBeNull();
        expect(queryByTestId('resize-split-panel')).toBeNull();
    });

    it('should not render the Split Panel node when the isSplitPanelOpen is false', () => {
        const { queryByText } = render(
            <SplitPanel fullMode isSplitPanelOpen={false} setIsSplitPanelOpen={mockSetIsSplitPanelOpen}>
                SplitPanel
            </SplitPanel>
        );

        expect(queryByText('SplitPanel')).toBeNull();
    });

    it('should toggle the split panel when users click the FullscreenExit/Fullscreen button', () => {
        const { getByText, getByTestId, queryByText } = render(
            <SplitPanel fullMode isSplitPanelOpen={true} setIsSplitPanelOpen={mockSetIsSplitPanelOpen}>
                SplitPanel
            </SplitPanel>
        );

        expect(getByText('SplitPanel')).toBeVisible();

        act(() => {
            fireEvent.click(getByTestId('toggle-expand-split-panel'));
        });

        expect(queryByText('SplitPanel')).toBeNull();

        act(() => {
            fireEvent.click(getByTestId('toggle-expand-split-panel'));
        });

        expect(getByText('SplitPanel')).toBeVisible();
    });

    it('should trigger the setIsSplitPanelOpen when users click the close button', () => {
        const { getByTestId } = render(
            <SplitPanel fullMode isSplitPanelOpen={true} setIsSplitPanelOpen={mockSetIsSplitPanelOpen}>
                SplitPanel
            </SplitPanel>
        );

        act(() => {
            fireEvent.click(getByTestId('close-split-panel'));
        });

        expect(mockSetIsSplitPanelOpen).toHaveBeenCalledWith(false);
    });
});
