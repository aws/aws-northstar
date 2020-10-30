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
import { render, cleanup } from '@testing-library/react';
import Header from '../../components/Header';
import AppLayout from '.';
jest.mock('react-use-localstorage', () => ({
    __esModule: true,
    default: () => ['false', () => {}],
}));

describe('AppLayout', () => {
    const header = <Header title="App Title" />;

    afterEach(cleanup);

    it('renders the headers', () => {
        const { container } = render(<AppLayout header={header} />);
        const headerTag = container.getElementsByTagName('header')[0];
        expect(headerTag).toBeDefined();
        expect(headerTag.textContent).toBe('App Title');
    });

    it('renders the sidebar node', () => {
        const sidebarNode = <div>MockSidebar</div>;
        const { getByText } = render(<AppLayout header={header} navigation={sidebarNode} />);
        expect(getByText('MockSidebar')).toBeInTheDocument();
    });

    it('renders the breadcrumbs node', () => {
        const breadcrumbsNode = <div>MockBreadcrumbs</div>;
        const { getByText } = render(<AppLayout header={header} breadcrumbs={breadcrumbsNode} />);
        expect(getByText('MockBreadcrumbs')).toBeInTheDocument();
    });
});
