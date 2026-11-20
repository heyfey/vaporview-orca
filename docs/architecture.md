# Architecture and decisions

This document records what vaporview does in VS Code, what the Orca plugin does, the Orca limit
behind each difference, and the change to propose to Orca for that limit.

- vaporview source: submodule `vaporview/`, upstream commit `5dff157` (v1.6.1 plus the fix of vaporview issue 234).
- Orca source read: `stablyai/orca` commit `cbd50af5be` (host API 1.9).
- Orca tested: installed desktop app 1.4.255 on Windows (host API 1.4). See [orca-test-results.md](orca-test-results.md).
- PR candidates (PR-1 to PR-12): see [orca-pr-candidates.md](orca-pr-candidates.md).
- Status of each vaporview feature: see [feature-parity.md](feature-parity.md).

## Scope of the first prototype

- Target: small waveforms.
- Priority: a clean architecture that can grow. Each Orca workaround stays behind a small interface.
- Performance problems with large waveforms are accepted in the prototype. The fix comes later, on
  the Orca side (PR-5 and PR-6).

## Terms

- **Waveform**: the thing that the user opens, selects, and closes.
- **Waveform file**: the file on disk (`.vcd`, `.fst`, `.ghw`, `.fsdb`).
- **Session file**: the JSON file that holds the view state of one waveform. vaporview calls it a
  "viewer session".
- **Worker**: the Node process of the plugin (Orca `trusted-worker` profile).
- **Frame**: an isolated web page that Orca shows for the plugin (editor tab or sidebar panel).

## Principles

1. Use model: copy vaporview, but fit Orca. vaporview in VS Code has one workspace. Orca has many.
2. Source code: reuse vaporview code as much as possible.
3. Architecture: copy the vaporview patterns "extension host and webview" and "tree view and webview".
4. Limits: where Orca has a gap, make a workaround behind a small interface, and propose a fix to
   Orca. Replace the workaround when Orca has the fix.
5. No heuristics. For example, no timer decides when to unload a waveform.
6. Marginal features can wait: terminal links, drag and drop, the WCP server, the API for other
   extensions.
7. A change to vaporview must be general and backward compatible, so that upstream can merge it.

## Parts

```
+--------------------- Orca window ----------------------+
|  editor tab                      sidebar panel         |
|  +--------------------------+    +------------------+  |
|  | editor frame             |    | panel frame      |  |
|  | vaporview webview        |    | waveform list    |  |
|  | (canvas, rows, ruler)    |    | netlist tree     |  |
|  +------------+-------------+    +--------+---------+  |
+---------------|---------------------------|------------+
                |  plugin.request (pull)    |
                |  panels.post (push)       |
         +------+---------------------------+------+
         | worker (Node)                           |
         | documents for each workspace            |
         | WaveformFileParser: WASM (VCD, FST, GHW)|
         | session files, commands, settings       |
         +-----------------------------------------+
```

