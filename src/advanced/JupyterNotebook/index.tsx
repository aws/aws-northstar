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
import Grid from '../../layouts/Grid';
import Container from '../../layouts/Container';
import ReactMarkdown from 'react-markdown';
import parse from 'html-react-parser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CodeComponent } from 'react-markdown/src/ast-to-react';
import Heading from '../../components/Heading';
import Paper from '../../layouts/Paper';

/*
 TODO:
   - finesse table rendering
   - centre images
   - add worksheets handing option
        - if has worksheets, use specified worksheet idx (0 if not specified)
        - add worksheet idx parameter
   - write documentation 
*/

// cats an array of lines together
const sourceLines = (lines: any[]) => {
    return lines.reduce((result, value) => {
        return result + value;
    }, '');
};

export interface JupyterNotebookProps {
    notebookData: string;
}

interface JupyterNotebookCellProps {
    cell: any;
    execution_count: string;
    language: string;
}

interface JupyterNotebookOutputCellProps extends JupyterNotebookCellProps {
    output: any;
}

interface JupyterNotebookCellRenderTemplateProps {
    idColumnContent: string;
    bodyColumnContent: any;
    bodyColumnStyle: any;
}

const JupyterNotebookCellRenderTemplate: React.FC<JupyterNotebookCellRenderTemplateProps> = ({
    idColumnContent,
    bodyColumnContent,
    bodyColumnStyle,
}) => {
    return (
        <>
            <Grid item xs={1}>
                {idColumnContent}
            </Grid>
            <Grid item xs={11}>
                <Paper variant={'outlined'} style={bodyColumnStyle}>
                    {bodyColumnContent}
                </Paper>
            </Grid>
        </>
    );
};

// -- renders a cell of type 'markdown'
const JupyterNotebookMarkdownCell: React.FC<JupyterNotebookCellProps> = ({ cell, execution_count, language }) => {
    return (
        <JupyterNotebookCellRenderTemplate
            idColumnContent={''}
            bodyColumnContent={<ReactMarkdown children={sourceLines(cell.source)} />}
            bodyColumnStyle={{ padding: '0px 8px 0px 8px', margin: '0px 0px', border: '1px solid #AAA' }}
        />
    );
};

// -- renders a cell of type 'heading'
const JupyterNotebookHeadingCell: React.FC<JupyterNotebookCellProps> = ({ cell, execution_count, language }) => {
    return (
        <JupyterNotebookCellRenderTemplate
            idColumnContent={''}
            bodyColumnContent={
                <Container
                    style={{
                        marginBottom: '0px',
                        boxShadow: 'none',
                    }}
                >
                    <Heading variant="h1">{cell.source[0]}</Heading>
                </Container>
            }
            bodyColumnStyle={{ padding: '0px 8px 0px 8px', margin: '0px 0px', border: '1px solid #AAA' }}
        />
    );
};

// -- renders a cell of type 'stream'
const JupyterNotebookOutputStreamCell: React.FC<JupyterNotebookOutputCellProps> = ({
    cell,
    execution_count,
    output,
    language,
}) => {
    return (
        <JupyterNotebookCellRenderTemplate
            idColumnContent={`Out [${execution_count}]`}
            bodyColumnContent={
                <ReactMarkdown children={'**[' + output.name + ']**\n```\n ' + sourceLines(output.text) + '```'} />
            }
            bodyColumnStyle={{
                padding: '0px 8px 0px 8px',
                margin: '0px 0px',
                backgroundColor: output.name === 'stderr' ? '#FDD' : '#DFD',
                border: '1px solid #AAA',
            }}
        />
    );
};

// -- renders a cell of type 'error'
const JupyterNotebookOutputErrorCell: React.FC<JupyterNotebookOutputCellProps> = ({
    cell,
    execution_count,
    output,
    language,
}) => {
    return (
        <JupyterNotebookCellRenderTemplate
            idColumnContent={`In [${execution_count}]`}
            bodyColumnContent={
                <ReactMarkdown
                    children={
                        '**[' +
                        output.evalue +
                        ']**\n```\n ' +
                        sourceLines(output.traceback).replace(
                            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
                            ''
                        ) +
                        '\n```'
                    }
                />
            }
            bodyColumnStyle={{
                padding: '0px 8px 0px 8px',
                margin: '0px 0px',
                border: '1px solid #AAA',
                backgroundColor: '#FDD',
            }}
        />
    );
};

