# AGENTS.md

Rules for a coding agent (and for a person) that changes this repository.

Read first: [docs/development.md](docs/development.md) (build, test, layout, tools) and
[docs/architecture.md](docs/architecture.md) (design and decisions).

## What this project is

A port of the VS Code extension vaporview to an Orca plugin. The vaporview code in the submodule
`vaporview/` runs unchanged on three adapters: `src/adapter/vscode.ts` (the `vscode` module),
`src/frame/editor.ts` (the webview host), and `src/frame/panel.ts` (the tree view).

## Rules

1. **Reuse vaporview.** Do not copy or rewrite vaporview logic. Give the vaporview code the API it
   expects, in the adapter.
2. **Do not edit `vaporview/`.** A change that vaporview needs must be general and backward
   compatible, and it goes upstream first.
3. **No heuristics.** No timer or guess decides behavior. If Orca gives no event for something,
   record the gap as a PR candidate. Do not build on unproven Orca behavior.
4. **Measure Orca, do not assume.** Read the Orca source or use the probe in `tools/orca-probe/`.
   Say what is measured and what is a guess.
5. **Keep a workaround small and easy to remove.** Each one names the Orca gap behind it
   (`docs/orca-pr-candidates.md`).
6. **Worker answers are strict JSON.** A property with the value `undefined` makes Orca refuse the
   answer. `test/hub.mjs` checks this.
7. **Do not commit a private waveform file,** its name, or its content. Use `testdata/`, which git
   ignores.
8. **Say "waveform",** and "waveform file" for the file on disk, in code names, UI text, and
   documents.

## Before a commit

- `npm run build && npm test` passes.
- `docs/feature-parity.md` is current for the change.
- `README.md` stays user-facing. Technical detail goes into `docs/`.

## Commands

```bash
npm run build:vaporview   # one time, and after a change of the submodule commit
npm run build
npm test
npm run sync              # Orca on Windows with the source in WSL
```
