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
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { AlertClassKey } from '@material-ui/lab/Alert';
import { AutocompleteClassKey } from '@material-ui/lab/Autocomplete';
import { COLOR_PALETTE } from '../config/color';
import {
    DEFAULT_FONT_FAMILY,
    DEFAULT_FONT_SIZE_NUMBER,
    DEFAULT_FONT_SIZE,
    DEFAULT_FONT_WEIGHT_HEAVE,
    DEFAULT_FONT_WEIGHT_LIGHT,
    DEFAULT_FONT_WEIGHT_REGULAR,
    TYPOGRAPHY,
} from '../config/typography';
import { DEFAULT_SPACING } from '../config/spacing';
import { DEFAULT_RADIUS, DEFAULT_LINE_HEIGHT } from '../config/cssCommon';

declare module '@material-ui/core/styles/overrides' {
    export interface ComponentNameToClassKey {
        MuiAlert: AlertClassKey;
        MuiAutocomplete: AutocompleteClassKey;
    }
}

/**
 * This theme can be used by an amplify auth component on a login page.
 */
export const getAuthTheme = (fontFamily?: string) => ({
    a: { color: COLOR_PALETTE['orange'].color },
    button: { backgroundColor: COLOR_PALETTE['orange'].color },
    formSection: {
        fontFamily: fontFamily || DEFAULT_FONT_FAMILY,
        backgroundColor: COLOR_PALETTE.white.color,
        borderRadius: '10px',
        boxShadow: '1px 1px 3px 0px rgba(0,0,0,0.25)',
    },
    navButton: { backgroundColor: COLOR_PALETTE['orange'].color },
    navItem: { fontWeight: 'bold' },
    navRight: {
        background: 'url(/img/logo-black.png) no-repeat',
        backgroundSize: '48px',
    },
    sectionHeader: { content: "url('/img/logo-black.png')" },
});

