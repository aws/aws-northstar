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
import ProgressBar from '.';
import { action } from '@storybook/addon-actions';
import Stack from '../../layouts/Stack';

export default {
    component: ProgressBar,
    title: 'ProgressBar',
};

export const Default = () => (
    <Stack>
        <ProgressBar
            value={60}
            label="Progress bar label"
            description="Progress bar description"
            additionalInfo="Additional Info"
        />
        <ProgressBar value={60} displayValue={false} label="Progress bar label without value displayed" />
        <ProgressBar label="Progress bar completed" />
        <ProgressBar value={60} props={{ circularProps: { size: 20 } }} displayValue={false} variant={'circular'} />
        <ProgressBar value={100} props={{ circularProps: { size: 20 } }} displayValue={true} variant={'circular'} />
    </Stack>
);

export const Error = () => (
    <Stack>
        <ProgressBar value={60} status="error" label="Error Progress bar" />

        <ProgressBar
            value={60}
            status="error"
            label="Error Progress bar with text"
            resultText="Error loading service"
            description="Progress bar description"
            additionalInfo="Additional Info"
        />

        <ProgressBar
            value={60}
            status="error"
            label="Error Progress bar with text and button"
            resultText="Error loading service"
            resultButtonText="Retry"
            resultButtonClick={action('resultButtonClick')}
        />
    </Stack>
);

export const Success = () => (
    <Stack>
        <ProgressBar value={60} status="success" label="Success Progress bar" />

        <ProgressBar value={60} status="success" label="Success Progress bar with text" resultText="Success" />

        <ProgressBar
            value={60}
            status="success"
            label="Success Progress bar with text and button"
            resultText="Success"
            resultButtonText="Done"
            description="Progress bar description"
            additionalInfo="Additional Info"
            resultButtonClick={action('resultButtonClick')}
        />
    </Stack>
);
