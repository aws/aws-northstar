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
import BreadcrumbGroup from '.';
import { MemoryRouter } from 'react-router';

export default {
    component: BreadcrumbGroup,
    title: 'Components/BreadcrumbGroup',
};

export const BreadcrumbsWithNoItems = () => {
    return (
        <MemoryRouter initialEntries={['/blogs/1/posts/2']}>
            <BreadcrumbGroup
                availableRoutes={[
                    { path: '/', exact: true, strict: true },
                    { path: '/blogs', exact: true, strict: true },
                    { path: '/blogs/:blogid', exact: true, strict: true },
                    { path: '/blogs/:blogid/posts/:postid', exact: true, strict: true },
                ]}
            />
        </MemoryRouter>
    );
};

export const BreadcrumbsWithItems = () => (
    <BreadcrumbGroup
        items={[
            {
                text: 'S3',
                href: '#s3',
            },
            {
                text: 'MyBucket',
                href: '#mybucket',
            },
            {
                text: 'Images',
                href: '#Images',
            },
            {
                text: 'Processed',
                href: '#processed',
            },
        ]}
    />
);
