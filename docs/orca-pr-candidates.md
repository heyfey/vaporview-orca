# Orca PR candidates

Changes to propose to Orca (`stablyai/orca`) for the limits in [architecture.md](architecture.md).

- Cost comes from a read of the Orca source at commit `cbd50af5be`. Nobody built or ran a change.
  S is less than 150 lines, M is 150 to 600, L is more than 600. Tests and generated documents are in the count.
- Paths are relative to the root of the Orca repository.
- Each proposal must be general (useful for other plugins) and backward compatible (existing
  plugins work without a change, and older Orca refuses the new manifest key or method cleanly).

## Rules of the Orca project that apply

- **Issue first.** A PR from an outside contributor must link an issue. The template says that a PR
  without one is ignored (`.github/pull_request_template.md` line 15). One topic for each PR.
- **State the effect** on SSH and remote hosts, mobile, the three operating systems, and backward compatibility.
- **Checks:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`. Proof before and after. A statement about AI help.
- **Version numbers:** a new host method takes the next `since` value (now 10). The maintainers
  manage the release floor, so ask them which value to use. `proposed: true` keeps a method for
  development plugins only (`src/shared/plugins/workers/plugin-host-method-spec.ts` line 19). That
  is a low-risk first step for a new method.
- **Generated files:** run `generate:plugin-schemas`, `generate:plugin-author-typings`,
  `generate:plugin-declarative-runtime`, and `generate:plugin-authoring-skill-references`.
- **Speed of the project:** host API 1.6 came on 2026-11-10, and 1.7, 1.8, and 1.9 all came on
  2026-11-12, from one maintainer. Expect merge conflicts on a large PR. A clear issue can be
  sufficient: the maintainers possibly implement it themselves.

## Summary

| # | Candidate | Value for this port | Value for other plugins | Cost | Discussion risk | ROI |
|---|---|---|---|---|---|---|
| PR-4 | `editor.close` for the worker | Medium. "Close" in the panel also closes the tab. | Medium. A plugin that opens tabs can close them. | S to M (200 to 350) | Low. `terminal.close` and `editor.open` are the pattern. | High |
| PR-2 | Open-file dialog for the worker | Medium. Orca-native file selection. Removes the file browser. | High. All plugins that open a file outside the workspace, for example DB Studio with SQLite files. | S to M (150 to 300), local only | Medium. A dialog with no user gesture, remote hosts. | High |
| PR-3 | Editor tab events | High. Exact tracking of the open and the active tab. | High. All plugins with a custom editor and a worker. | M (250 to 400) | Medium. Event shape, about 300 ms delay. | Medium to high |
| PR-1 | Custom editor with no content, path for the worker | Highest. Click a waveform file in the file explorer. No size limit. | High. Large or binary files. DB Studio records the same gap in its ADR 0003. | M (400 to 600) | High. Remote hosts, a new surface with no buffer. | Medium |
| PR-6 | Byte transport from worker to page: raw bytes (not base64 text in JSON), larger answers, no small message limit | Critical for performance. A signal has 50 million to 500 million value changes. Today: 1 MiB for each answer, 120 messages in 10 s, about 10 MiB/s. | High. All plugins with large data: images, tables, logs. | S on desktop (100 to 250), M with web clients | Medium. A larger limit is the difficult part. | High |
| PR-5 | Keep a hidden page alive | High. The only change that removes the data reload on each return to a tab. | Medium. Heavy editors. | L (more than 600) | High. Memory for each page, eviction. | Medium |
| PR-7 | Input prompt and quick pick for a plugin command | Medium. Eight vaporview features need it (see [feature-parity.md](feature-parity.md)). They are blocked until Orca has it. | High. Each plugin command that needs one value from the person. | M (250 to 400), estimated from the built-ins below, not from a full read | Medium. Where the prompt shows, and focus. | Medium to high |
| PR-8 | Toast in the Orca window for a plugin (information, success, warning, error) | Medium. vaporview messages get the Orca look, and they show when the panel is closed. | High. Each plugin has short results and errors to show. | Not yet estimated | Not yet known | Not yet known |
| | Workspace id for frames | | | | | Done in host API 1.7 |

Recommended order:

1. Open an issue for each candidate now. The cost is small, and the maintainers add host methods quickly.
2. PR-4 and PR-2 first. They are small, they copy an existing pattern, and they are independent of the port.
3. PR-3 next. It replaces the largest workaround (messages from the frame for tracking).
4. PR-1 after the port works. It needs the most design work with the maintainers, and the port is the proof of the use case.
5. PR-6 is critical for large waveforms. Open its issue now, with the measured numbers. PR-5 is large, so open an issue and ask the maintainers for their view.
6. PR-7 is deferred (decision of 2026-11-14). The built-ins that the proposal builds on were read in the source only. Nobody tested them in Orca, so it is not confirmed that they fit the use model of the plugin. The findings stay in this file.

## Survey of open work in `stablyai/orca` (2026-11-14)

Searched with `gh` in the open and closed PRs and issues.

| Candidate | Duplicate | Related work |
|---|---|---|
| PR-4 `editor.close` | None found | Issues #40813 (move keyboard focus into the editor tab that `editor.open` shows), #40365 (`editor.open` in the custom editor of the caller), #42015 (`editor.open` at a line). They extend `editor.open`. None closes a tab. |
| PR-2 open-file dialog | None found | None |
| PR-3 editor tab events | Partial | Open PR #38415 "let plugins see which kind of tab is focused (ui:focus)": method `ui.readFocus` and event `ui.focus.changed`. It gives the kind of the focused tab and a short title (a file name, never a path). No review decision since 2026-11-05. Issue #40880 asks which editor tabs have unsaved changes. |
| PR-6 byte transport | None found | Issue #38126 and PR #38304 are about file reads for editors, not about the worker. |
| PR-7 input prompt | None found | None |
| PR-1 (later) | Partial | Issue #38126 and open PR #38304: range reads for `bytes` editors, files to 1 GiB, 256 KiB for each read, no path. |

Consequence for PR-3: do not build a second focus API. The issue must name #38415 and #40880 and ask
for the part that they do not give: the open editor tabs of a workspace with their paths, for the
worker. Wait for an answer from the maintainers before the code.

Worktrees for the first three candidates (from the local clone, commit `7731665e37`, in `~/orca/workspaces/orca/`):

| Candidate | Worktree | Branch |
|---|---|---|
| PR-4 | `plugin-editor-close` | `feat/plugin-editor-close` |
| PR-2 | `plugin-open-file-dialog` | `feat/plugin-open-file-dialog` |
| PR-3 | `plugin-editor-tab-events` | `feat/plugin-editor-tab-events` |

Issue drafts: [orca-issue-drafts.md](orca-issue-drafts.md).

## Orca built-ins with the same use model

Before a proposal, look for a built-in of Orca that already does the same thing for the person. The
proposal then gives a plugin the same thing, with the same look.

Status of this table: from a read of the source only. Nobody tested these built-ins in Orca for
this purpose, so the fit with the use model of the plugin is not confirmed.

| Candidate | Built-in of Orca with the same use model | Where |
|---|---|---|
| PR-7 input prompt | Rename dialogs: a dialog with one text field, OK and Cancel | `src/renderer/src/components/sidebar/HostRenameDialog.tsx` (106 lines), `src/renderer/src/components/editor/panel/untitled-rename/UntitledFileRenameDialog.tsx` |
| PR-7 input prompt | Built-in actions `tab.rename` and `workspace.rename`. A plugin can already start them with `commands.run`, and Orca shows its own input. | Host API `commands.run` |
| PR-7 input prompt | A worker can already make Orca ask the person: the confirm dialog for plugin actions, shown in the focused window | `src/main/plugins/consent/plugin-action-confirmation.ts` line 36, `src/main/plugins/panels/desktop-actions/plugin-frame-desktop-services.ts` line 53 |
| PR-7 quick pick | The command palette (Cmd+J). Plugin commands are already rows in it. | `src/renderer/src/components/cmd-j/plugin-quick-actions.ts`, `src/renderer/src/components/ui/command.tsx` |
| PR-7 both | Native `Input`, `Select`, and `RadioGroup` controls that Orca draws for a `components` panel | `skill-guides/orca-plugin-authoring/references/components.md` |
| PR-2 open-file dialog | Orca opens the native file dialog for its own imports: terminal configuration, browser cookies, Warp themes | `src/main/ipc/single-flight-open-dialog.ts`, `src/main/terminal-config-import/choose-config-file.ts` |
| PR-2 open-file dialog | Quick Open (files of the workspace) and the remote path browser (folders on SSH hosts and paired servers) | `src/renderer/src/components/quick-open-file-list.ts`, `src/renderer/src/components/sidebar/host-path-browser/RemoteFileBrowser.tsx` |
| PR-4 `editor.close` | The close command of a tab, with the prompt for unsaved changes. For plugins: `terminal.close`. | `src/renderer/src/components/tab-group/workspace-tab-close-commands.ts` |
| PR-3 tab events | The event `workspace.changed`, made from the saved workspace session, which also holds the open files | `src/main/plugins/runtime/plugin-runtime-binding.ts`, `src/shared/workspace-session/workspace-session-schema.ts` |
| PR-5 keep a page alive | Terminals and browser panes stay alive behind other tabs, with eviction for browser panes | `src/renderer/src/components/tab-group/TabGroupPanel.tsx`, `src/renderer/src/components/browser-pane/host-guest/webview-registry.ts` |
| PR-6 byte transport | Orca sends file bytes to a `bytes` editor as an `ArrayBuffer`. `files.saveAs` takes an `ArrayBuffer` from a frame. | `src/renderer/src/components/editor/plugin-editors/plugin-custom-editor-host.ts`, `src/shared/plugins/workers/plugin-host-api.ts` |
| PR-1 no-content editor | Open PR #38304 gives a `bytes` editor range reads of the file | PR #38304 |

## PR-4: `editor.close`

- **Today.** `editor.open {workspaceId, path}` goes from the worker to the renderer through a relay
  (`src/shared/plugins/workers/plugin-host-api-workspace-methods.ts` line 306,
  `src/main/plugins/view/plugin-host-renderer-actions.ts`,
  `src/renderer/src/components/plugins/view/plugin-view-host-actions.ts`). No method closes a tab.
- **Proposal.** `editor.close({ workspaceId, path }) → { closed: boolean }`, capability `workspace:write`, worker only.
  `closed` is false when the tab has unsaved changes and the person cancels.
- **General.** The pair to `editor.open`, as `terminal.close` is the pair to `terminal.create`.
- **Backward compatible.** A new method. A plugin examines `host.has('editor.close')`.
- **Concern.** A tab with unsaved changes. The method must use the same path as the user interface:
  flush the frame, then ask the person. It must never discard changes.

## PR-2: open-file dialog

- **Today.** `files.saveAs` is the only dialog (`src/shared/plugins/workers/plugin-host-api.ts` line 277).
  It is for frames only, needs a user gesture, and hides the path from the plugin.
- **Proposal.** Worker only: `files.pickOpen({ filters?, multiple? }) → { status, files: [{ hostId, path }] }`.
  It answers `unavailable` when Orca has no window (`orca serve`).
- **General.** A trusted worker already has full file access and already gets absolute paths from
  `workspace.list`. The dialog adds no new access. It only lets the person select.
- **Backward compatible.** A new method.
- **Concerns.** A worker call has no user gesture, so expect a rate limit. The remote file browser
  of Orca selects folders only, so remote file selection is more work (M). The first PR can be
  local only and state that limit.

## PR-3: editor tab events

- **Today.** The renderer saves the open files and the active file of each workspace in the
  workspace session (`src/shared/workspace-session/workspace-session-schema.ts` line 171). The main
  process already makes `workspace.changed` from that session
  (`src/main/plugins/runtime/plugin-runtime-binding.ts` line 211). No event tells a plugin about tabs.
- **Proposal.** One state event, in the style of `workspace.changed`:
  `editor.tabs.changed { workspaceId, open: [{ path, active }] }`, capability `workspace:read`.
  Paths go to workers only, not to frames.
- **General.** Each plugin with a custom editor and a worker has the same problem: the caller id is
  the same for all its editor frames, and a frame that goes away sends nothing.
- **Backward compatible.** A new event. A plugin lists it in `contributes.events`.
- **Concerns.** About 300 ms delay (two debounce steps). A fast open and close can collapse into
  one event. A split view shows more than one file, but the session has one active file for each workspace.

## PR-1: custom editor with no content

- **Today.** `contentKind` is `text` or `bytes`
  (`src/shared/plugins/contributions/plugin-custom-editor-contribution.ts` line 19). Orca reads the
  file before the editor starts. The limit is 64 MiB
  (`src/shared/plugins/frames/plugin-custom-editor-bridge.ts` line 14), and a text file larger than
  50 MiB fails before Orca selects an editor. A `bytes` editor only gets files that Orca judges
  binary, so a text `.vcd` cannot use it. The frame never gets a path (same file, line 9).
- **Proposal.** `contentKind: "none"`. Orca does not read the file and applies no size limit. The
  document carries an opaque `documentId`. The worker calls
  `editor.resolveDocument({ documentId }) → { workspaceId, hostId, path }` with `workspace:read`.
- **General.** For all editors whose data is too large or is read in parts: waveforms, databases,
  large logs, media. The frame stays without a path, which keeps the Orca security model. Only the
  trusted worker gets the path, and it already has paths from `workspace.list`.
- **Backward compatible.** A new value of an existing key. Older Orca refuses the manifest, so the
  plugin sets `engines.orca` to the first version that has it.
- **Concerns.** A file on an SSH host or a paired server: the path is on a different machine than
  the worker. Browser clients. A surface with no buffer and no save is new in the renderer.

## PR-6: raw bytes from worker to frame

- **Today.** No step on the desktop path uses JSON serialization. The worker process uses
  `serialization: 'advanced'` (`src/main/plugins/workers/parent-process/plugin-host-process.ts` line 59).
  JSON-only is a policy check (`src/main/plugins/panels/plugin-panel-bridge.ts` line 180). The limits
  are 1 MiB for an answer and 256 KiB for a post
  (`src/shared/plugins/workers/plugin-panel-bridge-protocol.ts` lines 18 and 19).
- **Proposal.** JSON stays the default. An answer can also be an `ArrayBuffer`, with its own limit.
- **General.** `files.saveAs` and `bytes` documents already move binary data on the same path.
- **Concerns.** Web clients and paired clients use JSON RPC and need base64 or a clean refusal. A
  larger limit is the part that the maintainers are likely to question.
- **Measured need.** The data path gives 118 MiB/s for the first 60 MiB and 10 MiB/s after that.
  The message rate limit is the cause, not base64. So this PR alone does not remove the limit.

## PR-7: input prompt and quick pick

- **Today.** A palette command gets only `{ signal }`. The host API has no method that asks the
  person for a value. VS Code has `showInputBox` and `showQuickPick` for this.
- **Proposal.** Worker methods that use the palette user interface of Orca:
  `ui.prompt({ title, placeholder?, value? }) → { status, value }` and
  `ui.pick({ title, items }) → { status, item }`.
- **General.** Rename, go to, add by name, select one of a list: each plugin with commands has these cases.
- **Backward compatible.** New methods.
- **Confirm is the smallest part.** A plugin can show only a desktop notification with no buttons
  (`notifications.show({ title, body })`). Orca has a native question dialog for plugin actions
  (`confirmPluginAction` in `src/main/plugins/consent/plugin-action-confirmation.ts`), but only Orca
  itself can call it. A worker method `ui.confirm({ message, detail?, confirmLabel, cancelLabel? })`
  can use that function directly. The plugin now shows no question. For the question
  before a large add of signals, it adds the signals.
- **Pattern to copy.** The rename dialogs for the look, the plugin confirm dialog for "a worker asks the person", and the relay of `editor.open` for the path from worker to renderer.
- **Open.** The concerns of the maintainers are not yet known. The cost is an estimate from those built-ins.

## PR-8: toast in the Orca window

- **Today.** A plugin can show a message in three places: its own page, its status bar item, or a
  desktop notification of the operating system (`notifications.show({ title, body })`). Orca
  shows toasts in its window for its own messages (the `sonner` library, with the kinds error,
  success, warning, information, plain message, and loading), but the plugin API has no method
  for them.
- **Proposal.** `ui.toast({ level: 'info' | 'success' | 'warning' | 'error', message, description? })`
  for the worker and for frames, with a rate limit. Orca adds the plugin name, as it does for a
  desktop notification.
- **General.** Short results ("copied") and errors of each plugin. VS Code has the same three
  levels: information, warning, error.
- **Backward compatible.** A new method.
- **Survey (2026-11-15).** No open PR or issue for a toast. Related, both about the desktop
  notification: issue #27968 (dismiss a notification) and PR #24041 (open the workspace on a click).
- **The plugin today.** A vaporview message shows in the message bar of the panel.

## PR-5: keep a hidden frame alive

- **Today.** Orca draws only the active tab of a tab group, and the frame is a plain child of that
  view (`src/renderer/src/components/tab-group/TabGroupPanel.tsx` line 395). A sidebar panel is
  drawn only while it is selected and the sidebar is open. Terminals and browser panes are kept
  alive deliberately, so the pattern exists.
- **Proposal.** `"retainWhenHidden": true` for `customEditors[]` and `panels[]`, as a hint that Orca can ignore to free memory.
- **Concerns.** Memory for each guest process, an eviction budget, timer throttling in hidden guests.
- **Why it matters.** With no extra cache in the worker, each return to a tab decodes and moves the signal data again. For large signals that takes many seconds, also with PR-6.

## Small issue: development plugin in a WSL folder

`plugin dev load` of a folder under `\\wsl.localhost\...` passes the manifest check, but the worker
stops with `Cannot read package config \\?\UNC\wsl.localhost\package.json`. This is worth an issue
with the exact error. It affects each plugin author who keeps source in WSL and runs Orca on Windows.
