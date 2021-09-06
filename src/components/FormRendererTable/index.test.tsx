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
import FormRenderer from '../FormRenderer';
import FormRendererTable from '.';

describe('FormRendererTable', () => {
    afterEach(() => {
        jest.resetAllMocks();
        cleanup();
    });

    const baseSchema = {
        header: 'header',
        description: 'description',
    };

    const handleCancel = jest.fn();
    const handleSubmit = jest.fn();

    describe('should extend FormRenderer with Table', () => {
        const customComponentMapping = {
            TABLE: FormRendererTable,
        };
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: 'TABLE',
                    name: 'table',
                    label: 'Table',
                    description: 'This is a table',
                    getRowId: (data: any) => data.id,
                    items: [
                        {
                            id: 'id0000011',
                            name: 'Order 11',
                            createdDate: '2019-10-12',
                        },
                        {
                            id: 'id0000012',
                            name: 'Order 12',
                            createdDate: '2019-11-12',
                        },
                    ],
                    columnDefinitions: [
                        {
                            id: 'id',
                            width: 200,
                            Header: 'Id',
                            accessor: 'id',
                        },
                        {
                            id: 'name',
                            width: 200,
                            Header: 'Name',
                            accessor: 'name',
                        },
                        {
                            id: 'createdDate',
                            width: 200,
                            Header: 'Created date',
                            accessor: 'createdDate',
                        },
                    ],
                },
            ],
        };

        it('should render Table', () => {
            const { getByText } = render(
                <FormRenderer
                    customComponentWrapper={customComponentMapping}
                    schema={schema}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            );

            expect(getByText('Order 11')).toBeVisible();
            expect(getByText('Order 12')).toBeVisible();
        });
    });
});
