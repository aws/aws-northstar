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
import { FC, PropsWithChildren, ReactNode } from 'react';
import ContainerComponent from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '../Header';

export interface ContainerProps {
    logo?: string | ReactNode;
    header?: string;
}

const Container: FC<PropsWithChildren<ContainerProps>> = ({ children, header, logo }) => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ContainerComponent>
                <SpaceBetween direction="vertical" size="xxs">
                    {(header || logo) && <Header logo={logo}>{header || ''}</Header>}
                    <div
                        style={{
                            width: '480px',
                        }}
                    >
                        {children}
                    </div>
                </SpaceBetween>
            </ContainerComponent>
        </div>
    );
};

export default Container;
