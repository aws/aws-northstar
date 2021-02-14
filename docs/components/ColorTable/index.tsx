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
// @ts-ignore
import ReactColorSquare from 'react-color-square';
import Box from '../../../src/layouts/Box';
import Table from '../../../src/components/Table';
import Stack from '../../../src/layouts/Stack';
import { defaultTheme } from '../../../src/themes';

const columnDefinitions = [
    {
        id: 'displayValue',
        width: 100,
        Header: 'Display value',
        accessor: 'displayValue',
    },
    {
        id: 'colorName',
        width: 200,
        Header: 'Color name',
        accessor: 'colorName',
    },
    {
        id: 'hexValue',
        width: 200,
        Header: 'HEX value',
        accessor: 'hexValue',
    },
];

const generateDataFromTheme = (theme: any) => {
    const palettes = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    const tableData: {}[] = [];

    palettes.map((palette) => {
        const colorOptions = theme.palette[palette];
        tableData.push({
            displayValue: (
                <Stack spacing="xs">
                    {colorOptions.main && (
                        <Box color={colorOptions.contrastText}>
                            <ReactColorSquare
                                height={80}
                                width={80}
                                color={colorOptions.main}
                                text={`main (${colorOptions.main})`}
                            />
                        </Box>
                    )}
                    {colorOptions.light && (
                        <Box color="text.primary">
                            <ReactColorSquare
                                height={80}
                                width={80}
                                color={colorOptions.light}
                                text={`light (${colorOptions.light})`}
                            />
                        </Box>
                    )}
                    {colorOptions.dark && (
                        <Box color={colorOptions.contrastText}>
                            <ReactColorSquare
                                height={80}
                                width={80}
                                color={colorOptions.dark}
                                text={`dark (${colorOptions.dark})`}
                            />
                        </Box>
                    )}
                </Stack>
            ),
            colorName: `${palette} `,
            hexValue: `${colorOptions.main}`,
        });
    });

    return tableData;
};

const data: any = generateDataFromTheme(defaultTheme);

export default () => (
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
