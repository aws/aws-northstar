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
const esModules = ['react-use-localstorage'].join('|');

module.exports = {
    roots: ['./src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
    },
    globalSetup: './jest/jest.globalsetup.js',
    setupFilesAfterEnv: ['./jest/jest.setup.ts'],
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 85,
            lines: 95,
            statements: 95,
        },
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/components/index.ts', '.*/index.stories.tsx'],
};
