#!/usr/bin/env bash
docker build ../../ -f Dockerfile -t kachinga/allu-inventory
docker image push kachinga/allu-inventory
