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
import { FC, PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import ContainerComponent from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Header from '../Header';

export interface ContainerProps {
    logo?: string | ReactNode;
    header?: string;
}

const mediaMatch = window.matchMedia('(max-width: 600px)');

const styles = {
    container: (isMobileView: boolean) =>
        isMobileView
            ? {}
            : {
                  width: '100%',
                  height: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
              },
    content: (isMobileView: boolean) =>
        isMobileView
            ? {}
            : {
                  width: '480px',
              },
};

const Container: FC<PropsWithChildren<ContainerProps>> = ({ children, header, logo }) => {
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = (e: { matches: boolean }) => setMatches(e.matches);
        mediaMatch.addEventListener('change', handler);
        return () => mediaMatch.removeEventListener('change', handler);
    });

    return (
        <div style={styles.container(matches)}>
            <ContainerComponent>
                <SpaceBetween direction="vertical" size="xxs">
                    {(header || logo) && <Header logo={logo}>{header || ''}</Header>}
                    <div style={styles.content(matches)}>{children}</div>
                </SpaceBetween>
            </ContainerComponent>
        </div>
    );
};

export default Container;
