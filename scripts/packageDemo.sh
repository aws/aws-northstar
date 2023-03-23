#!/bin/bash

# Package demo app

set -e

DEMO_TYPE=$1
DEMO_FOLDER=$2
EXAMPLE_FOLDER=$3
BUILD_FOLDER=$4
BUNDLE_SIZE_THRESHOLD=$5
MAIN_BUNDLE_SIZE_THRESHOLD=$6
TAR_PATH=${EXAMPLE_FOLDER}create-react-app.tar.gz
TMP_FOLDER=/tmp/northstar_demo_${DEMO_TYPE}_$(date +%s)

echo "DEMO_TYPE=${DEMO_TYPE}"
echo "DEMO_FOLDER=${DEMO_FOLDER}"
echo "EXAMPLE_FOLDER=${EXAMPLE_FOLDER}"
echo "BUILD_FOLDER=${BUILD_FOLDER}"
echo "BUNDLE_SIZE_THRESHOLD=${BUNDLE_SIZE_THRESHOLD}"
echo "MAIN_BUNDLE_SIZE_THRESHOLD=${MAIN_BUNDLE_SIZE_THRESHOLD}"
echo "TAR_PATH=${TAR_PATH}"
echo "TMP_FOLDER=${TMP_FOLDER}"

if [ -d $TMP_FOLDER ]; then rm -rf $TMP_FOLDER; fi
mkdir -p $TMP_FOLDER

pushd $TMP_FOLDER
rsync  -rv --exclude="node_modules/" --exclude="build/" --include="*/" $DEMO_FOLDER/ $TMP_FOLDER/

echo "Creating example folder if not exist"
if [ ! -d ${EXAMPLE_FOLDER} ]; then mkdir -p ${EXAMPLE_FOLDER}; fi 

echo "Packing demo app" 
tar -czvf $TAR_PATH .

popd

rm -rf $TMP_FOLDER

echo "Running Sanity check"
./scripts/runDemoTest.sh ${TAR_PATH} ${BUILD_FOLDER} ${BUNDLE_SIZE_THRESHOLD} ${MAIN_BUNDLE_SIZE_THRESHOLD}
