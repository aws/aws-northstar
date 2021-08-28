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
import Table, { Column } from '../../../src/components/Table';
import Typography from '@material-ui/core/Typography';
import { TypographyVariant } from '@material-ui/core/styles';

import { defaultTheme } from '../../../src/themes';

interface DataType {
    tag: TypographyVariant;
    displayName?: string;
    display: string;
    example: string;
}

const columnDefinitions: Column<DataType>[] = [
    {
        id: 'tag',
        width: 100,
        Header: 'Tag',
        accessor: 'tag',
        Cell: ({ row }: any) => {
            if (row && row.original) {
                return (
                    <Typography variant="body1" component="span">
                        {row.original.displayName || row.original.tag}
                    </Typography>
                );
            }
            return row.original.display;
        },
    },
    {
        id: 'display',
        width: 200,
        Header: 'Display',
        Cell: ({ row }: any) => {
            if (row && row.original) {
                return <Typography variant={row.original.tag}>{row.original.display}</Typography>;
            }
            return null;
        },
    },
    {
        id: 'fontWeight',
        width: 200,
        Header: 'Font weight',
        Cell: ({ row }: any) => {
            if (row && row.original && defaultTheme.typography) {
                return (
                    <Typography variant="body1" component="span">
                        {defaultTheme.typography[row.original.tag as TypographyVariant].fontWeight}
                    </Typography>
                );
            }
            return null;
        },
    },
    {
        id: 'fontSize',
        width: 200,
        Header: 'Font size',
        Cell: ({ row }: any) => {
            if (row && row.original && defaultTheme.typography) {
                return (
                    <Typography variant="body1" component="span">
                        {defaultTheme.typography[row.original.tag as TypographyVariant].fontSize}
                    </Typography>
                );
            }
            return null;
        },
    },
    {
        id: 'lineHeight',
        width: 200,
        Header: 'Line height',
        Cell: ({ row }: any) => {
            if (row && row.original && defaultTheme.typography) {
                return (
                    <Typography variant="body1" component="span">
                        {defaultTheme.typography[row.original.tag].lineHeight}
                    </Typography>
                );
            }
            return row.original.display;
        },
    },
    {
        id: 'example',
        width: 500,
        Header: 'Example Usage',
        accessor: 'example',
    },
];

const data: DataType[] = [
    { tag: 'h1', display: 'Heading 1', example: 'Page title' },
    { tag: 'h2', display: 'Heading 2', example: 'Container title' },
    {
        tag: 'h3',
        display: 'Heading 3',
        example: 'Card section header, Key/value pair column title, Help panel section header',
    },
    { tag: 'h4', display: 'Heading 4', example: 'Paragraph title' },
    { tag: 'h5', display: 'Heading 5', example: '-' },
    { tag: 'body1', displayName: 'body1', display: 'Paragraph', example: 'Body and paragraph text.' },
    { tag: 'body2', display: 'Small', example: 'Step labels in multipage create step navigation pane' },
];

const DefaultTypeStyle: FunctionComponent = () => (
    <Table
        columnDefinitions={columnDefinitions}
        items={data}
        disableGroupBy={true}
        disablePagination={true}
        disableSettings={true}
        disableFilters={true}
        disableSortBy={true}
        disableRowSelect={true}
    />
);

export default DefaultTypeStyle;
