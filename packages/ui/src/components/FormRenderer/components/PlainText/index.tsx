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
import TextContent from '@cloudscape-design/components/text-content';

const elementMapping: { [element: string]: (label: React.ReactNode) => React.ReactNode } = {
    h1: (label) => <h1>{label}</h1>,
    h2: (label) => <h2>{label}</h2>,
    h3: (label) => <h3>{label}</h3>,
    h4: (label) => <h4>{label}</h4>,
    h5: (label) => <h5>{label}</h5>,
    p: (label) => <p>{label}</p>,
};

const PlainText = (props: UseFieldApiConfig) => {
    const { label, element } = useFieldApi(props);

    return <TextContent>{element ? elementMapping[element]?.(label) || label : label}</TextContent>;
};

export default PlainText;
