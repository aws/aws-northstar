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
import InfiniteQuerySelect, { InfiniteQuerySelectProps } from '.';
import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SelectProps } from '@cloudscape-design/components/select';

interface TestDataItem {
    readonly id: string;
    readonly name: string;
    readonly value: number;
}

interface TestDataResponse {
    readonly items: TestDataItem[];
    readonly nextPageStart?: number;
}

type OmittedProps = 'query' | 'itemsKey' | 'toOption' | 'selectedOption' | 'onChange';

export default {
    component: InfiniteQuerySelect,
    title: 'Components/InfiniteQuerySelect',
    decorators: [
        (Story) => (
            <QueryClientProvider client={new QueryClient()}>
                <Story />
            </QueryClientProvider>
        ),
    ],
} as Meta<Omit<InfiniteQuerySelectProps<TestDataItem, 'items', TestDataItem, unknown>, OmittedProps>>;

const useTestData = (maxPages?: number) =>
    useInfiniteQuery(
        ['querykey'],
        ({ pageParam }) => {
            return new Promise<TestDataResponse>((resolve) => {
                const page = pageParam ?? 0;
                setTimeout(
                    () =>
                        resolve({
                            items: [
                                { id: `item_${page + 1}`, name: `Item ${page + 1}`, value: page + 1 },
                                { id: `item_${page + 2}`, name: `Item ${page + 2}`, value: page + 2 },
                                { id: `item_${page + 3}`, name: `Item ${page + 3}`, value: page + 3 },
                            ],
                            nextPageStart: maxPages && page >= maxPages ? undefined : page + 3,
                        }),
                    500
                );
            });
        },
        {
            getNextPageParam: (res) => res.nextPageStart,
        }
    );

const toOption = (item: TestDataItem): SelectProps.Option => ({
    label: item.name,
    value: item.id,
});

const Template: ComponentStory<typeof InfiniteQuerySelect<TestDataItem, 'items', TestDataItem, unknown>> = (
    args: Omit<InfiniteQuerySelectProps<TestDataItem, 'items', TestDataItem, unknown>, OmittedProps>
) => {
    const query = useTestData(10);
    const [selectedOption, setSelectedOption] = useState<SelectProps.Option | null>(null);
    return (
        <InfiniteQuerySelect
            query={query}
            itemsKey={'items'}
            toOption={toOption}
            {...args}
            selectedOption={selectedOption}
            onChange={(e) => setSelectedOption(e.detail.selectedOption)}
        />
    );
};

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Select an item...',
};

Default.parameters = {
    docs: {
        source: {
            // Since we use decorators and hooks in the story template, storybook doesn't render the code correctly.
            // Override the code instead.
            code: `// Generated hook from Type Safe API, or your custom tanstack react-query "useInfiniteQuery" hook
const items = useListItems();

return (
    <InfiniteQuerySelect
        // Pass in your query hook
        query={items}
        // Pass in the key in infinite query page response containing the list of items
        itemsKey="items"
        // Pass a function to convert an item to a select option
        toOption={(item) => ({ label: item.name, value: item.id })}
    />
);`,
        },
    },
};
