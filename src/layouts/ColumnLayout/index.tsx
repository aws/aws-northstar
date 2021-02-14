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
import React, { Children, ReactElement, Fragment, FunctionComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Column, { ColumnProps as _ColumnProps } from './components/Column';

export type ColumnProps = _ColumnProps;

type BreakPoint = 'xs' | 'sm' | 'md' | 'lg';

export interface ColumnLayoutProps {
    /** Indicate whether to render divider between columns*/
    renderDivider?: boolean;
    /** A list of column elements*/
    children: Array<ReactElement<ColumnProps> | null> | ReactElement<ColumnProps> | null;
    /** Collapse the columns below certain breakpoint. <br/>
     * Available options: 'xs' | 'sm' | 'md' | 'lg'. <br/>
     * The columns always collapse at xs and are alawys displayed as column layout at xl*/
    collapseBelow?: BreakPoint;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& hr': {
            margin: theme.spacing(0, 2),
        },
        marginTop: -theme.spacing(1),
        '&>*': {
            marginTop: theme.spacing(1),
        },
    },
    column: {
        overflow: 'hidden',
    },
}));

const covertBreakpoint = (breakpoint: BreakPoint) => {
    switch (breakpoint) {
        case 'lg':
            return 3;
        case 'md':
            return 2;
        case 'sm':
            return 1;
        default:
            return 0;
    }
};

const getBreakpointValue = (collapseBelow: BreakPoint, breakpoint: BreakPoint): 12 | true => {
    if (covertBreakpoint(collapseBelow) - covertBreakpoint(breakpoint) >= 0) {
        return 12;
    }

    return true;
};

/**
 * The column layout is a helper component to ease the layout process.
 * Within containers, users can position their content in typical layouts, for example: two columns in a row.
 */
const ColumnLayout: FunctionComponent<ColumnLayoutProps> = ({
    children,
    renderDivider = true,
    collapseBelow = 'xs',
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matched = useMediaQuery(theme.breakpoints.up(collapseBelow));
    const columns = Children.toArray(children);

    return (
        <Grid container justify="flex-start" alignItems="flex-start" className={classes.root}>
            {columns.map((column, index) =>
                index != columns.length - 1 ? (
                    <Fragment key={`column${index}`}>
                        <Grid
                            item
                            xs={12}
                            sm={getBreakpointValue(collapseBelow, 'sm')}
                            md={getBreakpointValue(collapseBelow, 'md')}
                            lg={getBreakpointValue(collapseBelow, 'lg')}
                            xl
                            className={classes.column}
                        >
                            {column}
                        </Grid>
                        {renderDivider && matched && <Divider orientation="vertical" flexItem />}
                    </Fragment>
                ) : (
                    <Fragment key={`column${index}`}>
                        <Grid
                            item
                            xs={12}
                            sm={getBreakpointValue(collapseBelow, 'sm')}
                            md={getBreakpointValue(collapseBelow, 'md')}
                            lg={getBreakpointValue(collapseBelow, 'lg')}
                            xl
                            className={classes.column}
                        >
                            {column}
                        </Grid>
                    </Fragment>
                )
            )}
        </Grid>
    );
};

export { Column };
export default ColumnLayout;
