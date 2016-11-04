#!/usr/bin/env bash

if [ ! -f .env ];
then
  echo "[Setup Script] .env file is not found. Please copy the .env.example file and fill in the details."
  echo "[Setup Script] Exiting..."
  exit 1
fi

# Start mysql container
echo "[Setup Script] Starting mysql container..."
docker-compose up -d mysql

# Install dependencies
echo "[Setup Script] Installing NPM dependencies..."
docker-compose run --rm web npm i

# Install dependencies
# echo "[Setup Script] Installing Elm dependencies..."
# docker-compose run --rm web elm-package install -y

# Migrate database
echo "[Setup Script] Migrating database..."
docker-compose run --rm web ./bin/migrate.sh

migrate_exit_code=$?

echo
if [ $migrate_exit_code -ne 0 ];
then
  echo "[Setup Script] Setup failed."
  echo
  exit 1
else
  echo "[Setup Script] Setup done! To start developing, run: make start"
  echo
fi
