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
import React, { useState } from 'react';
import ExpandableSection from '.';
import Badge from '../Badge';
import Box from '../../layouts/Box';
import Button from '../Button';
import Select, { SelectOption } from '../Select';
import Heading from '../Heading';

const options = [
    { label: 'Student', value: 'status' },
    { label: 'Lecturer', value: 'lecture' },
    { label: 'Admin', value: 'admin' },
];

export default {
    component: ExpandableSection,
    title: 'ExpandableSection',
};

export const Default = () => <ExpandableSection header="Header">Expandable content</ExpandableSection>;

export const Borderless = () => (
    <ExpandableSection variant="borderless" header="Header">
        Expandable content
    </ExpandableSection>
);

export const Container = () => (
    <ExpandableSection variant="container" header="Header">
        Expandable content
    </ExpandableSection>
);

export const WithActionButton = () => {
    const header = (
        <Box display="flex" width="100%" justifyContent="space-between" alignItems="center">
            <Box mr={1}>
                <Heading variant="h3">Current view:</Heading>
            </Box>
            <Box>
                <Button
                    onClick={(event) => {
                        event.stopPropagation();
                        console.log('Action to group');
                    }}
                >
                    Add to group
                </Button>
            </Box>
        </Box>
    );

    return (
        <ExpandableSection variant="container" header={header}>
            Expandable content
        </ExpandableSection>
    );
};

export const Complex = () => {
    const [selectedOption, setSeletedOption] = useState<SelectOption | undefined>(options[0]);

    const onChange = (event: React.ChangeEvent<{ value: any }>) => {
        setSeletedOption(options.find((o) => o.value === String(event.target.value)));
    };

    const header = (
        <Box display="flex" alignItems="center">
            <Box mr={1}>
                <Heading variant="h3">Current view:</Heading>
            </Box>
            <Badge content={selectedOption?.label || ''} color="blue"></Badge>
        </Box>
    );

    return (
        <ExpandableSection variant="container" header={header}>
            <Box width="300px">
                <Select options={options} selectedOption={selectedOption} onChange={onChange} />
            </Box>
        </ExpandableSection>
    );
};
