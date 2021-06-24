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
import Typography from '@material-ui/core/Typography';

export interface TextProps {
    /** Text that you want to render */
    children: ReactNode;
    /** Render as `<span>`, `<p>` or `<small>`*/
    variant?: 'span' | 'p' | 'small';
    /** Font color */
    color?: 'initial' | 'inherit' | 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error';
}

/**
 * Text can be used to render any arbitrary text. Given children will be rendered inside a span with the global font
 * style applied.
 */
const Text: FunctionComponent<TextProps> = ({ children, variant = 'span', color }) => {
    const textProps = {
        span: { variant: 'body1', component: 'span' },
        small: { variant: 'body2', component: 'small' },
    };

    return (
        <Typography {...(textProps[variant] ?? { variant: 'body1' })} color={color}>
            {children}
        </Typography>
    );
};

export default Text;
