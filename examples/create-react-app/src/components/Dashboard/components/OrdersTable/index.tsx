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
import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from 'aws-northstar/layouts/Box';
import Button from 'aws-northstar/components/Button';
import Checkbox from 'aws-northstar/components/Checkbox';
import Inline from 'aws-northstar/layouts/Inline';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
import Table, { Column } from 'aws-northstar/components/Table';

import data, { Order } from '../../../../data';

const columnDefinitions: Column<Order>[] = [
    {
        id: 'customer',
        width: 150,
        Header: 'Customer name',
        accessor: 'customer',
    },
    {
        id: 'item',
        width: 150,
        Header: 'Item',
        accessor: 'item',
    },
    {
        id: 'amount',
        width: 150,
        Header: 'Total',
        accessor: 'amount',
        Cell: ({ row }) => <Box textAlign="right">${row.original.amount}</Box>,
    },
    {
        id: 'discounted',
        width: 120,
        Header: 'Discounted?',
        accessor: 'discounted',
        Cell: ({ row }) => (
            <Box textAlign="center">
                <Checkbox checked={row.original.discounted} disabled />
            </Box>
        ),
    },
    {
        id: 'discountAmount',
        width: 100,
        Header: 'Discount',
        accessor: 'discountAmount',
        Cell: ({ row }) => (
            <Box textAlign="right">{row.original.discountAmount ? `$${row.original.discountAmount}` : '-'}</Box>
        ),
    },
    {
        id: 'date',
        width: 150,
        Header: 'Purchase date',
        accessor: 'date',
    },
    {
        id: 'status',
        width: 150,
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }) => {
            const status = row.original.status;
            switch (status) {
                case 'Delivered':
                    return <StatusIndicator statusType="positive">Delivered</StatusIndicator>;
                case 'Canceled':
                    return <StatusIndicator statusType="negative">Canceled</StatusIndicator>;
                case 'Returned':
                    return <StatusIndicator statusType="negative">Returned</StatusIndicator>;
                case 'Processing':
                    return <StatusIndicator statusType="info">Processing</StatusIndicator>;
                default:
                    return null;
            }
        },
    },
];

const OrdersTable: FunctionComponent = () => {
    const [selectedItems, setSelectedItems] = useState<object[]>([]);
    const history = useHistory();

    const onCreateClick = () => {
        history.push('/createOrder');
    };

    const handleSelectionChange = (items: object[]) => {
        if (!(selectedItems.length === 0 && items.length === 0)) {
            setSelectedItems(items);
        }
    };

    const tableActions = (
        <Inline>
            <Button disabled={selectedItems.length !== 1} onClick={() => {}}>
                Delete
            </Button>
            <Button onClick={onCreateClick} variant="primary">
                Create sales order
            </Button>
        </Inline>
    );

    return (
        <Table
            onSelectionChange={handleSelectionChange}
            tableTitle="Sales orders"
            columnDefinitions={columnDefinitions}
            items={data}
            actionGroup={tableActions}
            multiSelect={false}
        />
    );
};

export default OrdersTable;
