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
import Button from '.';
import { action } from '@storybook/addon-actions';
import Inline from '../../layouts/Inline';

export default {
    component: Button,
    title: 'Button',
};

export const PrimaryButton = () => (
    <Button variant={'primary'} onClick={action('clicked')}>
        Primary Button
    </Button>
);

export const DisabledButton = () => (
    <Button disabled onClick={action('clicked')}>
        Disabled Button
    </Button>
);

export const NormalButton = () => <Button onClick={action('clicked')}>Normal Button</Button>;

export const LinkButton = () => (
    <Button variant={'link'} href="#" onClick={action('clicked')}>
        Internal Link
    </Button>
);

export const ButtonsWithDifferentSize = () => (
    <Inline>
        <Button size="small" onClick={action('clicked')}>
            Small Button
        </Button>
        <Button size="medium" onClick={action('clicked')}>
            Medium Button
        </Button>
        <Button size="large" onClick={action('clicked')}>
            Large Button
        </Button>
    </Inline>
);

export const IconButton = () => (
    <Button variant={'icon'} label="settings" icon={'settings'} onClick={action('clicked')}></Button>
);

export const IconButtonsWithText = () => (
    <Inline>
        <Button variant={'primary'} icon={'settings'} onClick={action('clicked')}>
            Settings
        </Button>
        <Button variant={'primary'} icon={'add_plus'} onClick={action('clicked')}>
            Add
        </Button>
        <Button icon={'external'} iconAlign="right" onClick={action('clicked')}>
            Launch
        </Button>
        <Button icon={'folder'} iconAlign="right" onClick={action('clicked')}>
            Folder
        </Button>
    </Inline>
);

export const IconButtonsMaterialUIIcons = () => (
    <Inline>
        <Button variant={'primary'} icon={'Cloud'} onClick={action('clicked')}>
            Cloud
        </Button>
        <Button variant={'primary'} icon={'AccountCircleTwoTone'} onClick={action('clicked')}>
            Account
        </Button>
        <Button icon={'Remove'} iconAlign="right" onClick={action('clicked')}>
            Remove
        </Button>
        <Button variant={'icon'} label="Dns" icon={'Dns'} onClick={action('clicked')}></Button>
    </Inline>
);

export const ReloadButton = () => {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    return (
        <Inline>
            <Button variant={'primary'} icon={'refresh'} loading={loading} onClick={() => setLoading(true)}>
                Reload
            </Button>
            <Button
                variant={'primary'}
                icon={'refresh'}
                loading={loading2}
                onClick={() => setLoading2(true)}
                iconAlign="right"
            >
                Reload
            </Button>
            <Button
                onClick={() => {
                    setLoading(false);
                    setLoading2(false);
                }}
            >
                Loaded
            </Button>
        </Inline>
    );
};

export const ReloadIcon = () => {
    const [loading, setLoading] = useState(false);
    return (
        <Inline>
            <Button
                variant={'icon'}
                label="refresh"
                icon={'refresh'}
                loading={loading}
                onClick={() => setLoading(true)}
            />
            <Button onClick={() => setLoading(false)}>Loaded</Button>
        </Inline>
    );
};
