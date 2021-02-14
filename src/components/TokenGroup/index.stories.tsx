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
import React, { useState } from 'react';
import TokenGroup from '.';
import { action } from '@storybook/addon-actions';
import Input from '../Input';
import { Inline } from '../../layouts';
import Button from '../Button';
import { Item } from './components/Token';

export default {
    component: TokenGroup,
    title: 'TokenGroup',
};

export const Default = () => {
    const items = [
        { label: 'A token', value: '1' },
        { label: 'Another token', value: '2' },
    ];

    return (
        <>
            <TokenGroup items={items} onDismiss={action('onDismiss')} />
        </>
    );
};

export const WithManagedState = () => {
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState<Item[]>([
        { label: 'A token', value: 'A token' },
        { label: 'Another token', value: 'Another token' },
    ]);

    return (
        <>
            <Inline>
                <Input value={inputValue} onChange={setInputValue} placeholder="Add a token..." />
                <Button
                    variant="primary"
                    onClick={() => setItems([...items, { label: inputValue, value: inputValue }])}
                >
                    Add Token
                </Button>
            </Inline>
            <TokenGroup
                items={items}
                onDismiss={(item) => {
                    const index = items.indexOf(item);
                    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
                }}
            />
        </>
    );
};
