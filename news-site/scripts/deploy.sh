#!/bin/bash
set -e

SITE_DIR="/home/tyche/news-site"
PM2_BIN="/root/.nvm/versions/node/v22.22.2/bin/node /root/.nvm/versions/node/v22.22.2/lib/node_modules/pm2/bin/pm2"

echo "=== Building ==="
cd "$SITE_DIR" && npm run build

echo "=== Restarting PM2 ==="
$PM2_BIN restart news-site --update-env

echo "=== Saving PM2 state ==="
$PM2_BIN save

echo "=== Done ==="
$PM2_BIN list
