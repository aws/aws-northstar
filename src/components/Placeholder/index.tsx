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
import Box from '../../layouts/Box';
import { BoxProps } from '@material-ui/core/Box';

/** A placeholder component to be used to occupy a place for demo purpose.*/
const Placeholder: FunctionComponent = (props: BoxProps) => (
    <Box
        borderColor="primary.main"
        border={2}
        p={2}
        textAlign="center"
        bgcolor="secondary.main"
        color="secondary.contrastText"
        data-testid="placeholder"
        {...props}
    >
        Component
    </Box>
);

export default Placeholder;
