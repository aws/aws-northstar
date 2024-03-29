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
import { FunctionComponent } from 'react';
import LineChart, { Line, NORTHSTAR_COLORS, YAxis, XAxis, Tooltip, Legend } from 'aws-northstar/charts/LineChart';
import { sumByDate } from '../../../../data';

const SaleByMonths: FunctionComponent = () => {
    return (
        <LineChart title="Revenue timeline" width={350} height={250} data={sumByDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="amount" fill={NORTHSTAR_COLORS.BLUE} stroke={NORTHSTAR_COLORS.BLUE} name="revenue" />
            <Line dataKey="discount" fill={NORTHSTAR_COLORS.ORANGE} stroke={NORTHSTAR_COLORS.ORANGE} />
        </LineChart>
    );
};

export default SaleByMonths;
