# Development guide

How to build, test, and change the plugin. The design is in [architecture.md](architecture.md).

## Requirements

- Orca 1.4.248 or later
- Node 20.18 or later
- Rust 1.90 or later, with the target `wasm32-unknown-unknown`
  (`rustup target add wasm32-unknown-unknown`)

## Build and test

```bash
git clone --recurse-submodules <url of this repository>
cd vaporview-orca
npm install
npm run build:vaporview      # one time: dependencies and the WASM parser of the submodule
npm run build                # makes the plugin in build/plugin
npm test                     # runs the vaporview core and the built worker in plain Node
```

If you cloned without `--recurse-submodules`, run `git submodule update --init`.

`npm test` needs no Orca. It has three parts:

| Script | What it runs |
|---|---|
| `test:when` | The evaluator for VS Code `when` clauses |
| `test:headless` | The vaporview extension code on the adapter, with a VCD file and an FST file |
| `test:hub` | The built worker with a stand-in for the Orca API, with a VCD file and an FST file |

`test/two-close.mjs` is not a part of `npm test`. It shows a vaporview defect (D10 in
[feature-parity.md](feature-parity.md)) and fails until vaporview has the fix.

## Load the plugin in Orca

The plugin is the folder `build/plugin`. Load it as a development plugin with the Orca CLI:

```bash
orca plugin dev load <path of build/plugin>
# The command prints the access that the plugin asks for, and an approval fingerprint.
orca plugin dev load <path of build/plugin> --approve <fingerprint>
```

The plugin has a worker that runs as a Node process with the access of your user account. Read what
Orca prints before you approve.

After a new build, Orca loads the changed files of a development plugin again. Useful commands:

```bash
orca plugin logs local.vaporview         # the log of the worker and of the pages
orca plugin list --json                  # the state of the worker and its restart count
orca plugin restart local.vaporview      # start the worker again
```

### Orca on Windows with the source in WSL

A plugin worker cannot start from a `\\wsl.localhost` path. `npm run sync` copies `build/plugin` to
`C:\Users\<user>\orca-plugin-dev\vaporview`. Load that folder. Run `npm run sync` after each build.

From WSL, call the Windows CLI:
`/mnt/c/Users/<user>/AppData/Local/Programs/orca/resources/bin/orca.exe`.

## Repository layout

| Path | Content |
|---|---|
| `orca-plugin.json` | The plugin manifest. The build adds the vaporview settings to it. |
| `src/adapter/` | The `vscode` module that the vaporview code imports, made for Orca |
| `src/worker/` | The plugin worker: runs the vaporview extension code and moves messages |
| `src/frame/` | The pages: the editor (the vaporview webview) and the sidebar panel |
| `src/common/` | Code for the worker and the pages |
| `scripts/` | Build, copy to Windows, icon update |
| `test/` | Tests that run in plain Node, and the test waveforms |
| `vaporview/` | Upstream vaporview, as a git submodule |
| `assets/` | The font of the panel |
| `tools/orca-probe/` | A test plugin that measures Orca behavior |
| `docs/` | Design, feature state, Orca proposals, and measured Orca behavior |
| `docs/drafts/` | Drafts of issues and PRs for other projects, not yet filed |
| `docs/images/` | Pictures for the README |
| `build/` | Build output (not in git) |
| `testdata/` | Your own waveform files (not in git) |

Do not commit a waveform file that is not yours to publish. Put such files in `testdata/`.

## The vaporview version

`vaporview/` is a git submodule of upstream vaporview. Git records the exact commit of the
submodule in the tree of this repository (`git ls-tree HEAD vaporview`), so each commit of this
repository builds with one known vaporview commit. `.gitmodules` holds only the URL.
Now: `7b63f84` (version 1.6.1 plus one commit).

To move to a newer vaporview:

```bash
cd vaporview
git fetch
git checkout <tag or commit>
cd ..
npm run build:vaporview
npm run build && npm test
git add vaporview
git commit
```

After that, update the vaporview commit in [architecture.md](architecture.md) and
[feature-parity.md](feature-parity.md). A new vaporview version can use a part of the VS Code API
that the adapter does not have yet. The build or the tests show that.

The plugin uses the vaporview code with no change. A change that vaporview needs must be general
and backward compatible, so that upstream can merge it.

## Development requests

The worker has requests that help with a test from the command line
(`orca plugin dev request local.vaporview <name> --data '<json>'`):

