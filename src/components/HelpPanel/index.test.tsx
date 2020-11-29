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
import { render } from '@testing-library/react';
import HelpPanel from '.';
import Link from '../Link';
import { BrowserRouter } from 'react-router-dom';

const footerLinks = [
    <Link href="/docs">Link to internal documentation</Link>,
    <Link href="https://www.amazon.com">Link to external documentation</Link>,
];

const content = <>Content</>;

describe('HelpPanel', () => {
    it('renders content', () => {
        const { getByText } = render(<HelpPanel header="Help panel title">{content}</HelpPanel>);
        expect(getByText('Help panel title')).toBeVisible();
        expect(getByText('Content')).toBeVisible();
    });

    it('renders footer links', () => {
        const { getAllByRole } = render(
            <BrowserRouter>
                <HelpPanel header="Help panel title" learnMoreFooter={footerLinks}>
                    {content}
                </HelpPanel>
            </BrowserRouter>
        );
        expect(getAllByRole('link')).toHaveLength(footerLinks.length);
    });
});
