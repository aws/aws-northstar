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
import React, { FunctionComponent } from 'react';
import MaterialGrid, { GridProps } from '@material-ui/core/Grid';

/** Renders complicated layout grid for flexibility across different designs.
 * Grid component is ported from Material UI Grid component.
 * Refer to https://material-ui.com/components/grid/ for more details.*/
const Grid: FunctionComponent<GridProps> = (props) => {
    return <MaterialGrid {...props} />;
};

export default Grid;
