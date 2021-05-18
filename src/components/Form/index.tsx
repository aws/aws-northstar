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

import React, { FunctionComponent, ReactNode, ElementType } from 'react';
import Alert from '../Alert';
import { makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    headerContainer: {
        marginBottom: theme.spacing(2),
    },
    description: {
        padding: theme.spacing(1, 0),
        color: theme.palette.text.secondary,
    },
    contentContainer: {
        marginBottom: theme.spacing(2),
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
}));

export interface FormProps {
    /** Title of the form */
    header?: ReactNode | string;
    /** General description of the form */
    description?: ReactNode | string;
    /** Additional form level validation message */
    errorText?: string;
    /** Form action buttons are supposed to be placed here */
    actions: ReactNode;
    /** handler for form submission*/
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
    /** The form component to be used. If not provided, html `<form>` will be used. */
    FormComponent?: ElementType;
}

/**
 * A form represents a document section that contains interactive controls to submit information to a web server.
 */
const Form: FunctionComponent<FormProps> = ({
    header,
    description,
    errorText,
    actions,
    children,
    FormComponent,
    ...formProps
}) => {
    const classes = useStyles();

    const content = (
        <>
            <div className={classes.headerContainer}>
                <Typography variant="h3">{header}</Typography>
                {description && (
                    <Typography className={classes.description} variant="body1">
                        {description}
                    </Typography>
                )}
                {errorText && <Alert type="error">{errorText}</Alert>}
            </div>
            <div className={classes.contentContainer}>{children}</div>
            <div className={classes.actions}>{actions}</div>
        </>
    );

    if (FormComponent) {
        return <FormComponent {...formProps}>{content}</FormComponent>;
    }

    return <form {...formProps}>{content}</form>;
};

export default Form;
