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
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ColumnsGrouping from '.';

const columnDefinitions = [
    {
        id: 'id',
        Header: 'Id',
        accessor: 'id',
    },
    {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Others',
        accessor: 'others',
    },
];

const styles = {
    verticalGrid: 'verticalGrid',
};

describe('ColumnsGrouping', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders columns', () => {
        const { getByText, queryAllByText } = render(
            <ColumnsGrouping
                columnDefinitions={columnDefinitions}
                styles={styles}
                onGroupChange={jest.fn()}
                groupBy={{}}
            />
        );
        expect(getByText('Id')).toBeVisible();
        expect(getByText('Name')).toBeVisible();
        expect(queryAllByText('Others')).toHaveLength(0);
    });

    it('triggers onGroupChange event', () => {
        const handleGroupChange = jest.fn();
        const { getByLabelText } = render(
            <ColumnsGrouping
                columnDefinitions={columnDefinitions}
                styles={styles}
                onGroupChange={handleGroupChange}
                groupBy={{}}
            />
        );
        fireEvent.click(getByLabelText('Id'));
        expect(handleGroupChange).toBeCalledWith('id');
    });
});
