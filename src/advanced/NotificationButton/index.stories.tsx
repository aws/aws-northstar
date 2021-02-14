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

import React, { useState, useCallback } from 'react';
import { action } from '@storybook/addon-actions';
import NotificationButton, { NotificationSeverity } from '.';
import Box from '../../layouts/Box';

export default {
    component: NotificationButton,
    title: 'NotificationButton',
};

const defaultNotifications = [
    {
        id: '1',
        severity: 'INFO',
        title: 'Info title',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    },
    {
        id: '2',
        severity: 'ERROR',
        title: 'Error title',
    },
    {
        id: '3',
        severity: 'WARNING',
        title: 'Warning long long long long title',
    },
];

export const Default = () => (
    <Box
        color="primary.contrastText"
        bgcolor="primary.main"
        width="100%"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
    >
        <NotificationButton onDismissNotification={action('onDismissNotification')} />
    </Box>
);

export const WithNotifications = () => {
    const [notifications, setNotifications] = useState(defaultNotifications);
    const handleDismissNotifications = useCallback(
        (id: string) => {
            setNotifications(notifications.filter((n) => n.id !== id));
        },
        [notifications, setNotifications]
    );
    return (
        <Box
            color="primary.contrastText"
            bgcolor="primary.main"
            width="100%"
            height="100px"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <NotificationButton notifications={notifications} onDismissNotification={handleDismissNotifications} />
        </Box>
    );
};
