#!/usr/bin/env bash
echo "┏━━━ 🕵️‍️ LINT: eslint src --ext ts --fix ━━━━━━━"
yarn lerna run lint:fix --stream --concurrency 1