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
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MFAView, { MFAViewProps } from '.';
import Container from '../Container';

export default {
    component: MFAView,
    title: 'Components/CognitoAuth/MFACode',
} as ComponentMeta<typeof MFAView>;

const Template: ComponentStory<typeof MFAView> = (args: MFAViewProps) => {
    return (
        <Container>
            <MFAView {...args} />
        </Container>
    );
};

export const Default = Template.bind({});
