#!/usr/bin/env bash
docker build ../../ -f Dockerfile -t kachinga/allu-order
docker image push kachinga/allu-order
