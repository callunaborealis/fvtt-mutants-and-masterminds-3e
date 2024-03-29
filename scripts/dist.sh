#!/bin/bash -x

script_dir="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 && pwd -P)"

rm -rf $script_dir/../dist
mkdir $script_dir/../dist
# Ensure system.json is inside dist for release
cp $script_dir/../src/system.json $script_dir/../build/system.json
cp $script_dir/../src/system.json $script_dir/../dist/system.json
# Ensure template.json is inside the system.zip source
cp $script_dir/../src/template.json $script_dir/../build/template.json
# Ensure non TS and SCSS files inside the build
cp -vr $script_dir/../src/assets $script_dir/../build/assets
cp -vr $script_dir/../src/lang $script_dir/../build/lang
mv $script_dir/../build/system.css $script_dir/../build/styles/system.css
cp -vr $script_dir/../src/templates $script_dir/../build/templates
cd $script_dir/../build
zip -vr ../dist/system.zip . -x ".DS_Store"
