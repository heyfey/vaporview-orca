// The Orca worker of the plugin. It has the role of the VS Code extension host:
// it runs the vaporview extension code (on the adapter in src/adapter/vscode.ts), owns the
// documents and the parser, and connects the editor frames and the sidebar panel to them.
//
// Orca workarounds, each behind one small part of this file:
//   - FrameLink:   message transport to an editor frame (Orca has no byte transport and no tab events)
//   - sessionFile: the tab opens a small session file, not the waveform file (a custom editor gets no path)
//   - browse:      file selection in the panel (a plugin has no open-file dialog)

import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { activate as activateVaporview } from '../../vaporview/src/extension_core/extension';
import {
  setAdapterHost, registry, createExtensionContext, Uri, WebviewPanel, CancellationTokenSource,
  TreeItemCollapsibleState, type TreeView,
} from '../adapter/vscode';
import { encodeMessages } from '../common/codec';

const VIEW_TYPE = 'vaporview.waveformViewer';
const TREE_ID = 'waveformViewerNetlistView';
const SESSION_DIR = '.vaporview';
const SESSION_SUFFIX = '.vaporview.json';
const WAVEFORM_SUFFIXES = ['.vcd', '.fst', '.ghw'];

const POLL_HOLD_MS = 20_000;       // a poll with no message returns after this time
const POLL_MIN_SPACING_MS = 150;   // keeps the frame below Orca's limit of 120 messages in 10 s
const BATCH_MAX_CHARS = 600_000;   // an answer must stay below 1 MiB
const LIVE_PROBE_MS = 800;
const FRAME_START_MS = 20_000;

type WorkspaceContext = { workspaceId?: string; displayName: string; branch: string } | null;
type WorkspaceInfo = { key: string; id?: string; name: string; path?: string };

type Entry = {
  key: string;
  workspace: WorkspaceInfo;
  waveformPath: string;
  sessionPath?: string;      // absolute path of the session file
  document: any;             // VaporviewDocument
  panel: WebviewPanel;
  link: FrameLink;
  state: unknown;            // the state that the webview keeps with setState()
  saveTimer?: NodeJS.Timeout;
};

/** Messages from the worker to the editor frame of one document. The frame pulls them. */
class FrameLink {
  instance: string | undefined;          // the frame that is connected now
  private outbox: unknown[] = [];
  private waiting: ((batch: { messages: string }) => void) | undefined;
  private waitTimer: NodeJS.Timeout | undefined;
  private lastAnswerAt = 0;
  private pollSeen: (() => void) | undefined;
  private started: (() => void) | undefined;

  post(message: unknown): void {
    this.outbox.push(message);
    this.flush();
  }

  /** A new frame connected. Messages for the old frame are of no use to it. */
  connect(instance: string): void {
    this.instance = instance;
    this.outbox = [];
    this.release({ messages: '[]' });
  }

  /** The webview in the frame finished its start. */
  markStarted(): void { this.started?.(); this.started = undefined; }

  poll(instance: string): Promise<{ messages: string; stale?: boolean }> {
    if (instance !== this.instance) { return Promise.resolve({ messages: '[]', stale: true }); }
    this.pollSeen?.();
    this.pollSeen = undefined;
    this.release({ messages: '[]' });
    return new Promise((resolve) => {
      this.waiting = resolve;
      this.waitTimer = setTimeout(() => this.release({ messages: '[]' }), POLL_HOLD_MS);
      this.flush();
    });
  }

  private release(batch: { messages: string }): void {
    clearTimeout(this.waitTimer);
    const resolve = this.waiting;
    this.waiting = undefined;
    if (resolve) { this.lastAnswerAt = Date.now(); resolve(batch); }
  }

