#!/bin/bash
# Copies the test plugin to a Windows folder. A plugin worker cannot start from a \\wsl.localhost path.
set -e
SRC="$(cd "$(dirname "$0")/probe" && pwd)"
WIN=/mnt/c/Users/$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r')/orca-plugin-dev/vaporview-probe
mkdir -p "$WIN"
for d in src editor panel; do rm -rf "$WIN/$d"; cp -r "$SRC/$d" "$WIN/$d"; done
cp "$SRC/orca-plugin.json" "$SRC/tsconfig.json" "$WIN/"
echo "$WIN"
