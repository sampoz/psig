#! /bin/bash
# Small test script for PSIG
echo "removing images"
rm -rf images
echo "removing thumbnails"
rm -rf thumbnails
cp testImages/* ./
source initscript.sh