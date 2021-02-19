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

import React, { useState, useCallback, useRef, FunctionComponent } from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';
import { Popover as MaterialPopover, PopoverProps as MaterialPopoverProps } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { useUniqueId } from '../../hooks/useUniqueId';

const useStyles = makeStyles((theme: Theme) => ({
    body: {
        padding: '0.8rem 1rem',
    },
    'body-size-small': {
        maxWidth: '210px',
        '&.fixed-width': {
            width: '210px',
        },
    },
    'body-size-medium': {
        maxWidth: '310px',
        '&.fixed-width': {
            width: '310px',
        },
    },
    'body-size-large': {
        maxWidth: '460px',
        '&.fixed-width': {
            width: '460px',
        },
    },
    container: {
        zIndex: 2000,
    },
    content: {
        contentOverflowVisible: true,
        flex: '1 1 auto',
        color: theme.palette.grey['700'],
    },
    dismiss: {
        flex: '0 0 auto',
        fontSize: '20px',
        order: 1,
        padding: '0',
    },
    hasDismiss: {
        display: 'flex',
        alignItems: 'flex-start',
    },
    header: {
        flex: '1 1 auto',
        '& h2': {
            margin: 0,
            paddingBottom: '0.5em',
        },
    },
    trigger: {
        display: 'inline-block',
        color: 'inherit',
    },
    'trigger-type-text': {
        border: 0,
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        borderBottom: '1px dashed currentColor',
        '&:focus': {
            outline: 'none',
        },
    },
}));

export interface PopoverProps {
    /**
     * Determines where the popover is displayed when opened, relative to the trigger.
     * If the popover doesn't have enough space to open in this direction, it
     * automatically chooses a better direction based on available space.
     */
    position?: 'top' | 'right' | 'bottom' | 'left';

    /**
     * Determines the maximum width for the popover.
     */
    size?: 'small' | 'medium' | 'large';

    /**
     * Expands the popover body to its maximum width regardless of content.
     * For example, use it when you need to place a column layout in the popover content.
     */
    fixedWidth?: boolean;

    /**
     * Specifies the type of content inside the trigger region. The following types are available:
     * - `text` - Use for inline text triggers.
     * - `custom` - Use for the Northstar Button component.
     */
    triggerType?: 'text' | 'custom';

    /**
     * Element that triggers the popover when selected by the user.
     */
    children?: React.ReactNode;

    /**
     * Specifies optional header text for the popover.
     */
    header?: React.ReactNode;

    /**
     * Content of the popover.
     */
    content?: React.ReactNode;

    /**
     * Determines whether the dismiss button is shown in the popover body.
     */
    showDismissButton?: boolean;

    /**
     * Adds an `aria-label` to the dismiss button for accessibility.
     */
    dismissAriaLabel?: string;

    /**
     * Optional callback called when the popover is opened
     */
    onOpen?: () => void;

    /**
     * Optional callback called when the popover is closed
     */
    onClose?: () => void;
}

/**
 * A Popover can be used to display some content on top of another.
 */
const Popover: FunctionComponent<PopoverProps> = ({
    position = 'right',
    showDismissButton = true,
    fixedWidth = false,
    size = 'medium',
    triggerType = 'text',
    children,
    content,
    dismissAriaLabel,
    header,
    onOpen = () => {},
    onClose = () => {},
    ...restProps
}) => {
    const labelledById = useUniqueId('awsui-popover-');
    const classes = useStyles({});
    const triggerRef = useRef<HTMLElement | null>(null);

    const [visible, setVisible] = useState(false);

    const onTriggerClick = useCallback(() => {
        setVisible(true);
        onOpen();
    }, [onOpen]);

    const onPopoverClose = useCallback(() => {
        setVisible(false);
        onClose();
    }, [onClose]);

    const mapPositionToMuiPopoverOrigins = useCallback(() => {
        let anchorOrigin: MaterialPopoverProps['anchorOrigin'],
            transformOrigin: MaterialPopoverProps['transformOrigin'];
        if (position === 'left') {
            anchorOrigin = { vertical: 'center', horizontal: 'left' };
            transformOrigin = { vertical: 'center', horizontal: 'right' };
        } else if (position === 'right') {
            anchorOrigin = { vertical: 'center', horizontal: 'right' };
            transformOrigin = { vertical: 'center', horizontal: 'left' };
        } else if (position === 'bottom') {
            anchorOrigin = { vertical: 'bottom', horizontal: 'center' };
            transformOrigin = { vertical: 'top', horizontal: 'center' };
        } else {
            anchorOrigin = { vertical: 'top', horizontal: 'center' };
            transformOrigin = { vertical: 'bottom', horizontal: 'center' };
        }
        return { anchorOrigin, transformOrigin };
    }, [position]);

    const triggerProps = {
        // https://github.com/microsoft/TypeScript/issues/36659
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref: triggerRef as any,
        onClick: onTriggerClick,
        className: clsx(classes.trigger, classes[`trigger-type-${triggerType}`]),
    };

    const dismissButton = (showDismissButton ?? null) && (
        <IconButton
            className={classes.dismiss}
            component="button"
            aria-label={dismissAriaLabel}
            onClick={onPopoverClose}
            data-testid="dismiss-button"
        >
            <Close fontSize="inherit" />
        </IconButton>
    );

    const { anchorOrigin, transformOrigin } = mapPositionToMuiPopoverOrigins();

    return (
        <span {...restProps}>
            {triggerType === 'text' ? (
                <button {...triggerProps} type="button" aria-haspopup="dialog">
                    <span>{children}</span>
                </button>
            ) : (
                <span {...triggerProps}>{children}</span>
            )}
            <span
                aria-live={showDismissButton ? undefined : 'polite'}
                aria-atomic={showDismissButton ? undefined : true}
            >
                {visible && triggerRef.current && (
                    <MaterialPopover
                        anchorEl={triggerRef.current}
                        open={visible}
                        onClose={onPopoverClose}
                        anchorOrigin={anchorOrigin}
                        transformOrigin={transformOrigin}
                    >
                        <div className={classes.container}>
                            <div
                                className={clsx(
                                    classes.body,
                                    classes[`body-size-${size}`],
                                    fixedWidth && 'fixed-width'
                                )}
                                role="dialog"
                                aria-modal={showDismissButton ? true : undefined}
                                aria-labelledby={showDismissButton && header ? labelledById : undefined}
                            >
                                {header && (
                                    <div className={showDismissButton ? classes.hasDismiss : undefined}>
                                        {dismissButton}
                                        <div className={classes.header} id={labelledById}>
                                            <h2>{header}</h2>
                                        </div>
                                    </div>
                                )}
                                <div className={!header && showDismissButton ? classes.hasDismiss : undefined}>
                                    {!header && dismissButton}
                                    <div className={classes.content}>{content}</div>
                                </div>
                            </div>
                        </div>
                    </MaterialPopover>
                )}
            </span>
        </span>
    );
};

export default Popover;
