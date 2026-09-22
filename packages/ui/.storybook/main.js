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

// Storybook runs on webpack 5 via @storybook/builder-webpack5, but a webpack 4 copy is hoisted to
// the workspace root. Resolve through the builder so the plugin below comes from the webpack that
// actually compiles this build.
const webpack = require(require.resolve('webpack', { paths: [require.resolve('@storybook/builder-webpack5')] }));

const appDirectory = path.resolve(__dirname, '../');

// ace-builds/webpack-resolver, imported by the FormRenderer CodeEditor, emits every one of ace's
// ~183 syntax modes and snippets as its own file. The Cloudscape code editor only ever offers the
// 164 languages in its AceModes list, so the rest are published to the docs site unreachable.
//
// One of them causes real trouble: ace's CSP highlighter (mode-csp.js) lists 'unsafe-eval' among
// the keywords it colorises, which automated scanners read as a live CSP directive even though
// NorthStar declares no Content-Security-Policy anywhere. Dropping the unreachable modes removes
// the false positive at its source and trims ~40 files from the site.
//
// Regenerate after an ace-builds or @cloudscape-design/components bump:
//   node -e "const {AceModes}=require('./node_modules/@cloudscape-design/components/code-editor/ace-modes.js'); \
//     const cs=AceModes.map(m=>m.value), fs=require('fs'); \
//     console.log(fs.readdirSync('./node_modules/ace-builds/src-noconflict').filter(f=>/^mode-.*\.js$/.test(f)) \
//       .map(f=>f.slice(5,-3)).filter(m=>!cs.includes(m)).join(' '))"
//
// That command also reports plain_text, which is deliberately kept: ace falls back to it for
// unrecognised content, so it is not safe to drop even though the language list omits it.
const UNSUPPORTED_ACE_MODES = new Set([
    'applescript',
    'bibtex',
    'csp',
    'ion',
    'jexl',
    'latte',
    'logtalk',
    'mips',
    'odin',
    'partiql',
    'plsql',
    'raku',
    'redshift',
    'robot',
    'sac',
    'scrypt',
    'smithy',
    'sparql',
    'turtle',
]);

// Matches the mode and snippet requests webpack-resolver makes, capturing the language name.
const ACE_MODE_REQUEST = /[\\/]src-noconflict[\\/](?:mode-([\w-]+)|snippets[\\/]([\w-]+))\.js$/;

const unsupportedAceModeStub = path.resolve(__dirname, 'unsupported-ace-mode.js');
// Ignore dev testing stories from the documentation website
const getStories = () => glob.sync(`${appDirectory}/{src,docs}/**/*.stories.@(js|jsx|ts|tsx|mdx)`, {
        ignore: `${appDirectory}/**/devStories/*.stories.@(js|jsx|ts|tsx|mdx)`,
    });

module.exports = {
    stories: process.env.NODE_ENV === 'development' ? [
        '../docs/**/*.stories.mdx',
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
        ] :
        (async list => [...list, ...getStories()]),
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
    ],
    framework: '@storybook/react',
    core: {
        builder: 'webpack5',
    },
    staticDirs: ['../public'],
    features: {
        interactionsDebugger: true,
    },
    webpackFinal: async (config) => {
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(ACE_MODE_REQUEST, (resource) => {
                const match = ACE_MODE_REQUEST.exec(resource.request);
                const language = match && (match[1] || match[2]);

                if (language && UNSUPPORTED_ACE_MODES.has(language)) {
                    // Replacing the whole request drops the inline file-loader too, so the stub is
                    // bundled as an ordinary module and no asset is emitted for this language.
                    resource.request = unsupportedAceModeStub;
                }
            })
        );

        return config;
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            compilerOptions: {
                allowSyntheticDefaultImports: false,
                esModuleInterop: false,
            },
        },
    },
};
