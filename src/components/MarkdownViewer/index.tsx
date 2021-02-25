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
import React, { FunctionComponent } from 'react';
import gfm from 'remark-gfm';
import frontmatter from 'remark-frontmatter';
import ReactMarkdown, { ReactMarkdownPropsBase } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Heading from '../Heading';
import Text from '../Text';
import Link from '../Link';

interface RenderProps {
    language: string;
    value: string;
}
export interface MarkdownViewerProps extends ReactMarkdownPropsBase {
    children?: any;
}

const renderers = {
    code: ({ language, value }: RenderProps) => {
        return <SyntaxHighlighter style={tomorrow} language={language} children={value} />;
    },
    heading: (props: any) => {
        const variant = `h${props.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
        return <Heading variant={variant}>{props.children}</Heading>;
    },
    paragraph: (props: any) => {
        return <Text variant="p">{props.children}</Text>;
    },
    link: (props: any) => {
        return <Link href={props.href}>{props.children}</Link>;
    },
};

const MarkdownViewer: FunctionComponent<MarkdownViewerProps> = (props: MarkdownViewerProps) => {
    const { children } = { ...props };

    return <ReactMarkdown escapeHtml={true} children={children} plugins={[gfm, frontmatter]} renderers={renderers} />;
};

export default MarkdownViewer;
