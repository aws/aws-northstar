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
import React, { FunctionComponent, ReactNode } from 'react';
import Box from '../../layouts/Box';
import Heading from '../Heading';

export interface HeadingStripeProps {
    /** The title to display */
    title: string;
    /** Components to render in the right portion of the header */
    actionButtons?: ReactNode;
}

/** A heading that spans the full width of its container */
const HeadingStripe: FunctionComponent<HeadingStripeProps> = ({ title, actionButtons }) => {
    return (
        <Box width="100%" display="flex">
            <Box flexGrow="1">
                <Heading variant="h1">{title}</Heading>
            </Box>
            {actionButtons && <Box>{actionButtons}</Box>}
        </Box>
    );
};

export default HeadingStripe;
