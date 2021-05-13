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

import * as icons from '@material-ui/icons';
import React from 'react';

export type IconVariant = 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
export type IconName = keyof typeof icons;

export interface IconProps {
    /**
     * Define the icon name to be rendered
     */
    name: IconName;
    /**
     * Define the icon variant
     */
    variant?: IconVariant;
    /**
     * Node passed into the SVG element.
     */
    children?: React.ReactNode;
    /**
     * The color of the component. It supports those theme colors that make sense for this component.
     * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
     */
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    /**
     * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
     */
    fontSize?: 'inherit' | 'default' | 'small' | 'large';
    /**
     * Applies a color attribute to the SVG element.
     */
    htmlColor?: string;
    /**
     * The shape-rendering attribute. The behavior of the different options is described on the
     * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
     * If you are having issues with blurry icons you should investigate this prop.
     * @document
     */
    shapeRendering?: string;
    /**
     * Provides a human-readable title for the element that contains it.
     * https://www.w3.org/TR/SVG-access/#Equivalent
     */
    titleAccess?: string;
    /**
     * Allows you to redefine what the coordinates without units mean inside an SVG element.
     * For example, if the SVG element is 500 (width) by 200 (height), and you pass viewBox="0 0 50 20",
     * this means that the coordinates inside the SVG will go from the top left corner (0,0)
     * to bottom right (50,20) and each unit will be worth 10px.
     */
    viewBox?: string;
}

export default (props: IconProps) => {
    const { name, variant, ...rest } = props;
    // filled is the default icon variant
    const variantTheme = variant === 'Filled' || !variant ? '' : variant;
    const iconName = `${name}${variantTheme}`;
    // support both standard full name or short name with variant
    let IconComponent = icons[iconName] || icons[name];

    if (!IconComponent) {
        return null;
    }

    return <IconComponent {...rest} />;
};
