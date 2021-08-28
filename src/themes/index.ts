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
import { Theme as _Theme, ThemeOptions as _ThemeOptions } from '@material-ui/core/styles';
export { makeStyles, ThemeProvider } from '@material-ui/core/styles';
export { default as useMediaQuery } from '@material-ui/core/useMediaQuery';
export { NORTHSTAR_COLORS } from '../config/color';
export { theme as defaultTheme, authTheme } from './default';

export type Theme = _Theme;
export type ThemeOptions = _ThemeOptions;
