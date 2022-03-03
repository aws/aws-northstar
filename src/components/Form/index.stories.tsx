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
import { makeStyles } from '@material-ui/core/styles';
import Form from '.';
import Button from '../Button';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
    },
}));

export default {
    component: Form,
    title: 'Components/Form',
};

const Actions = () => (
    <div>
        <Button variant={'link'}>Cancel</Button>
        <Button variant={'primary'}>Submit</Button>
    </div>
);

export const Default = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Form header="Form header" actions={<Actions />}>
                <p>Form sections come here</p>
            </Form>
        </div>
    );
};

export const WithAllProps = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Form
                header="Form header"
                actions={<Actions />}
                description="Some description"
                errorText="Some error description"
            >
                <p>Form sections come here</p>
            </Form>
        </div>
    );
};
