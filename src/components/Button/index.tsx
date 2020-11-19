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

import React, { useMemo, ReactNode, MouseEventHandler, FunctionComponent } from 'react';
import {
    makeStyles,
    Button as MaterialButton,
    IconButton,
    ButtonProps as MaterialButtonProps,
} from '@material-ui/core';
import ButtonIcon, { ButtonIconType as _ButtonIconType } from './components/ButtonIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '../../layouts/Box';

const useStyles = makeStyles({
    iconButton: {
        padding: '4px 12px',
    },
    loadingIcon: {
        paddingRight: '2px',
    },
});

export interface ButtonProps {
    children?: ReactNode | string;
    /**
     * Determines the general styling of the button.
     * Use primary for primary buttons, normal for secondary buttons, link for tertiary buttons, icon to only display the icon without text.
     */
    variant?: 'primary' | 'normal' | 'link' | 'icon';
    /**
     * Renders a link with button styling.
     * Use this property if you need a link styled as a button (variant=link),
     * for example when you have a 'help' button that links to the documentation.
     * */
    href?: string;
    /**
     * Fired when the user clicks on the button, and the button is not disabled or in loading state.
     */
    onClick?: MouseEventHandler<HTMLButtonElement>;
    /**
     * Renders the button as disabled and prevents clicks.
     * */
    disabled?: boolean;
    /**
     * Displays an icon next to the text. Check the iconAlign property for positioning. <br/>
     * Available options are 'add_plus' | 'copy' | 'external' | 'folder' | 'refresh' | 'settings'.
     * */
    icon?: ButtonIconType;
    /**
     * Defines where icon should be
     * */
    iconAlign?: 'left' | 'right';
    /**
     * Renders the button as being in a loading state.
     * It takes precendence over the disabled if both are set to true. It prevents clicks.
     * */
    loading?: boolean;
    /**
     * This property will be used as aria-label.
     * It should be used in buttons that don't have text in order to make them accessible.
     * */
    label?: string;
    /**
     * The type of button.
     */
    type?: 'button' | 'submit' | 'reset';
    /**
     * The size of the button.
     * `small` is equivalent to the dense button styling.
     */
    size?: 'small' | 'medium' | 'large';
}
const OffestCircularProgress = () => (
    <Box pr={0.6}>
        <CircularProgress size={14} />
    </Box>
);

const muiButtonProps = ({
    loading,
    disabled,
    onClick,
    variant,
    href,
    icon,
    iconAlign,
    type = 'button',
    size = 'medium',
}: Partial<ButtonProps>): MaterialButtonProps => {
    const muiButtonProps: MaterialButtonProps = {
        disabled: disabled,
        onClick,
        type,
        size,
    };

    if (icon) {
        const position = iconAlign === 'right' ? 'endIcon' : 'startIcon';
        muiButtonProps[position] = <ButtonIcon type={icon!} />;
    }

    if (loading) {
        muiButtonProps.startIcon = <OffestCircularProgress />;
    }

    switch (variant) {
        case 'link':
            muiButtonProps.href = href;
            break;
        case 'primary':
            muiButtonProps.variant = 'contained';
            muiButtonProps.color = 'primary';
            break;
        case 'normal':
            muiButtonProps.variant = 'text';
            break;
    }

    return muiButtonProps;
};

/**
 * A button allows users to trigger actions on the interface.
 */
const Button: FunctionComponent<ButtonProps> = ({
    variant = 'normal',
    href = '',
    iconAlign = 'left',
    onClick,
    icon,
    loading,
    label,
    disabled,
    children,
    type = 'button',
    size = 'medium',
}) => {
    const styles = useStyles({});
    const isDisabled = useMemo(() => disabled || loading, [disabled, loading]);

    switch (variant) {
        case 'icon':
            return (
                <IconButton aria-label={label} disabled={isDisabled} onClick={onClick} className={styles.iconButton}>
                    {loading ? (
                        <CircularProgress size={14} className={styles.loadingIcon} />
                    ) : (
                        <ButtonIcon type={icon!} />
                    )}
                </IconButton>
            );
        default:
            return (
                <MaterialButton
                    {...muiButtonProps({
                        disabled: isDisabled,
                        onClick,
                        variant,
                        href,
                        loading,
                        icon,
                        iconAlign,
                        type,
                        size,
                    })}
                >
                    {children}
                </MaterialButton>
            );
    }
};

export type ButtonIconType = _ButtonIconType;
export { ButtonIcon };
export default Button;
