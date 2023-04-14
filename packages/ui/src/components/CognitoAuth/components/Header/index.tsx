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
import { FC, ReactNode } from 'react';
import HeaderComponent from '@cloudscape-design/components/header';
import SpaceBetween from '@cloudscape-design/components/space-between';

export interface HeaderProps {
    logo?: string | ReactNode;
    children: string;
}

const Header: FC<HeaderProps> = ({ children, logo }) => {
    return (
        <HeaderComponent variant="h1">
            <SpaceBetween direction="horizontal" size="s">
                {typeof logo === 'string' ? <img src={logo} alt={children} width="100px" /> : logo}
                {children}
            </SpaceBetween>
        </HeaderComponent>
    );
};

export default Header;
