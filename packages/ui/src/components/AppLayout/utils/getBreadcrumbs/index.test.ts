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
import getBreadcrumbs from '.';

describe('getBreadcrumbs', () => {
    it('should infer breadcrumbs from the current url', () => {
        const breadcrumbs = getBreadcrumbs('/domain1/id1/domain2/id2', '', 'home');

        expect(breadcrumbs).toEqual([
            {
                text: 'home',
                href: '/',
            },
            {
                text: 'domain1',
                href: '/domain1',
            },
            {
                text: 'id1',
                href: '/domain1/id1',
            },
            {
                text: 'domain2',
                href: '/domain1/id1/domain2',
            },
            {
                text: 'id2',
                href: '/domain1/id1/domain2/id2',
            },
        ]);
    });

    it('should handle home path', () => {
        const breadcrumbs = getBreadcrumbs('/', '', 'home');

        expect(breadcrumbs).toEqual([
            {
                text: 'home',
                href: '/',
            },
        ]);
    });

    it('should handle querystring', () => {
        const breadcrumbs = getBreadcrumbs(
            '/domain1/id1/domain2/id2',
            '?searchParam1=value1&searchParam2=value2',
            'home'
        );

        expect(breadcrumbs).toEqual([
            {
                text: 'home',
                href: '/?searchParam1=value1&searchParam2=value2',
            },
            {
                text: 'domain1',
                href: '/domain1?searchParam1=value1&searchParam2=value2',
            },
            {
                text: 'id1',
                href: '/domain1/id1?searchParam1=value1&searchParam2=value2',
            },
            {
                text: 'domain2',
                href: '/domain1/id1/domain2?searchParam1=value1&searchParam2=value2',
            },
            {
                text: 'id2',
                href: '/domain1/id1/domain2/id2?searchParam1=value1&searchParam2=value2',
            },
        ]);
    });

    it('should handle home path with querystring', () => {
        const breadcrumbs = getBreadcrumbs('/', '?searchParam1=value1&searchParam2=value2', 'home');

        expect(breadcrumbs).toEqual([
            {
                text: 'home',
                href: '/?searchParam1=value1&searchParam2=value2',
            },
        ]);
    });

    it('should render unmatched route as # when availableRoutes is provided', () => {
        const availableRoutes: any[] = [
            {
                path: '/',
            },
            {
                path: '/domain1/:domain1Id',
            },
            {
                path: '/domain1/:domain1Id/domain2/:domain2Id',
            },
        ];

        const breadcrumbs = getBreadcrumbs('/domain1/id1/domain2/id2', '', 'home', availableRoutes);

        expect(breadcrumbs).toEqual([
            {
                text: 'home',
                href: '/',
            },
            {
                text: 'domain1',
                href: '#',
            },
            {
                text: 'id1',
                href: '/domain1/id1',
            },
            {
                text: 'domain2',
                href: '#',
            },
            {
                text: 'id2',
                href: '/domain1/id1/domain2/id2',
            },
        ]);
    });

    it('should render unmatched route as # when availableRoutes is provided and query string is provided', () => {
        const availableRoutes = [
            {
                path: '/',
            },
            {
                path: '/domain1/:domain1Id',
            },
            {
                path: '/domain1/:domain1Id/domain2/:domain2Id',
            },
        ];

        const breadcrumbs = getBreadcrumbs(
            '/domain1/id1/domain2/id2',
            '?query=value',
            'home',
            availableRoutes.map((x) => x.path)
        );

        expect(breadcrumbs).toEqual([
            {
                text: 'home',
                href: '/?query=value',
            },
            {
                text: 'domain1',
                href: '#',
            },
            {
                text: 'id1',
                href: '/domain1/id1?query=value',
            },
            {
                text: 'domain2',
                href: '#',
            },
            {
                text: 'id2',
                href: '/domain1/id1/domain2/id2?query=value',
            },
        ]);
    });
});
