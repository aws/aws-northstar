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
const merge = require('merge');
const tsPreset = require('ts-jest/jest-preset');
const cloudscapePreset = require('@cloudscape-design/jest-preset');

module.exports = merge.recursive(tsPreset, cloudscapePreset, {
    testEnvironment: 'jsdom',
    roots: ['./src'],
    globalSetup: './jest/jest.globalsetup.js',
    setupFilesAfterEnv: ['./jest/jest.setup.ts'],
    maxWorkers: '50%',
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90,
        },
    },
    coveragePathIgnorePatterns: ['/node_modules/', '/components/index.ts', '.*/index.stories.tsx'],
});
