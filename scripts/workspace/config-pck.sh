#!/usr/bin/env bash
echo "┏━━━ 🗂 PCK CONFIG: Installing dependencies ━━━━━━━━━━━━━━"
yarn
echo "┏━━━ 📝 PCK CONFIG: Generating .env files ━━━━━━━━━━━━━━━━"
TARTARUS_ENV_EXAMPLE_EXISTS=$(test -f apps/tartarus/.env.example)
if [ $TARTARUS_ENV_EXAMPLE_EXISTS ]
then
  echo "Env example file DETECTED"
  cp apps/tartarus/.env.example apps/tartarus/.env.development
  cp apps/tartarus/.env.example apps/tartarus/.env.test
  echo "Generated .env files for development and testing"
fi