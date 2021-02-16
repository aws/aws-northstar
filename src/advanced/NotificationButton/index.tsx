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
import React, { useMemo } from 'react';
import clsx from 'clsx';
import Box from '../../layouts/Box';
import { NotificationsIcon } from '../../icons';
import Alert from '../../components/Alert';
import Badge from '../../components/Badge';
import ButtonDropdown from '../../components/ButtonDropdown';
import { makeStyles } from '../../themes';

/**
 * Severity of a notification.
 */
export type NotificationSeverity = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';

export interface NotificationMessage {
    /** The id of the notification */
    id: string;
    /** Indicates the type of the message to be displayed. Available options 'ERROR' | 'INFO' | 'DEBUG' | 'WARNING' */
    severity: NotificationSeverity;
    /** Title text. */
    title: string;
    /** Content text */
    content?: string;
}

export interface NotificationButtonProps {
    /**
     * An array of notification message objects. Each notification message can have:<br/>
     *
     * - <b>id (string)</b> the id of the notification. <br/>
     * - <b>severity (string)</b> indicates the type of the message to be displayed. Available options 'ERROR' | 'INFO' | 'DEBUG' | 'WARNING' <br/>
     * - <b>title: (string)</b> title text <br/>
     * - <b>content (string)</b> optional content of the notification <br/>
     * */
    notifications?: NotificationMessage[];
    /** Callback when the notification is dismissed */
    onDismissNotification: (id: string) => void;
}

const getNotificationType = (severity: NotificationSeverity): 'warning' | 'info' | 'error' => {
    switch (severity) {
        case 'WARNING':
            return 'warning';
        case 'ERROR':
            return 'error';
        default:
            return 'info';
    }
};

const useStyles = makeStyles(() => ({
    menuItem: {
        border: 'none',
        borderBottom: '1px solid ',
        padding: 0,
        maxWidth: '500px',
    },
    icon: {
        verticalAlign: 'middle',
    },
}));

/** A button which succinctly indicates the number of notifications as a badge, with each notification shown when the button is clicked */
const NotificationButton = ({ notifications = [], onDismissNotification }: NotificationButtonProps) => {
    const styles = useStyles();
    const content = useMemo(
        () => (
            <Box>
                <NotificationsIcon className={clsx({ [styles.icon]: notifications.length === 0 })} />
                {notifications.length > 0 && <Badge color="blue" content={notifications.length} />}
            </Box>
        ),
        [notifications]
    );

    const items = useMemo(() => {
        return notifications.map((notification) => ({
            text: (
                <Alert
                    borderRadius={false}
                    header={notification.title}
                    type={getNotificationType(notification.severity)}
                    dismissable={true}
                    onDismiss={() => onDismissNotification(notification.id)}
                >
                    {notification.content}
                </Alert>
            ),
        }));
    }, [notifications]);

    return (
        <ButtonDropdown
            menuItemClassName={styles.menuItem}
            disableArrowDropdown
            items={items}
            content={content}
            darkTheme
        />
    );
};

export default NotificationButton;
