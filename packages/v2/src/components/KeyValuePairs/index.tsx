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
import { FC } from 'react';
import ProgressBar, { ProgressBarProps } from '@cloudscape-design/components/progress-bar';
import SpaceBetween from '@cloudscape-design/components/space-between';
import KeyValuePair, { KeyValuePairProps } from '../KeyValuePair';
import ColumnLayout from '@cloudscape-design/components/column-layout';

export interface KeyValuePairWithProgressBarProps
    extends Pick<ProgressBarProps, 'label' | 'description' | 'value' | 'additionalInfo'> {
    variant: 'key-value';
}

export interface KeyValuePairsProps {
    /** A list of key value pairs array. Each array will be displayed in a column.
     */
    items: (KeyValuePairProps | KeyValuePairWithProgressBarProps)[][];
}

/**
 * Key-value pairs are lists of properties (keys) followed by the corresponding value.
 */
const KeyValuePairs: FC<KeyValuePairsProps> = ({ items, ...props }) => {
    return (
        <div {...props}>
            <ColumnLayout columns={items.length} variant="text-grid">
                {items.map((keyValuePairArray, indexColumn) => (
                    <SpaceBetween key={`column_${indexColumn}`} size="l">
                        {keyValuePairArray.map((pair, index) =>
                            'variant' in pair && pair.variant === 'key-value' ? (
                                <ProgressBar
                                    key={`column_${indexColumn}_item_${index}`}
                                    {...(pair as KeyValuePairWithProgressBarProps)}
                                />
                            ) : (
                                <KeyValuePair
                                    key={`column_${indexColumn}_item_${index}`}
                                    {...(pair as KeyValuePairProps)}
                                />
                            )
                        )}
                    </SpaceBetween>
                ))}
            </ColumnLayout>
        </div>
    );
};

export default KeyValuePairs;
