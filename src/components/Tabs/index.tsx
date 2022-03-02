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

import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import MuiTabs from '@material-ui/core/Tabs';
import Container from '../../layouts/Container';
import Box from '../../layouts/Box';
import usePrevious from '../../hooks/usePrevious';

const useStyles = makeStyles((theme) => ({
    tab: {
        marginRight: '-1px',
        borderRight: `1px solid ${theme.palette.grey[400]}`,
        padding: '5px 20px',
        '&:last-child': {
            borderRight: 'none',
        },
    },
    noBorder: {
        '& .MuiTabs-scroller': {
            borderBottom: 'none',
        },
    },
}));

export interface TabItem {
    label: string | ReactNode;
    id: string;
    content: ReactNode;
    disabled?: boolean;
}

export interface TabsProps {
    /**
     * Array of objects, each having the following properties: <br/>
     * - id [string]: The tab id, this value will be set to activeTabId when the tab is selected. <br/>
     * - label [string]: Tab label shown in the UI. <br/>
     * - content [ReactNode]: Tab content to render in the container. <br/>
     * - disabled [boolean]: Whether this item is disabled.
     */
    tabs: TabItem[];
    /** Id of the currently active tab. Updates are triggered upon the change event. */
    activeId?: string;
    /**
     * Visual of the tabs: <br/>
     * - default: can be used in any context <br/>
     * - container: version with borders, designed to be used along with other containers
     */
    variant?: 'default' | 'container';
    /**
     * Whether to render padding within the content area
     * */
    paddingContentArea?: boolean;
    /**
     * Fired whenever the user selects a different tab. The event detail contains the current activeTabId. */
    onChange?: (activeTabId: string) => void;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    paddingContentArea: boolean;
}

function TabPanel({ children, value, index, paddingContentArea, ...props }: TabPanelProps) {
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            data-testid={props['data-testid']}
        >
            <Box py={paddingContentArea ? 3 : undefined}>{children}</Box>
        </Typography>
    );
}

/**
 * Use tabs for organizing discrete blocks of information.
 */
const Tabs = ({
    tabs,
    activeId = '',
    variant = 'default',
    paddingContentArea = true,
    onChange,
    ...props
}: TabsProps): ReactElement => {
    const classes = useStyles({});
    const [value, setValue] = React.useState(() => {
        const tabIndex = tabs.findIndex((tab) => tab.id === activeId);
        return tabIndex === -1 ? 0 : tabIndex;
    });
    const previousActiveId = usePrevious(activeId);
    const handleChange = useCallback(
        (_event: React.ChangeEvent<{}>, index: number) => {
            onChange?.(tabs[index].id);
            setValue(index);
        },
        [onChange, tabs]
    );

    useEffect(() => {
        if (previousActiveId !== activeId) {
            // Only fired when activeId change
            const tabIndex = tabs.findIndex((tab) => tab.id === activeId);
            if (tabIndex !== -1 && tabIndex !== value) {
                setValue(tabIndex);
            }
        }
    }, [activeId, previousActiveId, tabs, value]);

    const testId = props['data-testid'] || 'tabs';

    const headerContent = useMemo(
        () => (
            <MuiTabs
                variant="scrollable"
                indicatorColor="secondary"
                TabIndicatorProps={{ color: 'primary' }}
                value={value}
                onChange={handleChange}
                className={clsx({ [classes.noBorder]: variant === 'container' })}
                data-testid={`${testId}-header`}
            >
                {tabs.map((tab) => (
                    <Tab
                        key={tab.id}
                        data-testid={`${testId}-header-${tab.id}`}
                        className={classes.tab}
                        label={tab.label}
                        disabled={tab.disabled}
                    />
                ))}
            </MuiTabs>
        ),
        [tabs, variant, value, handleChange, classes, testId]
    );

    const tabContent = useMemo(
        () =>
            tabs.map((tab, idx) => (
                <TabPanel
                    key={tab.id}
                    data-testid={`${testId}-content-${tab.id}`}
                    value={value}
                    index={idx}
                    paddingContentArea={paddingContentArea}
                >
                    {tab.content}
                </TabPanel>
            )),
        [tabs, value, paddingContentArea, testId]
    );

    return variant === 'container' ? (
        <Container
            data-testid={testId}
            headerContent={headerContent}
            headerGutters={false}
            gutters={paddingContentArea}
        >
            {tabContent}
        </Container>
    ) : (
        <Box data-testid={testId}>
            {headerContent}
            {tabContent}
        </Box>
    );
};

export default Tabs;
