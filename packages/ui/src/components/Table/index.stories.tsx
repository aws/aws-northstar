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
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState, useCallback, useRef } from 'react';
import orderBy from 'lodash.orderby';
import Table, { TableProps, FetchDataOptions, SelectionChangeDetail } from '.';
import columnDefinition from './data/columnDefinitions';
import shortData from './data/short';
import longData from './data/long';
import { DataType } from './data/type';
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events';
import Header from '@cloudscape-design/components/header';
import Button from '@cloudscape-design/components/button';
import Link from '@cloudscape-design/components/link';
import SpaceBetween from '@cloudscape-design/components/space-between';

export default {
    component: Table,
    title: 'Components/Table',
    argTypes: {
        onSelectionChange: { action: true },
    },
    excludeStories: ['columnDefinitionsRemoteUpdateTable', 'dataRemoteUpdateTable'],
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = ({ onSelectionChange, ...args }: TableProps) => {
    const [selectedItems, setSelectedItems] = useState(args.selectedItems);
    const handleSelection: NonCancelableEventHandler<SelectionChangeDetail<DataType>> = useCallback(
        (props) => {
            setSelectedItems([...props.detail.selectedItems]);
            onSelectionChange?.(props);
        },
        [onSelectionChange]
    );
    return <Table selectedItems={selectedItems} onSelectionChange={handleSelection} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    columnDefinitions: columnDefinition,
    items: shortData,
    header: 'Table Title',
    actions: (
        <SpaceBetween direction="horizontal" size="xs">
            <Button>Secondary button</Button>
            <Button variant="primary">Primary button</Button>
        </SpaceBetween>
    ),
    info: <Link variant="info">Info</Link>,
    description: 'Table description',
    onFetchData: undefined,
};

export const LongData = Template.bind({});
LongData.args = {
    ...Default.args,
    items: longData,
};

export const DefaultSelected = Template.bind({});
DefaultSelected.args = {
    ...Default.args,
    selectedItems: [
        {
            id: 'id0000011',
        },
        {
            id: 'id0000016',
        },
    ],
};

export const Empty = Template.bind({});
Empty.args = {
    ...Default.args,
    items: [],
};

export const DisableHeader = Template.bind({});
DisableHeader.args = {
    ...Default.args,
    header: undefined,
};

export const Loading = Template.bind({});
Loading.args = {
    ...Default.args,
    items: [],
    loading: true,
};

export const DisablePagination = Template.bind({});
DisablePagination.args = {
    ...Default.args,
    disablePagination: true,
};

export const DisableSettings = Template.bind({});
DisableSettings.args = {
    ...Default.args,
    disableSettings: true,
};

export const DisableFilters = Template.bind({});
DisableFilters.args = {
    ...Default.args,
    disableFilters: true,
};

export const DisableSelect = Template.bind({});
DisableSelect.args = {
    ...Default.args,
    disableRowSelect: true,
};

export const PureTable = Template.bind({});
PureTable.args = {
    ...Default.args,
    header: undefined,
    disableSettings: true,
    disablePagination: true,
    disableFilters: true,
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
    ...Default.args,
    selectionType: 'single',
};

export const DefaultSingleSelect = Template.bind({});
DefaultSingleSelect.args = {
    ...SingleSelect.args,
    selectedItems: [
        {
            id: 'id0000016',
        },
    ],
};

export const CustomHeader = Template.bind({});
CustomHeader.args = {
    columnDefinitions: columnDefinition,
    items: shortData,
    header: (
        <Header
            variant="h2"
            info={<Link variant="info">Info</Link>}
            actions={
                <SpaceBetween direction="horizontal" size="xs">
                    <Button>Secondary button</Button>
                    <Button variant="primary">Create</Button>
                </SpaceBetween>
            }
        >
            Custom Header
        </Header>
    ),
};

interface TestDataType {
    id: number;
    name: string;
}

export const columnDefinitionsRemoteUpdateTable = [
    {
        id: 'id',
        width: 200,
        header: 'Id',
        cell: (data: any) => data.id,
        sortingField: 'id',
    },
    {
        id: 'name',
        width: 200,
        header: 'Name',
        cell: (data: any) => data.name,
        sortingField: 'name',
    },
];

export const dataRemoteUpdateTable = Array.from(Array(1000).keys()).map((i) => ({
    id: i,
    name: `Name ${i}`,
}));

export const RemoteUpdateTable = () => {
    const [items, setItems] = useState<TestDataType[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchIdRef = useRef(0);

    const [totalItemsCount, setTotalItemsCount] = useState(dataRemoteUpdateTable.length);

    const handleFetchData = useCallback((options: FetchDataOptions) => {
        setLoading(true);
        const fetchId = ++fetchIdRef.current;
        setTimeout(() => {
            if (fetchId === fetchIdRef.current) {
                // You could fetch your data from server.
                let tempData = dataRemoteUpdateTable.filter((d) => {
                    if (options.filterText) {
                        return d.name.indexOf(options.filterText) >= 0;
                    }

                    return true;
                });
                const filterDataCount = tempData.length;

                if (options.sortingField) {
                    tempData = orderBy(tempData, options.sortingField, options.isDescending ? 'desc' : 'asc');
                }

                tempData = tempData.slice(
                    (options.pageIndex - 1) * options.pageSize,
                    options.pageIndex * options.pageSize
                );

                setItems(tempData);
                setTotalItemsCount(filterDataCount);
                setLoading(false);
            }
        }, 1000);
    }, []);

    return (
        <Table
            header="Remote Update Table"
            columnDefinitions={columnDefinitionsRemoteUpdateTable}
            onFetchData={handleFetchData}
            totalItemsCount={totalItemsCount}
            defaultPageSize={10}
            items={items}
            loading={loading}
        />
    );
};
