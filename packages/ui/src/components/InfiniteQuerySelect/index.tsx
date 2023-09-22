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
import Select, { SelectProps } from '@cloudscape-design/components/select';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

/**
 * Options for the infinite query select
 */
export interface InfiniteQuerySelectProps<TItem, K extends string, TExtendedItem extends TItem, TError>
    extends Omit<SelectProps, 'options' | 'onLoadItems' | 'statusType'> {
    /**
     * Tanstack query hook result used to fetch items
     */
    readonly query: UseInfiniteQueryResult<Record<K, TItem[]>, TError>;
    /**
     * Key in the response under which the items to select are returned
     */
    readonly itemsKey: K;
    /**
     * Method to convert an individual item to an option definition (the entity used by the select component).
     * It's recommended to return a `value` which uniquely identifies the item
     */
    readonly toOption: (item: TItem) => SelectProps.Option;
    /**
     * Optional function to compute additional fields or add items, called with all pages of data whenever new data is loaded
     */
    readonly extendData?: (item: TItem[]) => TExtendedItem[];
}

/**
 * Extends the Cloudscape Select component with pagination options for @tanstack/react-query infinite query hooks.
 * Compatible with generated hooks for paginated operations from <a href='https://aws.github.io/aws-pdk/developer_guides/type-safe-api/index.html' target='_blank' rel='noreferrer noopener'>AWS PDK Type Safe API</a>.
 */
const InfiniteQuerySelect = <TItem, K extends string, TExtendedItem extends TItem, TError>({
    query,
    itemsKey,
    toOption,
    extendData,
    ...props
}: InfiniteQuerySelectProps<TItem, K, TExtendedItem, TError>) => {
    const allLocalData = useMemo(() => {
        const flattenedData = (query?.data?.pages ?? []).flatMap((p) => p[itemsKey]);
        return extendData ? extendData(flattenedData) : flattenedData;
    }, [query.data?.pages, extendData, itemsKey]);

    const options = useMemo<SelectProps.Option[]>(() => {
        return allLocalData.map(toOption);
    }, [allLocalData, toOption]);

    const onLoadItems = useCallback<NonNullable<SelectProps['onLoadItems']>>(
        async ({ detail: { firstPage, samePage } }) => {
            if (firstPage) {
                await query.refetch();
            }
            if (!samePage) {
                await query.fetchNextPage();
            }
        },
        [query]
    );

    const status = useMemo<SelectProps['statusType']>(() => {
        if (query.isLoading || query.isFetchingNextPage) {
            return 'loading';
        } else if (query.hasNextPage) {
            return 'pending';
        }
        return 'finished';
    }, [query.isLoading, query.hasNextPage, query.isFetchingNextPage]);

    return <Select options={options} onLoadItems={onLoadItems} statusType={status} {...props} />;
};

export default InfiniteQuerySelect;
