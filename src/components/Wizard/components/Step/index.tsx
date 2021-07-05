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
import React, { FunctionComponent } from 'react';
import { WizardStep } from '../../types';
import Stack from '../../../../layouts/Stack';
import Box from '../../../../layouts/Box';
import Heading from '../../../Heading';
import Text from '../../../Text';

export interface StepProps {
    step: WizardStep;
}

const Step: FunctionComponent<StepProps> = ({ step }) => {
    return (
        <Stack>
            <Heading variant="h1">
                {step.title}
                {step.isOptional && <i> - Optional</i>}
            </Heading>
            {step.description && <Text variant="p">{step.description}</Text>}
            <Box>{step.content}</Box>
        </Stack>
    );
};

export default Step;
