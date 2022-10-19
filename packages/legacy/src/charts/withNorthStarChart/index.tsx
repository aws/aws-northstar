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
import { CurveProps } from 'recharts';
import getFillColor from '../utils/getFillColor';
import getStrokeColor from '../utils/getStrokeColor';

interface Props {
    fill?: string;
    stroke?: string;
}

function withNorthStarChart<ChartProps extends Props>(
    ChartComponent: typeof React.Component,
    type?: CurveProps['type']
) {
    return class extends ChartComponent<ChartProps> {
        render() {
            const overrideFill = getFillColor(this.props.fill);
            const overrideStroke = getStrokeColor(this.props.stroke);

            return (
                <ChartComponent {...this.props} fill={overrideFill} stroke={overrideStroke} type={type}>
                    {this.props.children}
                </ChartComponent>
            );
        }
    };
}

export default withNorthStarChart;
