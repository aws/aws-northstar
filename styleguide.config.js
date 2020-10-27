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
const glob = require('glob');
const path = require('path');
const fs = require('fs');

module.exports = {
    title: 'NorthStar',
    pagePerSection: true,
    usageMode: 'expand',
    showSidebar: true,
    styleguideDir: 'styleguide.out',
    tocMode: 'collapse',
    skipComponentsWithoutExample: true,
    propsParser: require('react-docgen-typescript').withDefaultConfig({
        savePropValueAsString: true,
    }).parse,
    webpackConfig: Object.assign({}, require('./webpack.config.js'), {}),
    styleguideComponents: {
        Wrapper: path.join(__dirname, 'styleguide/components/Wrapper'),
        StyleGuideRenderer: path.join(__dirname, 'styleguide/components/StyleGuide'),
        SectionsRenderer: path.join(__dirname, 'styleguide/components/SectionsRenderer'),
        SectionHeadingRenderer: path.join(__dirname, 'styleguide/components/SectionHeadingRenderer'),
        HeadingRenderer: path.join(__dirname, 'styleguide/components/HeadingRenderer'),
        MarkdownHeadingRenderer: path.join(__dirname, 'styleguide/components/HeadingRenderer'),
        ParaRenderer: path.join(__dirname, 'styleguide/components/ParaRenderer'),
    },
    sections: [
        {
            name: 'About NorthStar',
            content: 'docs/AboutNorthStar.md',
        },
        {
            name: 'Getting Started',
            content: './docs/GettingStarted.md',
        },
        {
            name: 'Layouts',
            content: 'docs/Layouts.md',
            components: 'src/layouts/*/index.{ts,tsx}',
            sectionDepth: 1,
        },
        {
            name: 'Components',
            content: 'docs/Components.md',
            components: 'src/components/*/index.{ts,tsx}',
            sectionDepth: 1,
        },
        {
            name: 'Advanced Components',
            content: 'docs/AdvancedComponents.md',
            components: 'src/advanced/*/index.{ts,tsx}',
            sectionDepth: 1,
        },
        {
            name: 'Charts',
            content: 'docs/Charts.md',
            components: 'src/charts/*/index.{ts,tsx}',
            sectionDepth: 1,
        },
        {
            name: 'Contribution Guide',
            content: 'docs/ContributionGuide.md',
            sections: [
                {
                    name: 'Coding Guidelines',
                    content: 'docs/CodingGuidelines.md',
                },
            ],
            sectionDepth: 1,
        },
    ],
    theme: {
        baseBackground: '#fdfdfc',
        link: '#274e75',
        linkHover: '#90a7bf',
        border: '#e0d2de',
        font: ['Helvetica', 'sans-serif'],
    },
    styles: {
        Playground: {
            preview: {
                paddingLeft: 0,
                paddingRight: 0,
                borderWidth: [[0, 0, 1, 0]],
                borderRadius: 0,
            },
        },
        Code: {
            code: {
                // make inline code example appear the same color as links
                color: '#274e75',
                fontSize: 14,
            },
        },
    },
};
