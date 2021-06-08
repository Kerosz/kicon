#!/usr/bin/env bash
echo "┏━━━ 📝 PCK CONFIG: Generating .env files ━━━━━━━━━━━━━━━━"
APP_ENV_FILE=apps/tartarus/.env.example
APP_DB_FILE=apps/tartarus/database.json.example

if [ -f "$APP_ENV_FILE" ]
then
  echo "Env example file DETECTED"
  cp apps/tartarus/.env.example apps/tartarus/.env.development
  cp apps/tartarus/.env.example apps/tartarus/.env.test
  echo "Generated .env files for development and testing"
fi

if [ -f "$APP_DB_FILE" ]
then
  echo "DB example file DETECTED"
  cp apps/tartarus/database.json.example apps/tartarus/database.json
  echo "Generated db-migrate configuration"
fi