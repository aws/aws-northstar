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

import React, { ReactNode, FunctionComponent, useState, useEffect } from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import ExpansionPanelSummary from './components/ExpansionPanelSummary';
import Text from '../Text';
import { Variant } from './types';
import makeStyles from '@material-ui/styles/makeStyles';
const useStyles = makeStyles(() => {
    const borderless = {
        border: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&::before': {
            display: 'none',
        },
        backgroundColor: 'transparent',
    };
    return {
        default: borderless,
        borderless,
        container: {
            '& .MuiAccordionDetails-root': {
                padding: '15px 20px',
            },
        },
    };
});

export interface ExpandableSectionProps {
    /**
     * If true, the component will display the content area.
     * If false, the component will hide the content area.
     * */
    expanded?: boolean;
    /**
     * The variant of an expandable section. <br/>
     * Available options are 'default' | 'borderless' | 'container'.
     * */
    variant?: Variant;
    /**
     * Primary content displayed in the expandable section element.
     * */
    children?: ReactNode;
    /**
     * Heading displayed above the content text.
     *  */
    header?: ReactNode;
    /**
     * The description of the section, displayed below the header.
     * */
    description?: ReactNode;
    /**
     * Fired when the state has changed (it has been expanded or collapsed).
     * Provides the current value of the expanded property.
     */
    onChange?: (expanded: boolean) => void;
}

/**
 * An expandable section is a section that a user can expand or collapse.
 * Use expandable sections when you have multiple sections on a page, and you want to allow users to see one or more sections at a time.
 * Expandable sections are collapsed by default.
 */
const ExpandableSection: FunctionComponent<ExpandableSectionProps> = ({
    expanded = false,
    children,
    header = null,
    onChange,
    variant = 'default',
    description,
}) => {
    const [isExpanded, setExpanded] = useState(expanded);
    const styles = useStyles();

    useEffect(() => {
        setExpanded(expanded);
    }, [expanded]);

    const handleChange = () => {
        const toBeState = !isExpanded;
        setExpanded(toBeState);
        onChange?.(toBeState);
    };

    return (
        <Accordion className={styles[variant]} square expanded={isExpanded} onChange={handleChange}>
            <ExpansionPanelSummary variant={variant} header={header} description={description} expanded={isExpanded} />
            {variant !== 'borderless' && <Divider />}
            <AccordionDetails>{typeof children === 'string' ? <Text>{children}</Text> : children}</AccordionDetails>
        </Accordion>
    );
};

export default ExpandableSection;

export type ExpandableSectionVariant = Variant;
