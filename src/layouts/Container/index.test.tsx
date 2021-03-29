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
import Container from '.';
import Text from '../../components/Text';
import Button from '../../components/Button';

describe('Container', () => {
    const title = 'Title';
    const bodyText = 'Body';
    const subtitle = 'subtitle';
    const buttonText = 'Action Button';

    it('renders a container with title', () => {
        const { getByText } = render(
            <Container title={title}>
                <Text>{bodyText}</Text>
            </Container>
        );

        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(bodyText)).toBeInTheDocument();
    });

    it('renders a container with subtitle', () => {
        const { getByText } = render(
            <Container subtitle={subtitle}>
                <Text>{bodyText}</Text>
            </Container>
        );

        expect(getByText(subtitle)).toBeInTheDocument();
    });

    it('renders a container with subtitle being arbitrary react', () => {
        const { getByText } = render(
            <Container subtitle={<div>{subtitle}</div>}>
                <Text>{bodyText}</Text>
            </Container>
        );

        expect(getByText(subtitle)).toBeInTheDocument();
    });

    it('renders a container with footer', () => {
        const footer = 'Footer';
        const { getByText } = render(
            <Container footerContent={footer}>
                <Text>BodyText</Text>
            </Container>
        );

        expect(getByText(footer)).toBeInTheDocument();
    });

    describe('headerContent', () => {
        const header = 'Header';

        it('only renders for container with title', () => {
            const { getByText } = render(
                <Container title={title} headerContent={header}>
                    <Text>BodyText</Text>
                </Container>
            );

            expect(getByText(header)).toBeInTheDocument();
        });

        it('only renders for container with subtitle', () => {
            const { getByText } = render(
                <Container subtitle={subtitle} headerContent={header}>
                    <Text>BodyText</Text>
                </Container>
            );

            expect(getByText(header)).toBeInTheDocument();
        });

        it('only renders for container with actionGroup', () => {
            const { getByText } = render(
                <Container actionGroup={<Button>{buttonText}</Button>} headerContent={header}>
                    <Text>BodyText</Text>
                </Container>
            );

            expect(getByText(header)).toBeInTheDocument();
        });

        it('only renders for container with headerContent', () => {
            const { queryByText } = render(
                <Container headerContent={header}>
                    <Text>BodyText</Text>
                </Container>
            );

            expect(queryByText(header)).toBeInTheDocument();
        });
    });

    describe('actionGroup', () => {
        it('only renders for container with title', () => {
            const { getByText } = render(
                <Container title={title} actionGroup={<Button>{buttonText}</Button>}>
                    <Text>BodyText</Text>
                </Container>
            );

            expect(getByText(buttonText)).toBeInTheDocument();
        });

        it('only renders for container with subtitle', () => {
            const { getByText } = render(
                <Container subtitle={subtitle} actionGroup={<Button>{buttonText}</Button>}>
                    <Text>BodyText</Text>
                </Container>
            );

            expect(getByText(buttonText)).toBeInTheDocument();
        });

        it('does not render for container without title or subtitle', () => {
            const { queryByText } = render(
                <Container actionGroup={<Button>{buttonText}</Button>}>
                    <Text>BodyText</Text>
                </Container>
            );

            expect(queryByText(buttonText)).toBeInTheDocument();
        });
    });
});
