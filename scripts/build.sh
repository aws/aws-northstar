#!/bin/bash

# Build script is to be run from the root directory of the aws-northstar package

set -ev

npm ci
npm run test:all
npm run generate:attribution
npm run styleguide:build
npm run storybook:build

echo 'Remove build folder to make sure the npm package only includes clean built components'
if [ -d "./build" ]; then rm -rf ./build; fi # 
npm run build
npm run build:esm

echo 'Copy license files'
cp ./LICENSE ./build/
cp ./NOTICE ./build/
cp ./LICENSE-THIRD-PARTY ./build/

echo 'Copy the examples to published examples folder'
if [ ! -d "./styleguide.out/examples" ]; then mkdir -p styleguide.out/examples ; fi
cd examples && tar -czvf ../styleguide.out/examples/create-react-app.tar.gz ./create-react-app && cd -
