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
import MarkdownViewer from '.';

export default {
    component: MarkdownViewer,
    title: 'MarkdownViewer',
};

const markdown = `
# A Heading 

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
| 1 | 2  | 3  |  4  |

`;

export const Default = () => {
    return (
        <MarkdownViewer title={'A sample Markdown viewer'} subtitle={'Renders nice markdown from text'}>
            {markdown}
        </MarkdownViewer>
    );
};

export const DefaultWithCode = () => {
    const code = `
    # Some code

    \`\`\`js
    var React = require('react');
    var Markdown = require('react-markdown');
    React.render()
    \`\`\`

    ~~~javascript
    var React = require('react');
    var Markdown = require('react-markdown');
    React.render()
    ~~~

    ~~~js
    var React = require('react');
    var Markdown = require('react-markdown');
    React.render()
    ~~~
    `;

    return (
        <MarkdownViewer title={'A sample Markdown viewer'} subtitle={'Renders nice markdown from text'}>
            {code}
        </MarkdownViewer>
    );
};
