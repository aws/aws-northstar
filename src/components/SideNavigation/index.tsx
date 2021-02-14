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

import React, { ReactNode, FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Collapse, makeStyles, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import { v4 as uuidv4 } from 'uuid';
import Box from '../../layouts/Box';
import Inline from '../../layouts/Inline';
import Link from '../Link';
import SideNavigationTemplate, { SideNavigationHeader } from './components/SideNavigationTemplate';

const useStyles = makeStyles((theme) => ({
    drawerList: {
        padding: 0,
    },
    drawerItems: {
        paddingTop: '10px',
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    divider: {
        marginTop: '25px',
        marginBottom: '25px',
    },
    section: {
        marginTop: theme.spacing(1.4),
        marginBottom: theme.spacing(1.4),
    },
    sectionText: {
        fontWeight: 'bold',
    },
    sectionHeader: {
        marginLeft: -theme.spacing(2),
    },
    nestedItem: {
        paddingLeft: theme.spacing(1),
    },
    launchIcon: {
        verticalAlign: 'middle',
        width: '16px',
    },
    listItem: {
        marginTop: '10px',
        marginBottom: '10px',
        padding: 0,
        '& [class*="-colorSecondary"]': {
            fontWeight: 'bold',
        },
        '& .MuiLink-root': {
            color: theme.palette.grey[600],
        },
        '& .MuiLink-root:hover': {
            color: theme.palette.secondary.main,
        },
    },
}));

export enum SideNavigationItemType {
    DIVIDER = 'divider',
    LINK = 'link',
    SECTION = 'section',
}

export interface SideNavigationItem {
    text?: string;
    type: SideNavigationItemType;
    href?: string;
    info?: ReactNode;
    expanded?: boolean;
    items?: SideNavigationItem[];
}

/** Populate the initial expanded state of the section based on the settings */
const populateInitialExpandedState = (
    items: SideNavigationItem[],
    initialState: { [itemText: string]: boolean } = {}
): { [itemText: string]: boolean } => {
    items.forEach((item) => {
        if (item.expanded && item.text != undefined) {
            initialState[item.text] = true;
        }

        if (item.items && item.items.length > 0) {
            populateInitialExpandedState(item.items, initialState);
        }
    });
    return initialState;
};

export interface SideNavigationProps extends RouteComponentProps {
    /**
     * Object responsible for the header at the top of the navigation component. It contains:
     *
     * * text: text to be displayed as a header.
     * * href: href the header should link to.*/
    header: SideNavigationHeader;
    /**
     * Items to be displayed in the navigation. Allowed objects are Link, Divider, Section.
     *
     * * Link: Object that represents an anchor in the navigation. Links are rendered as `<a>` tags.
     *
     *   * text: text of the link.
     *   * href: href of the link.
     *   * info: allows to display content next to the link. Although it is technically possible to insert any content, our UX recommendation is to add a Badge.
     *
     * * Section: Object that represents a section within the navigation.
     *
     *   * text: text to be displayed as a title of the section.
     *   * expanded: whether section should be expanded or not. Default value is true.
     *   * items: a content of the section. Can be any valid item from this list. Although there is no technical limitation to the nesting level, our UX recommendation is to use only one level.
     *
     *  * Divider: Object that represents a horizontal divider between navigation content.
     **/
    items?: SideNavigationItem[];
}

/**
 * The side navigation refers to a list of links that point to the pages within an application.
 */
export const SideNavigation: FunctionComponent<SideNavigationProps> = ({ header, items = [], location }) => {
    const classes = useStyles({});
    const [expandedSections, setExpandedSections] = React.useState(populateInitialExpandedState(items));

    const expandToggle = (itemText: string) => {
        setExpandedSections({
            ...expandedSections,
            [itemText]: !expandedSections[itemText],
        });
    };

    const wrapInHref = (children: ReactNode, href?: string) => {
        if (!href) {
            return children;
        }

        return (
            <div style={{ width: '100%' }}>
                <Link href={href} underlineHover={false}>
                    {children}
                </Link>
            </div>
        );
    };

    const renderDivider = () => <Divider key={uuidv4()} className={classes.divider} />;

    const renderItemLabel = (item: SideNavigationItem, cssClass?: string) => {
        const itemColor = location.pathname === item.href ? 'secondary' : 'inherit';
        return wrapInHref(
            <Inline spacing="xs">
                <Typography color={itemColor} className={cssClass}>
                    {item.text}
                </Typography>
                {item.info && item.info}
            </Inline>,
            item.href
        );
    };

    const renderListItem = (item: SideNavigationItem, cssClass?: string) => {
        const itemText: string = item.text ? item.text : '';
        const itemLabel = renderItemLabel(item, cssClass);

        if (item.text != undefined && item.items && item.items.length > 0) {
            // @ts-ignore
            const boundExpandToggle = expandToggle.bind(this, itemText);

            return (
                <div key={uuidv4()}>
                    <ListItem button={true} onClick={boundExpandToggle} className={classes.sectionHeader}>
                        {expandedSections[itemText] ? <ExpandLess /> : <ExpandMore />}
                        <b>{itemLabel}</b>
                    </ListItem>
                    <Collapse
                        key={`${item.text}-collapse`}
                        in={expandedSections[itemText]}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding className={classes.nestedItem}>
                            {item.items.map((i) => renderNavigationItem(i))}
                        </List>
                    </Collapse>
                </div>
            );
        } else {
            return (
                <ListItem key={uuidv4()} className={classes.listItem}>
                    {itemLabel}
                </ListItem>
            );
        }
    };

    const renderSection = (item: SideNavigationItem) => (
        <div className={classes.section} key={uuidv4()}>
            {renderListItem(item, classes.sectionText)}
        </div>
    );

    const renderNavigationItem = (item: SideNavigationItem) => {
        switch (item.type) {
            case SideNavigationItemType.DIVIDER:
                return renderDivider();
            case SideNavigationItemType.LINK:
                return renderListItem(item);
            case SideNavigationItemType.SECTION:
                return renderSection(item);
            default:
                return null;
        }
    };

    return (
        <SideNavigationTemplate header={header}>
            <Box className={classes.drawerItems}>
                <List className={classes.drawerList}>
                    {items.map((item: SideNavigationItem) => renderNavigationItem(item))}
                </List>
            </Box>
        </SideNavigationTemplate>
    );
};

/**
 * The side navigation refers to a list of links that point to the pages within a service.
 */
export default withRouter<SideNavigationProps, any>(SideNavigation);
