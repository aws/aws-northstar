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
import { ComponentStory, Meta } from '@storybook/react';
import InfiniteQueryTable, { InfiniteQueryTableProps } from '.';
import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import { TableProps } from '@cloudscape-design/components/table';

interface TestDataItem {
    readonly name: string;
    readonly value: number;
}

interface TestDataResponse {
    readonly items: TestDataItem[];
    readonly nextPageStart?: number;
}

type OmittedProps = 'query' | 'itemsKey' | 'pageSize' | 'columnDefinitions';

export default {
    component: InfiniteQueryTable,
    title: 'Components/InfiniteQueryTable',
    decorators: [
        (Story) => (
            <QueryClientProvider client={new QueryClient()}>
                <Story />
            </QueryClientProvider>
        ),
    ],
} as Meta<Omit<InfiniteQueryTableProps<TestDataItem, 'items', TestDataItem, unknown>, OmittedProps>>;

const useTestData = () =>
    useInfiniteQuery(
        ['querykey'],
        ({ pageParam }) => {
            return new Promise<TestDataResponse>((resolve) => {
                const page = pageParam ?? 0;
                setTimeout(
                    () =>
                        resolve({
                            items: [
                                { name: `Item ${page + 1}`, value: page + 1 },
                                { name: `Item ${page + 2}`, value: page + 2 },
                                { name: `Item ${page + 3}`, value: page + 3 },
                            ],
                            nextPageStart: page + 3,
                        }),
                    500
                );
            });
        },
        {
            getNextPageParam: (res) => res.nextPageStart,
        }
    );

const columnDefinitions: TableProps.ColumnDefinition<TestDataItem>[] = [
    {
        id: 'name',
        header: 'Name',
        cell: (cell) => cell.name,
        sortingField: 'name',
    },
    {
        id: 'value',
        header: 'Value',
        cell: (cell) => cell.value,
        sortingField: 'value',
    },
];

const Template: ComponentStory<typeof InfiniteQueryTable<TestDataItem, 'items', TestDataItem, unknown>> = (
    args: Omit<InfiniteQueryTableProps<TestDataItem, 'items', TestDataItem, unknown>, OmittedProps>
) => {
    const query = useTestData();
    return (
        <InfiniteQueryTable
            query={query}
            itemsKey={'items'}
            pageSize={3}
            columnDefinitions={columnDefinitions}
            {...args}
        />
    );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
    docs: {
        source: {
            code: `// Generated hook from Type Safe API, or your custom tanstack react-query "useInfiniteQuery" hook
const items = useListItems();

return (
    <InfiniteQueryTable
        // Pass in your query hook
        query={items}
        // Pass in the key in infinite query page response containing the list of items
        itemsKey="items"
        columnDefinitions={[
            {
                id: 'name',
                header: 'Name',
                cell: (item) => item.name,
            },
            {
                id: 'type',
                header: 'Type',
                cell: (item) => item.type,
            },
        ]}
    />
);`,
        },
    },
};

export const ClientSideTextFilter = Template.bind({});
ClientSideTextFilter.args = {
    clientSideTextFilter: {
        filterFunction: (text, item) => item.name?.includes(text),
        placeholder: 'Find items...',
    },
};
ClientSideTextFilter.parameters = {
    docs: {
        source: {
            code: `// Generated hook from Type Safe API, or your custom tanstack react-query "useInfiniteQuery" hook
const items = useListItems();

return (
    <InfiniteQueryTable
        // Pass in your query hook
        query={items}
        // Pass in the key in infinite query page response containing the list of items
        itemsKey="items"
        // Filter items which have been loaded client side
        clientSideTextFilter={{
            filterFunction: (filterText, item) => item.name.includes(filterText),
            placeholder: 'Find items...',
        }}
        columnDefinitions={[
            {
                id: 'name',
                header: 'Name',
                cell: (item) => item.name,
            },
            {
                id: 'type',
                header: 'Type',
                cell: (item) => item.type,
            },
        ]}
    />
);`,
        },
    },
};

export const ClientSideSort = Template.bind({});
ClientSideSort.args = {
    clientSideSort: {
        defaultSortingColumn: {
            sortingField: 'name',
        },
    },
};
ClientSideSort.parameters = {
    docs: {
        source: {
            code: `// Generated hook from Type Safe API, or your custom tanstack react-query "useInfiniteQuery" hook
const items = useListItems();

return (
    <InfiniteQueryTable
        // Pass in your query hook
        query={items}
        // Pass in the key in infinite query page response containing the list of items
        itemsKey="items"
        // Sort items which have been loaded client side
        clientSideSort={{
            defaultSortingColumn: {
                sortingField: 'name',
            },
        }}
        columnDefinitions={[
            {
                id: 'name',
                header: 'Name',
                cell: (item) => item.name,
            },
            {
                id: 'type',
                header: 'Type',
                cell: (item) => item.type,
            },
        ]}
    />
);`,
        },
    },
};