export const getTheme = (fontFamily?: string): ThemeOptions => ({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
    },
    direction: 'ltr',
    mixins: {
        toolbar: {
            '@media (min-width:0px) and (orientation: landscape)': {
                minHeight: 48,
            },
            '@media (min-width:600px)': { minHeight: 64 },
            minHeight: 56,
        },
    },
    overrides: {
        MuiAlert: {
            root: {
                alignItems: 'center',
            },
            outlinedSuccess: {
                backgroundColor: COLOR_PALETTE['green-light'].color,
            },
            outlinedError: {
                backgroundColor: COLOR_PALETTE['red-light'].color,
            },
            outlinedInfo: {
                backgroundColor: COLOR_PALETTE['blue-light'].color,
            },
            outlinedWarning: {
                backgroundColor: COLOR_PALETTE['red-light'].color,
            },
            filledSuccess: {
                backgroundColor: COLOR_PALETTE['green-dark'].color,
            },
            filledError: {
                backgroundColor: COLOR_PALETTE['red-dark'].color,
            },
            filledInfo: {
                backgroundColor: COLOR_PALETTE['blue-dark'].color,
            },
            filledWarning: {
                backgroundColor: COLOR_PALETTE['red-dark'].color,
            },
        },
        MuiAutocomplete: {
            inputRoot: {
                "&[class*='MuiOutlinedInput-root'][class*='MuiOutlinedInput-marginDense']": {
                    paddingTop: 0,
                    paddingBottom: 0,
                },
            },
            option: {
                '&[aria-selected="true"]': {
                    backgroundColor: COLOR_PALETTE['blue-light'].color,
                    border: `1px solid ${COLOR_PALETTE['blue'].color}`,
                },
            },
        },
        MuiCheckbox: {
            root: {
                padding: 0,
            },
        },
        MuiAccordionSummary: {
            root: {
                padding: '4px 0',
                fontWeight: DEFAULT_FONT_WEIGHT_HEAVE,
                fontSize: DEFAULT_FONT_SIZE,
                minHeight: 0,
                margin: 0,
                color: COLOR_PALETTE['grey-900'].color,
                '&$expanded': {
                    padding: '4px 0',
                    minHeight: 0,
                    margin: 0,
                },
            },
            content: {
                margin: 0,
                '&$expanded': {
                    margin: 0,
                },
            },
        },
        MuiAccordionDetails: {
            root: {
                padding: '10px 0',
            },
        },
        MuiRadio: {
            root: {
                '&:hover': {
                    backgroundColor: 'transparent',
                },
                '&.MuiRadio-colorSecondary.Mui-checked': {
                    color: COLOR_PALETTE['grey-900'].color,
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        // @ts-ignore
        MuiPickersDay: {
            daySelected: {
                backgroundColor: COLOR_PALETTE['orange'].color,
                '&:hover': {
                    backgroundColor: COLOR_PALETTE['orange-dark'].color,
                    color: COLOR_PALETTE.white.color,
                },
            },
        },
        MuiSvgIcon: {
            fontSizeSmall: {
                width: '16px',
                height: '16px',
                marginTop: '2px',
            },
            colorSecondary: {
                color: COLOR_PALETTE.white.color,
            },
        },
        MuiSwitch: {
            root: {
                width: '24px',
                height: '16px',
                padding: '0px',
                fontSize: DEFAULT_FONT_SIZE,
            },
            switchBase: {
                color: COLOR_PALETTE['grey-50'].color,
                padding: '0px',
                '&.Mui-checked': {
                    transform: 'translateX(8px)',
                },
            },
            thumb: {
                width: '12px',
                height: '12px',
                marginTop: '2px',
                marginLeft: '2px',
            },
            colorSecondary: {
                '&$checked': {
                    color: COLOR_PALETTE.white.color,
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                },
                '&$checked + $track': {
                    backgroundColor: COLOR_PALETTE['blue-dark'].color,
                },
            },
        },
        MuiTreeView: {
            root: {
                transition: 'none',
            },
        },
        MuiPaper: {
            rounded: {
                borderRadius: '2px',
            },
        },
        MuiLink: {
            root: {
                color: COLOR_PALETTE['blue-dark'].color,
            },
        },
        MuiList: {
            padding: {
                paddingTop: 0,
                paddingBottom: 0,
            },
        },
        MuiSelect: {
            root: {
                padding: '4px 10px',
                textOverflow: 'ellipsis',
            },
        },
        MuiMenuItem: {
            root: {
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'flex-start',
                '&:hover': {
                    backgroundColor: COLOR_PALETTE['grey-100'].color,
                    border: `1px solid ${COLOR_PALETTE['grey-400'].color}`,
                },
                '&.Mui-selected, &.Mui-selected:hover': {
                    border: `1px solid ${COLOR_PALETTE['blue'].color}`,
                    backgroundColor: COLOR_PALETTE['blue-light'].color,
                },
            },
        },
        MuiButton: {
            root: {
                color: COLOR_PALETTE.white.color,
                textDecoration: 'none',
                border: '1px solid',
                borderRadius: '2px',
                transition: 'none',
                padding: '4px 20px',
                textTransform: 'none',
                '&[disabled]': {
                    padding: '4px 20px',
                    border: '1px solid',
                    borderRadius: '2px',
                    borderColor: COLOR_PALETTE['grey-300'].color,
                    cursor: 'initial',
                    color: COLOR_PALETTE['grey-500'],
                    backgroundColor: 'transparent',
                },
                '& .MuiIconButton-root:hover': {
                    color: COLOR_PALETTE.white.color,
                },
                '&.Mui-focusVisible': {
                    boxShadow:
                        '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
                },
            },
            containedPrimary: {
                padding: '4px 20px',
                backgroundColor: COLOR_PALETTE['orange'].color,
                borderColor: COLOR_PALETTE['orange'].color,
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'none',
                    borderColor: COLOR_PALETTE['orange-dark'].color,
                    backgroundColor: COLOR_PALETTE['orange-dark'].color,
                    textDecoration: 'none',
                },
            },
            text: {
                padding: '4px 20px',
                background: 'transparent',
                color: COLOR_PALETTE['grey-800'].color,
                textDecoration: 'none',
                '&:hover': {
                    color: COLOR_PALETTE['grey-900'].color,
                    background: 'transparent',
                },
                '&[href]': {
                    borderColor: 'transparent',
                },
            },
            label: {
                lineHeight: '20px',
                fontWeight: 'bold',
                letterSpacing: '.25px',
            },
        },
        MuiIconButton: {
            root: {
                backgroundColor: 'transparent',
                color: 'currentColor',
                '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'currentColor',
                },
                '&.Mui-focusVisible': {
                    borderColor: COLOR_PALETTE['blue'].color,
                    borderWidth: '1px',
                    outline: '2px dotted transparent',
                    boxShadow: `0 0 0 2px ${COLOR_PALETTE['blue'].color}`,
                    borderRadius: '2px',
                },
            },
        },
        MuiListItem: {
            button: {
                '&:hover': {
                    backgroundColor: 'transparent',
                },
                transition: 'none',
            },
            root: {
                paddingTop: 4,
                paddingBottom: 4,
            },
        },
        MuiTabs: {
            root: {
                minHeight: 'auto',
            },
            scroller: {
                borderBottom: `1px solid ${COLOR_PALETTE['grey-400'].color}`,
                padding: '.75rem 0',
            },
        },
        MuiTab: {
            root: {
                minHeight: 'auto',
                minWidth: 'auto',
                lineHeight: 'none',
                padding: '0 1rem',
                textTransform: 'none',
                '@media (min-width: 600px)': {
                    minWidth: 'auto',
                },
            },
            wrapper: {
                fontWeight: DEFAULT_FONT_WEIGHT_HEAVE,
                fontSize: DEFAULT_FONT_SIZE,
            },
            textColorInherit: {
                '&.Mui-selected': {
                    color: COLOR_PALETTE['orange-dark'].color,
                },
                '&:hover': {
                    color: COLOR_PALETTE['orange-dark'].color,
                    opacity: 1,
                },
            },
        },
        MuiTextField: {},
        MuiInput: {
            underline: {
                '&:hover:not(.Mui-disabled)::before': {
                    borderBottom: '0',
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                backgroundColor: COLOR_PALETTE.white.color,
                borderRadius: '2px',
                '&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                    borderColor: COLOR_PALETTE['blue'].color,
                    borderWidth: '1px',
                    outline: '2px dotted transparent',
                    boxShadow: `0 0 0 1px ${COLOR_PALETTE['blue'].color}`,
                },
                '&:hover:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
                    borderColor: COLOR_PALETTE['blue'].color,
                    borderWidth: '1px',
                },
            },
            input: {
                fontSize: DEFAULT_FONT_SIZE,
                padding: '4px 10px',
            },
            adornedStart: {
                paddingLeft: '5px',
                paddingTop: '1px',
            },
            adornedEnd: {
                paddingRight: '0px',
            },
        },
        MuiInputBase: {
            root: {
                fontSize: DEFAULT_FONT_SIZE,
                lineHeight: DEFAULT_LINE_HEIGHT,
            },
            inputTypeSearch: {
                '&::-webkit-search-cancel-button': {
                    '-webkit-appearance': 'none',
                },
            },
            input: {
                height: DEFAULT_LINE_HEIGHT,
                '&::placeholder': {
                    fontStyle: 'italic',
                },
            },
        },
        MuiTableCell: {
            root: {
                fontSize: '.75rem',
                borderBottom: 'none',
                fontWeight: 'normal',
            },
            head: {
                fontWeight: DEFAULT_FONT_WEIGHT_HEAVE,
                lineHeight: 'normal',
                userSelect: 'none',
            },
            sizeSmall: {
                padding: '9px 12px',
            },
        },
        MuiTableRow: {
            root: {
                '&.Mui-selected, &.Mui-selected:hover': {
                    border: `1px solid ${COLOR_PALETTE['blue'].color}`,
                    backgroundColor: COLOR_PALETTE['blue-light'].color,
                },
                border: '1px solid transparent',
                borderTop: '1px solid rgba(224, 224, 224, 1)',
                width: 'auto !important',
            },
            head: {
                backgroundColor: COLOR_PALETTE['grey-100'].color,
            },
        },
        MuiChip: {
            root: {
                fontSize: '12px',
                borderRadius: '16px',
                height: 'auto',
                lineHeight: '20px',
            },
            label: {
                paddingLeft: '7.5px',
                paddingRight: '7.5px',
            },
        },
        MuiFormControl: {
            root: {
                width: '100%',
            },
            marginNormal: {
                marginTop: '0',
                marginBottom: '0',
            },
        },
        MuiInputLabel: {
            root: {
                fontWeight: 500,
                lineHeight: 1.4,
            },
            animated: {
                transition: 'none',
            },
            shrink: {
                transform: 'none',
            },
            formControl: {
                transform: 'none',
                position: 'static',
            },
        },
        MuiFormHelperText: {
            root: {
                fontSize: '12px',
                lineHeight: 1.5,
            },
        },
    },
    palette: {
        action: {
            active: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
            hover: 'rgba(0, 0, 0, 0.08)',
            hoverOpacity: 0.08,
            selected: 'rgba(0, 0, 0, 0.14)',
        },
        background: { paper: COLOR_PALETTE.white.color, default: COLOR_PALETTE['grey-100'].color },
        common: { black: '#000', white: COLOR_PALETTE.white.color },
        contrastThreshold: 3,
        divider: COLOR_PALETTE['grey-200'].color,
        grey: {
            '50': COLOR_PALETTE['grey-500'].color,
            '100': COLOR_PALETTE['grey-100'].color,
            '200': COLOR_PALETTE['grey-200'].color,
            '300': COLOR_PALETTE['grey-300'].color,
            '400': COLOR_PALETTE['grey-400'].color,
            '500': COLOR_PALETTE['grey-500'].color,
            '600': COLOR_PALETTE['grey-600'].color,
            '700': COLOR_PALETTE['grey-700'].color,
            '800': COLOR_PALETTE['grey-800'].color,
            '900': COLOR_PALETTE['grey-900'].color,
        },
        primary: {
            contrastText: COLOR_PALETTE.white.color,
            main: COLOR_PALETTE['charcoal'].color,
            light: COLOR_PALETTE['charcoal-light'].color,
            dark: COLOR_PALETTE['charcoal-dark'].color,
        },
        secondary: {
            contrastText: COLOR_PALETTE.white.color,
            dark: COLOR_PALETTE['orange-dark'].color,
            light: COLOR_PALETTE['orange-light'].color,
            main: COLOR_PALETTE['orange'].color,
        },
        text: {
            disabled: COLOR_PALETTE['grey-600'].color,
            hint: COLOR_PALETTE['grey-600'].color,
            primary: COLOR_PALETTE['grey-900'].color,
            secondary: COLOR_PALETTE['grey-800'].color,
        },
        success: {
            contrastText: COLOR_PALETTE.white.color,
            main: COLOR_PALETTE.green.color,
            dark: COLOR_PALETTE['green-dark'].color,
            light: COLOR_PALETTE['green-light'].color,
        },
        error: {
            contrastText: COLOR_PALETTE.white.color,
            main: COLOR_PALETTE.red.color,
            dark: COLOR_PALETTE['red-dark'].color,
            light: COLOR_PALETTE['red-light'].color,
        },
        warning: {
            contrastText: COLOR_PALETTE.white.color,
            main: COLOR_PALETTE.red.color,
            dark: COLOR_PALETTE['red-dark'].color,
            light: COLOR_PALETTE['red-light'].color,
        },
        info: {
            contrastText: COLOR_PALETTE.white.color,
            main: COLOR_PALETTE.blue.color,
            dark: COLOR_PALETTE['blue-dark'].color,
            light: COLOR_PALETTE['blue-light'].color,
        },
        tonalOffset: 0.2,
        type: 'light',
    },
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
        MuiListItem: {
            disableGutters: true,
        },
    },
    shadows: [
        'none',
        '0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
        '0px 1px 5px 0px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        '0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)',
        '0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 5px 8px 0px rgba(0, 0, 0, 0.14),0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
        '0px 3px 5px -1px rgba(0, 0, 0, 0.2),0px 6px 10px 0px rgba(0, 0, 0, 0.14),0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
        '0px 4px 5px -2px rgba(0, 0, 0, 0.2),0px 7px 10px 1px rgba(0, 0, 0, 0.14),0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
        '0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
        '0px 5px 6px -3px rgba(0, 0, 0, 0.2),0px 9px 12px 1px rgba(0, 0, 0, 0.14),0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
        '0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)',
        '0px 6px 7px -4px rgba(0, 0, 0, 0.2),0px 11px 15px 1px rgba(0, 0, 0, 0.14),0px 4px 20px 3px rgba(0, 0, 0, 0.12)',
        '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 12px 17px 2px rgba(0, 0, 0, 0.14),0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
        '0px 7px 8px -4px rgba(0, 0, 0, 0.2),0px 13px 19px 2px rgba(0, 0, 0, 0.14),0px 5px 24px 4px rgba(0, 0, 0, 0.12)',
        '0px 7px 9px -4px rgba(0, 0, 0, 0.2),0px 14px 21px 2px rgba(0, 0, 0, 0.14),0px 5px 26px 4px rgba(0, 0, 0, 0.12)',
        '0px 8px 9px -5px rgba(0, 0, 0, 0.2),0px 15px 22px 2px rgba(0, 0, 0, 0.14),0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
        '0px 8px 10px -5px rgba(0, 0, 0, 0.2),0px 16px 24px 2px rgba(0, 0, 0, 0.14),0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
        '0px 8px 11px -5px rgba(0, 0, 0, 0.2),0px 17px 26px 2px rgba(0, 0, 0, 0.14),0px 6px 32px 5px rgba(0, 0, 0, 0.12)',
        '0px 9px 11px -5px rgba(0, 0, 0, 0.2),0px 18px 28px 2px rgba(0, 0, 0, 0.14),0px 7px 34px 6px rgba(0, 0, 0, 0.12)',
        '0px 9px 12px -6px rgba(0, 0, 0, 0.2),0px 19px 29px 2px rgba(0, 0, 0, 0.14),0px 7px 36px 6px rgba(0, 0, 0, 0.12)',
        '0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 20px 31px 3px rgba(0, 0, 0, 0.14),0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
        '0px 10px 13px -6px rgba(0, 0, 0, 0.2),0px 21px 33px 3px rgba(0, 0, 0, 0.14),0px 8px 40px 7px rgba(0, 0, 0, 0.12)',
        '0px 10px 14px -6px rgba(0, 0, 0, 0.2),0px 22px 35px 3px rgba(0, 0, 0, 0.14),0px 8px 42px 7px rgba(0, 0, 0, 0.12)',
        '0px 11px 14px -7px rgba(0, 0, 0, 0.2),0px 23px 36px 3px rgba(0, 0, 0, 0.14),0px 9px 44px 8px rgba(0, 0, 0, 0.12)',
        '0px 11px 15px -7px rgba(0, 0, 0, 0.2),0px 24px 38px 3px rgba(0, 0, 0, 0.14),0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
    ],
    shape: { borderRadius: DEFAULT_RADIUS },
    spacing: DEFAULT_SPACING,
    transitions: {
        duration: {
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
            short: 250,
            shorter: 200,
            shortest: 150,
            standard: 300,
        },
        easing: {
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
            sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
        },
    },
    typography: {
        h1: TYPOGRAPHY.h1,
        h2: TYPOGRAPHY.h2,
        h3: TYPOGRAPHY.h3,
        h4: TYPOGRAPHY.h4,
        h5: TYPOGRAPHY.h5,
        body1: TYPOGRAPHY.p,
        body2: TYPOGRAPHY.small,
        subtitle1: TYPOGRAPHY.small,
        fontFamily: fontFamily || DEFAULT_FONT_FAMILY,
        fontSize: DEFAULT_FONT_SIZE_NUMBER,
        fontWeightLight: DEFAULT_FONT_WEIGHT_LIGHT,
        fontWeightBold: DEFAULT_FONT_WEIGHT_HEAVE,
        fontWeightRegular: DEFAULT_FONT_WEIGHT_REGULAR,
        fontWeightMedium: DEFAULT_FONT_WEIGHT_REGULAR,
    },
    zIndex: {
        mobileStepper: 1000,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },
});

const theme = getTheme();
const authTheme = getAuthTheme();

export { theme, authTheme };
