# vaporview issue and PR drafts

Drafts for `Lramseyer/vaporview` (upstream). Not yet filed. Nothing is pushed.
On hold since 2026-11-16, by decision.

- The fix is in the local vaporview clone, branch `fix/file-reader-per-document`, one commit on top
  of upstream `main` (`7b63f84`, version 1.6.1). One file changes: `src/extension_core/wasm_handler.ts`.
- The contribution guide of vaporview asks for small changes that the author can explain, and it
  refuses "AI slop". The drafts are short for that reason. Read the diff before you file.
- A search of the upstream issues and PRs for "EBADF", "bad file descriptor", "file descriptor",
  and "nodeFsWrapper" gave no result (2026-11-16).

## Before you file

- [ ] Run the fix in VS Code (F5, "Extension Development Host"): open two VCD files, close both
      tabs, and confirm that the extension host log has no `EBADF` line. This is not yet done.
- [ ] Fill in the VS Code version and the OS in the issue.
- [ ] Decide about the two attribution lines (the `Co-Authored-By` line of the commit and the last
      line of the PR text).
- [ ] Push the branch to the fork. Open the issue first, then the PR with the issue number.

## 1. Issue draft

Title: `Closing a second waveform fails with EBADF: all documents share one file reader object`

Text, in the form of the bug report template:

---

**Describe the bug**

All open documents share one file reader object (`nodeFsWrapper` in
`src/extension_core/wasm_handler.ts`). The object holds one file descriptor, so each new document
overwrites the descriptor of the document before it.

When two documents are open and both close, the same descriptor closes twice. The second close
fails with `EBADF: bad file descriptor, close`. Nothing handles the error, so it is an unhandled
promise rejection. The descriptor of the other file never closes.

**To Reproduce**

1. Open a VCD file with Vaporview.
2. Open a second VCD file with Vaporview.
3. Close one of the two tabs.
4. Close the other tab.
5. Open the extension host log ("Developer: Show Logs..." and select the extension host. In a
   remote or WSL window, select the remote extension host).
6. See the line `[error] Error: EBADF: bad file descriptor, close`.

The order of the two closes does not matter. With three open files the error comes at the second
close.

**Expected behavior**

Each document closes its own file one time. No error, and no open file descriptor is left.

**Why nobody sees it**

- VS Code only logs an unhandled promise rejection of an extension. It shows no notification, and
  the log line has no stack and does not name the extension.
- A file below `vaporview.fstMaxStaticLoadSize` (256 MB by default) is read into memory at load,
  and a VCD file is parsed fully at load. After that the viewer does not use the descriptor, so
  adding signals still works after the descriptor is closed.

**Impact**

Confirmed:

- One `EBADF` error in the extension host log for each close after the first one.
- One leaked file descriptor: with two files open, one descriptor stays open after both documents
  close (counted through `/proc/self/fd`).
- Outside the VS Code extension host the error is fatal. Node terminates the process on an
  unhandled rejection by default, so a Node test or another host that runs the extension core
  stops when the second document closes.

From reading the code, not tested:

- Closing or reloading one document closes the descriptor of the document that was opened last,
  not its own. If that document is an FST file above `fstMaxStaticLoadSize`, which reads from the
  file on demand, its later signal loads fail.
- `bufferSize` is in the same shared object. One large FST file sets it to 8192, and every file
  that loads after it uses that small buffer.
- If the load of a document fails before the file opens, `unload()` can call `close(0)`.

**Cause**

- `getFsWrapper()` returns the same module-level object for every document
  (`return nodeFsWrapper;`).
- `loadFile()` writes `fd`, `fileSize`, `loadStatic`, and `bufferSize` into that object.
- `unload()` calls `this.fileReader.close(this.fileReader.fd)` and does not wait for the result
  or catch its error.

**Desktop**

- Vaporview: 1.6.1 (`7b63f84`)
- VS Code: `<fill in>`
- OS: `<fill in>`

**Additional context**

I have a small fix ready (one file) and can open a PR.

---

## 2. PR draft

Title: `Give each document its own file reader`

Text:

---

Fixes #`<issue number>`.

**Problem**

All documents shared one module-level file reader object, so a second open file overwrote the
file descriptor of the first one. Closing two documents closed the same descriptor twice (an
unhandled `EBADF` rejection) and leaked the other descriptor. The issue has the steps and the
details.

**Change**

One file, `src/extension_core/wasm_handler.ts`:

- `nodeFsWrapper` and `workspaceFsWrapper` become `createNodeFsWrapper()` and
  `createWorkspaceFsWrapper()`. `getFsWrapper()` returns a new object for each document, so each
  document has its own `fd`, `fileSize`, `loadStatic`, and `bufferSize`.
- `unload()` closes the descriptor only if one is open, sets it to 0, and logs a failed close to
  the output channel instead of leaving an unhandled rejection. The close is still not awaited, so
  the order of operations in `unload()` and `dispose()` is the same as before.
- The type of `fsWrapper.close` is now `void | Promise<void>`, which is what `promisify(fs.close)`
  already returned.

Most of the diff is indentation, because the two object literals moved into functions. With
whitespace hidden it is 30 added and 14 removed lines.

**Behavior**

No change for a user. No setting, command, or API changes.

**Testing**

- `npm run check-types` and `eslint` on the changed file pass.
- A Node harness that runs the extension core: open two VCD files, close both.

  | | Open descriptors: both open, after first close, after second close | Error |
  |---|---|---|
  | Before | 2, 1, 1 | `EBADF: bad file descriptor, close` |
  | After | 2, 1, 0 | none |

- Manual test in VS Code: `<fill in after the check in "Before you file">`

🤖 Generated with [Claude Code](https://claude.com/claude-code)

---

## Evidence that is not for the public text

- The extension host log of a VS Code session with two VCD files had the line
  `Error: EBADF: bad file descriptor, close` (2026-11-16). A second run with three files, two of
  them closed, gave the same error, and "add signal" still worked in the last file.
- In the Orca plugin the same defect stops the plugin worker, see D10 in `feature-parity.md`.
- The Node harness is `test/two-close.mjs` of this project (the worker of the plugin with the
  Orca stand-in of `test/hub.mjs`). It ran against the upstream file and against the fixed file.
  It is not a part of `npm test`, because it fails until the submodule has the fix.