| Part | vaporview (VS Code) | Orca plugin |
|---|---|---|
| Hub | Extension host. Owns `VaporviewDocument` and the parser ([document.ts:120](../vaporview/src/extension_core/document.ts#L120)). | Worker. Same role, same classes after adaptation. |
| Parser | `wellen` in WASM, in a `worker_threads` thread, random reads with `fs` ([wasm_handler.ts:26](../vaporview/src/extension_core/wasm_handler.ts#L26), [wasm_handler.ts:84](../vaporview/src/extension_core/wasm_handler.ts#L84)) | The same code in the worker. Tested: WASM and `worker_threads` run there. |
| Viewer | Webview. Only `vscode_wrapper.ts` talks to VS Code ([vscode_wrapper.ts:13](../vaporview/src/webview/vscode_wrapper.ts#L13)). | Editor frame (HTML custom editor). A second wrapper talks to Orca. |
| Tree | `TreeDataProvider` in the VS Code sidebar ([tree_view.ts:192](../vaporview/src/extension_core/tree_view.ts#L192)) | HTML panel in the Orca sidebar, with `--orca-*` style variables |

## How the plugin runs the vaporview code

The plugin does not copy or change the vaporview code. It runs it on three small adapters.

| Adapter | File | What it replaces |
|---|---|---|
| `vscode` module for the worker | [src/adapter/vscode.ts](../src/adapter/vscode.ts) | The VS Code extension API. The build gives this file the module name `vscode`, so `vaporview/src/extension_core` runs unchanged: `activate()`, the custom editor provider, the documents, the parser, the commands, the tree data provider. |
| `acquireVsCodeApi` for the editor frame | [src/frame/editor.ts](../src/frame/editor.ts) | The VS Code webview API. The vaporview webview bundle and its HTML page run unchanged. |
| Tree view for the panel | [src/frame/panel.ts](../src/frame/panel.ts) | The VS Code tree view. It draws what the vaporview `TreeDataProvider` gives. |

The worker hub ([src/worker/main.ts](../src/worker/main.ts)) does what VS Code does for an
extension: it calls `openCustomDocument` and `resolveCustomEditor`, gives each document a
`WebviewPanel` object, and moves the messages between that object and the frame.

Rules of the adapter:

- A VS Code API with no Orca equivalent is a no-op that writes one log line (for example terminal
  links). An input box and `showQuickPick` answer as if the person cancelled.
- A VS Code quick pick (a text field with a list of results) shows in the panel. vaporview uses
  it for the netlist search.
- A VS Code message shows in the panel. A message with buttons is a question, and the person
  cannot answer it in Orca. For the question before a large add, the plugin adds the signals.
- Orca workarounds are in the hub, each in one named part: `FrameLink` (message transport),
  the session file, and the file browser.
- The message format is in one file, [src/common/codec.ts](../src/common/codec.ts). It is the only
  file to change when Orca gets a byte transport (PR-6).

Result: a new vaporview version needs only a submodule update, unless it uses a VS Code API that
the adapter does not have yet. One change to vaporview was necessary: a file reader for each
document. It went upstream first (vaporview PR 235), and the plugin got it with a submodule update.

Message transport today (`FrameLink`): the frame pulls. It keeps one `editor.poll` request open,
and the worker answers with a batch of messages. The frame sends its own messages in batches, one
each 200 ms. Both directions stay below Orca's limit of 120 messages in 10 s.

## Decisions

Each row gives the vaporview behavior, the plugin behavior, the Orca limit, and the PR candidate.
"Tested" refers to [orca-test-results.md](orca-test-results.md).

### Open and identity

| Topic | vaporview | Orca plugin | Orca limit | PR |
|---|---|---|---|---|
| Open a waveform file | Custom editor for `*.vcd`, `*.fst`, `*.ghw`, `*.fsdb` ([package.json:117](../vaporview/package.json#L117)). The user clicks the file. | "Open Waveform" in the panel. The plugin does not register the waveform suffixes. | A custom editor gets content only, never a path. Orca reads the file first: 64 MiB limit, 50 MiB for text. | PR-1 |
| Select the file | VS Code file dialog | File browser in the panel. The worker lists folders with `fs.readdir`. It reaches files outside the workspace. | A plugin has no open-file dialog. `files.saveAs` is the only dialog. | PR-2 |
| What the tab opens | The waveform file | An internal session file `.vaporview/<waveform file name>.vaporview.json`. The worker makes it and calls `editor.open`. Tested: the longer suffix opens in the custom editor by default. | Same as "Open a waveform file" | PR-1 |
| Identity | Document URI | Absolute path of the waveform file. The worker key is workspace plus path. | None | |
| One waveform file, two tabs | `supportsMultipleEditorsPerDocument: false` ([extension.ts:44](../vaporview/src/extension_core/extension.ts#L44)) | Same workspace: select the open tab. Tested: `editor.open` on an open file uses the open tab. Different workspace: one tab for each workspace. | None | |
| Workspace | One workspace | One waveform list for each workspace. Key: the workspace id, which the worker reads itself (host API 1.7). A frame gets only the name and the branch. Fallback for older Orca: name plus branch. | Tested: Orca gives the workspace id to the worker only, because the id contains a path | Done |

### Panel (use model of sv-pathfinder)

| Topic | vaporview and sv-pathfinder | Orca plugin | Orca limit | PR |
|---|---|---|---|---|
| Waveform list | sv-pathfinder "Designs" view | List of open waveforms for the current workspace. Welcome text when the list is empty. | None | |
| Select | Tab change selects the document ([viewer_provider.ts:437](../vaporview/src/extension_core/viewer_provider.ts#L437)) | One click on a row changes the tree and shows the tab. A frame that starts also selects its row. | No tab events. The plugin cannot see a tab change to a file of a different type. | PR-3 |
| Netlist tree | `createTreeView` ([viewer_provider.ts:344](../vaporview/src/extension_core/viewer_provider.ts#L344)), children loaded for each scope ([wasm_handler.ts:290](../vaporview/src/extension_core/wasm_handler.ts#L290)) | HTML tree in the panel, same lazy load for each scope | The Orca `Tree` component has a limit of 2000 items and 16 levels. HTML has no limit. | |
| Close | The user closes the tab. VS Code disposes the document. | Close button on the row. The worker unloads the waveform and removes the row. The session file stays. No automatic unload. | No `editor.close`: an open tab stays and shows "This waveform is closed". No tab-closed event. | PR-4, PR-3 |

### Frame lifetime and messages

| Topic | vaporview | Orca plugin | Orca limit | PR |
|---|---|---|---|---|
| Hidden tab | `retainContextWhenHidden: true` ([extension.ts:42](../vaporview/src/extension_core/extension.ts#L42)). The webview and its `WaveformDataManager` stay alive, so a return to the tab loads nothing. | The page keeps the vaporview `WaveformDataManager`, but it lives only while the tab shows. On return, the new page asks for its signals again, with the same `restoreState` path that vaporview uses after a VS Code restart ([vscode_wrapper.ts:625](../vaporview/src/webview/vscode_wrapper.ts#L625)). No extra cache in the worker (see "Signal data and memory"). | Tested: Orca destroys the page at each tab change and makes a new page on return. | PR-5, PR-6 |
| Address of a frame | `webviewPanel.webview.postMessage` to one panel | `panels.post` to the caller id. Each message names the waveform path. A frame ignores a message for a different waveform. | Tested: all editor frames of the plugin in a window have the same caller id. With a split view, two frames can be alive. | PR-3 |
| Frame gone | `onDidDispose` | Not necessary: the list in the panel is the truth, and frames are views that can be made again. | Tested: a frame that goes away sends no event. A pending request aborts only at its timeout. | PR-3 |
| Restart | VS Code restores the webview and its state | Orca restores the tab. The frame starts, reads `fileName` from the session file, and asks the worker to load. A tab behind a different tab loads when the user selects it. | None | |

### Signal data and memory

A signal can have 50 million to 500 million value changes. So the rule is: no second copy of signal data in the worker.

- `wellen` already holds the waveform body in a compressed store. For VCD and GHW that store is
  in memory (LZ4 blocks). For FST the file is the store, and `wellen` reads blocks from it.
  `load_signals` decodes from that store and does not parse the file again.
- vaporview encodes each loaded signal for the webview: 8 bytes of time plus the value for each
  change, then LZ4 ([lib.rs:807](../vaporview/src/wellen_parser/lib.rs#L807)). A 1-bit signal with
  100 million changes is 900 MB before LZ4.
- A cache of those encoded chunks in the worker would be a third copy (store, cache, page). It
  saves only the encode time. So the plugin does not have it.
- The cost of a return to a tab is then: decode and encode in the worker, transfer, decode in the
  page. The transfer is the slow part: about 10 MiB/s after the first 60 MiB. For large signals
  this is slow. The prototype accepts that (see "Scope of the first prototype"). The fix is on
  the Orca side: keep the page alive (PR-5) and a byte transport with no small limits (PR-6).

### Session state

| Topic | vaporview | Orca plugin | Orca limit | PR |
|---|---|---|---|---|
| Automatic state | `vscode.setState` ([vscode_wrapper.ts:620](../vaporview/src/webview/vscode_wrapper.ts#L620)) | The worker writes the session file with `fs` after each view change, with a delay. The tab is never dirty. | Orca has no webview state store. | |
| Format | `getWebviewSession()` ([document.ts:351](../vaporview/src/extension_core/document.ts#L351)): `fileName`, `displayedSignals`, markers, zoom, scroll | The same format. `fileName` is mandatory, because the frame finds the waveform file through it. | None | |
| Explicit save and load | "Save Viewer Session" to `<name>.json` beside the waveform file ([viewer_provider.ts:580](../vaporview/src/extension_core/viewer_provider.ts#L580)), `restoreState` ([viewer_provider.ts:695](../vaporview/src/extension_core/viewer_provider.ts#L695)) | Same commands, later phase. Files are compatible in the two directions. | No open-file dialog for "load" | PR-2 |

### Data

| Topic | vaporview | Orca plugin | Orca limit | PR |
|---|---|---|---|---|
| Signal data | The parser sends LZ4 chunks of 65,000 bytes ([lib.rs:283](../vaporview/src/wellen_parser/lib.rs#L283)). The webview joins them ([data_manager.ts:217](../vaporview/src/webview/data_manager.ts#L217)). | The frame pulls. `signals.open` starts the load, then `signals.read` gets base64 parts of about 700 KiB. The frame decodes with the vaporview code. | Answers are JSON only, 1 MiB maximum. A frame can send 120 messages in 10 s. Tested: about 118 MiB/s for the first 60 MiB, then about 10 MiB/s. | PR-6 |
| Worker answers | Structured clone | Strict JSON. Tested: an `undefined` value makes the answer fail. | JSON check | PR-6 |
| File reads | `fs.readSync` ([wasm_handler.ts:48](../vaporview/src/extension_core/wasm_handler.ts#L48)) | Same. Tested through `\\wsl.localhost`: about 3 times slower than a local drive, 67 MiB/s with 64 KiB reads. | None | |

### VS Code user interface with no Orca part

The logic is shared. Only the code that draws is new.

| Topic | vaporview | Orca plugin | Orca limit |
|---|---|---|---|
| Context menu of the viewer | 36 items in `webview/context` ([package.json:657](../vaporview/package.json#L657)), selected by `data-vscode-context` ([signal_item.ts:156](../vaporview/src/webview/signal_item.ts#L156)) | Built. The page collects the `data-vscode-context` values under the pointer. The worker selects the items with the `when` conditions of the vaporview `package.json` ([menus.ts](../src/worker/menus.ts), [when.ts](../src/common/when.ts)). The page draws the menu ([menu.ts](../src/frame/menu.ts)) and the worker runs the same command with the same argument. | No menu contribution |
| Context menu of the tree | 14 items in `view/item/context` | Built, same method. The items of the group `inline` are buttons on the row. | No menu contribution |
| Commands | 107 commands, handlers in `commands.ts` | The same handlers in the worker. They call a small host interface, not `vscode`. A subset goes in the Orca command palette. | A palette command gets no arguments |
| Keybindings | 17, active only when the viewer has focus | Key events in the frame. Tested: the frame gets focus, plain keys, pointer, and context menu events. Keys with Ctrl or Alt are not yet tested. | `when` is only `global` or `workspace` |
| Input boxes | See the list below | Not in the plugin. The menus do not show a command that needs an input box, a quick pick, or a file dialog (list in [menus.ts](../src/worker/menus.ts)). | No input prompt and no quick pick for a plugin |
| Status bar | 3 items: marker time, delta time, selected signal ([tree_view.ts:398](../vaporview/src/extension_core/tree_view.ts#L398)) | Built. `statusBarItems` plus `statusBar.update`. The items also keep the worker alive. | 8 items maximum |
| Settings | 33 settings | Built. The build makes the Orca `settings` from the vaporview `package.json`. The worker keeps a copy, because VS Code reads a setting with no wait. | 64 maximum, scalar types only |

Input boxes and quick picks in vaporview:

| Command | Prompt | Phase |
|---|---|---|
| New signal from bit range ([commands.ts:146](../vaporview/src/extension_core/commands.ts#L146)) | Bit range, for example `7:0` | Blocked (PR-7) |
| Create signals of custom length ([commands.ts:180](../vaporview/src/extension_core/commands.ts#L180)) | Length in bits | Blocked (PR-7) |
| Set ruler time increment ([commands.ts:308](../vaporview/src/extension_core/commands.ts#L308)) | Time increment | Blocked (PR-7) |
| Display as fixed point, unsigned and signed ([commands.ts:412](../vaporview/src/extension_core/commands.ts#L412), [commands.ts:422](../vaporview/src/extension_core/commands.ts#L422)) | Fixed point offset | Blocked (PR-7) |
| Select time units ([viewer_provider.ts:826](../vaporview/src/extension_core/viewer_provider.ts#L826)) | Quick pick of units | Blocked (PR-7) |
| Add variable by name ([viewer_provider.ts:1181](../vaporview/src/extension_core/viewer_provider.ts#L1181)) | `top.mid.var` | Blocked (PR-7) |
| Add scope by name ([viewer_provider.ts:1207](../vaporview/src/extension_core/viewer_provider.ts#L1207)) | `top.mid.scope` | Blocked (PR-7) |
| Open remote viewer ([commands.ts:577](../vaporview/src/extension_core/commands.ts#L577)) | Server URL, bearer token | Deferred with remote access |

## Code reuse

| Code | Lines | Use |
|---|---|---|
| `vaporview/src/extension_core/*` | 6,008 | Runs unchanged on the `vscode` adapter |
| `vaporview/src/webview/*` and `media/webview.html`, `media/style.css` | 8,196 | Run unchanged in the editor frame |
| `vaporview/src/wellen_parser` (Rust to WASM) | | Unchanged |
| Adapters, worker hub, panel, theme map, build | about 1,500 | New, in `src/` and `scripts/` |

## Not in this phase

- FSDB and remote access. Options on record: (A) Remote Orca Server with the worker beside the
  file, (B1) the existing Surfer HTTP client, (B2) a new wave server with range queries. The parser
  stays behind `WaveformFileParser`, so each option fits later.
- Terminal links, drag and drop, the WCP server, the API for other extensions.

## Order of work

1. Test plugin for Orca behavior. Done on Orca 1.4.255 and 1.4.259. See [orca-test-results.md](orca-test-results.md).
2. Open a VCD or FST file, show the tree, add signals, draw, zoom, markers.
3. Waveform list for each workspace, close, session file, Orca restart.
4. Menus, input boxes, key events, settings, status bar.
5. Orca PRs (issues first), then the FSDB and remote decision.
