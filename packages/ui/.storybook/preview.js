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
import React, { StrictMode, useEffect, useState } from 'react';
import NorthStarThemeProvider from '../src/components/NorthStarThemeProvider';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'light',
        values: [
            {
                name: 'light',
                value: '#ffffff',
            },
            {
                name: 'dark',
                value: '#0f1b2a',
            },
        ],
    },
    options: {
        storySort: {
            order: ['About NorthStar V2', 'Getting Start', 'Components', 'Migration', ['Default']]
        }
    } 
};

export const decorators = [
    (Story, args) => {
        const [colorMode, setColorMode] = useState('light');

        useEffect(() => {
            const color = args.globals.backgrounds?.value;
            const matchColorMode = color && args.parameters?.backgrounds?.values?.find((v) => v.value === color)?.name;
            matchColorMode && setColorMode(matchColorMode);
        }, [args.globals.backgrounds?.value]);

        return (
            <StrictMode>
                <NorthStarThemeProvider theme={colorMode}>
                    <Story />
                </NorthStarThemeProvider>
            </StrictMode>
        );
    },
];
