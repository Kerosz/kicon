#!/usr/bin/env bash
echo "┏━━━ 📦 Building Workspace ━━━━━━━━━━━━━━━━━━━"
yarn lerna run build --stream --concurrency 1