# Orca behavior: test results

Date: 2026-11-14. Orca desktop app on Windows 11, worker Node 24.22.1. First run: 1.4.255 (host API 1.4).
Second run: 1.4.259 (host API 1.9). The two runs gave the same results, except row 14.
The workspace is a WSL folder (`\\wsl.localhost\AlmaLinux-8\...`).

The test plugin is in `tools/orca-probe`. It has a worker, an editor for `*.vvprobe.json`, and an HTML
panel. The Orca CLI drives it (`plugin dev request`, `plugin open`, `plugin logs`).

## How to run

A plugin worker cannot start from a `\\wsl.localhost` folder (see result 1). The script copies the
plugin to a Windows folder.

```bash
ORCA=/mnt/c/Users/<user>/AppData/Local/Programs/orca/resources/bin/orca.exe
tools/orca-probe/sync.sh                          # copy to C:\Users\<user>\orca-plugin-dev\vaporview-probe
$ORCA plugin dev load 'C:\Users\<user>\orca-plugin-dev\vaporview-probe' --json   # prints an approval fingerprint
$ORCA plugin dev load '<same path>' --approve <fingerprint> --json
$ORCA plugin dev request local.vaporview-probe state --json
$ORCA plugin logs local.vaporview-probe --json
$ORCA plugin dev unload 'C:\Users\<user>\orca-plugin-dev\vaporview-probe' --json  # when done
```

## Results

| # | Question | Result | Consequence for the design |
|---|---|---|---|
| 1 | Can Orca load a development plugin from a WSL folder? | No. The worker stops with `Cannot read package config \\?\UNC\wsl.localhost\package.json`. The manifest check passes, and only the worker fails. | Develop in WSL, copy the build to a Windows folder. Candidate for an Orca issue. |
| 2 | Does a longer suffix open in the custom editor by default? | Yes. `a.vvprobe.json` opened in the plugin editor. | `*.vaporview.json` works. |
| 3 | Does `editor.open` accept a path relative to the workspace? | Yes. It takes 20 ms to 40 ms. | The worker can open the session file. |
| 4 | Does a second `editor.open` on an open file make a second tab? | No. No new frame started. | "Select a row shows the tab" works. |
| 5 | Does Orca keep the frame of a hidden tab? | No. Each time a tab shows, a new frame starts (new instance, document version 1). The old frame stops immediately. | The worker must hold all state. A frame is a view that the plugin makes again. |
| 6 | Is the caller id different for each tab? | No. All editor frames of the plugin had the same caller id, also after a text file was shown between them. The panel has its own caller id. | A message must name its waveform. The caller id cannot identify a tab. |
| 7 | Does the worker learn that a frame went away? | No. The frame sent no `pagehide` or `visibilitychange` report. The open request of the old frame aborted only at its timeout (120 s). | Do not use a pending request to detect a closed frame. The panel list is the truth. |
| 8 | What does a frame see when the worker writes its file? | Nothing in the first 6 s. No reload. A later frame got document version 2. | The worker can write the session file. The frame must accept a new document with the same `fileName`. Not conclusive for a workspace on a local drive. |
| 9 | Does WASM run in the worker? | Yes. `filehandler.wasm` (865,975 bytes) compiles in 2 ms, in the main thread and in a `worker_threads` thread. `SharedArrayBuffer` exists. | The vaporview parser design fits. The full parser run is step 2. |
| 10 | How fast are `fs` reads through `\\wsl.localhost`? | 64 KiB random reads: 0.93 ms each (67 MiB/s). Local drive: 0.30 ms (209 MiB/s). 4 KiB reads: 0.42 ms and 0.13 ms. | About 3 times slower, acceptable. |
| 11 | How fast is the data path from worker to frame? | 40 parts of 700 KiB: 0.23 s (118 MiB/s of raw data). 300 parts: 20.4 s (10 MiB/s), with 5 `rate_limited` errors. | The first 60 MiB are fast. After that the limit of 120 messages in 10 s applies. |
| 12 | Are worker answers checked? | Yes. An answer with an `undefined` value fails with "answered with a non-JSON value". | Answers must be strict JSON. |
| 13 | Does a post to all frames arrive? | Yes. The editor frame got the `ping`. | `panels.post` works for commands. |
| 14 | What does the frame know about the workspace? | Host API 1.4 gives `displayName` and `branch` (empty for a folder workspace). No `workspaceId`. `workspace.list` gives ids and absolute paths to the worker. | Use `workspaceId` when Orca has host API 1.7. If not, use name plus branch. |
| 15 | Does the editor frame get input events? | Yes (1.4.259, done by hand). `focus`, `blur`, `pointerdown` (left and right button), `contextmenu`, and `keydown` for plain keys all arrived. | Key handling and an HTML context menu in the frame are possible. Keys with Ctrl or Alt are not yet tested. |
| 16 | Is the caller id stable? | Only while Orca runs. After an Orca restart the editor caller id was different. | Do not save a caller id. |
| 17 | What does a restored tab do at an Orca start? | The frame started two times in 2 s (two instances, the first one stopped). | The start of a frame must be cheap and safe to repeat. |
| 18 | Does a development plugin stay loaded after an Orca update? | Yes. The plugin ran after the update to 1.4.259 with no new approval. | |
| 19 | Does a frame get the workspace id? | No (1.4.259). Only the worker gets `workspaceId` from `workspace.readContext`. A panel or editor frame gets `displayName` and `branch`. | The worker must find the workspace itself. |
| 20 | Can the CLI take a screenshot while the Orca window shows? | `plugin shot --panel` and `plugin shot --editor` work. The editor shot starts a new frame and captures it at its first paint, so it shows the load text. | For the editor, use the `debug.snapshot` request of the plugin. |
| 21 | Split view: does `editor.open` use a tab that is open in a different tab group? | Not always (1.4.259, by hand). In two runs Orca made a second tab in the group with the focus, in one run it used the open tab. The source shows that Orca looks only in the active group. | No workaround in the plugin. PR-12. |
| 22 | Split view: does a page in the group with no focus keep its contact with the worker? | No (1.4.259, by hand, three runs). It sent no request and answered no post from the moment when the other group got the focus. The cause is not known. | A command from the tree makes the page start again. Open question for the Orca maintainers. |
| 23 | What does Orca do when a promise of the worker fails and no code handles the error? | Orca stops the worker and starts it again after 500 ms (1.4.259, by CLI: two waveforms closed one after the other). The log has `worker exited unexpectedly (code null); restart 1 in 500ms`, with no error text. The source gives 3 restarts at most (delays 500 ms, 2 s, 5 s), then the state `errored` (`src/main/plugins/workers/worker-supervision/plugin-supervisor.ts`). The VS Code extension host only logs such an error. | Code that is safe in VS Code can stop the worker in Orca. The worker loses its memory: the waveform list is empty until a page starts again. See D10 in `feature-parity.md`. |
| 24 | Split view with two waveforms: does the page get a `focus` event when its tab group gets the focus? | Partly (1.4.259, by hand). A click in the page gives the event, and the request of the page reaches the worker. A click on the title of a tab that already shows in its group gives no event. | The tree follows a click in the waveform, not a click on such a tab title. PR-3. |

Row 14 on Orca 1.4.259: `workspace.readContext` and `workspace.changed` give `workspaceId` to the worker.

## Not tested

- Two editor frames at the same time (split view): rows 21, 22, and 24 only.
- Keys with Ctrl or Alt in the frame. Orca can take some of them for its own shortcuts.
- A workspace on a local drive (all tests used a WSL folder).
