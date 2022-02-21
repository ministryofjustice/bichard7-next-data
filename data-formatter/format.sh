#!/usr/bin/env bash
docker build --tag data-formatter -f ./data-formatter/Dockerfile  ./data-formatter

FILES=$(find ./input-data/offence-code/*.json)

for FILE in $FILES
do
  echo "Linting $FILE"
  cat $FILE | docker run -i data-formatter -s > $FILE.2
  mv $FILE.2 $FILE
done