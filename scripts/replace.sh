#!/bin/bash -x

source common.sh

manifest_url="https://github.com/callunaborealis/fvtt-mutants-and-masterminds-3e/releases/latest/download/system.json"
gh release upload v0.1.0 $script_dir/../dist/system.json $script_dir/../dist/system.zip --clobber
echo $manifest_url
