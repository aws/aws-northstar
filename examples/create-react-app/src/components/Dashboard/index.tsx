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
import { FunctionComponent } from 'react';
import Stack from 'aws-northstar/layouts/Stack';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import OrdersTable from './components/OrdersTable';
import Overview from './components/Overview';
import PercentageSaleByItems from './components/PercentageSaleByItems';
import SaleByItems from './components/SaleByItems';
import SaleByMonths from './components/SaleByMonths';

const Dashboard: FunctionComponent = () => {
    return (
        <Stack>
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
            <Overview />
            <OrdersTable />
        </Stack>
    );
};

export default Dashboard;
