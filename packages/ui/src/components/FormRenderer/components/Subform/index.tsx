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
import { Field } from '@data-driven-forms/react-form-renderer';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import FormHeader, { FormHeaderProps } from '../FormHeader';

export interface SubformProps {
    fields: Field[];
    title: string;
    description?: string;
    headerVariant?: FormHeaderProps['headerVariant'];
    isReadOnly?: boolean;
    isDisabled?: boolean;
}

const Subform: FC<SubformProps> = ({ title, description, headerVariant, fields, isReadOnly, isDisabled, ...props }) => {
    const { renderForm } = useFormApi();
    return (
        <Container
            header={<FormHeader header={title} description={description} headerVariant={headerVariant} />}
            data-testid={props['data-testid']}
        >
            <SpaceBetween direction="vertical" size="s">
                {renderForm(
                    fields.map((field) => ({
                        isReadOnly,
                        isDisabled,
                        ...field,
                    }))
                )}
            </SpaceBetween>
        </Container>
    );
};

export default memo(Subform);
