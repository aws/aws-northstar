#!/bin/bash

# Build script is to be run from the root directory of the aws-northstar package

set -ev

BUILD_FOLDER_LEGACY=${PWD}/packages/legacy/build/
STYLEGUIDE_FOLDER_LEGACY=${PWD}/packages/legacy/styleguide.out/
STYLEGUIDE_FOLDER_LEGACY_EXAMPLE=${STYLEGUIDE_FOLDER_LEGACY}examples/
EXAMPLES_FOLDER=${PWD}/packages/examples/

BUILD_FOLDER_UI=${PWD}/packages/ui/build/
STORYBOOK_FOLDER_UI=${PWD}/packages/ui/storybook.out/
STORYBOOK_FOLDER_UI_EXAMPLE=${STORYBOOK_FOLDER_UI}static/examples/

yarn install --immutable
yarn test:ci
yarn styleguide:build
yarn storybook:build

echo 'Remove build folder to make sure the npm package only includes clean built components'
if [ -d ${BUILD_FOLDER_LEGACY} ]; then rm -rf ${BUILD_FOLDER_LEGACY}; fi 
if [ -d ${BUILD_FOLDER_UI} ]; then rm -rf ${BUILD_FOLDER_UI}; fi 

yarn build

echo 'Merge coverage reports'
if ! [ -d .nyc_output/ ]; then mkdir .nyc_output/; fi 
find ./packages -type f -name "coverage-final.json" -path "*/coverage/*" -not \( -path "*/node_modules/*" -prune \) \
| nl -bt -nln \
| sed -re 's!^([0-9]+) +\t(.+)$!\2 .nyc_output/coverage-final-\1.json!' \
| xargs -L 1 -t cp 
npx nyc report --reporter lcov

echo "Package the example app for legacy"
./scripts/packageDemo.sh legacy ${PWD}/packages/examples/legacy ${STYLEGUIDE_FOLDER_LEGACY_EXAMPLE} ${PWD}/packages/legacy/build 4000000 1700000

echo "Package the example app for ui"

./scripts/packageDemo.sh ui ${PWD}/packages/examples/ui ${STORYBOOK_FOLDER_UI_EXAMPLE} ${PWD}/packages/ui/build 1500000 1100000
