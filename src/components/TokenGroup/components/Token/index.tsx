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
import React, { ReactNode, FunctionComponent } from 'react';
import { Chip, makeStyles, Theme } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        fontSize: '14px',
        backgroundColor: theme.palette.info.light,
        color: theme.palette.grey[900],
        border: `1px solid ${theme.palette.info.dark}`,
        borderRadius: 0,
        '& .MuiChip-label': {
            padding: '4px 10px',
        },
        '&:focus': {
            backgroundColor: theme.palette.info.light,
            color: theme.palette.grey[900],
        },
        '& .MuiChip-deleteIcon': {
            color: theme.palette.grey[600],
        },
        '& .MuiChip-deleteIcon:hover': {
            color: theme.palette.grey[900],
        },
    },
}));

export interface Item {
    label?: ReactNode;
    value?: string;
}

export interface TokenProps {
    item: Item;
    onDismiss: (item: Item) => void;
}

const Token: FunctionComponent<TokenProps> = ({ item, onDismiss }) => {
    const styles = useStyles();
    return (
        <Chip
            className={styles.root}
            label={item.label}
            color="primary"
            onDelete={() => {
                onDismiss(item);
            }}
            deleteIcon={<Close />}
        />
    );
};

export default Token;
