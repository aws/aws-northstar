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
import { render, screen, act } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import wrapper from '@cloudscape-design/components/test-utils/dom';
import * as stories from './index.stories';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const { Default, WithUser, WithCustomHeader, FormContentType } = composeStories(stories);

describe('AppLayout', () => {
    it('should render default AppLayout', async () => {
        const { container } = render(<Default />);
        const applayout = wrapper(container).findAppLayout();
        const appHeader = wrapper(container).findTopNavigation();
        const sideNav = applayout?.findNavigation();

        expect(applayout).not.toBeNull();
        expect(appHeader).not.toBeNull();
        expect(sideNav).not.toBeNull();

        expect(appHeader?.findTitle()?.getElement()).toHaveTextContent('HelloWorld App');
        expect(appHeader?.findLogo()).not.toBeNull();

        expect(screen.getByText('Page 1')).toBeVisible();
        expect(screen.getByText('Page 2')).toBeVisible();
        expect(screen.getByText('Page 3')).toBeVisible();
        expect(screen.getByText('Page 4')).toBeVisible();
    });

    it('should render AppLayout with user', async () => {
        const { container } = render(<WithUser />);
        const appHeader = wrapper(container).findTopNavigation();
        expect(appHeader).not.toBeNull();

        expect(screen.queryAllByText('Username')).toHaveLength(3);
    });

    it('should set active breadcrumb', () => {
        const { container } = render(<Default />);

        const breadcrumb = wrapper(container).findBreadcrumbGroup();
        expect(breadcrumb?.findBreadcrumbLinks()).toHaveLength(1);
        expect(breadcrumb?.findBreadcrumbLinks()[0].getElement()).toHaveTextContent('home');

        act(() => {
            userEvent.click(screen.getByText('Page 2'));
        });

        expect(breadcrumb?.findBreadcrumbLinks()).toHaveLength(2);
        expect(breadcrumb?.findBreadcrumbLinks()[0].getElement()).toHaveTextContent('home');
        expect(breadcrumb?.findBreadcrumbLinks()[1].getElement()).toHaveTextContent('page2');
    });

    it('should render AppLayout with custom header', async () => {
        render(<WithCustomHeader />);

        expect(screen.queryAllByText('Custom Header')).toHaveLength(2);
    });

    it('should be able to open/close split panel', async () => {
        const { container } = render(
            <BrowserRouter>
                <stories.SplitPanel />
            </BrowserRouter>
        );

        expect(screen.queryByText('Details')).toBeNull();

        act(() => {
            userEvent.click(screen.getByText('Open Split Panel'));
        });

        expect(screen.getByText('Details')).toBeVisible();
        const splitPanel = wrapper(container).findSplitPanel();
        expect(splitPanel).not.toBeNull();

        act(() => {
            userEvent.click(screen.getByText('Collapse Split Panel'));
        });

        expect(splitPanel!.findCloseButton()).toBeNull();

        act(() => {
            splitPanel!.findOpenButton()?.click();
        });

        expect(splitPanel!.findOpenButton()).toBeNull();

        act(() => {
            userEvent.click(screen.getByText('Hide Split Panel'));
        });

        expect(wrapper(container).findSplitPanel()).toBeNull();
    });

    it('should be able to open/close tools panel', async () => {
        render(
            <BrowserRouter>
                <stories.ToolsPanel />
            </BrowserRouter>
        );

        expect(screen.queryByText('Help Panel')).toBeNull();

        act(() => {
            userEvent.click(screen.getByText('Open Tools Panel'));
        });

        expect(screen.getByText('Help Panel')).toBeVisible();
        expect(screen.getByText('Help Panel').parentNode?.parentNode).toHaveAttribute('aria-hidden', 'false');

        act(() => {
            userEvent.click(screen.getByText('Close Tools Panel'));
        });

        expect(screen.getByText('Help Panel').parentNode?.parentNode).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render content of form content type', async () => {
        render(<FormContentType />);

        expect(screen.getByText('Data driven form')).toBeVisible();
    });
});
