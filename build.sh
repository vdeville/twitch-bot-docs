#!/usr/bin/env bash

BASE_DIR=$(pwd)

echo "Remove old build"

rm -rf ${BASE_DIR}/docs/

echo "Going to src folder"

cd ${BASE_DIR}/src/

echo "Building from source"

java -jar ${BASE_DIR}/SkyDocs-v*.jar build > /dev/null

echo "Moving build folder outside src directory"

mv ${BASE_DIR}/src/build/ ${BASE_DIR}/docs/

cd ${BASE_DIR}

echo "Done!"



