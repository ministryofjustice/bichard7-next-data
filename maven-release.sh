#!/bin/sh

# This is called by the semantic-release exec plugin during the `publish`
# stage, which is configured in the `release` section in package.json.

mvn compile exec:java && mvn compile versions:set deploy -P load-properties