| Request | Use |
|---|---|
| `debug.snapshot` | A picture of the viewer canvas and a text summary of what it shows |
| `debug.input` | Sends pointer and key events to the viewer page |
| `debug.settings` | Reads or sets a plugin setting |
| `debug.panelMenu` | Opens the context menu of a panel row |

## The Orca probe (`tools/orca-probe/`)

The probe is a second, small Orca plugin. It does not show waveforms. It measures how Orca treats a
plugin: when Orca starts and destroys a page, what a page and a worker know about tabs and
workspaces, how fast data moves from the worker to a page, and what Orca checks in an answer.

The results are in [orca-test-results.md](orca-test-results.md). The design of the plugin depends
on them.

### When to use it

- **After an Orca update.** Run the measurements again and compare with `orca-test-results.md`.
  A changed result can break a design decision, or it can make a workaround unnecessary.
- **Before you build a workaround.** Measure the Orca behavior first. Do not build on a guess.
- **Before you propose a change to Orca.** A measured result is the evidence for the proposal.
- **When Orca releases a change that we asked for.** Confirm it with the probe, then remove the
  workaround in the plugin.

Do not put probe code into the plugin. If a new question needs a new measurement, add a request to
the probe.

### How to use it

```bash
tools/orca-probe/sync.sh      # Windows with WSL only: copy to C:\Users\<user>\orca-plugin-dev\vaporview-probe
orca plugin dev load <folder of the probe>                          # prints an approval fingerprint
orca plugin dev load <folder of the probe> --approve <fingerprint>
orca plugin dev request local.vaporview-probe state --json           # what the worker knows now
orca plugin logs local.vaporview-probe --json                        # each event that the probe saw
orca plugin dev unload <folder of the probe>                         # when done
```

On Linux and macOS the folder of the probe is `tools/orca-probe` itself.

- The files in `tools/orca-probe/samples/` open in the editor of the probe. Open one in Orca to
  measure the life of an editor page (start, hide, show, close).
- The requests of the worker are in `tools/orca-probe/src/worker.ts`: `state`, `workspaces`, `open`,
  `write`, `ping`, `fsbench`, `wasm`, `pull`, and more.
- Write each new result into `orca-test-results.md`, with the Orca version.
- Unload the probe when you are done. It is a development tool, and its worker runs with the
  access of your user account.

## Known limits

The limits that a person meets most. [feature-parity.md](feature-parity.md) has the full list, and
[orca-pr-candidates.md](orca-pr-candidates.md) has the proposal for each Orca gap.

| Limit | Cause |
|---|---|
| A waveform file does not open from the Orca file explorer | A custom editor gets file content, not a path (PR-1) |
| The tab title is the session file name (`<name>.vaporview.json`) | The tab shows the file that the editor opened (PR-1) |
| The viewer loads its signals again when its tab shows again | Orca destroys the page of a hidden tab (PR-5) |
| The tab stays open after a waveform closes in the panel | A plugin cannot close a tab (PR-4) |
| Commands that need an input box or a file dialog are hidden | Orca has no input prompt or file dialog for a plugin (PR-2, PR-7) |
| `Ctrl+0` (zoom to fit) goes to Orca | Orca handles its shortcuts before the page (PR-10) |
| The worker restarts when two waveforms close in one run | A vaporview defect (D10 in `feature-parity.md`) |
| Large waveforms are slow | The data path from the worker to a page is JSON text with a message limit (PR-6) |

## Files of other projects

- `vaporview/`: GPL-3.0, the license of this project.
- `assets/fonts/Geist-Variable.woff2`: the Geist font, under the SIL Open Font License
  (`assets/fonts/Geist-OFL.txt`).
- `src/frame/lucide-icons.ts`: icon shapes of the lucide icon set, under the ISC license. The
  header of the file has the notice. `scripts/update-icons.mjs` makes the file.
- The build copies the icon font of VS Code (`@vscode/codicons`) from the submodule into
  `build/plugin`.

## Documents to keep current

| Document | Update it when |
|---|---|
| [feature-parity.md](feature-parity.md) | A feature is built, changed, tested, or blocked. Each decision goes in "Open decisions". |
| [orca-pr-candidates.md](orca-pr-candidates.md) | A new gap in the Orca plugin API shows, or Orca closes one |
| [orca-test-results.md](orca-test-results.md) | A measurement of Orca behavior is new or changed |
| [architecture.md](architecture.md) | A design decision changes |
| `README.md` | Something changes that a person must know to install or use the plugin. Keep it short: no feature list, no technical detail, no limit that is not a difference from vaporview for the person. |
