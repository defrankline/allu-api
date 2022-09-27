#!/usr/bin/env bash
docker build ../../ -f Dockerfile -t kachinga/allu-billing
docker image push kachinga/allu-billing
