# Mutants and Masterminds (3e) Foundry VTTRPG

Currently not ready for use.

## For GMs

Paste this link to the Manifest URL: <https://github.com/callunaborealis/fvtt-mutants-and-masterminds-3e/releases/latest/download/system.json>.


## For devs

### Build process

```sh
pnpm install
# Compiles your source code into the essential release files (Game files `system.zip`, and Manifest file `system.json`).
pnpm run build
# Install GitHub CLI then log in
# Add the release tag inside the script, then run the below
pnpm run release
# Update the release distribution for the same tag
pnpm run update
```

```txt
`src` (Source code) -> `build` (Transpiled code) -> `dist` (Essential files prepared for release)
```
