#!/bin/bash

# Test the example app

set -ev

TEST_FOLDER=$PWD/temp
DEMO_FOLDER=$PWD/examples/create-react-app
BUILD_FOLDER=$PWD/build

if [ -d $TEST_FOLDER ]; then rm -rf $TEST_FOLDER; fi 

mkdir $TEST_FOLDER

cp -r $DEMO_FOLDER/ $TEST_FOLDER/

cd $TEST_FOLDER && yarn add $BUILD_FOLDER && yarn && yarn tsc

cd -

rm -rf $TEST_FOLDER
