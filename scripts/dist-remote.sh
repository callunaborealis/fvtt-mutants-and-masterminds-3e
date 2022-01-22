pnpm install
rm -rf dist
mkdir build dist
# Ensure system.json is inside dist for release
cp src/system.json build/system.json
cp src/system.json dist/system.json
# Ensure template.json is inside the system.zip source
cp src/template.json build/template.json
# Ensure non TS and SCSS files inside the build
cp -vr src/assets build/assets
cp -vr src/lang build/lang
mv build/system.css build/styles/system.css
cp -vr src/templates build/templates
cd build
zip -vr ../dist/system.zip . -x ".DS_Store"