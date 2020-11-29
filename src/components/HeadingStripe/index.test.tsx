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

import HeadingStripe from '.';
import Button from '../Button';

describe('HeadingStripe', () => {
    it('should render title', () => {
        const { getByText } = render(<HeadingStripe title="title" />);

        expect(getByText('title')).toBeVisible();
    });

    it('should render action groups', () => {
        const { getByRole } = render(<HeadingStripe title="title" actionButtons={<Button>Update</Button>} />);

        expect(getByRole('button')).toBeVisible();
    });
});
