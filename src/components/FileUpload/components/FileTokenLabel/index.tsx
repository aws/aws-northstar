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
import React, { FunctionComponent, useMemo } from 'react';
import Inline from '../../../../layouts/Inline';
import Stack from '../../../../layouts/Stack';
import StatusIndicator from '../../../StatusIndicator';
import { FileMetadata } from '../../types';

const FileTokenLabel: FunctionComponent<FileMetadata> = ({ name, size, lastModified }) => {
    const displaySize = useMemo(() => {
        if (!size) return null;

        const k = 1024;
        const dm = 2;
        const sizes = ['bytes', 'KB', 'MB', 'GB'];

        const i = Math.floor(Math.log(size) / Math.log(k));

        return `Size: ${parseFloat((size / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }, [size]);

    const displayLastModified = useMemo(() => {
        if (lastModified) {
            const date = new Date(lastModified);
            return `Last modified: ${date.toLocaleString()}`;
        }

        return null;
    }, [lastModified]);
    return (
        <Inline spacing="xs">
            <StatusIndicator statusType="positive" />
            <Stack spacing="none">
                <b>{name}</b>
                {displaySize}
                {displayLastModified}
            </Stack>
        </Inline>
    );
};

export default FileTokenLabel;
