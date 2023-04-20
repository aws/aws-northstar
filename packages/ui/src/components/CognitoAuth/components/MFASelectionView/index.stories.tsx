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
import MFASelectionView, { MFASelectionViewProps } from '.';
import Container from '../Container';
import { MFA_SELECTION_CHALLENGE_PARAM } from '../../fixtures';

export default {
    component: MFASelectionView,
    title: 'Components/CognitoAuth/MFASelection',
} as ComponentMeta<typeof MFASelectionView>;

const Template: ComponentStory<typeof MFASelectionView> = (args: MFASelectionViewProps) => {
    return (
        <Container>
            <MFASelectionView {...args} />
        </Container>
    );
};

export const Default = Template.bind({});
Default.args = {
    challengeName: 'SELECT_MFA_TYPE',
    challengeParams: MFA_SELECTION_CHALLENGE_PARAM,
};
