#!/usr/bin/env bash
docker build ../../ -f Dockerfile -t kachinga/allu-share-service
docker image push kachinga/allu-share-service
