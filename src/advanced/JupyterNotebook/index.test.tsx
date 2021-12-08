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
import { render, cleanup } from '@testing-library/react';

import JupyterNotebook from '.';
import SampleNotebook from './sample-notebook';

describe('Jupyter Notebook', () => {
    afterEach(cleanup);

    it('should render 1st code cell', () => {
        const { getByText } = render(<JupyterNotebook notebookData={JSON.stringify(SampleNotebook)}></JupyterNotebook>);
        expect(getByText('In [1]')).toBeInTheDocument();
    });
    it('should render stdout cell', () => {
        const { getByText } = render(<JupyterNotebook notebookData={JSON.stringify(SampleNotebook)}></JupyterNotebook>);
        expect(getByText('Out [1]')).toBeInTheDocument();
    });
    it('should render image cell', () => {
        const { getByText } = render(<JupyterNotebook notebookData={JSON.stringify(SampleNotebook)}></JupyterNotebook>);
        expect(getByText('Out [17]')).toBeInTheDocument();
    });
});
