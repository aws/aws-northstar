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
import MarkdownViewer from './index';

describe('MarkdownViewer', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    it('should render heading content correctly', () => {
        const { getByText } = render(
            <MarkdownViewer>{` 
# Heading One 
## Heading Two
### Heading Three
#### Heading Four
##### Heading Five
        `}</MarkdownViewer>
        );
        expect(getByText('Heading One')).toHaveClass('MuiTypography-root MuiTypography-h1');
        expect(getByText('Heading Two')).toHaveClass('MuiTypography-root MuiTypography-h2');
        expect(getByText('Heading Three')).toHaveClass('MuiTypography-root MuiTypography-h3');
        expect(getByText('Heading Four')).toHaveClass('MuiTypography-root MuiTypography-h4');
        expect(getByText('Heading Five')).toHaveClass('MuiTypography-root MuiTypography-h5');
    });

    it('should render paragraph text correctly', () => {
        const { getByText } = render(
            <MarkdownViewer>{` 
# Heading One 
This is just some text for testing
        `}</MarkdownViewer>
        );
        expect(getByText('Heading One')).toHaveClass('MuiTypography-root MuiTypography-h1');
        expect(getByText('This is just some text for testing')).toHaveClass('MuiTypography-root MuiTypography-body1');
    });

    it('should render a link correctly', () => {
        const { getByText } = render(
            <MarkdownViewer>{` 
# Heading One 
This is just some text for testing
https://reactjs.org
        `}</MarkdownViewer>
        );
        expect(getByText('Heading One')).toHaveClass('MuiTypography-root MuiTypography-h1');
        expect(getByText('This is just some text for testing')).toHaveClass('MuiTypography-root MuiTypography-body1');
        expect(getByText('https://reactjs.org')).toHaveClass('MuiLink-root');
    });

    it('should render a code correctly', () => {
        const { container } = render(
            <MarkdownViewer>{` 
\`\`\`js
    var React = require('react');
    var Markdown = require('react-markdown');
    React.render()
\`\`\`
        `}</MarkdownViewer>
        );
        expect(container.querySelector('code')).toBeInTheDocument();
    });
});
