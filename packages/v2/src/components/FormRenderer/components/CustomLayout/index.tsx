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
import useFieldApi, { UseFieldApiConfig } from '@data-driven-forms/react-form-renderer/use-field-api';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import Grid from '@cloudscape-design/components/grid';

const CustomLayout = ({ fields, ...props }: UseFieldApiConfig) => {
    const { renderForm } = useFormApi();
    const { gridDefinition, ...rest } = useFieldApi(props);

    return (
        <Grid {...rest} gridDefinition={gridDefinition}>
            {renderForm(fields)}
        </Grid>
    );
};

export default CustomLayout;
