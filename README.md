# vaporview-orca

A waveform viewer for the [Orca](https://github.com/stablyai/orca) IDE. It is a port of the VS Code
extension [vaporview](https://github.com/Lramseyer/vaporview): the plugin runs the vaporview code
(parser, viewer, netlist tree) unchanged on a thin adapter for the Orca plugin API.

This project is not a part of vaporview or of Orca. All credit for the viewer goes to the vaporview
authors.

## Status

Prototype. It targets small waveforms, and it has known limits (see below).

| Area | State |
|---|---|
| VCD files | Works |
| FST and GHW files | The parser supports them, but they are not tested in the plugin |
| FSDB files | Not built |
| Tested with | Orca 1.4.259 on Windows, with the workspace in a WSL folder. Linux and macOS are not tested. |

What works: open a waveform, the netlist tree with search, add and remove signals, zoom and scroll,
markers, value formats, the context menus, the keyboard shortcuts, the vaporview settings, and the
restore of the view state. Some features are built but not yet tested, for example signal groups.

[docs/feature-parity.md](docs/feature-parity.md) lists each vaporview feature and its state in the
plugin.

## Requirements

- Orca 1.4.248 or later
- Node 20.18 or later
- Rust 1.90 or later, with the target `wasm32-unknown-unknown`
  (`rustup target add wasm32-unknown-unknown`)

## Build

```bash
git clone --recurse-submodules <url of this repository>
cd vaporview-orca
npm install
npm run build:vaporview      # one time: dependencies and the WASM parser of the submodule
npm run build                # makes the plugin in build/plugin
npm test                     # runs the vaporview core and the built worker in plain Node
```

If you cloned without `--recurse-submodules`, run `git submodule update --init`.

## Load the plugin in Orca

The plugin is `build/plugin`. Load it as a development plugin with the Orca CLI:

```bash
orca plugin dev load <path of build/plugin>
# The command prints the access that the plugin asks for, and an approval fingerprint.
orca plugin dev load <path of build/plugin> --approve <fingerprint>
```

The plugin has a worker that runs as a Node process with the access of your user account. Read
what Orca prints before you approve.

Orca on Windows with the source in WSL: a plugin worker cannot start from a `\\wsl.localhost`
path. `npm run sync` copies `build/plugin` to `C:\Users\<user>\orca-plugin-dev\vaporview`. Load
that folder.

## Use

1. Open the Vaporview panel in the right sidebar.
2. Select "Open Waveform" and select a waveform file. The file can be outside of the workspace.
3. The waveform opens in an editor tab, and the panel shows its netlist tree.
4. Click a variable two times, or use the "add" button of its row, to add it to the viewer.
5. Right-click a signal or a tree row for the menus.

The panel lists the open waveforms of the Orca workspace. Click a row to show that waveform. Use
the close button of the row to close it.

The plugin writes one session file for each waveform into the folder `.vaporview/` of the
workspace. The file holds the view state (signals, zoom, markers). The folder has its own
`.gitignore`, so git does not see it.

The settings are in the Orca settings page of the plugin. They are the vaporview settings, plus
"Netlist Icons".

## Known limits

Most limits come from gaps in the Orca plugin API. [docs/orca-pr-candidates.md](docs/orca-pr-candidates.md)
has a proposal for each gap.

- A waveform file does not open from the Orca file explorer. Use "Open Waveform" in the panel.
- The tab title is the name of the session file (`<name>.vaporview.json`), not of the waveform file.
- Orca destroys the page of a hidden tab. When the tab shows again, the viewer loads its signals again.
- After you close a waveform in the panel, its tab stays open and shows "This waveform is closed".
- Commands that need an input box or a file dialog are hidden (for example the fixed point value format).
- `Ctrl+0` (zoom to fit) goes to Orca. Use the button in the control bar.
- If you close two waveforms in one run, the plugin worker stops and Orca starts it again
  (a vaporview defect, decision D10 in [docs/feature-parity.md](docs/feature-parity.md)).
- Large waveforms are slow. The data path from the worker to the viewer has limits in Orca.

## Repository layout

| Path | Content |
|---|---|
| `orca-plugin.json` | The plugin manifest. The build adds the vaporview settings to it. |
| `src/adapter/` | The `vscode` module that the vaporview code imports, made for Orca |
| `src/worker/` | The plugin worker: runs the vaporview extension code and moves messages |
| `src/frame/` | The pages: the editor (the vaporview webview) and the sidebar panel |
| `src/common/` | Code for the worker and the pages |
| `scripts/` | Build, copy to Windows, icon update |
| `test/` | Tests that run in plain Node, and the test waveform |
| `vaporview/` | Upstream vaporview, as a git submodule |
| `assets/` | The font of the panel |
| `spike/` | A test plugin that measures Orca behavior |
| `docs/` | Design, feature state, Orca proposals, and measured Orca behavior |
| `build/` | Build output (not in git) |

## The vaporview version

`vaporview/` is a git submodule of upstream vaporview. Git records the exact commit of the
submodule in this repository, so each commit of this repository builds with one known vaporview
commit. Now: `7b63f84` (version 1.6.1 plus one commit).

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

After that, update the vaporview commit in [docs/architecture.md](docs/architecture.md) and
[docs/feature-parity.md](docs/feature-parity.md). A new vaporview version can use a part of the
VS Code API that the adapter does not have yet. The build or the tests show that.

The plugin uses the vaporview code with no change. A change that vaporview needs must be general
and backward compatible, so that upstream can merge it.

## Documents

- [docs/architecture.md](docs/architecture.md): what vaporview does, what the plugin does, and the Orca limit behind each decision.
- [docs/feature-parity.md](docs/feature-parity.md): each vaporview feature and its state in the plugin.
- [docs/orca-pr-candidates.md](docs/orca-pr-candidates.md): changes to propose to Orca, with cost and benefit.
- [docs/orca-test-results.md](docs/orca-test-results.md): measured Orca behavior (test plugin in `spike/probe`).

## License

GPL-3.0, the same as vaporview. See [LICENSE](LICENSE).

- The font in `assets/fonts` is Geist, under the SIL Open Font License
  (`assets/fonts/Geist-OFL.txt`).
- The icon shapes in `src/frame/lucide-icons.ts` are from the lucide icon set, under the ISC
  license.
