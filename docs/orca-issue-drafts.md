# Orca issue drafts

Drafts for `stablyai/orca`, in the form of its feature request template. An outside PR needs a
linked issue. Not yet filed.

Drafts 1, 2, and 3 each have an agent in an Orca worktree (`~/orca/workspaces/orca/`). The agent
improves the draft, makes the change, and waits for a review before it files anything.

## 1. Plugin API: `editor.close` for workers

### Problem or use case

A plugin worker can open a file in an editor tab with `editor.open`, but it cannot close that tab.

My plugin is a waveform viewer (a port of the VS Code extension vaporview). Its sidebar panel lists
the open waveforms. Each waveform has an editor tab, which the worker opens with `editor.open`.
When the person closes a waveform in the panel, the worker frees the data, but the tab stays open
and can only show "this waveform is closed". The person must close the tab by hand.

The same applies to each plugin that has a list in a panel and one tab for each item (a database
browser with one tab for each query, a diff viewer).

### Proposed solution

`editor.close({ workspaceId, path }) → { closed: boolean }`, worker only, capability
`workspace:write`, the pair to `editor.open` as `terminal.close` is the pair to `terminal.create`.

- It uses the same path as a close in the user interface: flush the custom editor, then ask the
  person if the tab has unsaved changes. It never discards changes.
- `closed` is false when the person cancels, or when no tab shows that file.
- Desktop app only, as `editor.open`.

### Alternatives or additional context

Without it, the plugin shows a "closed" page in the tab. Related: #40813 (focus), #40365 and #42015
(more options for `editor.open`). I can make the PR.

## 2. Plugin API: an open-file dialog for workers

### Problem or use case

A plugin cannot ask the person to select a file. `files.saveAs` is the only dialog, and it hides
the path.

My plugin opens waveform files (VCD, FST) that are frequently not in a workspace: simulation
output in a scratch folder, often many gigabytes. The trusted worker reads the file itself with
`fs`, in parts. To let the person select the file, the plugin now draws its own file browser in an
HTML panel, with `fs.readdir` in the worker. That works, but it is not the Orca look, and each
plugin must make its own.

A database plugin that opens a SQLite file has the same need.

### Proposed solution

`files.pickOpen({ title?, filters?, multiple? }) → { status: 'picked' | 'cancelled', files: [{ hostId, path }] }`,
worker only (`trusted-worker`).

- A trusted worker already has the file access of the user account, and `workspace.list` already
  gives it absolute paths. The dialog gives no new access. Frames stay without paths.
- It answers `unavailable` when Orca has no window (`orca serve`).
- A rate limit, because a worker call has no user gesture.
- First version: local files. Files on SSH hosts or paired servers can follow, with the remote
  file browser of Orca.

### Alternatives or additional context

A frame method with a user gesture (as `files.saveAs`) does not help, because the frame must not
get the path. I can make the PR.

## 3. Plugin API: tell a worker which editor tabs are open

### Problem or use case

A worker cannot know which of its files are open in editor tabs, or which one shows.

Measured on Orca 1.4.255 with a test plugin (a worker and a custom editor):

- All editor frames of a plugin have the same caller id, so the id does not identify a tab.
- Orca destroys the frame when its tab goes to the background. The frame sends nothing at that
  time. A pending `plugin.request` of that frame aborts only at its timeout.
- So the worker learns that a tab shows (the new frame sends a request), but it never learns that
  a tab was hidden or closed.

My plugin (a waveform viewer) keeps parsed data for each open file in the worker. It cannot free
the data when the person closes the tab, and it cannot keep its panel in step with the active tab.

### Proposed solution

One state event in the style of `workspace.changed`, for workers, capability `workspace:read`:

`editor.tabs.changed { workspaceId, open: [{ path, active: boolean }] }`

Orca already saves the open files and the active file of each workspace in the workspace session,
and `workspace.changed` already comes from that session.

### Alternatives or additional context

#38415 (`ui:focus`) tells a plugin the kind of the focused tab and a short title, not the path and
not the list of open tabs. #40880 asks which tabs have unsaved changes. This request is the part
that neither gives. If the maintainers prefer to extend #38415, that also solves it. I can make the PR.

## 4. Plugin API: send bytes from a worker to its panel or editor

### Problem or use case

A worker can answer its panel or custom editor only with JSON, 1 MiB for each answer, and a frame
can send 120 messages in 10 s. Bytes must go as base64 text.

My plugin is a waveform viewer (a port of the VS Code extension vaporview). The worker parses the
waveform file with WASM and sends the value changes of each signal to the editor, LZ4-compressed.
One signal can have many millions of value changes.

Measured on Orca 1.4.259 (Windows) with a test plugin, base64 parts of 700 KiB through `plugin.request`:

- 40 parts (27 MiB of data): 0.22 s, about 120 MiB/s.
- 300 parts (205 MiB of data): 20.4 s, about 10 MiB/s, with 8 `rate_limited` errors.

So after the first 120 messages the speed is about 10 MiB/s. Orca also destroys the editor frame
when its tab goes to the background, so the same data moves again at each return to the tab.

Other plugins with the same need: image or media viewers, table viewers, log viewers.

### Proposed solution

Keep JSON as the default. In addition:

- A `plugin.request` answer and a `panels.post` payload can be an `ArrayBuffer` (or
  `{ json, buffers }`), with its own size limit, for example 16 MiB.
- A message budget that counts bytes, not only messages, so that a few large answers do not hit
  the limit of 120 messages.

On the desktop no step of the path needs JSON: the worker process already uses structured clone,
and `files.saveAs` and `bytes` documents already move an `ArrayBuffer` between a frame and Orca. Web
and paired clients can get base64, or a clean refusal that the plugin can detect.

A plugin detects the support with `orca.api.minor`.

### Alternatives or additional context

Base64 in JSON works but costs 33 percent and two copies. #38126 and #38304 are about file reads
for a custom editor, not about data that a worker makes. I can make the PR.

## 5. Plugin API: ask the person for a value (input prompt and quick pick)

Deferred (2026-11-14). Do not file until the built-ins are tested in Orca.

### Problem or use case

A plugin command cannot ask the person for one value. A palette command gets no arguments, and the
host API has no prompt.

My plugin is a port of a VS Code extension. Eight of its commands ask for one value with
`showInputBox` or `showQuickPick`: a bit range (`7:0`), a fixed point offset, a ruler time
increment, a signal name to add, a time unit. In Orca these commands cannot work, and the plugin
leaves them out.

The same applies to each command of the kind "rename", "go to", "add by name", or "select one of".

### Proposed solution

Two worker methods that show Orca's own controls in the focused window:

- `ui.prompt({ title, placeholder?, value? }) → { status: 'ok' | 'cancelled', value?: string }`
- `ui.pick({ title, items: [{ id, label, description? }] }) → { status: 'ok' | 'cancelled', id?: string }`

Orca already has each part: the rename dialogs (one text field, OK, Cancel), the command palette
for a list, and the confirm dialog that a plugin action can already show in the focused window.

Desktop app only. `unavailable` when Orca has no window. A rate limit, because a worker call has no
user gesture.

### Alternatives or additional context

A plugin can draw its own prompt in its panel or editor frame, but then each plugin has a
different look, and a command from the palette has no frame to draw in. I can make the PR.
