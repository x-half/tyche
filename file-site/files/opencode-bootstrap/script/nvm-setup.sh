#!/usr/bin/env bash
echo ""
echo "=== OpenCode Install (via nvm + npm) ==="
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

if [ ! -d "$HOME/.nvm" ]; then
    echo "[1/3] Installing nvm..."
    bash "$SCRIPT_DIR/nvm-install.sh"
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "[2/3] Installing Node.js LTS..."
nvm install --lts 2>/dev/null || nvm install 22
nvm use --lts 2>/dev/null || nvm use 22

echo "[3/3] Installing OpenCode..."
npm install -g opencode-ai

echo ""
echo "Done! Type 'opencode' in terminal to start"
echo ""
