script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
rm -rf $script_dir/../dist &&
  mkdir $script_dir/../dist &&
  # Ensure system.json is inside dist for release
  cp $script_dir/../src/system.json $script_dir/../dist/system.json &&
  # Ensure template.json is inside the system.zip source
  cp $script_dir/../src/template.json $script_dir/../build/template.json &&
  zip -vr $script_dir/../dist/system.zip $script_dir/../build -x ".DS_Store"
