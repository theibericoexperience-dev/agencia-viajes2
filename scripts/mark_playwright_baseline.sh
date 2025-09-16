#!/usr/bin/env bash
# Move artifacts/screenshots to baseline folder for future visual diffs.
mkdir -p tests/baseline
mv -v artifacts/*.png tests/baseline/ || true
