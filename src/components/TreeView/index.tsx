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

import React, { FunctionComponent, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiTreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Link from '../Link';

export interface TreeItemNode {
    id: string;
    label: string;
    url?: string;
    classes?: {};
    children?: TreeItemNode[];
}

export interface TreeViewProps {
    /** The root node of the tree */
    root: TreeItemNode;
    /** Ids of items to be expanded by default */
    defaultExpanded?: string[];
    /** Selected node ids. (Uncontrolled) When multiSelect is true this takes an array of strings; when false (default) a string. */
    defaultSelected?: Array<string> | [];
    /** Fired when the user clicks any node in the tree. The event detail contains the current value */
    onNodeSelect?: (event: ChangeEvent<{}>, nodeIds: string[]) => void;
    /** Fired when the user expands any node in the tree. The event detail contains the current value */
    onNodeToggle?: (event: ChangeEvent<{}>, nodeIds: string[]) => void;
    /** If true ctrl and shift will trigger multiselect. */
    multiSelect?: boolean;
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

const renderTree = (node: TreeItemNode) => {
    const TreeItemLink = node.url ? (
        <Link href={node.url} target="_blank">{`${node.label}`}</Link>
    ) : (
        `${node.label} ${node.children?.length ? `(${node.children.length})` : ''}`
    );

    return (
        <TreeItem classes={node.classes} key={node.id} nodeId={node.id} label={TreeItemLink}>
            {Array.isArray(node.children) ? node.children.map((child) => renderTree(child)) : null}
        </TreeItem>
    );
};

/** A tree view is useful for displaying hierarchical or grouped structures such as a file system. */
const TreeView: FunctionComponent<TreeViewProps> = ({
    root,
    defaultExpanded,
    onNodeSelect,
    onNodeToggle,
    defaultSelected,
    multiSelect,
}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded || []);
    const [selected, setSelected] = React.useState<string[]>(defaultSelected || []);

    const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds);
        onNodeToggle && onNodeToggle(event, nodeIds);
    };

    const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setSelected(nodeIds);
        onNodeSelect && onNodeSelect(event, nodeIds);
    };

    return (
        <MuiTreeView
            className={classes.root}
            defaultExpanded={defaultExpanded}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            defaultSelected={selected}
            multiSelect={multiSelect || undefined}
            expanded={expanded}
            selected={selected}
        >
            {renderTree(root)}
        </MuiTreeView>
    );
};

export default TreeView;
