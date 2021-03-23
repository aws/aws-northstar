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
import { render, fireEvent } from '@testing-library/react';

import ProgressBar from '.';

describe('ProgressBar', () => {
    const mockOnChange = jest.fn();
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the given ProgressBar', () => {
        const { getByText } = render(<ProgressBar value={44} />);

        expect(getByText('44%')).toBeInTheDocument();
    });

    it('renders ProgressBar discription', () => {
        const { getByText } = render(<ProgressBar value={44} description="Description" />);

        expect(getByText('Description')).toBeInTheDocument();
    });

    it('renders circular ProgressBar status with displayValue', () => {
        const { getByText } = render(<ProgressBar variant={'circular'} value={66} displayValue={true} />);

        expect(getByText('66%')).toBeInTheDocument();
    });

    it('renders circular ProgressBar status without displayValue', () => {
        const { queryByText } = render(<ProgressBar variant={'circular'} value={66} displayValue={false} />);

        expect(queryByText('66%')).not.toBeInTheDocument();
    });

    it('renders ProgressBar additional description', () => {
        const { getByText } = render(<ProgressBar value={44} additionalInfo="Addition Description" />);

        expect(getByText('Addition Description')).toBeInTheDocument();
    });

    it('fires onClick event', () => {
        const { getByText } = render(
            <ProgressBar value={44} status="error" resultButtonText="Done" resultButtonClick={mockOnChange} />
        );

        expect(mockOnChange).toHaveBeenCalledTimes(0);
        fireEvent.click(getByText('Done'));
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('renders error state with text and icon', () => {
        const { getAllByText } = render(<ProgressBar status="error" resultText="Error" />);

        expect(getAllByText('Error')).toHaveLength(2);
    });

    it('renders success state with text and icon', () => {
        const { getAllByText } = render(<ProgressBar status="success" resultText="Success" />);

        expect(getAllByText('Success')).toHaveLength(2);
    });
});
