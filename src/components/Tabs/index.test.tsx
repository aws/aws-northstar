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
import { render, fireEvent } from '@testing-library/react';

import Tabs from '.';

const THIRD_TAB_LABEL = 'Third tab label';

const tabs = [
    {
        label: 'First tab label',
        id: 'first',
        content: 'First tab content area',
    },
    {
        label: 'Second tab label',
        id: 'second',
        content: 'Second tab content area',
    },
    {
        label: <div>{THIRD_TAB_LABEL}</div>,
        id: 'third',
        content: 'Third tab content area',
    },
];

describe('Tabs', () => {
    it('shows first tab by default', () => {
        const props = { tabs };
        const { getByText } = render(<Tabs {...props} />);
        expect(getByText(tabs[0].content)).toBeVisible();
        expect(getByText(tabs[1].content)).not.toBeVisible();
    });

    it('shows tab from activeId', () => {
        const props = { tabs, activeId: tabs[1].id };
        const { getByText } = render(<Tabs {...props} />);
        expect(getByText(tabs[1].content)).toBeVisible();
        expect(getByText(tabs[0].content)).not.toBeVisible();
    });

    it('renders with container variant', () => {
        const props = { tabs, variant: 'container' as const };
        const { getByText } = render(<Tabs {...props} />);
        expect(getByText(tabs[0].content)).toBeVisible();
    });

    it('can be accessed by custom test-id', () => {
        const props = { tabs };
        const { getByTestId } = render(<Tabs {...props} data-testid="tabs-1" />);
        expect(getByTestId('tabs-1')).toBeInTheDocument();
        expect(getByTestId('tabs-1-header-first')).toBeInTheDocument();
        expect(getByTestId('tabs-1-content-first')).toBeVisible();
        expect(getByTestId('tabs-1-header-second')).toBeInTheDocument();
        expect(getByTestId('tabs-1-content-second')).not.toBeVisible();
        expect(getByTestId('tabs-1-header-third')).toBeInTheDocument();
        expect(getByTestId('tabs-1-content-third')).not.toBeVisible();
    });

    it('renders with container variant and without padding in the content area', () => {
        const { getByText } = render(<Tabs tabs={tabs} variant="container" paddingContentArea={false} />);
        expect(getByText(tabs[0].content)).toBeVisible();
    });

    it('disables a tab', () => {
        const props = {
            tabs: [
                ...tabs,
                {
                    label: 'Disable tab',
                    id: 'disable',
                    content: 'Disable tab content',
                    disabled: true,
                },
            ],
        };
        const { getByText } = render(<Tabs {...props} />);
        expect(getByText('Disable tab').closest('button')).toHaveAttribute('disabled');
    });

    it('can switch tab and fire onChange event with the activeTabId', () => {
        const onChangeMock = jest.fn();
        const props = { tabs, onChange: onChangeMock };
        const { getByText } = render(<Tabs {...props} />);
        const tab = getByText(String(tabs[1].label)).closest('button');
        expect(onChangeMock).toBeCalledTimes(0);

        if (tab) {
            fireEvent.click(tab);
        }
        expect(getByText(tabs[0].content)).not.toBeVisible();
        expect(getByText(tabs[1].content)).toBeVisible();
        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(tabs[1].id);
    });

    it('arbitrary content can be rendered in a label', () => {
        const props = { tabs };
        const { getByText } = render(<Tabs {...props} />);
        const labelContent = getByText(THIRD_TAB_LABEL);

        expect(labelContent).toBeVisible();
    });

    const TabsWithActiveId = ({ activeId }: { activeId: string }) => {
        return <Tabs tabs={tabs} activeId={activeId} />;
    };

    it('change active tab with the activeId changed', () => {
        const props = { tabs };
        const { getByText, rerender } = render(<TabsWithActiveId {...props} activeId="second" />);
        expect(getByText(tabs[0].content)).not.toBeVisible();
        expect(getByText(tabs[1].content)).toBeVisible();

        rerender(<TabsWithActiveId {...props} activeId="first" />);
        expect(getByText(tabs[0].content)).toBeVisible();
        expect(getByText(tabs[1].content)).not.toBeVisible();
    });
});
