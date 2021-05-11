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
import Alert from '.';
import Stack from '../../layouts/Stack';

export default {
    component: Alert,
    title: 'Alert',
};

export const Success = () => (
    <Stack>
        <Alert type="success">Pinned</Alert>
        <Alert type="success" header="Success header">
            Pinned
        </Alert>
        <Alert type="success" dismissible={true} onDismiss={action('onDismiss-click')}>
            Dismissable
        </Alert>
        <Alert type="success" dismissible={true} dismissAriaLabel="Quit" onDismiss={action('onDismiss-click')}>
            Dismissable with dismissible label
        </Alert>
        <Alert
            type="success"
            dismissible={true}
            buttonText="Close"
            onDismiss={action('onDismiss-click')}
            onButtonClick={action('onButtonClick-click')}
        >
            With button
        </Alert>
    </Stack>
);

export const Info = () => (
    <Stack>
        <Alert type="info">Pinned</Alert>
        <Alert type="info" header="Info header">
            Pinned
        </Alert>
        <Alert type="info" dismissible={true} onDismiss={action('onDismiss-click')}>
            Dismissable
        </Alert>
        <Alert type="info" dismissible={true} dismissAriaLabel="Quit" onDismiss={action('onDismiss-click')}>
            Dismissable with dismissible label
        </Alert>
        <Alert
            type="info"
            dismissible={true}
            buttonText="Close"
            onDismiss={action('onDismiss-click')}
            onButtonClick={action('onButtonClick-click')}
        >
            With button
        </Alert>
    </Stack>
);

export const Warning = () => (
    <Stack>
        <Alert type="warning">Pinned</Alert>
        <Alert type="warning" header="Warning header">
            Pinned
        </Alert>
        <Alert type="warning" dismissible={true} onDismiss={action('onDismiss-click')}>
            Dismissable
        </Alert>
        <Alert type="warning" dismissible={true} dismissAriaLabel="Quit" onDismiss={action('onDismiss-click')}>
            Dismissable with dismissible label
        </Alert>
        <Alert
            type="warning"
            dismissible={true}
            buttonText="Close"
            onDismiss={action('onDismiss-click')}
            onButtonClick={action('onButtonClick-click')}
        >
            With button
        </Alert>
    </Stack>
);

export const Error = () => (
    <Stack>
        <Alert type="error">Pinned</Alert>
        <Alert type="error" header="Error header">
            Pinned
        </Alert>
        <Alert type="error" dismissible={true} onDismiss={action('onDismiss-click')}>
            Dismissable
        </Alert>
        <Alert type="error" dismissible={true} dismissAriaLabel="Quit" onDismiss={action('onDismiss-click')}>
            Dismissable with dismissible label
        </Alert>
        <Alert
            type="error"
            dismissible={true}
            buttonText="Close"
            onDismiss={action('onDismiss-click')}
            onButtonClick={action('onButtonClick-click')}
        >
            With button
        </Alert>
    </Stack>
);
