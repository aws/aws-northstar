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
import ColumnSelector from '.';

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

describe('ColumnSelector', () => {
    beforeEach(() => jest.clearAllMocks());

    it('renders columns', () => {
        const { getByText, queryAllByText } = render(
            <ColumnSelector
                columnDefinitions={columnDefinitions}
                styles={styles}
                onShowColumnsChange={jest.fn()}
                showColumns={{}}
            />
        );
        expect(getByText('Id')).toBeVisible();
        expect(getByText('Name')).toBeVisible();
        expect(queryAllByText('Others')).toHaveLength(0);
    });

    it('triggers onShowColumnsChange event', () => {
        const handleShowColumnsChange = jest.fn();
        const { getByLabelText } = render(
            <ColumnSelector
                columnDefinitions={columnDefinitions}
                styles={styles}
                onShowColumnsChange={handleShowColumnsChange}
                showColumns={{}}
            />
        );
        fireEvent.click(getByLabelText('Id'));
        expect(handleShowColumnsChange).toBeCalledWith('id');
    });
});
