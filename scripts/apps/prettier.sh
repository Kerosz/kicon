#!/usr/bin/env bash
echo "┏━━━ 🦋 Prettify check ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
yarn prettier --config ../.prettierrc --check 'src/**/*.ts'