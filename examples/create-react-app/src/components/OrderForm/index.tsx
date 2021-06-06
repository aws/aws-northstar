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
import { useHistory } from 'react-router-dom';
import Container from 'aws-northstar/layouts/Container';
import FormRenderer, { componentTypes, validatorTypes } from 'aws-northstar/components/FormRenderer';

export const items = Array.from(Array(8).keys()).map((i) => ({
    label: `Item ${i + 1}`,
    value: `Item ${i + 1}`,
}));

const formSchema = {
    header: 'Sales order form',
    description: 'You can create a sales order here',
    fields: [
        {
            component: componentTypes.TEXT_FIELD,
            name: 'customer',
            label: 'Customer name',
            description: 'Name of the customer',
            helperText: 'Maxiumn 50 characters',
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
                {
                    type: validatorTypes.MAX_LENGTH,
                    threshold: 50,
                },
            ],
        },
        {
            component: componentTypes.SELECT,
            name: 'item',
            label: 'Item',
            placeholder: 'Choose an item',
            options: items,
            isRequired: true,
            isSearchable: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.TEXT_FIELD,
            name: 'amount',
            label: 'Total price of an order',
            type: 'number',
            validate: [
                {
                    type: validatorTypes.MIN_NUMBER_VALUE,
                    includeThreshold: true,
                    value: 0,
                },
                {
                    type: validatorTypes.MAX_NUMBER_VALUE,
                    includeThreshold: false,
                    value: 5000,
                },
            ],
        },
        {
            component: componentTypes.DATE_PICKER,
            name: 'date',
            label: 'Purchase date',
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.SELECT,
            name: 'status',
            label: 'Order status',
            placeholder: 'Choose an option',
            options: [
                { label: 'Processing', value: '1' },
                { label: 'Canceled', value: '2' },
                { label: 'Delivered', value: '3' },
            ],
            isRequired: true,
            validate: [
                {
                    type: validatorTypes.REQUIRED,
                },
            ],
        },
        {
            component: componentTypes.SWITCH,
            name: 'discounted',
            label: 'Discount applied?',
        },
        {
            component: componentTypes.TEXT_FIELD,
            name: 'discountAmount',
            label: 'Discount',
            description: 'Discount amount of an order',
            type: 'number',
            condition: {
                when: 'discounted',
                is: true,
            },
            validate: [
                {
                    type: validatorTypes.MIN_NUMBER_VALUE,
                    includeThreshold: true,
                    value: 0,
                },
                {
                    type: validatorTypes.MAX_NUMBER_VALUE,
                    includeThreshold: false,
                    value: 5000,
                },
            ],
        },
    ],
};

const OrderForm: FunctionComponent = () => {
    const history = useHistory();
    return (
        <Container>
            <FormRenderer
                schema={formSchema}
                onSubmit={(data: any) => alert(`Data Submitted: ${JSON.stringify(data)}`)}
                onCancel={() => history.goBack()}
            />
        </Container>
    );
};

export default OrderForm;
