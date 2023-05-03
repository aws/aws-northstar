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
import { matchPath } from 'react-router-dom';

const getBreadcrumbs = (pathName: string, search: string, defaultBreadcrumb: string, availableRoutes?: string[]) => {
    const segments = [defaultBreadcrumb, ...pathName.split('/').filter((segment) => segment !== '')];

    return segments.map((segment, i) => {
        const href =
            i === 0
                ? '/'
                : `/${segments
                      .slice(1, i + 1)
                      .join('/')
                      .replace('//', '/')}`;

        const matched = !availableRoutes || availableRoutes.find((r) => matchPath(r, href));

        return {
            // If there is not availableRoutes,
            // or there is a matched route in availableRoutes return href,
            // otherwise return # so the page is not reloaded.
            href: matched ? `${href}${search}` : '#',
            text: segment,
        };
    });
};

export default getBreadcrumbs;