  private flushTimer: NodeJS.Timeout | undefined;
  private flush(): void {
    if (!this.waiting || this.outbox.length === 0 || this.flushTimer) { return; }
    const wait = Math.max(0, this.lastAnswerAt + POLL_MIN_SPACING_MS - Date.now());
    this.flushTimer = setTimeout(() => {
      this.flushTimer = undefined;
      if (!this.waiting || this.outbox.length === 0) { return; }
      const { json, count } = encodeMessages(this.outbox, BATCH_MAX_CHARS);
      this.outbox.splice(0, count);
      this.release({ messages: json });
    }, wait);
  }

  /** True if the connected frame answers. Orca does not tell the worker when a frame goes away. */
  async isLive(): Promise<boolean> {
    if (!this.instance) { return false; }
    const seen = new Promise<boolean>((resolve) => {
      this.pollSeen = () => resolve(true);
      setTimeout(() => resolve(false), LIVE_PROBE_MS);
    });
    this.release({ messages: '[]' });   // the frame polls again immediately if it is alive
    return seen;
  }

  whenStarted(): Promise<boolean> {
    return new Promise((resolve) => {
      this.started = () => resolve(true);
      setTimeout(() => resolve(false), FRAME_START_MS);
    });
  }
}

export default async function activate(orca: any): Promise<void> {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const log = (m: string) => orca.log(m);
  const token = new CancellationTokenSource().token;
  const entries = new Map<string, Entry>();
  const activeByWorkspace = new Map<string, string>();   // workspace key -> entry key
  let currentWorkspace: WorkspaceInfo | undefined;

  const notify = (level: string, message: string) => {
    log(`[${level}] ${message}`);
    orca.panels.post('panel.message', { level, message });
  };

  setAdapterHost({
    extensionPath: path.join(here, 'ext'),
    log,
    notify,
    executeHostCommand: (command: string) => { log(`[adapter] command not available in Orca: ${command}`); return undefined; },
    statusBarChanged: () => undefined,
  });
  await activateVaporview(createExtensionContext());
  const provider = registry.customEditors.get(VIEW_TYPE)!.provider;
  const tree = registry.treeViews.get(TREE_ID) as TreeView<any>;
  const treeData = tree.options.treeDataProvider;
  log(`vaporview core active: ${registry.commands.size} commands`);

  // ------------------------------------------------------------------------------------------
  // Workspaces
  // ------------------------------------------------------------------------------------------

  async function resolveWorkspace(context: WorkspaceContext): Promise<WorkspaceInfo | undefined> {
    if (!context) { return undefined; }
    const info: WorkspaceInfo = {
      key: context.workspaceId ?? `${context.displayName}\n${context.branch}`,
      id: context.workspaceId,
      name: context.displayName,
    };
    try {
      const { workspaces } = await orca.host.call('workspace.list');
      const found = context.workspaceId
        ? workspaces.find((w: any) => w.id === context.workspaceId)
        // Orca before host API 1.7 gives no id. The name and the branch are then the key.
        : workspaces.find((w: any) => w.name === context.displayName && (w.branch ?? '') === context.branch);
      if (found) { info.id = found.id; info.path = found.path; }
    } catch (err: any) {
      log(`workspace.list failed: ${err?.code ?? err}`);
    }
    return info;
  }

  // ------------------------------------------------------------------------------------------
  // Documents
  // ------------------------------------------------------------------------------------------

  const entryKey = (ws: WorkspaceInfo, waveformPath: string) => `${ws.key}\n${Uri.file(waveformPath).fsPath}`;

  function listFor(ws: WorkspaceInfo | undefined) {
    if (!ws) { return { workspace: null, waveforms: [], active: null }; }
    const waveforms = [...entries.values()].filter((e) => e.workspace.key === ws.key).map((e) => ({
      key: e.key, name: path.basename(e.waveformPath), folder: path.dirname(e.waveformPath),
    }));
    return { workspace: ws.name, waveforms, active: activeByWorkspace.get(ws.key) ?? null };
  }

  const panelChanged = () => orca.panels.post('panel.changed', listFor(currentWorkspace));

  /** Makes one document the active one of the vaporview core, so that the tree shows it. */
  function setActive(entry: Entry | undefined): void {
    for (const e of entries.values()) {
      if (e !== entry) { e.panel.setViewState(false, false); }
    }
    if (entry) {
      activeByWorkspace.set(entry.workspace.key, entry.key);
      entry.panel.setViewState(true, true);
    }
    resetTree();
    panelChanged();
  }

  async function loadWaveform(ws: WorkspaceInfo, waveformPath: string): Promise<Entry> {
    const key = entryKey(ws, waveformPath);
    const existing = entries.get(key);
    if (existing) { return existing; }
    if (!fs.existsSync(waveformPath)) { throw Object.assign(new Error(`File not found: ${waveformPath}`), { code: 'action_failed' }); }

    const link = new FrameLink();
    const entry: Entry = { key, workspace: ws, waveformPath, document: undefined, panel: undefined as any, link, state: undefined };
    entry.panel = new WebviewPanel(VIEW_TYPE, (m) => link.post(m), () => void showTab(entry));
    entry.document = await provider.openCustomDocument(Uri.file(waveformPath), {}, token);
    await provider.resolveCustomEditor(entry.document, entry.panel, token);
    entries.set(key, entry);
    return entry;
  }

  async function closeWaveform(entry: Entry): Promise<void> {
    entries.delete(entry.key);
    if (activeByWorkspace.get(entry.workspace.key) === entry.key) { activeByWorkspace.delete(entry.workspace.key); }
    entry.link.post({ command: 'orca-closed' });
    try { entry.panel.dispose(); } catch (err) { log(`panel dispose failed: ${err}`); }
    try { await entry.document.dispose(); } catch (err) { log(`document dispose failed: ${err}`); }
    const next = [...entries.values()].find((e) => e.workspace.key === entry.workspace.key);
    setActive(next);
  }

  // ------------------------------------------------------------------------------------------
  // Session file: the file that the editor tab opens. It names the waveform file and holds the
  // view state. The worker makes it and writes it. The person does not open it by hand.
  // ------------------------------------------------------------------------------------------

  function sessionFileFor(entry: Entry): string | undefined {
    if (entry.sessionPath) { return entry.sessionPath; }
    if (!entry.workspace.path) { return undefined; }
    const dir = path.join(entry.workspace.path, SESSION_DIR);
    fs.mkdirSync(dir, { recursive: true });
    const ignore = path.join(dir, '.gitignore');
    if (!fs.existsSync(ignore)) { fs.writeFileSync(ignore, '*\n'); }
    const base = path.basename(entry.waveformPath);
    // A different waveform file with the same name gets a number.
    for (let n = 0; n < 100; n++) {
      const candidate = path.join(dir, `${base}${n ? `.${n}` : ''}${SESSION_SUFFIX}`);
      let owner: string | undefined;
      try { owner = JSON.parse(fs.readFileSync(candidate, 'utf8')).fileName; } catch { owner = undefined; }
      if (owner === undefined || Uri.file(owner).fsPath === Uri.file(entry.waveformPath).fsPath) {
        if (owner === undefined) { fs.writeFileSync(candidate, JSON.stringify({ fileName: entry.waveformPath }, null, 2)); }
        entry.sessionPath = candidate;
        return candidate;
      }
    }
    return undefined;
  }

  function saveSessionSoon(entry: Entry): void {
    clearTimeout(entry.saveTimer);
    entry.saveTimer = setTimeout(() => {
      const file = sessionFileFor(entry);
      if (!file || !entries.has(entry.key)) { return; }
      const state = (entry.state && typeof entry.state === 'object') ? entry.state : {};
      try {
        fs.writeFileSync(file, JSON.stringify({ ...state, fileName: entry.waveformPath }, null, 2));
      } catch (err: any) {
        log(`cannot write the session file: ${err?.message ?? err}`);
      }
    }, 800);
  }

  async function showTab(entry: Entry): Promise<void> {
    const file = sessionFileFor(entry);
    if (!file || !entry.workspace.id || !entry.workspace.path) {
      throw Object.assign(new Error('Orca did not give the folder of this workspace.'), { code: 'action_failed' });
    }
    const relative = path.relative(entry.workspace.path, file).split(path.sep).join('/');
    await orca.host.call('editor.open', { workspaceId: entry.workspace.id, path: relative });
  }

  /** Before a command changes the view: make sure that a frame shows the document. */
  async function ensureFrame(entry: Entry): Promise<void> {
    if (await entry.link.isLive()) { return; }
    const started = entry.link.whenStarted();
    await showTab(entry);
    if (!(await started)) { log('the editor frame did not start in time'); }
  }

  // ------------------------------------------------------------------------------------------
  // Editor frame requests
  // ------------------------------------------------------------------------------------------

  const fail = (message: string) => Object.assign(new Error(message), { code: 'action_failed' });
  const entryOf = (input: any): Entry => {
    const entry = entries.get(input?.docKey);
    if (!entry) { throw fail('This waveform is closed.'); }
    return entry;
  };

  orca.panels.handle('editor.hello', async (input: any) => {
    const ws = await resolveWorkspace(input.workspace);
    if (!ws) { throw fail('No workspace has the focus.'); }
    if (typeof input.fileName !== 'string' || !input.fileName) { throw fail('The session file names no waveform file.'); }
    const known = entries.has(entryKey(ws, input.fileName));
    const entry = await loadWaveform(ws, input.fileName);
    // After an Orca restart the worker has no state. The session file then gives it.
    if (!known && input.session && typeof input.session === 'object') {
      const { fileName: _f, ...state } = input.session;
      if (Object.keys(state).length) { entry.state = state; }
    }
    entry.link.connect(input.instance);
    currentWorkspace = ws;
    setActive(entry);
    return { docKey: entry.key, state: entry.state ?? null, uri: entry.document.uri.toString() };
  });

  orca.panels.handle('editor.poll', (input: any) => {
    const entry = entries.get(input?.docKey);
    if (!entry) { return { messages: '[]', closed: true }; }
    return entry.link.poll(input.instance);
  });

  orca.panels.handle('editor.send', (input: any) => {
    const entry = entryOf(input);
    if (input.instance !== entry.link.instance) { return { stale: true }; }
    if ('state' in input) { entry.state = input.state; saveSessionSoon(entry); }
    for (const message of input.messages ?? []) {
      if (message?.command === 'initialized') { entry.link.markStarted(); }
      entry.panel.receiveEmitter.fire(message);
    }
    return { ok: true };
  });

  // ------------------------------------------------------------------------------------------
  // Netlist tree. The vaporview core has one tree, for its active document.
  // ------------------------------------------------------------------------------------------

  let treeItems = new Map<number, any>();
  let treeIds = new Map<any, number>();
  let nextTreeId = 1;
  function resetTree(): void { treeItems = new Map(); treeIds = new Map(); orca.panels.post('tree.changed', {}); }
  function idOf(element: any): number {
    let id = treeIds.get(element);
    if (!id) { id = nextTreeId++; treeIds.set(element, id); treeItems.set(id, element); }
    return id;
  }
  treeData.onDidChangeTreeData?.(() => resetTree());
  tree.revealEmitter.event(({ element }) => orca.panels.post('tree.reveal', { id: idOf(element) }));

  async function describe(element: any) {
    const item = await treeData.getTreeItem(element);
    const label = typeof item.label === 'string' ? item.label : item.label?.label ?? '';
    return {
      id: idOf(element),
      label,
      description: typeof item.description === 'string' ? item.description : '',
      expandable: item.collapsibleState !== TreeItemCollapsibleState.None,
      kind: item.contextValue ?? '',
      icon: item.iconPath?.id ?? '',
      tooltip: typeof item.tooltip === 'string' ? item.tooltip : (item.tooltip?.value ?? ''),
    };
  }

  const activeEntry = (): Entry | undefined => {
    const key = currentWorkspace && activeByWorkspace.get(currentWorkspace.key);
    return key ? entries.get(key) : undefined;
  };

  orca.panels.handle('tree.children', async (input: any) => {
    if (!activeEntry()) { return { items: [] }; }
    const parent = input?.id ? treeItems.get(input.id) : undefined;
    if (input?.id && !parent) { return { items: [], stale: true }; }
    const children = (await treeData.getChildren(parent)) ?? [];
    return { items: await Promise.all(children.map(describe)) };
  });

  orca.panels.handle('tree.action', async (input: any) => {
    const entry = activeEntry();
    const element = treeItems.get(input?.id);
    if (!entry || !element) { return { stale: true }; }
    if (input.action === 'expand') { tree.expandEmitter.fire({ element }); return { ok: true }; }
    if (input.action === 'collapse') { tree.collapseEmitter.fire({ element }); return { ok: true }; }
    if (input.action === 'select') {
      tree.selection = [element];
      tree.selectionEmitter.fire({ selection: [element] });
      return { ok: true };
    }
    if (input.action === 'add') {
      await ensureFrame(entry);
      await registry.commands.get('vaporview.addVariable')?.(element);
      return { ok: true };
    }
    return { ok: false };
  });

  // ------------------------------------------------------------------------------------------
  // Panel requests
  // ------------------------------------------------------------------------------------------

  orca.panels.handle('panel.state', async (input: any) => {
    const ws = await resolveWorkspace(input?.workspace ?? null);
    if (ws?.key !== currentWorkspace?.key) {
      currentWorkspace = ws;
      const key = ws && activeByWorkspace.get(ws.key);
      setActive(key ? entries.get(key) : undefined);
    }
    return listFor(currentWorkspace);
  });

  orca.panels.handle('panel.open', async (input: any) => {
    if (!currentWorkspace) { throw fail('Select a workspace first.'); }
    const entry = await loadWaveform(currentWorkspace, input.path);
    setActive(entry);
    await showTab(entry);
    return { docKey: entry.key };
  });

  orca.panels.handle('panel.select', async (input: any) => {
    const entry = entryOf(input);
    setActive(entry);
    await showTab(entry);
    return { ok: true };
  });

  orca.panels.handle('panel.close', async (input: any) => {
    await closeWaveform(entryOf(input));
    return { ok: true };
  });

  // File selection. Orca has no open-file dialog for a plugin, so the panel shows this list.
  orca.panels.handle('panel.browse', async (input: any) => {
    let dir: string = input?.dir || currentWorkspace?.path || process.cwd();
    try {
      if (fs.statSync(dir).isFile()) { return { file: dir }; }
    } catch { /* the list below reports the error */ }
    try {
      const names = await fs.promises.readdir(dir, { withFileTypes: true });
      const folders = names.filter((n) => n.isDirectory()).map((n) => n.name).sort((a, b) => a.localeCompare(b));
      const files = names
        .filter((n) => n.isFile() && WAVEFORM_SUFFIXES.some((s) => n.name.toLowerCase().endsWith(s)))
        .map((n) => n.name).sort((a, b) => a.localeCompare(b));
      const parent = path.dirname(dir);
      return { dir, parent: parent === dir ? null : parent, sep: path.sep, folders: folders.slice(0, 500), files: files.slice(0, 500) };
    } catch (err: any) {
      return { dir, parent: path.dirname(dir), sep: path.sep, folders: [], files: [], error: err?.message ?? String(err) };
    }
  });

  orca.events?.on?.('workspace.changed', async (payload: any) => {
    const ws = await resolveWorkspace(payload?.context ?? null);
    if (ws?.key === currentWorkspace?.key) { return; }
    currentWorkspace = ws;
    const key = ws && activeByWorkspace.get(ws.key);
    setActive(key ? entries.get(key) : undefined);
  });
}
