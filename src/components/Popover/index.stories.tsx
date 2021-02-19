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
import Popover from '.';
import Stack from '../../layouts/Stack';
import ColumnLayout, { Column } from '../../layouts/ColumnLayout';
import StatusIndicator from '../StatusIndicator';
import Button from '../Button';
import KeyValuePair from '../KeyValuePair';
import { action } from '@storybook/addon-actions';

export default {
    component: Popover,
    title: 'Popover',
};

export const Small = () => (
    <Stack>
        <Popover
            position="right"
            size="small"
            triggerType="custom"
            content={<StatusIndicator statusType="positive">Code snippet copied</StatusIndicator>}
        >
            <Button>Copy</Button>
        </Popover>
    </Stack>
);

export const Medium = () => (
    <Stack>
        <Popover
            position="bottom"
            size="medium"
            showDismissButton={false}
            header={<StatusIndicator statusType="negative">Memory Error</StatusIndicator>}
            triggerType="text"
            content={
                <span>
                    This instance contains insufficient memory. Stop the instance, choose a different instance type with
                    more memory, and restart it.
                </span>
            }
        >
            <StatusIndicator statusType="negative">Error</StatusIndicator>
        </Popover>
    </Stack>
);

export const Large = () => (
    <Stack>
        <Popover
            position="right"
            size="large"
            showDismissButton
            dismissAriaLabel="Close"
            fixedWidth={true}
            header="Network interface eth0"
            triggerType="text"
            content={
                <ColumnLayout>
                    <Column key="column2">
                        <Stack>
                            <KeyValuePair
                                label="Status"
                                value={<StatusIndicator statusType="positive">Available</StatusIndicator>}
                            ></KeyValuePair>
                            <KeyValuePair label="Interface ID" value="eni-055da457bed9bbbe6"></KeyValuePair>
                            <KeyValuePair label="VPC ID" value="vpc-626163728"></KeyValuePair>
                        </Stack>
                    </Column>
                    <Column key="column3">
                        <Stack>
                            <KeyValuePair label="Private IP address" value="172.31.34.247"></KeyValuePair>
                            <KeyValuePair
                                label="Private DNS name"
                                value="ip-172-31-34-247.us-east-2-compute.internal"
                            ></KeyValuePair>
                            <KeyValuePair label="Public IP address" value="18.216.153.9"></KeyValuePair>
                        </Stack>
                    </Column>
                </ColumnLayout>
            }
        >
            eth0
        </Popover>
    </Stack>
);

export const StateChangeCallbacks = () => (
    <Stack>
        <Popover
            position="right"
            size="small"
            triggerType="custom"
            content={<StatusIndicator statusType="positive">Code snippet copied</StatusIndicator>}
            onOpen={action('opened')}
            onClose={action('closed')}
        >
            <Button>Copy</Button>
        </Popover>
    </Stack>
);
