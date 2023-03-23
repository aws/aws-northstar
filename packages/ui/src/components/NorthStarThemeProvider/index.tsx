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
import { FC, PropsWithChildren, useEffect, useState, createContext, useContext } from 'react';
import { applyMode, Mode, applyDensity, Density } from '@cloudscape-design/global-styles';

import '@cloudscape-design/global-styles/index.css';

export interface NorthStarThemeProviderProps {
    /**
     * The default theme.
     */
    theme?: Mode.Light | Mode.Dark;
    /**
     * The default density.
     */
    density?: Density.Comfortable | Density.Compact;
}

export interface NorthStarThemeContextApi {
    theme: Mode.Light | Mode.Dark;
    density: Density.Comfortable | Density.Compact;
    setTheme: React.Dispatch<React.SetStateAction<Mode>>;
    setDensity: React.Dispatch<React.SetStateAction<Density>>;
}

const initialState: NorthStarThemeContextApi = {
    theme: Mode.Light,
    density: Density.Comfortable,
    setTheme: () => {},
    setDensity: () => {},
};

const NorthStarThemeContext = createContext<NorthStarThemeContextApi>(initialState);

/**
 * NorthStarThemeProvider provides a layer abstract to interact with Cloudscape theme and theme related settings.
 */
const NorthStarThemeProvider: FC<PropsWithChildren<NorthStarThemeProviderProps>> = ({ children, ...props }) => {
    const [theme, setTheme] = useState(props.theme || Mode.Light);
    const [density, setDensity] = useState(props.density || Density.Comfortable);

    useEffect(() => {
        setTheme(props.theme || Mode.Light);
    }, [props.theme]);

    useEffect(() => {
        setDensity(props.density || Density.Comfortable);
    }, [props.density]);

    useEffect(() => {
        applyMode(theme);
    }, [theme]);

    useEffect(() => {
        applyDensity(density);
    }, [density]);

    useEffect(() => {
        applyMode(Mode.Light);
    }, []);

    return (
        <NorthStarThemeContext.Provider
            value={{
                theme,
                density,
                setTheme,
                setDensity,
            }}
        >
            {children}
        </NorthStarThemeContext.Provider>
    );
};

export const useNorthStarThemeContext = () => useContext(NorthStarThemeContext);

export default NorthStarThemeProvider;
