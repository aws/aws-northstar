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
import KeyValuePair from '.';
import Container from '../../layouts/Container';
import ColumnLayout, { Column } from '../../layouts/ColumnLayout';
import Link from '../Link';
import StatusIndicator from '../StatusIndicator';
import Stack from '../../layouts/Stack';

export default {
    componet: KeyValuePair,
    title: 'KeyValuePair',
};

const ExternalLink = (
    <Link href="https://www.amazon.com" target="_blank">
        Value with external link
    </Link>
);

const Status = <StatusIndicator statusType="positive">Available</StatusIndicator>;

export const Default = () => (
    <Container title="General information">
        <ColumnLayout>
            <Column key="column1">
                <Stack>
                    <KeyValuePair label="Distribution Id" value="SLCCSMWOHOFUY0"></KeyValuePair>
                    <KeyValuePair label="Domain name" value="bbb.cloudfront.net"></KeyValuePair>
                    <KeyValuePair label="ARN" value={ExternalLink}></KeyValuePair>
                </Stack>
            </Column>
            <Column key="column2">
                <Stack>
                    <KeyValuePair label="Status" value={Status}></KeyValuePair>
                    <KeyValuePair label="Price class" value="Use only US, Canada, Europe, and Asia"></KeyValuePair>
                    <KeyValuePair label="CNAMEs"></KeyValuePair>
                </Stack>
            </Column>
            <Column key="column3">
                <Stack>
                    <KeyValuePair label="SSL certificate" value="Default CloudFront SSL certificate"></KeyValuePair>
                    <KeyValuePair label="Custom SSL client support"></KeyValuePair>
                    <KeyValuePair label="Logging" value="Off"></KeyValuePair>
                </Stack>
            </Column>
        </ColumnLayout>
    </Container>
);
