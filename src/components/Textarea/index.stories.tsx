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
import Textarea from '.';
import { action } from '@storybook/addon-actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    customBackground: {
        backgroundColor: 'lightgreen',
    },
    customWidth: {
        width: '50%',
    },
}));

export default {
    component: Textarea,
    title: 'Textarea',
};

export const Default = () => <Textarea value="This is a textarea" />;

export const Error = () => <Textarea placeholder="Error" invalid={true} />;

export const Disabled = () => <Textarea placeholder="This is a disabled textarea" disabled={true} />;

export const ReadOnly = () => <Textarea placeholder="This is a readOnly textarea" readonly={true} />;

export const WithOnChange = () => (
    <Textarea placeholder="This is a textarea with onChange() event" onChange={action('onChange')} />
);

export const WithOnKeyUpDown = () => (
    <Textarea
        placeholder="This is a textarea with onChange() event"
        onKeyUp={action('onKeyUp')}
        onKeyDown={action('onKeyDown')}
    />
);

export const WithClassName = () => {
    const classes = useStyles();

    return (
        <Textarea
            placeholder="This is a textarea with onChange() event"
            className={clsx(classes.customBackground, classes.customWidth)}
        />
    );
};
