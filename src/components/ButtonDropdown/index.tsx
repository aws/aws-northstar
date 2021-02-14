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
import React, { EventHandler, FunctionComponent, ReactNode, SyntheticEvent, useCallback, useEffect } from 'react';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import Box from '../../layouts/Box';
import Button from '../Button';

export interface ButtonDropdownItem {
    /**
     * The text to display for the item.
     * */
    text?: ReactNode;
    /**
     * Disables the drop down item, not allowing it to be clicked.
     * */
    disabled?: boolean;
    /**
     * You can supply an Item array to display nested under a parent Item heading. Only two levels of item nesting can be provided.
     * */
    items?: ButtonDropdownItem[];
    /**
     * Fired when the user clicks on drop down item. If nested Item arrays are provided, the parent onClick handler will be treated as a heading and ignored.
     * */
    onClick?: EventHandler<any>;
}

export interface ButtonDropdownProps {
    /**
     * The content to be displayed in the button.
     * */
    content: ReactNode;
    /**
     * Determines the general styling of the underlying button. Only primary and normal variants are supported.
     * */
    variant?: 'normal' | 'primary';
    /**
     * Renders the button as being in a loading state.
     * */
    loading?: boolean;
    /**
     * Renders the button as disabled and prevents clicks.
     * */
    disabled?: boolean;
    /**
     * Array of content to be displayed in the Button drawer.
     * */
    items?: ButtonDropdownItem[];
    /**
     * Disables the default dropdown arrow icon
     * */
    disableArrowDropdown?: boolean;
    /**
     * The className of the menu item to override the styling of menu item.
     */
    menuItemClassName?: string;
    /**
     * Indicating whether the button will be displayed on the dark theme (e.g., header bar)
     * */
    darkTheme?: boolean;
    /**
     * Fired when the user clicks on the drop down button.
     * */
    onClick?: EventHandler<any>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuItem: {
            padding: '5px 20px',
        },
        subHeading: {
            padding: '5px 20px',
            fontSize: '14px',
            fontWeight: 700,
            color: theme.palette.grey[600],
        },
        disabledSubHeading: {
            opacity: '0.5',
            cursor: 'default',
        },
        childMenuItem: {
            paddingLeft: '24px',
        },
        firstChildMenuItem: {
            borderTop: `1px solid ${theme.palette.grey[200]}`,
        },
        lastChildMenuItem: {
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
        },
        divider: {
            borderBottom: `1px solid ${theme.palette.grey[200]}`,
        },
        darkTheme: {
            '& .MuiButton-root': {
                border: 'none',
                padding: '4px 5px',
                color: 'currentColor',
                '&:hover': {
                    color: 'currentColor',
                },
            },
        },
    })
);

/**
 * A button dropdown is used to group a set of actions under one button.
 */
const ButtonDropdown: FunctionComponent<ButtonDropdownProps> = ({
    content,
    items = [],
    variant = 'normal',
    loading,
    disabled,
    disableArrowDropdown = false,
    menuItemClassName,
    darkTheme,
    onClick = (e) => {},
}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = useCallback(
        (event: any) => {
            onClick(event);
            if (items.length > 0) {
                setAnchorEl(event.currentTarget);
            }
        },
        [onClick, items, setAnchorEl]
    );

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const handleMenuItemClick = useCallback((item: ButtonDropdownItem) => {
        return (e: SyntheticEvent) => {
            item.onClick && item.onClick(e);

            if (!(e.isDefaultPrevented() || e.isPropagationStopped())) {
                handleClose();
            }
        };
    }, []);

    useEffect(() => {
        if (items.length == 0 && anchorEl != null) {
            handleClose();
        }
    }, [items, anchorEl, handleClose]);

    const renderMenuItem = useCallback(
        (item: ButtonDropdownItem) => (
            <MenuItem
                key={uuidv4()}
                className={clsx(menuItemClassName, classes.menuItem)}
                onClick={handleMenuItemClick(item)}
                disabled={item.disabled}
                dense={true}
            >
                {item.text}
            </MenuItem>
        ),
        [menuItemClassName, handleMenuItemClick]
    );

    const renderMenuItemWithHeading = useCallback(
        (item: ButtonDropdownItem) => {
            const itemSize = item.items?.length || 0;
            return (
                <Box key={uuidv4()}>
                    <Typography
                        className={clsx(classes.subHeading, { [classes.disabledSubHeading]: item.disabled })}
                        variant="subtitle1"
                    >
                        {item.text}
                    </Typography>

                    {item.items?.map((itemChild: ButtonDropdownItem, idx: number) => (
                        <MenuItem
                            key={uuidv4()}
                            className={clsx(
                                menuItemClassName,
                                classes.menuItem,
                                classes.childMenuItem,
                                { [classes.firstChildMenuItem]: idx === 0 },
                                { [classes.lastChildMenuItem]: idx === itemSize - 1 }
                            )}
                            onClick={itemChild.onClick}
                            disabled={item.disabled || itemChild.disabled}
                            dense={true}
                        >
                            {itemChild.text}
                        </MenuItem>
                    ))}
                </Box>
            );
        },
        [classes, menuItemClassName]
    );

    return (
        <Box className={clsx({ [classes.darkTheme]: darkTheme })}>
            <Button
                variant={variant}
                onClick={handleClick}
                loading={loading}
                disabled={disabled}
                aria-haspopup="true"
                aria-controls="simple-menu"
            >
                {content} {!disableArrowDropdown ? <ArrowDropDown fontSize={'small'} /> : null}
            </Button>

            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                elevation={2}
                transitionDuration={0}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map((item: ButtonDropdownItem) =>
                    item.items ? renderMenuItemWithHeading(item) : renderMenuItem(item)
                )}
            </Menu>
        </Box>
    );
};

export default ButtonDropdown;
