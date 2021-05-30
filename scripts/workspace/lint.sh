#!/usr/bin/env bash
echo "┏━━━ 🕵️‍ LINT: eslint src --ext ts ━━━━━━━"
yarn lerna run lint --stream --concurrency 1