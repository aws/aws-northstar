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
import LoadingIndicator from '.';
import { render } from '@testing-library/react';

describe('Alert', () => {
    it('renders a custom button with the button label text', () => {
        const { getByText } = render(<LoadingIndicator label="the label" />);
        expect(getByText('the label')).toBeInTheDocument();
    });

    it('renders progress bar', () => {
        const { getByRole } = render(<LoadingIndicator label="the label" />);
        expect(getByRole('progressbar')).toBeInTheDocument();
        expect(getByRole('progressbar')).toHaveStyle('width: 16px; height: 16px;');
    });

    it('renders big progress bar', () => {
        const { getByRole } = render(<LoadingIndicator label="the label" size="big" />);
        expect(getByRole('progressbar')).toHaveStyle('width: 32px; height: 32px;');
    });

    it('renders large progress bar', () => {
        const { getByRole } = render(<LoadingIndicator label="the label" size="large" />);
        expect(getByRole('progressbar')).toHaveStyle('width: 48px; height: 48px;');
    });

    it('renders progress bar with custom size', () => {
        const { getByRole } = render(<LoadingIndicator label="the label" size={100} />);
        expect(getByRole('progressbar')).toHaveStyle('width: 100px; height: 100px;');
    });
});
