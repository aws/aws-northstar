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
import AddIcon from '@material-ui/icons/Add';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

export type ButtonIconType = 'add_plus' | 'copy' | 'external' | 'folder' | 'refresh' | 'settings';

export interface ButtonIconProps {
    type?: ComponentType<SvgIconProps> | ButtonIconType;
}

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({ type }) => {
    if (!type) {
        return <SettingsOutlinedIcon fontSize="small" />;
    }

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
        default: {
            const IconComponent = type as ComponentType<SvgIconProps>;
            return <IconComponent fontSize="small" />;
        }
    }
};

export default ButtonIcon;
