import React, { FunctionComponent } from 'react';
import Stack from 'aws-northstar/layouts/Stack';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import OrdersTable from './components/OrdersTable';
import Overview from './components/Overview';
import PercentageSaleByItems from './components/PercentageSaleByItems';
import SaleByItems from './components/SaleByItems';
import SaleByMonths from './components/SaleByMonths';

const Dashboard: FunctionComponent = () => {
    return <Stack>
        <Container title="Order Summary">
            <ColumnLayout>
                <Column key="column1">
                    <PercentageSaleByItems />
                </Column>
                <Column key="column2">
                    <SaleByItems />
                </Column>
                <Column key="column3">
                    <SaleByMonths />
                </Column>
            </ColumnLayout>
        </Container>
        <Overview/>
        <OrdersTable/>
    </Stack>
}

export default Dashboard;