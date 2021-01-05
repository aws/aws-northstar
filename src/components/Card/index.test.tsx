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
import { render, RenderResult } from '@testing-library/react';

import Card from '.';

const props = {
    title: 'card title',
    subtitle: 'card subtitle',
    expandableContent: true,
    expandableContentTitle: 'expandableContentTitle',
};

describe('Card', () => {
    it('renders card components', () => {
        const { getByText } = render(<Card {...props}>Content</Card>);

        expect(getByText('card title')).toBeVisible();
        expect(getByText('card subtitle')).toBeVisible();
        expect(getByText('Content')).toBeVisible();
    });

    it('renders child node', () => {
        const childrenNode = (
            <div data-testid="content">
                <span>Content</span>
            </div>
        );

        const { getByText, getByTestId } = render(<Card {...props}>{childrenNode}</Card>);

        expect(getByText('card title')).toBeVisible();
        expect(getByText('card subtitle')).toBeVisible();
        expect(getByTestId('content')).toBeVisible();
    });

    it('renders the header using custom titleTypographyProps', () => {
        const { container } = render(
            <Card
                title="custom title"
                subtitle="card subtitle"
                titleTypographyProps={{ variant: 'h2', color: 'secondary', align: 'right', gutterBottom: true }}
            >
                <p>Content</p>
            </Card>
        );

        expect(container.getElementsByClassName('MuiTypography-h2')).toHaveLength(1);
        expect(container.getElementsByClassName('MuiTypography-colorSecondary')).toHaveLength(1);
        expect(container.getElementsByClassName('MuiTypography-gutterBottom')).toHaveLength(1);
        expect(container.getElementsByClassName('MuiTypography-alignRight')).toHaveLength(1);
    });
});
