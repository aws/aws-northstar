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
import Container from '../../layouts/Container';
import Box from '../../layouts/Box';
import Overlay from '.';
import LoadingIndicator from '../LoadingIndicator';

export default {
    component: Overlay,
    title: 'Components/Overlay',
};

export const Default = () => {
    const mainContent = (
        <Box width="100%" height="1000px" position="relative">
            Main Content
            <Overlay>
                <LoadingIndicator size="large" />
            </Overlay>
        </Box>
    );
    return <Container title="Default">{mainContent}</Container>;
};
