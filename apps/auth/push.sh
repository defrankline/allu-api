#!/usr/bin/env bash
docker build ../../ -f Dockerfile -t kachinga/allu-auth
docker image push kachinga/allu-auth
