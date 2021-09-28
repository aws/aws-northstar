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

import React, { FunctionComponent, ComponentType } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { SvgIconProps } from '@mui/material/SvgIcon';

export type ButtonIconType =
    | 'add_plus'
    | 'copy'
    | 'external'
    | 'folder'
    | 'refresh'
    | 'settings'
    | ComponentType<SvgIconProps>;

export interface ButtonIconProps {
    type: ButtonIconType;
}

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({ type }) => {
    switch (type) {
        case 'add_plus':
            return <AddIcon fontSize="small" role="add" />;
        case 'copy':
            return <FileCopyOutlinedIcon fontSize="small" />;
        case 'external':
            return <LaunchOutlinedIcon fontSize="small" />;
        case 'folder':
            return <FileCopyOutlinedIcon fontSize="small" />;
        case 'refresh':
            return <RefreshOutlinedIcon fontSize="small" />;
        case 'settings':
            return <SettingsOutlinedIcon fontSize="small" />;
        default: {
            const IconComponent = type as ComponentType<SvgIconProps>;
            return <IconComponent fontSize="small" />;
        }
    }
};

export default ButtonIcon;
