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
import Input from '.';
import { Grid } from '@material-ui/core';
import { action } from '@storybook/addon-actions';

export default {
    component: Input,
    title: 'Input',
};

export const Default = () => (
    <Grid container spacing={3}>
        <Grid item xs={4}>
            <Input placeholder="Text" type="text" />
        </Grid>
        <Grid item xs={4}>
            <Input placeholder="Password" type="password" />
        </Grid>
        <Grid item xs={4}>
            <Input placeholder="Search" type="search" />
        </Grid>
        <Grid item xs={4}>
            <Input placeholder="Number" type="number" />
        </Grid>
        <Grid item xs={4}>
            <Input placeholder="Email" type="email" />
        </Grid>
    </Grid>
);

export const Variations = () => (
    <Grid container spacing={3}>
        <Grid item xs={4}>
            <Input value="Read Only" readonly={true} type="text" />
        </Grid>
        <Grid item xs={4}>
            <Input value="Disable" disabled={true} type="text" />
        </Grid>
        <Grid item xs={4}>
            <Input placeholder="Without autocomplete" type="text" autocomplete={false} />
        </Grid>
        <Grid item xs={4}>
            <Input value="Text" invalid={true} type="text" />
        </Grid>
        <Grid item xs={4}>
            <Input placeholder="Required" controlId="standard-required" required={true} type="text" />
        </Grid>
        <Grid item xs={4}>
            <Input placeholder="Text with onChange" type="text" onChange={action('state changed')} />
        </Grid>
    </Grid>
);

export const UpdateValue = () => {
    const [value, setValue] = useState('original text');
    window.setTimeout(() => {
        const currentTime = new Date().toLocaleTimeString();
        setValue(`current time: ${currentTime}`);
    }, 1000);
    return <Input value={value} type="text" />;
};
