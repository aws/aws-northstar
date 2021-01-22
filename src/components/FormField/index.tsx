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

import React, { ReactNode, FunctionComponent, useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, Theme, Typography, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import Button from '../Button';
import Box from '../../layouts/Box';
import ExpandableSection from '../ExpandableSection';
import Link from '../Link';

const useStyles = makeStyles((theme: Theme) => ({
    formFieldRoot: {
        '&:not(:last-child)': {
            marginBottom: '20px',
        },
    },
    formFieldControls: {
        marginTop: '5px',
    },
    errorText: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.error.dark,
    },
    expandable: {
        marginLeft: theme.spacing(2),
    },
    secondaryControl: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
}));

export interface BaseFormFieldProps {
    /**
     * The id of the primary form control. Used for setting the label's "for" attribute for accessibility.
     */
    controlId: string;
    /**
     * Detailed information about this form field, displayed below the label.
     * */
    description?: string;
    /**
     * Text to show the control validation message. It will render the form field as invalid.
     * */
    errorText?: string;
    /**
     * Hint text to be displayed below the control. Use this to provide additional information.
     * */
    hintText?: string;
    /**
     * Label of the form field.
     * */
    label?: string;
    /**
     * Secondary control can be used for custom actions and content.
     * */
    secondaryControl?: ReactNode;
    /**
     * Overrides the default layout of the primary and secondary control. <br/>
     * Possible effects of using this flag: In a single column layout, or without any column layout, if stretch is set to true,
     * both controls will expand to 12 columns and stack, as it was a small screen. In a multi column layout, if stretch is set to false, it will override the default behavior,
     * and instead of the 12-12 columns it will get back to 9-3.
     */
    stretch?: boolean;
    /**
     * Whether to use expendable section.
     */
    expandable?: boolean;
    /**
     * The footer content displayed below the hint text.
     */
    footer?: ReactNode;
}

export interface FormFieldProps extends BaseFormFieldProps {
    /**
     * Control region can be used to display an input element, a textarea etc.
     * */
    children: ReactNode;
    /**
     * Render the reload button as secondary control
     */
    renderReload?: boolean;
    /**
     * Callback when the Reload button is clicked.
     * */
    onReloadClick?: () => void;
    /**
     * The href of the create new link to render the create new link as secondard control.
     */
    createNewLinkHref?: string;
    /**
     * The label of the create new link to render the create new link as secondard control
     */
    createNewLink?: string;
}

const ErrorText: FunctionComponent<Partial<FormFieldProps>> = ({ errorText }) => {
    const classes = useStyles();

    return (
        <Typography variant="subtitle1" component="div" className={clsx(classes.errorText, classes.formFieldControls)}>
            <ReportProblemOutlinedIcon fontSize="small" />
            <span>{errorText}</span>
        </Typography>
    );
};

const Control: FunctionComponent<Partial<FormFieldProps>> = ({
    stretch,
    children,
    secondaryControl,
    renderReload,
    onReloadClick,
    createNewLink,
    createNewLinkHref,
}) => {
    const classes = useStyles();
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} sm={stretch ? 12 : 9}>
                {children}
            </Grid>
            {(secondaryControl || renderReload || createNewLinkHref) && (
                <Grid item xs={12} sm={stretch ? 12 : 3}>
                    {renderReload || createNewLinkHref ? (
                        <Box className={classes.secondaryControl}>
                            <>
                                {renderReload && (
                                    <Button label="Reload" icon="refresh" onClick={onReloadClick}>
                                        Reload
                                    </Button>
                                )}
                            </>
                            <>
                                {createNewLinkHref && createNewLink && (
                                    <Link href={createNewLinkHref} forceExternal={true}>
                                        {createNewLink}
                                    </Link>
                                )}
                            </>
                        </Box>
                    ) : (
                        <>{secondaryControl}</>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

/**
 * A form field is a combination of various patterns, making it easy to create properly styled controls in a form.
 */
const FormField: FunctionComponent<FormFieldProps> = ({
    children,
    controlId,
    description,
    errorText,
    hintText,
    label,
    secondaryControl,
    renderReload = false,
    onReloadClick,
    createNewLink,
    createNewLinkHref,
    stretch = false,
    expandable = false,
    footer,
}) => {
    const classes = useStyles();

    const content = useMemo(() => {
        return (
            <Box className={clsx({ [classes.expandable]: expandable })}>
                {' '}
                {description && (
                    <Typography variant="subtitle1" component="div">
                        {description}
                    </Typography>
                )}
                <div className={classes.formFieldControls}>
                    <Control
                        stretch={stretch}
                        secondaryControl={secondaryControl}
                        createNewLink={createNewLink}
                        createNewLinkHref={createNewLinkHref}
                        renderReload={renderReload}
                        onReloadClick={onReloadClick}
                    >
                        {children}
                    </Control>
                </div>
                {errorText && <ErrorText errorText={errorText} />}
                {hintText && <FormHelperText className={classes.formFieldControls}>{hintText}</FormHelperText>}
                {footer && <Box marginTop={1}>{footer}</Box>}
            </Box>
        );
    }, [
        description,
        stretch,
        children,
        errorText,
        hintText,
        classes,
        secondaryControl,
        expandable,
        createNewLink,
        renderReload,
    ]);

    const header = useMemo(() => {
        return <>{label && <InputLabel htmlFor={controlId}>{label}</InputLabel>}</>;
    }, [label, controlId]);

    if (!expandable) {
        return (
            <FormControl className={classes.formFieldRoot}>
                {header}
                {content}
            </FormControl>
        );
    }

    return (
        <ExpandableSection variant="borderless" header={header} expanded={!!errorText}>
            {content}
        </ExpandableSection>
    );
};

export default FormField;
