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

import React from 'react';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AddIcon from '@material-ui/icons/Add';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import * as icons from '@material-ui/icons';
import Icon, { IconName } from '../../../Icon';

export type ButtonIconType = 'add_plus' | 'copy' | 'external' | 'folder' | 'refresh' | 'settings' | IconName;

export interface ButtonIconProps {
    type?: ButtonIconType;
}

export default (props: ButtonIconProps) => {
    switch (props.type) {
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
        default:
            if (Object.keys(icons).includes(props.type as string)) {
                return <Icon name={props.type as IconName} fontSize="small" />;
            }

            return <SettingsOutlinedIcon fontSize="small" />;
    }
};
