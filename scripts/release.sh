manifest_url="https://github.com/callunaborealis/fvtt-mutants-and-masterminds-3e/releases/latest/download/system.json"
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
gh release create v0.1.0 $script_dir/../dist/system.json $script_dir/../dist/system.zip \
  --notes "Link to manifest URL: $manifest_url" &&
  echo $manifest_url
