#!/bin/bash
# Copies build/plugin to a Windows folder. An Orca plugin worker cannot start from a
# \\wsl.localhost path, so Orca on Windows must load the plugin from a Windows drive.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
USERNAME_WIN="$(cmd.exe /c "echo %USERNAME%" 2>/dev/null | tr -d '\r')"
WIN="/mnt/c/Users/$USERNAME_WIN/orca-plugin-dev/vaporview"
rm -rf "$WIN"
mkdir -p "$WIN"
cp -r "$ROOT/build/plugin/." "$WIN/"
echo "C:\\Users\\$USERNAME_WIN\\orca-plugin-dev\\vaporview"
