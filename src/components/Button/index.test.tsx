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
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Button, { ButtonIconType } from '.';

describe('Button', () => {
    describe('icon', () => {
        const props = { variant: 'icon' as const, icon: 'add_plus' as ButtonIconType, label: 'add button' };

        it('renders the icon button', () => {
            const { getByRole } = render(<Button {...props}>test</Button>);
            expect(getByRole('button')).toHaveAttribute('aria-label', props.label);
        });

        it('renders accessible component', async () => {
            const { container } = render(<Button {...props}>test</Button>);
            const results = await axe(container);

            expect(results).toHaveNoViolations();
        });

        describe('when loading', () => {
            it('disables button and renders loader icon instead of icon from prop', () => {
                const props = { loading: true, variant: 'icon' as const, icon: 'add_plus' as ButtonIconType };
                const { queryByRole } = render(<Button {...props}>test</Button>);
                expect(queryByRole('button')).toHaveAttribute('disabled');
                expect(queryByRole('progressbar')).toBeInTheDocument();
            });
        });
    });

    describe('MaterialButton', () => {
        const variant = 'primary' as const;

        it('renders the children', () => {
            const { queryByRole } = render(<Button>test</Button>);
            expect(queryByRole('button')).toHaveTextContent('test');
        });
        it('renders an icon from props', () => {
            const props = { variant, icon: 'add_plus' as ButtonIconType };
            const { queryByRole } = render(<Button {...props}>test</Button>);
            expect(queryByRole('progressbar')).not.toBeInTheDocument();
        });

        describe('when loading', () => {
            it('disables button and renders a loader without icon from props ', () => {
                const props = { loading: true, variant, icon: 'add_plus' as ButtonIconType };
                const { queryByRole } = render(<Button {...props}>test</Button>);
                expect(queryByRole('button')).toHaveAttribute('disabled');
                expect(queryByRole('progressbar')).toBeInTheDocument();
            });

            it('renders an loader and icon from props when iconAlign is right', () => {
                const iconAlign = 'right' as const;
                const props = { loading: true, iconAlign, variant, icon: 'add_plus' as ButtonIconType };
                const { queryByRole } = render(<Button {...props}>test</Button>);
                expect(queryByRole('progressbar')).toBeInTheDocument();
            });
        });
    });

    describe('with props', () => {
        describe('link variant', () => {
            it('renders a link button', () => {
                const props = { variant: 'link' as const, href: '/url' };
                const { getByRole } = render(<Button {...props}>test</Button>);
                expect(getByRole('link')).toHaveAttribute('href', props.href);
            });
        });
        describe('primary variant', () => {
            it('renders a primary button', () => {
                const props = { variant: 'primary' as const };
                const { getByRole } = render(<Button {...props}>test</Button>);
                expect(getByRole('button')).toHaveClass('MuiButton-contained');
            });
        });
        describe('normal variant', () => {
            it('renders a normal button', () => {
                const props = { variant: 'normal' as const };
                const { getByRole } = render(<Button {...props}>test</Button>);
                expect(getByRole('button')).toHaveClass('MuiButton-text');
            });
        });
        describe('disabled', () => {
            it('passes through the disabled prop', () => {
                const props = { disabled: true };
                const { getByRole } = render(<Button {...props}>test</Button>);
                expect(getByRole('button')).toHaveAttribute('disabled');
            });
        });
        describe('onClick', () => {
            it('calls the provided onClick handler', () => {
                const onClickMockFn = jest.fn();
                const { getByRole } = render(<Button onClick={onClickMockFn}>test</Button>);
                getByRole('button').click();
                expect(onClickMockFn).toBeCalled();
            });
        });
        describe('different size', () => {
            it('should render a small button', () => {
                const { getByRole } = render(<Button size="small">test</Button>);
                expect(getByRole('button')).toHaveClass('MuiButton-sizeSmall');
            });

            it('should render a medium button', () => {
                const { getByRole } = render(<Button size="medium">test</Button>);
                // medium size does not have a specific class, that's the standard case
                expect(getByRole('button')).not.toHaveClass('MuiButton-sizeSmall');
                expect(getByRole('button')).not.toHaveClass('MuiButton-sizeLarge');
            });

            it('should render a large button', () => {
                const { getByRole } = render(<Button size="large">test</Button>);
                expect(getByRole('button')).toHaveClass('MuiButton-sizeLarge');
            });
        });
    });
});
