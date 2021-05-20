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
import { SelectOption } from '../components/Select';

describe('Utils', () => {
    describe('getFlattenOptions', () => {
        it('return right result for simple options', () => {
            const options = [{ label: 'foo', value: 'foo' }, { value: 'bar' }];
            expect(getFlattenOptions(options)).toEqual([
                { label: 'foo', value: 'foo' },
                { label: 'bar', value: 'bar' },
            ]);
        });

        it('return right result for nested options', () => {
            const options: SelectOption[] = [
                { label: 'foo', value: 'foo' },
                { label: 'bar', options: [{ label: 'foo1', value: 'foo1' }, { value: 'foo2' }] },
            ];
            expect(getFlattenOptions(options)).toEqual([
                { label: 'foo', value: 'foo' },
                { label: 'foo1', group: 'bar', value: 'foo1' },
                { label: 'foo2', group: 'bar', value: 'foo2' },
            ]);
        });
    });
});
