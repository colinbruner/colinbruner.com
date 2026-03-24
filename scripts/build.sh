#!/usr/bin/env bash
set -euo pipefail

# SvelteKit build script
echo "[Info]: Building SvelteKit site..."
npm ci
npm run build
echo "[Info]: Build complete. Output in build/"