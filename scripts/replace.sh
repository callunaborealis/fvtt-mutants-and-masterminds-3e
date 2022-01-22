#!/bin/bash -x

script_dir="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 && pwd -P)"
version="v0.1.0"
manifest_url="https://github.com/callunaborealis/fvtt-mutants-and-masterminds-3e/releases/download/$version/system.json"
gh release upload $version $script_dir/../dist/system.json $script_dir/../dist/system.zip --clobber
echo $manifest_url
