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
import Heading from '.';
import { Container } from '../../layouts';

export default {
    component: Heading,
    title: 'Heading',
};

export const Default = () => (
    <>
        <Container headingVariant="h4" title="h1">
            <Heading variant="h1">Heading Level 1</Heading>
        </Container>

        <Container headingVariant="h4" title="h2">
            <Heading variant="h2">Heading Level 2</Heading>
        </Container>

        <Container headingVariant="h4" title="h3">
            <Heading variant="h3">Heading Level 3</Heading>
        </Container>

        <Container headingVariant="h4" title="h4">
            <Heading variant="h4">Heading Level 4</Heading>
        </Container>

        <Container headingVariant="h4" title="h5">
            <Heading variant="h5">Heading Level 5</Heading>
        </Container>
    </>
);
