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
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import FormRenderer from '../FormRenderer';
import FormRendererTable from '.';
import { act } from 'react-dom/test-utils';

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
        const items = [
            {
                id: 'id1',
                name: 'Order 1',
                createdDate: '2019-10-12',
            },
            {
                id: 'id2',
                name: 'Order 2',
                createdDate: '2019-11-12',
            },
        ];
        const schema = {
            ...baseSchema,
            fields: [
                {
                    component: 'TABLE',
                    name: 'table',
                    label: 'Table',
                    description: 'This is a table',
                    getRowId: (data: any) => data.id,
                    items,
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
            const { getByText, getAllByRole } = render(
                <FormRenderer
                    customComponentWrapper={customComponentMapping}
                    schema={schema}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            );

            expect(getByText('Order 1')).toBeVisible();
            expect(getByText('Order 2')).toBeVisible();
            expect(getAllByRole('checkbox')).toHaveLength(3);
        });

        it('should allow selection', () => {
            const { getAllByRole, getByText } = render(
                <FormRenderer
                    customComponentWrapper={customComponentMapping}
                    schema={schema}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            );

            const id2 = getAllByRole('checkbox').find((cb) => cb.id === 'id2');

            expect(id2).not.toBeUndefined();

            act(() => {
                fireEvent.click(id2!);
            });

            expect(id2).toBeChecked();

            fireEvent.click(getByText('Submit'));

            expect(handleSubmit).toHaveBeenCalledWith(
                {
                    table: [
                        {
                            id: 'id2',
                            name: 'Order 2',
                            createdDate: '2019-11-12',
                        },
                    ],
                },
                expect.anything(),
                expect.anything()
            );
        });

        it('should keep the selection when filtering', async () => {
            const { getByPlaceholderText, getAllByRole, getByText, queryByText } = render(
                <FormRenderer
                    customComponentWrapper={customComponentMapping}
                    schema={schema}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            );

            const id2 = getAllByRole('checkbox').filter((cb) => cb.id === 'id2')[0];

            act(() => {
                fireEvent.click(id2);
            });

            expect(id2).toBeChecked();

            expect(getByText('Order 1')).toBeVisible();
            expect(getByText('Order 2')).toBeVisible();

            act(() => {
                fireEvent.change(getByPlaceholderText('Search'), { target: { value: 'Order 1' } });
            });

            expect(getByText('Order 1')).toBeVisible();

            await waitFor(() => {
                expect(queryByText('Order 2')).toBeNull();
            });

            fireEvent.click(getByText('Submit'));

            expect(handleSubmit).toHaveBeenCalledWith(
                {
                    table: [
                        {
                            id: 'id2',
                            name: 'Order 2',
                            createdDate: '2019-11-12',
                        },
                    ],
                },
                expect.anything(),
                expect.anything()
            );
        });
    });
});
