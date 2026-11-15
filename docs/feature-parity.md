# Feature parity with vaporview

What vaporview has, and what the Orca plugin has. Update this file with each change to the plugin.

- vaporview reference: submodule `vaporview/`, commit `7b63f84` (v1.6.1).
- PR numbers refer to [orca-pr-candidates.md](orca-pr-candidates.md). Design reasons are in [architecture.md](architecture.md).

## Status values

| Status | Meaning |
|---|---|
| Same | Works as in vaporview |
| Tweaked | Works, but differently. The reason and the Orca PR that removes the difference are in the row. |
| Blocked | Not in the plugin, because Orca has no API for it. The row names the Orca PR. |
| Deferred | Not in the plugin in this phase, by decision. No Orca limit. |

The column "Built" is `no` until the code exists and is tested. At this time no viewer code exists,
so each status is the plan.

## Open, close, and tabs

| Feature | vaporview | Status | Built | Reason | Orca PR |
|---|---|---|---|---|---|
| Open from the file explorer | Click a `.vcd`, `.fst`, `.ghw`, `.fsdb` file | Blocked | no | A custom editor gets no path, and Orca reads the file first (64 MiB limit) | PR-1 |
| Open with a command | "Open File with VaporView" | Tweaked | no | "Open Waveform" is in the panel, not in the palette. A palette command gets no arguments. | PR-2, PR-7 |
| Select the file | VS Code file dialog | Tweaked | no | File browser in the panel, because a plugin has no open-file dialog | PR-2 |
| Tab title | The waveform file name, for example `tpu.vcd` | Tweaked | no | The tab shows the session file name, for example `tpu.vcd.vaporview.json`, with the plugin icon | PR-1 |
| More than one waveform open | One tab for each waveform | Same | no | | |
| Waveform list | None (sv-pathfinder has it) | Tweaked | no | New list in the panel, one list for each Orca workspace | |
| Close a waveform | Close the tab | Tweaked | no | Close in the panel. The tab stays and shows "closed". | PR-4, PR-3 |
| Keep a hidden tab alive | Yes (`retainContextWhenHidden`) | Blocked | no | Orca destroys the page of a hidden tab. Each return loads the signal data again. | PR-5, PR-6 |
| Reload file | "Reload File", auto reload check box | Same | no | | |
| Restore after restart | VS Code restores the tab and its state | Same | no | Orca restores the tab, and the session file gives the state | |

## File formats

| Feature | vaporview | Status | Built | Reason | Orca PR |
|---|---|---|---|---|---|
| VCD, FST, GHW | `wellen` in WASM | Same | no | | |
| FSDB | Native addon with Synopsys libraries | Deferred | no | Decision on remote access first | |
| Remote viewer (Surfer server) | "Open Remote Viewer" | Deferred | no | Decision on remote access first. Also needs an input prompt. | PR-7 |

## Viewer

| Feature | vaporview | Status | Built | Reason | Orca PR |
|---|---|---|---|---|---|
| Waveform drawing, zoom, scroll, ruler | Webview canvas | Same | no | Same code | |
| Control bar (zoom, edge steps, time field, value search, auto reload) | Webview HTML | Same | no | Same code | |
| Marker and alt marker | Yes | Same | no | | |
| Signal load speed | Binary messages to the webview | Tweaked | no | Signal data goes as base64 text in JSON, 1 MiB for each answer, 120 messages in 10 s. Slow for large signals. | PR-6 |
| Row select, multi select, reorder | Yes | Same | no | | |
| Groups (new, from selection, rename, ungroup, delete) | Yes | Same | no | | |
| Separators | Yes | Same | no | | |
| Value formats: binary, decimal, signed, hex, octal, base64, float, BFloat16, TensorFloat32, ASCII, epoch time, enum | Context menu | Same | no | The menu is HTML in the page | |
| Value formats: fixed point, signed fixed point | Asks for the offset in an input box | Blocked | no | Orca has no input prompt for a plugin | PR-7 |
| Render type: multi bit, linear, stepped, signed variants | Context menu | Same | no | | |
| Edge guides, colors, row height, name type, vertical scale | Context menu | Same | no | | |
| Create signals from: bits, nibbles, bytes, words, double words, quad words | Context menu | Same | no | | |
| Create signals from: custom length | Asks for the length in an input box | Blocked | no | No input prompt | PR-7 |
| New signal from bit range | Asks for the range in an input box | Blocked | no | No input prompt | PR-7 |
| Time unit: s, ms, µs, ns, ps, fs | Menu items | Same | no | | |
| Time unit: quick pick | VS Code quick pick | Blocked | no | No quick pick. The menu items give the same function. | PR-7 |
| Ruler lines, ruler increment "Auto" | Menu items | Same | no | | |
| Ruler increment "Custom" | Asks for the value in an input box | Blocked | no | No input prompt | PR-7 |
| Shade or outline bit vectors, animations, scrolling mode | Menu items | Same | no | | |
| Copy name, copy value at marker | Menu items | Same | no | | |
| WaveDrom copy and clock settings | Menu items | Same | no | | |
| Context menu of the viewer (36 items) | Native VS Code menu | Tweaked | no | HTML menu in the page, from the same item table. Orca has no menu contribution. | |
| Keybindings (17) | VS Code keybindings, active when the viewer has focus | Tweaked | no | Key events in the page. Orca keybindings are `global` or `workspace` only. Plain keys are tested. Keys with Ctrl or Alt are not yet tested. | |
| Colors follow the theme | VS Code theme variables | Tweaked | no | `--orca-*` variables. Orca gives 20 variables. | |

## Netlist

| Feature | vaporview | Status | Built | Reason | Orca PR |
|---|---|---|---|---|---|
| Netlist tree | VS Code tree view | Tweaked | no | HTML tree in the panel. The Orca `Tree` component stops at 2000 items. | |
| Add, remove, add all in scope (shallow, recursive), remove all in scope | Tree menu | Same | no | | |
| Show in viewer, show in netlist view | Yes | Same | no | | |
| Search netlist, search scope | VS Code tree search | Tweaked | no | Search field in the panel | |
| Add variable by name, add scope by name | Asks for the name in an input box | Blocked | no | No input prompt | PR-7 |
| Context menu of the tree (14 items) | Native VS Code menu | Tweaked | no | HTML menu in the panel | |
| Sort netlist | Setting | Same | no | | |

## Session, settings, status

| Feature | vaporview | Status | Built | Reason | Orca PR |
|---|---|---|---|---|---|
| Automatic view state | VS Code webview state | Tweaked | no | Session file in `.vaporview/`, written by the worker | |
| Save session, load session | Save and open dialogs | Tweaked | no | Later phase. "Save" can use `files.saveAs`. "Load" needs a file selection. | PR-2 |
| Settings (33) | VS Code settings | Same | no | Orca settings. Scalar types only. | |
| "More Settings", "Show Readme" | Open VS Code pages | Tweaked | no | Open the Orca settings page of the plugin, open the readme link | |
| Status bar: marker time, delta time, selected signal | 3 items | Same | no | Orca `statusBarItems` | |

## Integration

| Feature | vaporview | Status | Built | Reason | Orca PR |
|---|---|---|---|---|---|
| Terminal links to instance paths | Yes | Deferred | no | Marginal in this phase | |
| Drag and drop from the tree to the viewer | Yes | Deferred | no | Marginal in this phase. Two different pages in Orca. | |
| WCP server | Yes | Deferred | no | | |
| API for other extensions (`waveformViewer.*` commands and events) | Yes | Deferred | no | Orca plugins cannot call each other | |
