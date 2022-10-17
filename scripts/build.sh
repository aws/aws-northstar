#!/bin/bash

# Build script is to be run from the root directory of the aws-northstar package

set -ev

BUILD_FOLDER_LEGACY=./packages/legacy/build/
STYLEGUIDE_FOLDER_LEGACY=./packages/legacy/styleguide.out/
STYLEGUIDE_FOLDER_LEGACY_EXAMPLE=${STYLEGUIDE_FOLDER_LEGACY}examples/
EXAMPLES_FOLDER=./packages/examples/

yarn install
yarn test:ci
yarn styleguide:build
yarn storybook:build

echo 'Remove build folder to make sure the npm package only includes clean built components'
if [ -d ${BUILD_FOLDER_LEGACY} ]; then rm -rf ${BUILD_FOLDER_LEGACY}; fi 
yarn build
yarn build:esm

echo 'Copy license files'
cp ./LICENSE ${BUILD_FOLDER_LEGACY}
cp ./NOTICE ${BUILD_FOLDER_LEGACY}

echo 'Copy the examples to published examples folder'
if [ ! -d ${STYLEGUIDE_FOLDER_LEGACY_EXAMPLE} ]; then mkdir -p ${STYLEGUIDE_FOLDER_LEGACY_EXAMPLE} ; fi
pushd ${EXAMPLES_FOLDER}
tar -czvf ../legacy/styleguide.out/create-react-app.tar.gz ./legacy
popd

# Test the example app
./scripts/runDemoTest.sh
