#!/bin/bash

# Build script is to be run from the root directory of the aws-northstar package
echo "[!] Building..."
set -ev

BUILD_FOLDER_LEGACY=./packages/legacy/build/
STYLEGUIDE_FOLDER_LEGACY=./packages/legacy/styleguide.out/
STYLEGUIDE_FOLDER_LEGACY_EXAMPLE=${STYLEGUIDE_FOLDER_LEGACY}examples/
EXAMPLES_FOLDER=./packages/examples/

yarn install --immutable
yarn test:ci
yarn styleguide:build
yarn storybook:build

echo 'Remove build folder to make sure the npm package only includes clean built components'
if [ -d ${BUILD_FOLDER_LEGACY} ]; then rm -rf ${BUILD_FOLDER_LEGACY}; fi 
yarn build

echo 'Copy license files'
cp ./LICENSE ${BUILD_FOLDER_LEGACY}
cp ./NOTICE ${BUILD_FOLDER_LEGACY}

echo 'Merge coverage reports'
if ! [ -d .nyc_output/ ]; then mkdir .nyc_output/; fi 
find ./packages -type f -name "coverage-final.json" -path "*/coverage/*" -not \( -path "*/node_modules/*" -prune \) \
| nl -bt -nln \
| sed -re 's!^([0-9]+) +\t(.+)$!\2 .nyc_output/coverage-final-\1.json!' \
| xargs -t cp 
npx nyc report --reporter lcov 

echo 'Copy the examples to published examples folder'
if [ ! -d ${STYLEGUIDE_FOLDER_LEGACY_EXAMPLE} ]; then mkdir -p ${STYLEGUIDE_FOLDER_LEGACY_EXAMPLE} ; fi
pushd ${EXAMPLES_FOLDER}/legacy
tar -czvf ../../legacy/styleguide.out/examples/create-react-app.tar.gz .
popd

# Test the example app
./scripts/runDemoTest.sh
