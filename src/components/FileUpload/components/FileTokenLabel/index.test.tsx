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

import FileTokenLabel from '.';

describe('FileTokenLabel', () => {
    it('renders base info of a file', () => {
        const file = {
            name: 'fileName1',
            size: 101,
            lastModified: 1000000,
        };

        const { getByText } = render(<FileTokenLabel {...file} />);

        expect(getByText(file.name)).toBeVisible();
        expect(getByText(`Size: 101 bytes`)).toBeVisible();
        expect(getByText(`Last modified: ${new Date(file.lastModified).toLocaleString()}`)).toBeVisible();
    });

    it('renders file size in GB', () => {
        const file = {
            name: 'fileName1',
            size: 1000 * 1000 * 1000 * 3.56,
        };

        const { getByText } = render(<FileTokenLabel {...file} />);

        expect(getByText(`Size: 3.56 GB`)).toBeVisible();
    });

    it('renders file size in MB', () => {
        const file = {
            name: 'fileName1',
            size: 1000 * 1000 * 4.7,
        };

        const { getByText } = render(<FileTokenLabel {...file} />);

        expect(getByText(`Size: 4.7 MB`)).toBeVisible();
    });

    it('renders file size in KB', () => {
        const file = {
            name: 'fileName1',
            size: 1000 * 3,
        };

        const { getByText } = render(<FileTokenLabel {...file} />);

        expect(getByText(`Size: 3 KB`)).toBeVisible();
    });
});
