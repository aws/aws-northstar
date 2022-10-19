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
import GetStarted from '.';
import React from 'react';
import { render } from '@testing-library/react';
import Button from '../../components/Button';

describe('GetStarted', () => {
    const category = 'Category';
    const title = 'Title';
    const subTitle = 'SubTitle';
    const description = 'This is an awesome product';
    const action = <Button>Get Started</Button>;
    const sidebarText = 'This block contains extra information';
    const sidebar = <>{sidebarText}</>;
    const contentText = 'This block contains the information';
    const content = <>{contentText}</>;

    it('should render GetStarted layout', () => {
        const { getByText } = render(
            <GetStarted
                category={category}
                title={title}
                subTitle={subTitle}
                description={description}
                action={action}
                sidebar={sidebar}
            >
                {content}
            </GetStarted>
        );

        expect(getByText(category)).toBeVisible();
        expect(getByText(title)).toBeVisible();
        expect(getByText(subTitle)).toBeVisible();
        expect(getByText(description)).toBeVisible();
        expect(getByText(sidebarText)).toBeVisible();
        expect(getByText(contentText)).toBeVisible();
        expect(getByText('Get Started')).toBeVisible();
    });
});
