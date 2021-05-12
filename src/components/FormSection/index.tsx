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
import React, { FunctionComponent, ReactNode } from 'react';
import Container from '../../layouts/Container';

export interface FormSectionProps {
    /**Title of the form section*/
    header: string;
    /**General description about the form section*/
    description?: string;
    /**Footer of the form section. This is where additional settings are supposed to be placed. If the expandable property is set to true, the content of this region will be ignored.*/
    footer?: ReactNode;
}

/**A form section separates a group of information within a form.*/
const FormSection: FunctionComponent<FormSectionProps> = ({ header, description, children, footer }) => {
    return (
        <Container title={header} subtitle={description} footerContent={footer}>
            {children}
        </Container>
    );
};

export default FormSection;
