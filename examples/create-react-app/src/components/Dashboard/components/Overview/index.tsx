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
import React, { FunctionComponent } from 'react';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import data, { sumByItem } from '../../../../data';

const totalOrder = data.length;
const mostSoldItem = sumByItem[sumByItem.length - 1].item;
const totalAmount = sumByItem.reduce((sum: number, item: any) => {
    sum += item.amount;
    return sum;
}, 0);

const totalDiscount = sumByItem.reduce((sum: number, item: any) => {
    sum += item.discount;
    return sum;
}, 0);

const transactionsWithDiscount = data.reduce((count, order) => {
    if (order.discounted) {
        count++;
    }
    return count;
}, 0);

const pendingOrder = data.reduce((count, order) => {
    if (order.status === 'Processing') {
        count++;
    }
    return count;
}, 0);

const Overview: FunctionComponent = () => {
    return (
        <Container title="High level overview">
            <ColumnLayout>
                <Column key="column1">
                    <KeyValuePair label="Total number of order" value={totalOrder} />
                    <KeyValuePair
                        label="Number of transactions with discount"
                        value={transactionsWithDiscount}
                    ></KeyValuePair>
                </Column>
                <Column key="column2">
                    <KeyValuePair label="Total revenue" value={`$${totalAmount}`} />
                    <KeyValuePair label="Total discount" value={`$${totalDiscount}`} />
                </Column>
                <Column key="column3">
                    <KeyValuePair label="Most sold item" value={mostSoldItem} />
                    <KeyValuePair label="Number of pending orders" value={pendingOrder} />
                </Column>
            </ColumnLayout>
        </Container>
    );
};

export default Overview;
