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

export const WithHover = () => (
    <Box width="350px">
        <Card title="Card title" subtitle="sub title" withHover>
            Text content
        </Card>
    </Box>
);

export const MouseEvents = () => (
    <Box width="350px">
        <Card
            title="Card title"
            subtitle="sub title"
            onMouseEnter={(event) => {
                event.stopPropagation();
                console.log('OnMouseEnter');
            }}
            onMouseOut={(event) => {
                event.stopPropagation();
                console.log('OnMouseOut');
            }}
        >
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

export const WithOnClick = () => (
    <Box width="350px">
        <Card title="Card title" subtitle="sub title" onClick={() => alert('A card was clicked')}>
            Show an alert when clicked
        </Card>
    </Box>
);

export const WithTitleTypographyProps = () => (
    <Box width="350px">
        <Card
            title="Card title"
            subtitle="sub title"
            titleTypographyProps={{ variant: 'h2', color: 'secondary', align: 'right', gutterBottom: true }}
        >
            Show an alert when clicked
        </Card>
    </Box>
);
