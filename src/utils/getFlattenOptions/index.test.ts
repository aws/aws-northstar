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
import { getFlattenOptions } from './index';
import { SelectOption } from '../../components/Select';

describe('getFlattenOptions', () => {
    it('return right result for simple options', () => {
        const options = [
            {
                value: 'AWS Amplify',
                label: 'AWS Amplify',
            },
            {
                value: 'Amazon Pay',
            },
        ];
        expect(getFlattenOptions(options)).toEqual([
            {
                value: 'AWS Amplify',
                label: 'AWS Amplify',
            },
            {
                value: 'Amazon Pay',
                label: 'Amazon Pay',
            },
        ]);
    });

    it('return right result for nested options', () => {
        const options: SelectOption[] = [
            { value: 'AWS Amplify' },
            {
                label: 'Mobile services',
                options: [
                    {
                        value: 'AWS Mobile Hub',
                    },
                    {
                        value: 'Amazon Cognito',
                        label: 'Amazon Cognito',
                    },
                ],
            },
        ];
        expect(getFlattenOptions(options)).toEqual([
            { value: 'AWS Amplify', label: 'AWS Amplify' },
            { group: 'Mobile services', label: 'AWS Mobile Hub', value: 'AWS Mobile Hub' },
            { group: 'Mobile services', label: 'Amazon Cognito', value: 'Amazon Cognito' },
        ]);
    });
});
