#!/bin/bash

# Test the example app

set -e

TEST_FOLDER=/tmp/$(date +%s)
DEMO_FOLDER=$PWD/examples/create-react-app
BUILD_FOLDER=$PWD/build
BUNDLE_SIZE_THRESHOLD=7200000

if [ -d $TEST_FOLDER ]; then rm -rf $TEST_FOLDER; fi 

echo "TEST_FOLDER=${TEST_FOLDER}"
mkdir -p $TEST_FOLDER

cp -r $DEMO_FOLDER/ $TEST_FOLDER/

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

popd

echo "FAILED_FILE_COUNT=${FAILED_FILE_COUNT}"

if [ ${FAILED_FILE_COUNT} -gt 0 ] ; then
    echo "FAILED: One or more file bundle size exceeds threshold ${BUNDLE_SIZE_THRESHOLD}"
    exit 1
else
    echo "PASS: All file bundle size are below threshold ${BUNDLE_SIZE_THRESHOLD}"
fi

rm -rf $TEST_FOLDER
