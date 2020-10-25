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
import React from 'react';
import { action } from '@storybook/addon-actions';
import Flashbar from '.';
import { FlashbarMessage } from './types';

export default {
    component: Flashbar,
    title: 'Flashbar',
};

export const Default = () => {
    const item: FlashbarMessage = {
        header: 'Your order is being processed',
        content: 'This may take up to an hour. You may navigate away from this page',
        dismissible: true,
    };
    return <Flashbar items={[item]} />;
};

export const StackedMessages = () => {
    const items: FlashbarMessage[] = [
        {
            header: 'Successfully updated 4 orders',
            type: 'success',
            content: 'This is a success flash message.',
            dismissible: false,
        },
        {
            header: 'Failed to update 1 order',
            type: 'error',
            content: 'This is a dismissible error message with a button.',
            buttonText: 'Retry',
            onButtonClick: action('onButtonClick'),
            dismissible: true,
        },
        {
            header: 'Warning',
            type: 'warning',
            content: 'This is warning content',
            dismissible: false,
        },
    ];

    return <Flashbar items={items} />;
};

export const Loading = () => {
    const item = {
        header: 'Your order is being processed',
        content: 'This may take up to an hour. You may navigate away from this page',
        dismissible: true,
        loading: true,
    };
    return <Flashbar items={[item]} />;
};

export const MaxItems = () => {
    const items: FlashbarMessage[] = [
        {
            header: 'Successfully updated 4 orders',
            type: 'success',
            content: 'This is a dismissible success flash message.',
            dismissible: true,
        },
        {
            header: 'Failed to update 1 order',
            type: 'error',
            content: 'This is a dismissible error message with a button.',
            buttonText: 'Retry',
            onButtonClick: action('onButtonClick'),
            dismissible: true,
        },
        {
            header: 'Successfully updated 4 orders',
            type: 'success',
            content: 'This is a dismissible success flash message.',
            dismissible: true,
        },
        {
            header: 'Failed to update 1 order',
            type: 'error',
            content: 'This is a dismissible error message with a button.',
            buttonText: 'Retry',
            onButtonClick: action('onButtonClick'),
            dismissible: true,
        },
    ];

    return <Flashbar items={items} maxItemsDisplayed={2} />;
};
