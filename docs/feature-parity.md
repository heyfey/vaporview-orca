# Feature parity with vaporview

Each feature of vaporview, and its state in the Orca plugin. Update this file with each change to the plugin.

- vaporview reference: submodule `vaporview/`, commit `7b63f84` (v1.6.1).
- PR numbers refer to [orca-pr-candidates.md](orca-pr-candidates.md). Design reasons are in [architecture.md](architecture.md).
- Last update: 2026-11-15, Orca 1.4.259 on Windows, waveform file `test/data/tpu.vcd` in a WSL folder.

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
| Scroll | Wheel, scroll bar | Same | yes | Orca (events) | The wheel follows the setting "Scrolling Mode", as in vaporview: "Mouse" moves in time, "Touchpad" moves up and down. The default is "Mouse". |
| Marker | Click | Same | yes | Orca (events) | |
| Alt marker | Alt plus click | Same | yes | no | |
| Value at the marker | Column beside the name | Same | yes | Orca | |
| Control bar (zoom buttons, edge steps, time field, value search, auto reload) | Webview HTML | Same | yes | no | Same code. Not in the test image, because the image holds only the canvases. |
| Signal load | Binary messages | Tweaked | yes | Orca | Base64 text in JSON, pulled by the page in batches. Slow for large signals. PR-6 |
| Context menu of a signal | Native VS Code menu | Tweaked | yes | Orca (events) | HTML menu in the page, with the sizes of the Orca menus. The items and their conditions come from the vaporview `package.json`. Each item has a lucide icon, as in Orca (VS Code menus have no icons). An item shows its key at the right, and an item that deletes is red. The icons are in `src/worker/menus.ts`. |
| Context menu of the ruler | Native VS Code menu | Tweaked | yes | Orca (events) | Same method |
| Context menu of a group or separator | Native VS Code menu | Tweaked | yes | no | Same method |
| Remove variable | Menu | Same | yes | Orca (events) | |
| Show in netlist view | Menu, Ctrl+R | Tweaked | yes | Orca | The panel opens the parents of the item and selects it. Tested by hand. It works only when the Vaporview panel shows in the sidebar: a plugin cannot make Orca show its panel. VS Code shows the tree view itself. PR-11 |
| Copy name, copy value at marker | Menu | Tweaked | yes | no | The worker has no clipboard, so the page writes the text. The same clipboard path works for the WaveDrom copy. |
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
| Time unit: quick pick | VS Code quick pick (`showQuickPick`) | Blocked | no | | The plugin has only the quick pick of the search. The submenu gives the same function. PR-7 (deferred) |
| Ruler lines, ruler increment "Auto" | Menu | Same | yes | Orca (events) | The menu follows the state ("Hide Ruler Lines") |
| Ruler increment "Custom" | Asks for the value in an input box | Blocked | no | | No input prompt. PR-7 (deferred) |
| Shade or outline bit vectors, animations, scrolling mode | Menu | Same | yes | no | |
| WaveDrom: copy selection, clock settings | Submenu | Same | yes | Orca | The copy to the clipboard was tested by hand. The clock settings are not tested. |
| Zoom to fit | Ctrl+0 | Blocked | yes | Orca | The command works (menu of the control bar, sent key event). The key Ctrl+0 does not: Orca runs its own "zoom reset" for it. Orca sends each key with Ctrl from an editor frame to its own shortcuts, and the frame cannot stop that. PR-10 |
| Other keybindings (16 of the 17) | VS Code keybindings | Tweaked | yes | Orca | Key events in the page. Tested by hand: Ctrl+R, F2, G, 1 to 8, Alt+`=`, Alt+`-` work. Ctrl+F opens the search in the panel, but the text field does not get the keyboard focus, because a frame cannot move the focus to a different frame (Orca issue #40813). The person must click the field. |
| Keys of the viewer page (arrows, N, Home, End, Ctrl+A, Escape, Delete) | Webview code | Same | yes | Orca | Tested by hand, all work |
| Signal colors follow the color theme | Colors of the VS Code theme | Tweaked | yes | Orca | Fixed colors. Orca gives a plugin no theme colors for this. See decision D3. |
| Page colors follow the theme | VS Code theme variables | Tweaked | yes | Orca | Mapped to the 20 `--orca-*` variables. Only the dark theme was seen. |
| "More Settings", "Show Readme" | Open VS Code pages | Blocked | no | | Orca has no API to open its settings page or a document. The menu does not show the items. |
| Drag and drop from the tree to the viewer | Yes | Deferred | no | | Marginal in this phase. The tree and the viewer are different pages in Orca. |

## Netlist

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| Netlist tree with lazy load | VS Code tree view | Tweaked | yes | Orca | HTML tree in the panel, with the look of the Orca file explorer (copied values and the Geist font). The native Orca `Tree` has no context menu, no row buttons, and 2000 items maximum. PR-9 |
| Icons and icon colors | VS Code icons (codicons), one color for each kind | Tweaked | yes | Orca | Icons of the lucide set, which Orca uses, in one color. Each vaporview icon has a lucide icon (`src/frame/icons.ts`). The plugin setting "Netlist Icons" = "Vaporview" gives the vaporview icons and colors again, in the tree and in the search results. |
| Add variable (button on the row) | Inline button | Same | yes | Orca | |
| Show in viewer (button on the row, menu) | Inline button | Same | yes | no | |
| Add at a double click | Yes | Same | yes | no | The vaporview code detects the second click |
| Context menu of a variable or scope | Native VS Code menu | Tweaked | yes | Node | HTML menu in the panel, from the vaporview `package.json` |
| Add selected, remove selected | Menu, multiple selection | Same | yes | no | Ctrl plus click selects more than one item. No Shift range. |
| Add all in scope (shallow, recursive), remove all in scope | Menu | Same | yes | Node | The items are in the menu. The commands are not run in a test. |
| Copy variable name | Menu | Tweaked | yes | no | The page writes the clipboard |
| Search netlist, search scope | VS Code quick pick, Ctrl+F | Tweaked | yes | Orca | The search field is always in the panel below the title "Netlist", as "Find files" in the Orca file explorer. The results take the place of the tree. "Search Scope" is in the tree menu. The search and the action on a result are the vaporview code: a variable goes into the viewer, a scope makes the search go into that scope. |
| Add variable by name, add scope by name | Asks for the name in an input box | Blocked | no | | No input prompt. PR-7 (deferred) |
| Sort netlist | Setting | Same | yes | no | |
| Tree stays open | Yes | Same | yes | no | The tree keeps its open nodes while the same waveform is active |

## Session, settings, status

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| Automatic view state | VS Code webview state | Tweaked | yes | Orca | Session file in `.vaporview/`, written by the worker. The signal list came back after a worker restart. |
| Save session, load session | Save and open dialogs | Blocked | no | | No file dialog, so the menu does not show the items. The automatic session file in `.vaporview/` has the same role (decision D2). PR-2 |
| Settings | 33 settings in VS Code | Same | yes | Orca | 26 vaporview settings in the Orca settings page of the plugin, plus one setting of the plugin itself ("Netlist Icons"). The 7 others are for features that the plugin does not have. The plugin does not read the settings of VS Code. |
| Change a setting from the viewer | For example scrolling mode | Same | yes | Orca | The command "Touchpad" of the scrolling mode changed the Orca setting |
| Status bar: marker time, delta time, selected signal | 3 items | Same | yes | Orca | Orca status bar items |
| Messages (information, warning, error) | VS Code notification | Tweaked | yes | Orca | The message shows in the panel. Orca has toasts for its own messages, but no toast method for a plugin. PR-8 |
| Question before more than 48 signals are added ("Yes", "No") | VS Code notification with buttons | Tweaked | yes | Node | No question. The plugin adds the signals. Orca has no question dialog for a plugin. PR-7 (deferred) |
| Other questions with buttons ("Restore state from file", and two of the remote viewer) | VS Code notification with buttons | Blocked | no | | The text shows as a message, and the question gets no answer. PR-7 (deferred) |

## Integration

| Feature | vaporview | Plugin | Built | Tested | Reason and Orca PR |
|---|---|---|---|---|---|
| Commands in the command palette | 107 commands | Decision | no | | Orca commands are a fixed list in the manifest and get no arguments. See decision D4. |
| Terminal links to instance paths | Yes | Deferred | no | | Marginal in this phase |
| WCP server | Yes | Deferred | no | | |
| API for other extensions | Yes | Deferred | no | | Orca plugins cannot call each other |

## Messages of vaporview

vaporview has 21 places that show a message (information, warning, error, or a question with
buttons). In VS Code a message is a notification. In the plugin a message shows in the panel.

"Decision" is `done` where the behavior is decided.

| # | Message | Source | When | Can occur now | Plugin | Decision |
|---|---|---|---|---|---|---|
| 1 | "Error getting user theme. If you are seeing this while using VS Code SSH…" | `viewer_provider.ts:167` | At the start, when vaporview cannot read the VS Code color theme | Yes, at each start | Hidden. It goes to the log only. | done |
| 2 | "You are about to add a large number of signals…" (Yes, No) | `viewer_provider.ts:1267` | More than 48 signals in one action | Yes | No message. The plugin adds the signals. | done |
| 3 | "Restore state from file: `<name>.json`?" (Yes, No, Settings) | `viewer_provider.ts:720` | A `<name>.json` is beside the waveform file and the page has no saved state | Yes | Hidden. It goes to the log only, and the file is not loaded. | done |
| 4 | "WaveDrom JSON copied to clipboard." | `wavedrom.ts:155` | After "Copy Selection as WaveDrom" | Yes | Shows | done |
| 5 | "The number of transitions exceeds the maximum limit of N" | `wavedrom.ts:149` | The WaveDrom copy is cut at the limit | Yes | Shows | done |
| 6 | "Unknown number format: X" | `value_format.ts:701` | A value format id that vaporview does not know, for example from an old session file | Yes, rare | Shows | done |
| 7 | "FSDB support is currently available on Linux only." | `fsdb_handler.ts:137` | The person types the path of an `.fsdb` file in the file browser | Yes | Shows. It needs a typed `.fsdb` path. | done |
| 8 | "Failed to load FSDB reader, is vaporview.fsdbReaderLibsPath properly set?" | `fsdb_handler.ts:216` | Same, on Linux | Yes | Shows. Only on Linux. | done |
| 9 | "Remote connection lost… Please reconnect." (Reconnect, Close Tab) | `viewer_provider.ts:515` | Remote viewer | No, deferred | | |
| 10 | "`<url>` uses unencrypted HTTP…" (Connect Anyway) | `viewer_provider.ts:544` | Remote viewer | No, deferred | | |
| 11 | "Failed to open remote viewer: …" | `viewer_provider.ts:575` | Remote viewer | No, deferred | | |
| 12 | "No viewer is active. Please select the viewer you wish to save session." | `viewer_provider.ts:587` | "Save Vaporview Session" with no active viewer | No, the command is hidden | | |
| 13 | "No viewer is active. Please select the viewer you wish to load session into." | `viewer_provider.ts:644` | "Load Vaporview Session" with no active viewer | No, the command is hidden | | |
| 14 | "The session file may not match the active viewer" | `viewer_provider.ts:680` | A loaded session file names a different waveform file | No, the load is not reachable | | |
| 15 | "Document not found: `<uri>`" | `viewer_provider.ts:937` | A command names a waveform that is not open (API for other extensions) | No | | |
| 16 | "Signal not found: `<id>`" | `viewer_provider.ts:960` | A command names an unknown signal (API for other extensions) | No | | |
| 17 | "Signal not found: `<id>`" | `viewer_provider.ts:1002` | Add or remove a variable through the API | No | | |
| 18 | "Signal not found: `<name>`" | `viewer_provider.ts:1151` | "Add Variable by Name", terminal links | No, blocked and deferred | | |
| 19 | "Scope not found: `<name>`" | `viewer_provider.ts:1226` | "Add scope by name" | No, blocked | | |
| 20 | "Invalid bit range string: …" | `viewer_provider.ts:1352` | After the input box of "New Signal From Bit Range" | No, blocked | | |
| 21 | "Invalid custom length. Please enter a positive integer." | `commands.ts:185` | After the input box of "Custom Length" | No, blocked | | |

Messages 9 to 21 cannot occur now. If one occurs later, it shows in the panel.

## Open decisions

| # | Topic | Options | Recommendation |
|---|---|---|---|
| D1 | Netlist search | Decided 2026-11-15: a search in the panel. Built. | |
| D2 | Save and load a session file | Decided 2026-11-15: no separate save and load. The automatic file `.vaporview/<name>.vaporview.json` is the session file of the waveform. | |
| D3 | Signal colors | Decided 2026-11-15: fixed colors for now. | |
| D4 | Commands in the Orca command palette | (a) None. (b) A small set that needs no argument: zoom to fit, reload file, new group. | Open |
| D5 | Messages of vaporview | Decided 2026-11-15: rows 1 and 3 hidden, row 2 adds the signals, rows 4 to 8 stay as they are. | |
| D6 | Ctrl+0 (zoom to fit), which Orca takes for its "zoom reset" | Decided 2026-11-15: leave it. "Zoom to fit" stays on the button of the control bar. The fix is PR-10. | |
| D7 | Ctrl+F opens the search in the panel, but the field has no keyboard focus | Decided 2026-11-15: leave it, the person clicks the field. Wait for Orca issue #40813, and add our case to it. | |

## Checks that need a person

- Use the panel by hand: "Open Waveform", the file browser, a click on a list row, the close button, the tree menu.
- Keys with Ctrl or Alt in the viewer: Ctrl+0, Ctrl+R, Alt+`=`. Orca can take them first.
- A light theme.
- An FST file and a GHW file.
