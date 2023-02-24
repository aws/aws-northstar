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
import Spacebetween from '@cloudscape-design/components/space-between';
import StatusIndicator from '@cloudscape-design/components/status-indicator';
import TextContent from '@cloudscape-design/components/text-content';
import { FileMetadata } from '../../types';
import getDisplaySize from '../../utils/getDisplaySize';
import getDisplayLastModified from '../../utils/getDisplayLastModified';

const FileTokenLabel: FunctionComponent<FileMetadata> = ({ name, size, lastModified }) => {
    return (
        <Spacebetween direction="horizontal" size="xs">
            <StatusIndicator type="success" />
            <TextContent>
                <Spacebetween direction="vertical" size="xxxs">
                    <div key="name">
                        <b>{name}</b>
                    </div>
                    <div key="size">{getDisplaySize(size)}</div>
                    <div key="lastModified">{lastModified && getDisplayLastModified(lastModified)}</div>
                </Spacebetween>
            </TextContent>
        </Spacebetween>
    );
};

export default FileTokenLabel;
