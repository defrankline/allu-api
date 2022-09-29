#!/usr/bin/env bash
docker build ../../ -f Dockerfile -t kachinga/allu-stock
docker image push kachinga/allu-stock
