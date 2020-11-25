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

describe('Simple card', () => {
    const requiredProps = {
        title: 'card title',
        subtitle: 'subtitle',
        expandableContent: true,
        expandableContentTitle: 'expandableContentTitle',
    };

    const childrenNode = (
        <label>
            <span>Content</span>
            <input />
        </label>
    );

    let component: RenderResult;
    beforeEach(() => {
        component = render(<Card {...requiredProps}>{childrenNode}</Card>);
    });

    it('renders collapsible button', () => {
        const { getByText } = component;

        expect(getByText('subtitle')).toBeVisible();
    });
});

describe('custom header title', () => {
    it('should render the header using custom titleTypographyProps', () => {
        const { container, getByText } = render(
            <Card
                title="custom title"
                subtitle="card subtitle"
                titleTypographyProps={{ variant: 'h2', color: 'secondary', align: 'right', gutterBottom: true }}
            >
                <p>Content</p>
            </Card>
        );

        expect(getByText('custom title')).toBeVisible();
        expect(container.getElementsByClassName('MuiTypography-h2')).toHaveLength(1);
        expect(container.getElementsByClassName('MuiTypography-colorSecondary')).toHaveLength(1);
        expect(container.getElementsByClassName('MuiTypography-gutterBottom')).toHaveLength(1);
        expect(container.getElementsByClassName('MuiTypography-alignRight')).toHaveLength(1);
    });
});
