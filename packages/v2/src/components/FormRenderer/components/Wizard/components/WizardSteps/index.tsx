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
import { FC, memo } from 'react';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import Container from '@cloudscape-design/components/container';
import FormHeader from '../../../FormHeader';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { Field } from '../../../../types';

export interface WizardStepProps {
    fields: Field[];
    header?: React.ReactNode;
    showError?: boolean;
}

const WizardStep: FC<WizardStepProps> = ({ header, fields, showError }) => {
    const { renderForm } = useFormApi();
    return (
        <Container header={<FormHeader header={header} />}>
            <SpaceBetween direction="vertical" size="l">
                {renderForm(
                    fields.map((field) => ({
                        ...field,
                        showError,
                    }))
                )}
            </SpaceBetween>
        </Container>
    );
};

export default memo(WizardStep);