// -- renders various data cell types (html, png, text)
const JupyterNotebookOutputDataCell: React.FC<JupyterNotebookOutputCellProps> = ({
    cell,
    execution_count,
    output,
    language,
}) => {
    return (
        <JupyterNotebookCellRenderTemplate
            idColumnContent={`Out [${execution_count}]`}
            bodyColumnContent={
                <Container
                    style={{
                        marginBottom: '0px',
                        boxShadow: 'none',
                    }}
                >
                    {output.data['text/html'] ? (
                        parse(sourceLines(output.data['text/html']), { trim: true })
                    ) : output.data['image/png'] ? (
                        <img
                            src={'data:image/png;base64,' + output.data['image/png'].replace(/\n/g, '')}
                            alt={'notebook diagram'}
                        />
                    ) : output.data['text/plain'] ? (
                        <ReactMarkdown children={'```\n' + sourceLines(output.data['text/plain']) + '\n```'} />
                    ) : (
                        <b>unknown</b>
                    )}
                </Container>
            }
            bodyColumnStyle={{ padding: '0px 0px 0px 0px', margin: '0px 0px', border: '1px solid #AAA' }}
        />
    );
};

// -- helper class used in syntax highlighting the code
const CodeBlock: CodeComponent = ({ inline = false, className, children }) => {
    const match = /language-(\w+)/.exec(className || '');
    let codeLanguage = 'javascript';
    let langs = ['python', 'java', 'javascript', 'c++', 'typescript', 'objective-c', 'json'];

    for (const lang of langs) {
        if (match && match[1] && match[1].startsWith(lang)) {
            codeLanguage = lang;
        }
    }

    return (
        <SyntaxHighlighter language={codeLanguage} style={coy}>
            {children}
        </SyntaxHighlighter>
    );
};

// -- renders a cell of type 'code'
const JupyterNotebookCodeCell: React.FC<JupyterNotebookCellProps> = ({ cell, execution_count, language }) => {
    return (
        <>
            {cell.metadata && cell.metadata.jupyter && cell.metadata.jupyter.source_hidden ? (
                <></>
            ) : (
                <JupyterNotebookCellRenderTemplate
                    idColumnContent={`In [${execution_count}]`}
                    bodyColumnContent={
                        <ReactMarkdown
                            components={{ code: CodeBlock }}
                            children={'```' + language + '\n\n' + sourceLines(cell.source) + '\n```'}
                        />
                    }
                    bodyColumnStyle={{
                        padding: '0px 0px 0px 0px',
                        margin: '0px 0px 0px 0px',
                        border: '1px solid #AAA',
                    }}
                />
            )}
            {cell.metadata && cell.metadata.jupyter && cell.metadata.jupyter.outputs_hidden ? (
                <></>
            ) : (
                cell.outputs.map((output: any, outputIdx: number) => {
                    if (output.output_type === 'stream') {
                        return (
                            <JupyterNotebookOutputStreamCell
                                key={`stream-${execution_count}-${outputIdx}`}
                                cell={cell}
                                execution_count={execution_count}
                                output={output}
                                language={language}
                            />
                        );
                    } else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
                        return (
                            <JupyterNotebookOutputDataCell
                                key={`exec-${execution_count}-${outputIdx}`}
                                cell={cell}
                                execution_count={execution_count}
                                output={output}
                                language={language}
                            />
                        );
                    } else if (output.output_type === 'error') {
                        return (
                            <JupyterNotebookOutputErrorCell
                                key={`error-${execution_count}-${outputIdx}`}
                                cell={cell}
                                execution_count={execution_count}
                                output={output}
                                language={language}
                            />
                        );
                    } else {
                        return <></>;
                    }
                })
            )}
        </>
    );
};

// -- router to render the two main input cell types
const JupyterNotebookCell: React.FC<JupyterNotebookCellProps> = ({ cell, execution_count, language }) => {
    if (cell.cell_type === 'markdown') {
        return <JupyterNotebookMarkdownCell cell={cell} execution_count={execution_count} language={language} />;
    } else if (cell.cell_type === 'code') {
        return <JupyterNotebookCodeCell cell={cell} execution_count={execution_count} language={language} />;
    } else if (cell.cell_type === 'heading') {
        //cell.source[0] = `# ${cell.source[0]}\n`;
        return <JupyterNotebookHeadingCell cell={cell} execution_count={execution_count} language={language} />;
    } else {
        return <></>;
    }
};

// -- top level Jupyter notebook component
const JupyterNotebook: React.FC<JupyterNotebookProps> = ({ notebookData }) => {
    const notebook = JSON.parse(notebookData);

    return (
        <Grid container spacing={1} alignItems={'flex-start'} alignContent={'flex-start'}>
            {notebook.cells &&
                notebook.cells.map((cell: any, index: number) => {
                    return (
                        <JupyterNotebookCell
                            key={`cell-${index}`}
                            cell={cell}
                            execution_count={cell.execution_count ?? ''}
                            language={notebook.metadata.kernelspec.language}
                        />
                    );
                })}
        </Grid>
    );
};

export default JupyterNotebook;
