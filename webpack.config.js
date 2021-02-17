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
const path = require('path');
const SRC_PATH = path.join(__dirname, './src');
const DOC_COMPONENTS_SRC_PATH = path.join(__dirname, './docs/components');
const STYLE_GUIDE_PATH = path.join(__dirname, './styleguide');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx'],
        alias: {
            'aws-northstar': path.resolve(__dirname, 'src/'),
        },
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './public',
                },
            ],
        }),
    ],

    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [SRC_PATH, DOC_COMPONENTS_SRC_PATH, STYLE_GUIDE_PATH],
                use: [
                    {
                        loader: require.resolve('ts-loader'),
                    },
                    {
                        loader: require.resolve('react-docgen-typescript-loader'),
                    },
                    {
                        loader: require.resolve('@storybook/source-loader'),
                        options: {
                            uglyCommentsRegex: [/^eslint-.*/, /^global.*/],
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'url-loader',
            },
        ],
    },
};
