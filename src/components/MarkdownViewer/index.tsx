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
import React, { Component, FunctionComponent, memo, ReactElement } from 'react';
import gfm from 'remark-gfm';
import frontmatter from 'remark-frontmatter';
import ReactMarkdown, { ReactMarkdownPropsBase } from 'react-markdown';
import Container, { ContainerProps } from '../../layouts/Container';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface RenderProps {
    language: string;
    value: string;
}

export interface MarkdownViewerProps extends ContainerProps, ReactMarkdownPropsBase {
    children?: any;
}

const renderers = {
    code: ({ language, value }: RenderProps) => {
        return <SyntaxHighlighter style={tomorrow} language={language} children={value} />;
    },
};

const MarkdownViewer: FunctionComponent<MarkdownViewerProps> = (props: MarkdownViewerProps) => {
    // const { CustomComponent, ...rest } = UseFieldApi(props);
    // const { getState } = UseFormApi();

    const { actionGroup, children, headingVariant, subtitle, title } = { ...props };

    return (
        <Container headingVariant={headingVariant} title={title} subtitle={subtitle} actionGroup={actionGroup}>
            <ReactMarkdown escapeHtml={false} children={children} plugins={[gfm, frontmatter]} renderers={renderers} />
        </Container>
    );
};

export default MarkdownViewer;
