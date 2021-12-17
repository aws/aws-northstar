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
import { render } from '@testing-library/react';

import StatusIndicator from '.';

describe('StatusIndicator', () => {
    it('renders label and icon with info type', () => {
        const { getAllByText, getByTitle } = render(<StatusIndicator statusType="info">Info</StatusIndicator>);
        expect(getByTitle('Info')).toBeInTheDocument();
        expect(getAllByText('Info')).toHaveLength(2);
    });

    it('renders label and icon with positive type', () => {
        const { getByTitle, getAllByText } = render(
            <StatusIndicator statusType="positive">Submitted!</StatusIndicator>
        );
        expect(getByTitle('Submitted!')).toBeInTheDocument();
        expect(getAllByText('Submitted!')).toHaveLength(2);
    });

    it('renders label and icon with warning type', () => {
        const { getByTitle, getAllByText } = render(<StatusIndicator statusType="warning">Warning!</StatusIndicator>);
        expect(getByTitle('Warning!')).toBeInTheDocument();
        expect(getAllByText('Warning!')).toHaveLength(2);
    });

    it('renders label and icon with negative type', () => {
        const { getByTitle, getAllByText } = render(<StatusIndicator statusType="negative">Error!</StatusIndicator>);
        expect(getByTitle('Error!')).toBeInTheDocument();
        expect(getAllByText('Error!')).toHaveLength(2);
    });

    it('can be accessed by custom test-id', () => {
        const { getByTestId } = render(
            <StatusIndicator data-testid="negative-status-indicator" statusType="negative">
                Error
            </StatusIndicator>
        );
        expect(getByTestId('negative-status-indicator')).toBeInTheDocument();
    });
});
