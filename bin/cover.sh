#!/usr/bin/env bash

# Enable getting $MYSQL_HOSTNAME variable
source .env

export NODE_ENV=test

./bin/wait-for-it.sh $MYSQL_HOSTNAME:3306 --strict -t 100 -- npm run createDb

npm run cover

test_exit_code=$?

npm run destroyDb

# Pass the exit code to docker-compose
exit $test_exit_code
