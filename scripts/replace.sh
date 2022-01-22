#!/bin/bash -x

script_dir="echo $(cd -- "$(dirname "$0")" >/dev/null 2>&1 && pwd -P)"

manifest_url="https://github.com/callunaborealis/fvtt-mutants-and-masterminds-3e/releases/latest/download/system.json"
gh release upload v0.1.0 $script_dir/../dist/system.json $script_dir/../dist/system.zip --clobber
echo $manifest_url
