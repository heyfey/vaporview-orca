# Feature parity with vaporview

Each feature of vaporview, and its state in the Orca plugin. Update this file with each change to the plugin.

- vaporview reference: submodule `vaporview/`, commit `7b63f84` (v1.6.1).
- PR numbers refer to [orca-pr-candidates.md](orca-pr-candidates.md). Design reasons are in [architecture.md](architecture.md).
- Last update: 2026-11-15, Orca 1.4.259 on Windows, waveform file `tpu.vcd` in a WSL folder.

## Columns

| Column | Values |
|---|---|
| Plugin | **Same**: works as in vaporview. **Tweaked**: works, but differently. **Blocked**: Orca has no API for it. **Deferred**: not in this phase, by decision. **Decision**: needs a decision, see "Open decisions". |
| Built | **yes** or **no**. `yes` means that the code is in the plugin. |
| Tested | **Orca**: seen to work in Orca. **Node**: an automatic test without Orca passes (`npm test`). **no**: not tested. |

"Orca (events)" means that the test sent pointer and key events to the page with the development
request `debug.input`, and read the result with `debug.snapshot`. A person did not use the mouse.

## Open, close, and tabs

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| Open from the file explorer | Click a `.vcd`, `.fst`, `.ghw`, `.fsdb` file | Blocked | no | | A custom editor gets no path, and Orca reads the file first (64 MiB limit). PR-1 |
| Open with a command | "Open File with VaporView" | Tweaked | yes | Orca | "Open Waveform" button in the panel. A palette command gets no arguments. PR-2 |
| Select the file | VS Code file dialog | Tweaked | yes | Node | File browser in the panel, with a path field. Not yet used by hand. PR-2 |
| Tab title | The waveform file name, `tpu.vcd` | Tweaked | yes | no | The tab shows the session file name, `tpu.vcd.vaporview.json`, with the plugin icon. PR-1 |
| More than one waveform open | One tab for each | Same | yes | no | |
| Waveform list | None (sv-pathfinder has it) | Tweaked | yes | Orca | New list in the panel, one list for each Orca workspace |
| Select a waveform | Click its tab | Tweaked | yes | Node | A click on a list row shows the tree and the tab. A tab that shows selects its row. |
| Close a waveform | Close the tab | Tweaked | yes | Node | Close button on the list row. The tab stays and shows "This waveform is closed" with an "Open again" button. PR-4 |
| Keep a hidden tab alive | Yes | Blocked | no | | Orca destroys the page of a hidden tab. Each return loads the signal data again. PR-5 |
| Restore after a restart | VS Code restores the tab and its state | Same | yes | Orca | Tested with a restart of the plugin worker, not of Orca |
| Reload file | "Reload File" command | Same | yes | no | In the tree menu. The button in the editor title is not possible (no such contribution in Orca). |
| Auto reload | Check box in the control bar | Same | yes | no | For a file on a `\\wsl.localhost` path the plugin reads the change time one time each second, because Node gets no change events there |
| Same file in two workspaces | Not applicable | Tweaked | yes | no | Planned: one tab for each workspace. Not tested. |

## File formats

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| VCD | `wellen` in WASM | Same | yes | Orca | |
| FST | `wellen` in WASM | Same | yes | no | No FST test file is available |
| GHW | `wellen` in WASM | Same | yes | no | No GHW test file is available |
| FSDB | Native addon with Synopsys libraries | Deferred | no | | Decision on remote access first |
| Remote viewer (Surfer server) | "Open Remote Viewer" | Deferred | no | | Decision on remote access first |

