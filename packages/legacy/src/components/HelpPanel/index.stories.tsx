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
import HelpPanel from '.';
import Link from '../Link';
import Text from '../Text';
import Heading from '../Heading';

export default {
    component: HelpPanel,
    title: 'Components/HelpPanel',
};

const footerLinks = [
    <Link href="/docs">Link to internal documentation</Link>,
    <Link href="https://www.amazon.com">Link to external documentation</Link>,
];

const content = (
    <>
        <Text variant="p">
            This is a paragraph with some <b>bold text</b> and also some <i>italic text.</i>
        </Text>
        <Heading variant="h4">h4 section header</Heading>
        <Heading variant="h5">h5 section header</Heading>
    </>
);

export const Default = () => {
    return (
        <HelpPanel header="Help panel title" learnMoreFooter={footerLinks}>
            {content}
        </HelpPanel>
    );
};

export const Loading = () => {
    return <HelpPanel loading={true} />;
};
