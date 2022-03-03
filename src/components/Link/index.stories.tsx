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
import { BrowserRouter } from 'react-router-dom';

import Link from '.';

export default {
    component: Link,
    title: 'Components/Link',
};

export const Normal = () => (
    <BrowserRouter>
        <Link href="/route1">Normal link</Link>
    </BrowserRouter>
);

export const NavPanel = () => (
    <BrowserRouter>
        <Link href="/route1" underlineHover={false}>
            Navigation link
        </Link>
    </BrowserRouter>
);

export const External = () => (
    <BrowserRouter>
        <Link href="https://www.amazon.com/">External link</Link>
    </BrowserRouter>
);
