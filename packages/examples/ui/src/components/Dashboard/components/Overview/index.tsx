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
import React, { FC } from 'react';
import KeyValuePairs from '@aws-northstar/ui/components/KeyValuePairs';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
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

const Overview: FC = () => {
    return (
        <Container header={<Header>High level overview</Header>}>
            <KeyValuePairs items={[
                [
                    {
                        label: 'Total number of order',
                        value: totalOrder,
                    },
                    {
                        label: 'Number of transactions with discount',
                        value: transactionsWithDiscount,
                    }
                ],
                [{
                    label: 'Total revenue',
                    value: `$${totalAmount}`
                }, {
                    label: 'Total discount',
                    value: `$${totalDiscount}`
                }],
                [{
                    label: 'Most sold item',
                    value: mostSoldItem
                }, {
                    label: 'Number of pending orders',
                    value: `$${pendingOrder}`
                }],
            ]} />
        </Container>
    );
};

export default Overview;
