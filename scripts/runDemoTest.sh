#!/bin/bash

# Test the example app

set -e

TEST_FOLDER=/tmp/northstar_test_$(date +%s)
DEMO_ARCHIVE=$1
BUILD_FOLDER=$2

BUNDLE_SIZE_THRESHOLD=$3
MAIN_BUNDLE_SIZE_THRESHOLD=$4

echo "TEST_FOLDER=${TEST_FOLDER}"
echo "DEMO_ARCHIVE=${DEMO_ARCHIVE}"
echo "BUILD_FOLDER=${BUILD_FOLDER}"
echo "BUNDLE_SIZE_THRESHOLD=${BUNDLE_SIZE_THRESHOLD}"
echo "MAIN_BUNDLE_SIZE_THRESHOLD=${MAIN_BUNDLE_SIZE_THRESHOLD}"

if [ -d $TEST_FOLDER ]; then rm -rf $TEST_FOLDER; fi
mkdir -p $TEST_FOLDER

tar -zxf ${DEMO_ARCHIVE} --directory ${TEST_FOLDER}

pushd $TEST_FOLDER 

echo "Building the project"
yarn add file://$BUILD_FOLDER
yarn
yarn build

echo "Creating source map"
npx source-map-explorer build/static/js/*.js --json result.json

echo "File bundle size:"
cat result.json | jq ".results[] | .bundleName,.totalBytes" 

FAILED_FILE_COUNT=$(cat result.json | jq ".results[] | select(.totalBytes>${BUNDLE_SIZE_THRESHOLD}) | .bundleName" -r | wc -l | awk '{$1=$1;print}')

FAILED_MAIN_FILE_COUNT=$(cat result.json | jq ".results | .[] | select(.bundleName | contains(\"main\")) | select(.totalBytes>${MAIN_BUNDLE_SIZE_THRESHOLD}) | .bundleName" -r | wc -l | awk '{$1=$1;print}')

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
