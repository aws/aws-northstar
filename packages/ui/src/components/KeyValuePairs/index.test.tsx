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
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './index.stories';
import wrapper from '@cloudscape-design/components/test-utils/dom';

const { Default } = composeStories(stories);

describe('KeyValuePairs', () => {
    it('should render a list of key value pairs array', async () => {
        render(<Default />);

        expect(screen.getByText('Domain name')).toBeVisible();
        expect(screen.getByText('example.com')).toBeVisible();

        expect(screen.getByText('Status')).toBeVisible();
        expect(screen.getByText('Available')).toBeVisible();

        expect(screen.getByText('SSL Certificate')).toBeVisible();
        expect(screen.getByText('Update in progress')).toBeVisible();

        const element = await screen.findByTestId('testId');
        const columnLayout = wrapper(element).findColumnLayout();

        expect(columnLayout?.findColumn(1)).not.toBeNull();
        expect(columnLayout?.findColumn(2)).not.toBeNull();
        expect(columnLayout?.findColumn(3)).not.toBeNull();

        const progressBar = wrapper(element).findProgressBar();
        expect(progressBar?.findPercentageText()?.getElement()).toHaveTextContent('37%');
    });
});
