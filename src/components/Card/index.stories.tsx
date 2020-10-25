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
import Card from '.';
import ExpandableSection from '../ExpandableSection';
import Box from '../../layouts/Box';
import Placeholder from '../Placeholder';

export default {
    component: Card,
    title: 'Card',
};

export const Default = () => (
    <Box width="350px">
        <Card title="Card title" subtitle="sub title">
            Text content
        </Card>
    </Box>
);

export const FixContent = () => (
    <Box width="350px">
        <Card title="Card title" subtitle="sub title">
            <Placeholder />
        </Card>
    </Box>
);

export const ExpandableContent = () => (
    <Box width="350px">
        <Card title="Card title" subtitle="sub title">
            <ExpandableSection variant="borderless" header="expandableContent">
                expandableContent
            </ExpandableSection>
        </Card>
    </Box>
);
