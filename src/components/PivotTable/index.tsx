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
import React, { useState, FunctionComponent } from 'react';

// @ts-ignore
import PivotTableUI from 'react-pivottable/PivotTableUI';
// @ts-ignore
import TableRenderers from 'react-pivottable/TableRenderers';
import 'react-pivottable/pivottable.css';
// @ts-ignore
import Plot from 'react-plotly.js';
// @ts-ignore
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

import { makeStyles, Theme } from '@material-ui/core';

const PlotlyRenderers = createPlotlyRenderers(Plot);

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // Main control
        '& .pvtUi': {
            fontFamily: theme.typography.fontFamily,
        },
        // Table content
        '& table.pvtTable': {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.subtitle1.fontSize,
        },
        '& .pvtAxisContainer, & .pvtVals': {
            border: `1px solid ${theme.palette.grey['200']}`,
            backgroundColor: theme.palette.grey['100'],
        },
        '& table.pvtTable thead tr th, & table.pvtTable tbody tr th': {
            border: `1px solid ${theme.palette.grey['200']}`,
            backgroundColor: theme.palette.grey['100'],
            fontSize: theme.typography.subtitle1.fontSize,
        },
        '& table.pvtTable tbody tr td': {
            border: `1px solid ${theme.palette.grey['200']}`,
            color: theme.palette.grey['900'],
            padding: '9px 12px',
        },
        // Dropdown control
        '& .pvtDropdownMenu': {
            border: `1px solid ${theme.palette.grey['400']}`,
            borderTop: `1px solid ${theme.palette.grey['200']}`,
        },
        '& .pvtDropdownCurrent': {
            border: `1px solid ${theme.palette.grey['400']}`,
        },
        '& .pvtDropdownValue': {
            cursor: 'pointer',
            padding: '4px 10px',
        },
        '& .pvtDropdownValue:not(.pvtDropdownCurrent)': {
            border: '1px solid transparent',
        },
        '& .pvtDropdownValue:not(.pvtDropdownCurrent):not(.pvtDropdownActiveValue):hover': {
            background: theme.palette.grey['100'],
            border: `1px solid ${theme.palette.grey['500']}`,
        },
        '& .pvtDropdownValue.pvtDropdownActiveValue': {
            background: theme.palette.info.light,
            border: `1px solid ${theme.palette.info.dark}`,
        },
        // Data attributes (drag and drop control)
        '& .pvtTriangle': {
            color: theme.palette.info.contrastText,
        },
        '& .pvtAxisContainer li span.pvtAttr': {
            background: theme.palette.info.dark,
            color: theme.palette.info.contrastText,
            border: 'none',
            padding: '2px 7px',
            borderRadius: '16px',
        },
        // Data attribute's popover
        '& .pvtCheckContainer': {
            borderTop: `1px solid ${theme.palette.grey['200']}`,
            marginTop: '20px',
        },
        '& .pvtCheckContainer p.selected': {
            cursor: 'pointer',
            background: theme.palette.info.light,
        },
        '& .pvtFilterBox input[type="text"]': {
            width: '240px',
            border: `1px solid ${theme.palette.grey['400']}`,
            padding: '4px 10px',
            borderRadius: '2px',
            marginBottom: theme.spacing(1),
        },
        '& .pvtButton': {
            cursor: 'pointer',
            padding: '4px 20px',
            borderRadius: '2px',
            background: theme.palette.background.paper,
            letterSpacing: '.25px',
            fontWeight: 'bold',
            border: `1px solid ${theme.palette.grey['600']}`,
            color: theme.palette.grey['600'],
        },
        '& .pvtButton:hover': {
            border: `1px solid ${theme.palette.grey['900']}`,
            color: theme.palette.grey['900'],
            background: theme.palette.grey['100'],
        },
    },
}));

interface Data {
    [key: string]: string | number | boolean;
}

export interface PivotTableProps {
    /** An array of objects */
    data: Data[];
}

/**
 * A pivot table with drag'n'drop functionality to enable data exploration and analysis by summarizing a data set into different presentational views such as a table or charts.
 */
const PivotTable: FunctionComponent<PivotTableProps> = (props) => {
    const classes = useStyles();
    const [state, setState] = useState(props);
    return (
        <div className={classes.root}>
            <PivotTableUI
                onChange={(s: any) => setState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...state}
            />
        </div>
    );
};

export default PivotTable;