## Viewer

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| Waveform drawing and ruler | Webview canvas | Same | yes | Orca | Same code |
| Zoom with the wheel | Ctrl plus wheel | Same | yes | Orca (events) | |
| Scroll | Wheel, scroll bar | Same | yes | no | |
| Marker | Click | Same | yes | Orca (events) | |
| Alt marker | Alt plus click | Same | yes | no | |
| Value at the marker | Column beside the name | Same | yes | Orca | |
| Control bar (zoom buttons, edge steps, time field, value search, auto reload) | Webview HTML | Same | yes | no | Same code. Not in the test image, because the image holds only the canvases. |
| Signal load | Binary messages | Tweaked | yes | Orca | Base64 text in JSON, pulled by the page in batches. Slow for large signals. PR-6 |
| Context menu of a signal | Native VS Code menu | Tweaked | yes | Orca (events) | HTML menu in the page. The items and their conditions come from the vaporview `package.json`. |
| Context menu of the ruler | Native VS Code menu | Tweaked | yes | Orca (events) | Same method |
| Context menu of a group or separator | Native VS Code menu | Tweaked | yes | no | Same method |
| Remove variable | Menu | Same | yes | Orca (events) | |
| Show in netlist view | Menu, Ctrl+R | Same | yes | no | The panel opens the parents of the item and selects it |
| Copy name, copy value at marker | Menu | Tweaked | yes | no | The worker has no clipboard, so the page writes the text |
| Value formats: binary, decimal, signed, hex, octal, base64, float, BFloat16, TensorFloat32, ASCII, epoch time, enum | Submenu | Same | yes | Orca (events) | "Decimal (Unsigned)" tested |
| Value formats: fixed point, signed fixed point | Asks for the offset in an input box | Blocked | no | | Orca has no input prompt. The menu does not show the item. PR-7 (deferred) |
| Render type: multi bit, linear, stepped, signed variants | Submenu | Same | yes | no | |
| Edge guides | Submenu | Same | yes | no | |
| Color 1 to 8 | Submenu, keys `1` to `8` | Same | yes | no | |
| Row height 1x to 8x | Submenu | Same | yes | no | |
| Name type: full path, name only, custom name | Submenu | Same | yes | no | The custom name is an edit field in the page |
| Vertical scale (analog signals) | Menu, Alt+`=`, Alt+`-` | Same | yes | no | |
| Groups: new, from selection, rename, ungroup, delete | Menu, key `g`, F2 | Same | yes | no | |
| Separators: new, remove | Menu | Same | yes | no | |
| Create signals from: bits, nibbles, bytes, words, double words, quad words | Submenu | Same | yes | no | |
| Create signals from: custom length | Asks for the length in an input box | Blocked | no | | No input prompt. PR-7 (deferred) |
| New signal from bit range | Asks for the range in an input box | Blocked | no | | No input prompt. PR-7 (deferred) |
| Time unit: s, ms, µs, ns, ps, fs | Submenu | Same | yes | no | |
| Time unit: quick pick | VS Code quick pick | Blocked | no | | No quick pick. The submenu gives the same function. PR-7 (deferred) |
| Ruler lines, ruler increment "Auto" | Menu | Same | yes | Orca (events) | The menu follows the state ("Hide Ruler Lines") |
| Ruler increment "Custom" | Asks for the value in an input box | Blocked | no | | No input prompt. PR-7 (deferred) |
| Shade or outline bit vectors, animations, scrolling mode | Menu | Same | yes | no | |
| WaveDrom: copy selection, clock settings | Submenu | Same | yes | no | |
| Zoom to fit | Ctrl+0 | Same | yes | Orca (events) | With a real keyboard, Orca possibly takes Ctrl+0 first. Not tested by hand. |
| Other keybindings (15 of the 17) | VS Code keybindings | Tweaked | yes | no | Key events in the page. Orca keybindings are `global` or `workspace` only. Keys with Ctrl or Alt are not tested by hand. Ctrl+F (search) is not built, see D1. |
| Signal colors follow the color theme | Colors of the VS Code theme | Tweaked | yes | Orca | Fixed colors. Orca gives a plugin no theme colors for this. See decision D3. |
| Page colors follow the theme | VS Code theme variables | Tweaked | yes | Orca | Mapped to the 20 `--orca-*` variables. Only the dark theme was seen. |
| "More Settings", "Show Readme" | Open VS Code pages | Blocked | no | | Orca has no API to open its settings page or a document. The menu does not show the items. |
| Drag and drop from the tree to the viewer | Yes | Deferred | no | | Marginal in this phase. The tree and the viewer are different pages in Orca. |

