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
import { DataType } from './type';
import { ColumnDefinition } from '..';

const columnDefinition: ColumnDefinition<DataType>[] = [
    {
        id: 'id',
        width: 100,
        header: 'Id',
        cell: (data) => data.id,
        sortingField: 'id',
    },
    {
        id: 'name',
        width: 120,
        header: 'Name',
        cell: (data) => data.name,
        sortingField: 'name',
    },
    {
        id: 'totalAmount',
        width: 200,
        header: 'Total Amount',
        cell: (data) => data.totalAmount,
        sortingField: 'totalAmount',
    },
    {
        id: 'countItems',
        width: 200,
        header: '# Items',
        cell: (data) => data.items?.length,
    },
];

export default columnDefinition;
