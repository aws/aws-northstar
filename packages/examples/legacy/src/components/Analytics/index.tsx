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
import React, { FunctionComponent, Suspense } from 'react';
import Box from 'aws-northstar/layouts/Box';
import LoadingIndicator from 'aws-northstar/components/LoadingIndicator';
import data from '../../data';

const PivotTable = React.lazy(() => import('aws-northstar/components/PivotTable'));

const Analytics: FunctionComponent = () => {
    return (
        <Suspense
            fallback={
                <Box width="100%" minHeight="100px" display="flex" justifyContent="center" pt={10}>
                    <LoadingIndicator size="large"></LoadingIndicator>
                </Box>
            }
        >
            <PivotTable data={data} />
        </Suspense>
    );
};

export default Analytics;
