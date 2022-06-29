#!/usr/bin/env bash

set -x

echo "Piping Bichard logs to the tests"
sleep 10
while ! (docker-compose logs --no-color -f $1 | nc localhost 4000)
do
  echo "Retrying"
  sleep 1
done
