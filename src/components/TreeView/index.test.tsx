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
import TreeView, { TreeItemNode } from '.';

const treeItem: TreeItemNode = {
    id: '1',
    label: 'root',
    children: [
        {
            id: '2',
            label: 'Child 1',
            children: [
                {
                    id: '3',
                    label: 'Child 1.1',
                },
            ],
        },
        {
            id: '4',
            label: 'Child 2',
        },
    ],
};

describe('TreeView', () => {
    it('should render the tree', () => {
        const { getByText, queryByText } = render(<TreeView root={treeItem} defaultExpanded={['1']} />);
        expect(getByText('Child 1 (1)')).toBeVisible();
        expect(queryByText('Child 1.1')).toBeNull();
        expect(getByText('Child 2')).toBeVisible();
    });

    it('should expand the tree', () => {
        const handleSelect = jest.fn();
        const { getByText } = render(<TreeView root={treeItem} onNodeSelect={handleSelect} defaultExpanded={['1']} />);
        fireEvent.click(getByText('Child 1 (1)'));
        expect(getByText('Child 1.1')).toBeVisible();
        expect(handleSelect).toHaveBeenCalledWith(expect.anything(), '2');
    });

    it('should be able to select a node', () => {
        const handleSelect = jest.fn();
        const { getByText } = render(<TreeView root={treeItem} onNodeSelect={handleSelect} />);
        fireEvent.click(getByText('root', { exact: false }));
        fireEvent.click(getByText('Child 2'));
        expect(handleSelect).toHaveBeenCalledWith(expect.anything(), '4');
    });

    it('should be able to set initial value', () => {
        const handleSelect = jest.fn();
        const { getByText } = render(<TreeView root={treeItem} defaultExpanded={['1']} defaultSelected={['4']} />);
        expect(getByText('Child 2').closest('li')).toHaveClass('Mui-selected');
    });

    it('should be able to select multiple nodes', () => {
        const handleSelect = jest.fn();
        const { getByText } = render(
            <TreeView root={treeItem} onNodeSelect={handleSelect} multiSelect defaultExpanded={['1', '2']} />
        );
        fireEvent.click(getByText('Child 1 (1)'));
        fireEvent.click(getByText('Child 2'), { shiftKey: true });
        expect(handleSelect).toHaveBeenLastCalledWith(expect.anything(), ['2', '4']);
    });

    it('should be able to set multiple initial values', () => {
        const handleSelect = jest.fn();
        const { getByText } = render(<TreeView root={treeItem} defaultExpanded={['1']} defaultSelected={['2', '4']} />);
        expect(getByText('Child 1 (1)').closest('li')).toHaveClass('Mui-selected');
        expect(getByText('Child 2').closest('li')).toHaveClass('Mui-selected');
    });
});
