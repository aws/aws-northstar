#!/bin/bash

# Test the example app

set -ev

TEST_FOLDER=/tmp/$(date +%s)
DEMO_FOLDER=$PWD/examples/create-react-app
BUILD_FOLDER=$PWD/build
BUNDLE_SIZE_THRESHOLD=7200000

if [ -d $TEST_FOLDER ]; then rm -rf $TEST_FOLDER; fi 

mkdir -p $TEST_FOLDER

cp -r $DEMO_FOLDER/ $TEST_FOLDER/

cd $TEST_FOLDER 

yarn add $BUILD_FOLDER
yarn
yarn build

npx source-map-explorer build/static/js/*.js --json result.json

FAILED_FILE_COUNT=$(cat result.json | jq ".results[] | select(.totalBytes>${BUNDLE_SIZE_THRESHOLD}) | .bundleName" -r | wc -l | awk '{$1=$1;print}')

cd -

if [ ${FAILED_FILE_COUNT} -gt 0 ] ; then
    echo "FAILED: One or more file bundle size exceeds threshold ${BUNDLE_SIZE_THRESHOLD}"
    exit 1
else
    echo "PASS: All file bundle size are below threshold ${BUNDLE_SIZE_THRESHOLD}"
fi

rm -rf $TEST_FOLDER
