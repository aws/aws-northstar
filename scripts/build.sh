#!/bin/bash

# Build script is to be run from the root directory of the aws-northstar package

set -e

npm install
npm run test:all
npm run generate:attribution
npm run styleguide:build
npm run storybook:build
if [ -d "./build" ]; then rm -rf ./build; fi # make sure the npm package only includes clean built components
npm run build
if [ ! -d "./styleguide.out/examples" ]; then mkdir -p styleguide.out/examples ; fi
cd examples && tar -czvf ../styleguide.out/examples/create-react-app.tar.gz ./create-react-app && cd -
