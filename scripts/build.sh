#!/bin/bash

# Build script is to be run from the root directory of the aws-northstar package

set -ev

EXAMPLES_FOLDER=${PWD}/packages/examples/

BUILD_FOLDER_UI=${PWD}/packages/ui/build/
STORYBOOK_FOLDER_UI=${PWD}/packages/ui/storybook.out/
STORYBOOK_FOLDER_UI_EXAMPLE=${STORYBOOK_FOLDER_UI}static/examples/

yarn install --immutable
yarn test:ci
yarn storybook:build

echo 'Remove build folder to make sure the npm package only includes clean built components'
if [ -d ${BUILD_FOLDER_UI} ]; then rm -rf ${BUILD_FOLDER_UI}; fi 

yarn build

echo "Package the example app for ui"

./scripts/packageDemo.sh ui ${PWD}/packages/examples/ui ${STORYBOOK_FOLDER_UI_EXAMPLE} ${PWD}/packages/ui/build 1500000 1200000
