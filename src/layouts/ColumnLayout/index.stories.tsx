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
import ColumnLayout, { Column } from '.';
import Box from '../Box';

export default {
    component: ColumnLayout,
    title: 'ColumnLayout',
};

const DemoBox = ({ content, bgcolor }: any) => {
    return (
        <Box display="flex" width="100%" height="300px" bgcolor={bgcolor} alignItems="center" justifyContent="center">
            {content}
        </Box>
    );
};

export const Default = () => (
    <ColumnLayout renderDivider>
        <Column key="column1">
            <DemoBox content="Column 1" bgcolor="info.main" />
        </Column>
        <Column key="column2">
            <DemoBox content="Column 2" bgcolor="success.main" />
        </Column>
        <Column key="column3">
            <DemoBox content="Column 3" bgcolor="error.main" />
        </Column>
    </ColumnLayout>
);

export const WithoutDivider = () => (
    <ColumnLayout renderDivider={false}>
        <Column key="column1">
            <DemoBox content="Column 1" bgcolor="info.main" />
        </Column>
        <Column key="column2">
            <DemoBox content="Column 2" bgcolor="success.main" />
        </Column>
        <Column key="column3">
            <DemoBox content="Column 3" bgcolor="error.main" />
        </Column>
    </ColumnLayout>
);

export const CollapseBelowSM = () => (
    <ColumnLayout collapseBelow="sm">
        <Column key="column1">
            <DemoBox content="Column 1" bgcolor="info.main" />
        </Column>
        <Column key="column2">
            <DemoBox content="Column 2" bgcolor="success.main" />
        </Column>
        <Column key="column3">
            <DemoBox content="Column 3" bgcolor="error.main" />
        </Column>
    </ColumnLayout>
);

export const CollapseBelowMD = () => (
    <ColumnLayout collapseBelow="md">
        <Column key="column1">
            <DemoBox content="Column 1" bgcolor="info.main" />
        </Column>
        <Column key="column2">
            <DemoBox content="Column 2" bgcolor="success.main" />
        </Column>
        <Column key="column3">
            <DemoBox content="Column 3" bgcolor="error.main" />
        </Column>
    </ColumnLayout>
);

export const CollapseBelowLG = () => (
    <ColumnLayout collapseBelow="lg" renderDivider>
        <Column key="column1">
            <DemoBox content="Column 1" bgcolor="info.main" />
        </Column>
        <Column key="column2">
            <DemoBox content="Column 2" bgcolor="success.main" />
        </Column>
        <Column key="column3">
            <DemoBox content="Column 3" bgcolor="error.main" />
        </Column>
    </ColumnLayout>
);