## Netlist

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| Netlist tree with lazy load | VS Code tree view | Tweaked | yes | Orca | HTML tree in the panel. The Orca `Tree` component stops at 2000 items. |
| Icons and icon colors | VS Code theme icons | Tweaked | yes | no | Same icon font. Fixed colors. |
| Add variable (button on the row) | Inline button | Same | yes | Orca | |
| Show in viewer (button on the row, menu) | Inline button | Same | yes | no | |
| Add at a double click | Yes | Same | yes | no | The vaporview code detects the second click |
| Context menu of a variable or scope | Native VS Code menu | Tweaked | yes | Node | HTML menu in the panel, from the vaporview `package.json` |
| Add selected, remove selected | Menu, multiple selection | Same | yes | no | Ctrl plus click selects more than one item. No Shift range. |
| Add all in scope (shallow, recursive), remove all in scope | Menu | Same | yes | Node | The items are in the menu. The commands are not run in a test. |
| Copy variable name | Menu | Tweaked | yes | no | The page writes the clipboard |
| Search netlist, search scope | VS Code quick pick, Ctrl+F | Decision | no | | No quick pick in Orca. See decision D1. |
| Add variable by name, add scope by name | Asks for the name in an input box | Blocked | no | | No input prompt. PR-7 (deferred) |
| Sort netlist | Setting | Same | yes | no | |
| Tree stays open | Yes | Same | yes | no | The tree keeps its open nodes while the same waveform is active |

## Session, settings, status

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| Automatic view state | VS Code webview state | Tweaked | yes | Orca | Session file in `.vaporview/`, written by the worker. The signal list came back after a worker restart. |
| Save session, load session | Save and open dialogs | Decision | no | | No file dialog. The menu does not show the items. See decision D2. PR-2 |
| Settings | 33 settings in VS Code | Same | yes | no | 26 settings in the Orca settings page of the plugin. The 7 others are for features that the plugin does not have. A change was not tested. |
| Change a setting from the viewer | For example scrolling mode | Same | yes | no | |
| Status bar: marker time, delta time, selected signal | 3 items | Same | yes | Orca | Orca status bar items |
| Messages (information, warning, error) | VS Code notification | Tweaked | yes | Orca | A message bar in the panel and in the viewer page. Orca gives a plugin only a desktop notification. |
| Questions with buttons, for example "add a large number of signals: Yes, No" | VS Code notification with buttons | Tweaked | yes | Orca (events) | The message bar has the buttons. The first answer from one page closes the question in the other page. Orca has no confirm API for a plugin. PR-7 (deferred) |

## Integration

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| Commands in the command palette | 107 commands | Decision | no | | Orca commands are a fixed list in the manifest and get no arguments. See decision D4. |
| Terminal links to instance paths | Yes | Deferred | no | | Marginal in this phase |
| WCP server | Yes | Deferred | no | | |
| API for other extensions | Yes | Deferred | no | | Orca plugins cannot call each other |

## Open decisions

| # | Topic | Options | Recommendation |
|---|---|---|---|
| D1 | Netlist search | (a) Leave it out until Orca has a quick pick. (b) A search field in the panel. The parser search that vaporview uses is available. | (b). Search is necessary for a large design, and the panel is our own page. |
| D2 | Save and load a session file | (a) Leave it out until Orca has a file dialog (PR-2). (b) "Save" with the Orca save dialog (`files.saveAs`), "Load" with the file browser of the panel. | (a). The automatic session file covers the main use. |
| D3 | Signal colors | (a) Keep the fixed colors. (b) Add 4 plugin settings for the first four colors (vaporview already has settings for colors 5 to 8). | (a) for now |
| D4 | Commands in the Orca command palette | (a) None. (b) A small set that needs no argument: zoom to fit, reload file, new group. | (b), after the menus are tested by hand |

## Checks that need a person

- Use the panel by hand: "Open Waveform", the file browser, a click on a list row, the close button, the tree menu.
- Keys with Ctrl or Alt in the viewer: Ctrl+0, Ctrl+R, Alt+`=`. Orca can take them first.
- A light theme.
- An FST file and a GHW file.
