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
import React, { ReactNode } from 'react';
import Container from '../../../src/layouts/Container';
import Box from '../../../src/layouts/Box';
import Stack from '../../../src/layouts/Stack';
import Text from '../../../src/components/Text';
import Heading from '../../../src/components/Heading';

export interface WritingGuidelinesProps {
    title?: string;
    guidelines: WritingGuidelines | WritingGuidelines[];
}

export interface WritingGuidelines {
    header?: string;
    guidelines: ReactNode[];
}

const renderGuidelines = (guidelines: WritingGuidelines) => {
    return (
        <Stack spacing="s">
            <Box pl={2}>{guidelines.header && <Heading variant="h4">{guidelines.header}</Heading>}</Box>
            <ul>
                {guidelines.guidelines.map((guideline) => (
                    <li>{typeof guideline === 'string' ? <Text>{guideline}</Text> : guideline}</li>
                ))}
            </ul>
        </Stack>
    );
};

export default ({ title = 'Writing guidelines', guidelines }: WritingGuidelinesProps) => {
    return (
        <Container title={title} headingVariant="h3">
            <Stack>
                {Array.isArray(guidelines) && guidelines.map((guideline) => renderGuidelines(guideline))}
                {!Array.isArray(guidelines) && renderGuidelines(guidelines)}
            </Stack>
        </Container>
    );
};
