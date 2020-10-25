import React, { FunctionComponent, useState }from 'react';
import { useHistory } from 'react-router-dom';
import Box from 'aws-northstar/layouts/Box';
import Button from 'aws-northstar/components/Button';
import Checkbox from 'aws-northstar/components/Checkbox';
import Inline from 'aws-northstar/layouts/Inline';
import StatusIndicator from 'aws-northstar/components/StatusIndicator';
import Table from 'aws-northstar/components/Table';

import data from '../../../../data';

const columnDefinitions = [
    {
        id: 'customer',
        width: 150,
        Header: 'Customer name',
        accessor: 'customer'
    },
    {
        id: 'item',
        width: 150,
        Header: 'Item',
        accessor: 'item'
    },
    {
        id: 'amount',
        width: 150,
        Header: 'Total',
        accessor: 'amount',
        Cell: ({ row }: any) => {
            if (row && row.original) {
                return <Box textAlign='right'>${row.original.amount}</Box>;
            }

            return row.id;
        }
    },
    {
        id: 'discounted',
        width: 120,
        Header: 'Discounted?',
        Cell: ({ row }: any) => {
            if (row && row.original) {
                const discounted = row.original.discounted;
                return <Box textAlign='center'><Checkbox checked={discounted} disabled/></Box>
            }

            return row.id;
        }
    },
    {
        id: 'discountAmount',
        width: 100,
        Header: 'Discount',
        accessor: 'discountAmount',
        Cell: ({ row }: any) => {
            if (row && row.original) {
                return <Box textAlign='right'>{row.original.discountAmount ? `$${row.original.discountAmount}` : '-'}</Box>;
            }

            return row.id;
        }
    },
    {
        id: 'date',
        width: 150,
        Header: 'Purchase date',
        accessor: 'date'
    },
    {
        id: 'status',
        width: 150,
        Header: 'Status',
        accessor: 'status',
        Cell: ({ row }: any) => {
            if (row && row.original) {
                const status = row.original.status;
                switch(status) {
                    case 'Delivered':
                        return <StatusIndicator  statusType='positive'>Delivered</StatusIndicator>;
                    case 'Canceled':
                        return <StatusIndicator  statusType='negative'>Canceled</StatusIndicator>;
                    case 'Returned':
                        return <StatusIndicator  statusType='negative'>Returned</StatusIndicator>;
                    case 'Processing':
                        return <StatusIndicator statusType='info'>Processing</StatusIndicator>;
                    default:
                        return null;
                }
            }

            return row.id;
        }
    }
];

const OrdersTable: FunctionComponent = () => {
    const [selectedItems, setSelectedItems] = useState<object[]>([]);
    const history = useHistory();
    
    const onCreateClick = () => {
        history.push('/createOrder');
    }

    const handleSelectionChange = (items: object[]) => {
        if (!(selectedItems.length === 0 && items.length === 0)) {
            setSelectedItems(items);
        }
    };

    const tableActions = (
        <Inline>
            <Button disabled={selectedItems.length !== 1} onClick={()=>{}}>
                Delete
            </Button>
            <Button onClick={onCreateClick} variant="primary">
                Create sales order
            </Button>
        </Inline>
    );

    return <Table
        onSelectionChange={handleSelectionChange}
        tableTitle={'Sales orders'}
        columnDefinitions={columnDefinitions}
        items={data}
        actionGroup={tableActions}
        multiSelect={false}
    />
}

export default OrdersTable;