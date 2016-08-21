#!/usr/bin/env bash

# Enable getting $MYSQL_HOSTNAME variable
source .env

./bin/wait-for-it.sh $MYSQL_HOSTNAME:3306 --strict -t 100 -- nodemon ./boot.js
