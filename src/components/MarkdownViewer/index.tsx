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
import gfm from 'remark-gfm';
import frontmatter from 'remark-frontmatter';
import ReactMarkdown, { ReactMarkdownOptions } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Heading from '../Heading';
import Text from '../Text';
import Link from '../Link';

export interface MarkdownViewerProps {
    /** The markdown content to be displayed */
    children: string;
}

const components: ReactMarkdownOptions['components'] = {
    code: ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const value = String(children).replace(/\n$/, '');
        return !inline && match ? (
            <SyntaxHighlighter style={tomorrow} language={match[1]} children={value} {...props} />
        ) : (
            <>{value}</>
        );
    },
    h1: (props) => <Heading variant="h1">{props.children}</Heading>,
    h2: (props) => <Heading variant="h2">{props.children}</Heading>,
    h3: (props) => <Heading variant="h3">{props.children}</Heading>,
    h4: (props) => <Heading variant="h4">{props.children}</Heading>,
    h5: (props) => <Heading variant="h5">{props.children}</Heading>,
    p: (props) => <Text variant="p">{props.children}</Text>,
    a: (props) => <Link href={props.href as string}>{props.children}</Link>,
};

const MarkdownViewer = ({ children }: MarkdownViewerProps) => {
    return <ReactMarkdown plugins={[gfm, frontmatter]} components={components} children={children} />;
};

export default MarkdownViewer;
