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

import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import BreadcrumbGroup from '.';

describe('BreadcrumbGroup', () => {
    it('renders the route when provided no items', () => {
        const { getByText, getByTestId } = render(
            <MemoryRouter initialEntries={['/current/route/']}>
                <BreadcrumbGroup />
            </MemoryRouter>
        );
        expect(getByText('Current')).toBeInTheDocument();
        expect(getByText('Route')).toBeInTheDocument();
        expect(getByTestId('breadcrumb')).toBeInTheDocument();
    });

    it('preserves the casing of links when provided no items', () => {
        const { getAllByRole } = render(
            <MemoryRouter initialEntries={['/the/current/route/']}>
                <BreadcrumbGroup />
            </MemoryRouter>
        );

        // Casing of links should be preserved
        const links = getAllByRole('link');
        expect(links).toHaveLength(3);
        expect(links[0]).toHaveAttribute('href', '/');
        expect(links[1]).toHaveAttribute('href', '/the');
        expect(links[2]).toHaveAttribute('href', '/the/current');
    });

    it('renders the items', () => {
        const items = [
            { text: 'first', href: '#first' },
            { text: 'second', href: '#second' },
        ];
        const { getByText, getAllByRole, getByTestId } = render(
            <MemoryRouter>
                <BreadcrumbGroup items={items} data-testid="breadcrumb-1" />
            </MemoryRouter>
        );
        expect(getByText('first')).toBeInTheDocument();
        expect(getByText('second')).toBeInTheDocument();
        expect(getAllByRole('listitem')).toHaveLength(2);
        expect(getByTestId('breadcrumb-1')).toBeInTheDocument();
    });

    it('renders the links', () => {
        const availableRoutes = [
            { exact: true, path: '/', strict: true },
            { exact: true, path: '/first', strict: true },
            { exact: true, path: '/second', strict: true },
        ];
        const { getByText, getAllByRole } = render(
            <MemoryRouter initialEntries={['/first/second']}>
                <BreadcrumbGroup availableRoutes={availableRoutes} />
            </MemoryRouter>
        );
        expect(getByText('Home')).toHaveAttribute('href', '/');
        expect(getByText('First')).toHaveAttribute('href', '/first');
        expect(getAllByRole('link')).toHaveLength(2);
    });
});
