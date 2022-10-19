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
interface ColorPalette {
    [key: string]: {
        color: string;
        description?: string;
        rgb?: string;
    };
}

export enum NORTHSTAR_COLORS {
    ORANGE_DARK = '#d45b07',
    ORANGE_LIGHT = '#ffcc83',
    ORANGE = '#de740c',
    BLUE_DARK = '#0073bb',
    BLUE_LIGHT = '#f1faff',
    BLUE = '#0097e3',
    GREEN_DARK = '#1d8102',
    GREEN_LIGHT = '#f2f8f0',
    GREEN = '#3aa420',
    RED_DARK = '#d13212',
    RED_LIGHT = '#fdf3f1',
    RED = '#f84821',
    WHITE = '#ffffff',
    CHARCOAL_DARK = '#0f1e27',
    CHARCOAL_LIGHT = '#61707b',
    CHARCOAL = '#36454f',
    GREY_900 = '#212121',
    GREY_800 = '#424242',
    GREY_700 = '#616161',
    GREY_600 = '#757575',
    GREY_500 = '#9e9e9e',
    GREY_400 = '#bdbdbd',
    GREY_300 = '#e0e0e0',
    GREY_200 = '#eeeeee',
    GREY_100 = '#f5f5f5',
    GREY_50 = '#fafafa',
}

export const COLOR_PALETTE: ColorPalette = {
    'grey-900': {
        color: NORTHSTAR_COLORS.GREY_900,
        description: 'Body text, Header and form label text',
    },
    'grey-800': {
        color: NORTHSTAR_COLORS.GREY_800,
        description: 'Table cell text, List group header text, Descriptive text, Small text',
    },
    'grey-700': {
        color: NORTHSTAR_COLORS.GREY_700,
        description: '',
    },
    'grey-600': {
        color: NORTHSTAR_COLORS.GREY_600,
        description: 'Disabled text color on light backgrounds',
    },
    'grey-500': {
        color: NORTHSTAR_COLORS.GREY_500,
        description: 'Inactive status color',
    },
    'grey-400': {
        color: NORTHSTAR_COLORS.GREY_400,
        description: 'Disabled text color on medium-light background, Form element border, Placeholder text',
        rgb: 'rgb(170, 183, 184)',
    },
    'grey-300': {
        color: NORTHSTAR_COLORS.GREY_300,
        description: 'Inverted descriptive text, Disabled form control background',
    },
    'grey-200': {
        color: NORTHSTAR_COLORS.GREY_200,
        description:
            'Horizontal and vertical divider color on light background, Disabled form element background and border',
    },
    'grey-100': {
        color: NORTHSTAR_COLORS.GREY_100,
        description: 'Page background, List item hover background, Header background',
    },
    'grey-50': {
        color: NORTHSTAR_COLORS.GREY_50,
    },
    'orange-dark': {
        color: NORTHSTAR_COLORS.ORANGE_DARK,
        description: 'Primary action active background, Primary action hover background',
    },
    orange: {
        color: NORTHSTAR_COLORS.ORANGE,
        description: 'primary action background, Active navigation text',
    },
    'orange-light': {
        color: NORTHSTAR_COLORS.ORANGE_LIGHT,
    },
    'blue-dark': {
        color: NORTHSTAR_COLORS.BLUE_DARK,
        description:
            'Link text, Selected form control background, Info status color, Focus state border, Selected item border, Checked and disabled toggle background',
    },
    blue: {
        color: NORTHSTAR_COLORS.BLUE,
    },
    'blue-light': {
        color: NORTHSTAR_COLORS.BLUE_LIGHT,
        description: 'Selected item background, Info status background',
    },
    'green-dark': {
        color: NORTHSTAR_COLORS.GREEN_DARK,
        description: 'Success status color',
    },
    green: {
        color: NORTHSTAR_COLORS.GREEN,
        description: 'Success status color',
    },
    'green-light': {
        color: NORTHSTAR_COLORS.GREEN_LIGHT,
        description: 'Success status background',
    },
    'red-dark': {
        color: NORTHSTAR_COLORS.RED_DARK,
        description: 'Error status color',
    },
    red: {
        color: NORTHSTAR_COLORS.RED,
    },
    'red-light': {
        color: NORTHSTAR_COLORS.RED_LIGHT,
        description: 'Error status background',
    },
    white: {
        color: NORTHSTAR_COLORS.WHITE,
        description: 'Inverted body and label text, Content background',
    },
    charcoal: {
        color: NORTHSTAR_COLORS.CHARCOAL,
        description: 'Primary Color',
    },
    'charcoal-light': {
        color: NORTHSTAR_COLORS.CHARCOAL_LIGHT,
    },
    'charcoal-dark': {
        color: NORTHSTAR_COLORS.CHARCOAL_DARK,
    },
};
