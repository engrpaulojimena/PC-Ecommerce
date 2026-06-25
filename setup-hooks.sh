#!/bin/sh
# Run this once after cloning: sh setup-hooks.sh
git config core.hooksPath .githooks
echo "✅  Git hooks activated. The pre-commit hook will now guard globals.css."
