#!/usr/bin/env bash
echo "โโโโ ๐งช๏ธโ TEST: NODE_ENV=test db-migrate --env test up && jasmine-ts --config=jasmine.json && db-migrate db:drop test โโโโโโโ"
export NODE_ENV=test
yarn db-migrate db:create store_test
yarn db-migrate --env test up
yarn jasmine-ts --config=jasmine.json
yarn db-migrate db:drop store_test