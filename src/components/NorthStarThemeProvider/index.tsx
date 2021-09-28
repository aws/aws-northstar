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
import React, { FunctionComponent, useMemo } from 'react';
import { createTheme, DeprecatedThemeOptions, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '../../themes/default';

declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {}
}

export interface NorthStarThemeProviderProps {
    /** The theme to apply. If not specified, the default NorthStar theme is applied */
    theme?: DeprecatedThemeOptions;
    /** Override the primary font family */
    fontFamily?: string;
}

/** Used at the root of your app to style components */
const NorthStarThemeProvider: FunctionComponent<NorthStarThemeProviderProps> = ({ theme, fontFamily, children }) => {
    const muiTheme = useMemo(() => {
        return theme || getTheme(fontFamily);
    }, [theme, fontFamily]);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={createTheme(muiTheme)}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default NorthStarThemeProvider;
