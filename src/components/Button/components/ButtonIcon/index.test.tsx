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
import ButtonIcon from '.';

describe('ButtonIcon', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders svg icon', () => {
        const { container } = render(<ButtonIcon />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should render and svg icon when Material UI icon is used', () => {
        const { container } = render(<ButtonIcon type="Cloud" />);
        expect(container.querySelector('svg')).toBeInTheDocument();
    });
});
