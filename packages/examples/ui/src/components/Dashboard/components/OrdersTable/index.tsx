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
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Checkbox from '@cloudscape-design/components/checkbox';
import SpaceBetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import { NonCancelableEventHandler } from '@cloudscape-design/components/internal/events';
import Table, { SelectionChangeDetail } from '@aws-northstar/ui/components/Table';

import data, { Order } from '../../../../data';

const columnDefinitions = [
    {
        id: 'customer',
        width: 150,
        header: 'Customer name',
        cell: (data) => data.customer,
        sortingField: 'customer',
    },
    {
        id: 'item',
        width: 150,
        header: 'Item',
        cell: (data) => data.item,
        sortingField: 'item',
    },
    {
        id: 'amount',
        width: 150,
        header: 'Total',
        cell: (data) => <Box textAlign="right">${data.amount}</Box>,
        sortingField: 'amount',
    },
    {
        id: 'discounted',
        width: 120,
        header: 'Discounted?',
        cell: (data) => (
            <Box textAlign="center">
                <Checkbox checked={data.discounted} disabled />
            </Box>
        ),
        sortingField: 'discounted',
    },
    {
        id: 'discountAmount',
        width: 100,
        header: 'Discount',
        cell: (data) => (
            <Box textAlign="right">{data.discountAmount ? `$${data.discountAmount}` : '-'}</Box>
        ),
        sortingField: 'discountAmount',
    },
    {
        id: 'date',
        width: 150,
        header: 'Purchase date',
        cell: (data) => data.date,
        sortingField: 'date',
    },
    {
        id: 'status',
        width: 150,
        header: 'Status',
        cell: (data) => {
            const status = data.status;
            switch (status) {
                case 'Delivered':
                    return <StatusIndicator type="success">Delivered</StatusIndicator>;
                case 'Canceled':
                    return <StatusIndicator type="error">Canceled</StatusIndicator>;
                case 'Returned':
                    return <StatusIndicator type="error">Returned</StatusIndicator>;
                case 'Processing':
                    return <StatusIndicator type="info">Processing</StatusIndicator>;
                default:
                    return null;
            }
        },
        sortingField: 'status',
    },
];

const OrdersTable: FC = () => {
    const [selectedItems, setSelectedItems] = useState<object[]>([]);
    const navigate = useNavigate();

    const onCreateClick = () => {
        navigate('/createOrder');
    };

    const handleSelectionChange: NonCancelableEventHandler<SelectionChangeDetail<Order>> = ({ detail }) => {
        if (!(selectedItems.length === 0 && detail.selectedItems.length === 0)) {
            setSelectedItems(detail.selectedItems);
        }
    };

    const tableActions = (
        <SpaceBetween direction='horizontal' size='s'>
            <Button disabled={selectedItems.length !== 1} onClick={() => { }}>
                Delete
            </Button>
            <Button onClick={onCreateClick} variant="primary">
                Create sales order
            </Button>
        </SpaceBetween>
    );

    return (
        <Table
            onSelectionChange={handleSelectionChange}
            header="Sales orders"
            columnDefinitions={columnDefinitions}
            items={data}
            selectedItems={selectedItems}
            actions={tableActions}
            selectionType='multi'
        />
    );
};

export default OrdersTable;
