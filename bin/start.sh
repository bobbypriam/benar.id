#!/usr/bin/env bash

# Enable getting $MYSQL_HOSTNAME variable
source .env

./node_modules/.bin/webpack --progress --colors --watch &

./bin/wait-for-it.sh $MYSQL_HOSTNAME:3306 --strict -t 100 -- nodemon --ignore client/ ./boot.js
