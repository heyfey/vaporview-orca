// The Orca worker of the plugin. It has the role of the VS Code extension host:
// it runs the vaporview extension code (on the adapter in src/adapter/vscode.ts), owns the
// documents and the parser, and connects the editor frames and the sidebar panel to them.
//
// Orca workarounds, each behind one small part of this file:
//   - FrameLink:   message transport to an editor frame (Orca has no byte transport and no tab events)
//   - sessionFile: the tab opens a small session file, not the waveform file (a custom editor gets no path)
//   - browse:      file selection in the panel (a plugin has no open-file dialog)

import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { activate as activateVaporview } from '../../vaporview/src/extension_core/extension';
import {
  setAdapterHost, registry, createExtensionContext, Uri, WebviewPanel, CancellationTokenSource,
  TreeItemCollapsibleState, fireConfigurationChanged, onDidChangeContextKey, type TreeView, type StatusBarItem,
} from '../adapter/vscode';
import { encodeMessages } from '../common/codec';
import { Menus } from './menus';

const VIEW_TYPE = 'vaporview.waveformViewer';
const TREE_ID = 'waveformViewerNetlistView';
const SESSION_DIR = '.vaporview';
const SESSION_SUFFIX = '.vaporview.json';
const WAVEFORM_SUFFIXES = ['.vcd', '.fst', '.ghw'];
const EDITOR_ID = 'vaporview.waveformViewer';
const SETTING_PREFIX = 'vaporview.';
// Questions of vaporview that get a fixed answer, because Orca has no question dialog for a
// plugin. Only questions in this list are answered with no person. A question that is not here
// shows in the pages of the plugin with its buttons.
const AUTO_ANSWERS: { match: RegExp; answer: string }[] = [
  // More than 48 signals at one time ("Add Selected", "Add All Variables in Scope").
  { match: /^You are about to add a large number of signals/, answer: 'Yes' },
  // A session file `<name>.json` is beside the waveform file and the page has no saved state.
  { match: /^Restore state from file:/, answer: 'Yes' },
];
// The status bar items of the manifest, in the order in which vaporview makes its items.
const STATUS_IDS = ['vaporview-marker', 'vaporview-delta', 'vaporview-signal'];

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

  // Messages. Orca gives a plugin only a desktop notification with no buttons, so the pages
  // of the plugin show a message, with its buttons if it has some.
  let messageId = 0;
  const questions = new Map<number, (answer: string | undefined) => void>();
  const notify = (level: string, message: string) => {
    log(`[${level}] ${message}`);
    orca.panels.post('ui.message', { id: ++messageId, level, message, items: [] });
  };
  const ask = (level: string, message: string, items: string[]): Promise<string | undefined> => {
    // Questions of vaporview that the plugin answers itself. The person is not asked.
    const rule = AUTO_ANSWERS.find((r) => r.match.test(message) && items.includes(r.answer));
    if (rule) {
      log(`[${level}] ${message} -> ${rule.answer} (no question in Orca)`);
      return Promise.resolve(rule.answer);
    }
    return askPerson(level, message, items);
  };
  // All other questions show in the pages of the plugin, with their buttons.
  const askPerson = (level: string, message: string, items: string[]): Promise<string | undefined> => {
    log(`[${level}] ${message} [${items.join(' | ')}]`);
    const id = ++messageId;
    orca.panels.post('ui.message', { id, level, message, items });
    return new Promise((resolve) => questions.set(id, resolve));
  };
  // Development aid: asks a question in the pages, to test the buttons.
  orca.panels.handle('debug.ask', (input: any) => askPerson('info', String(input?.message ?? 'Test question'), input?.items ?? ['Yes', 'No']).then((answer) => ({ answer: answer ?? null })));
  orca.panels.handle('ui.answer', (input: any) => {
    const resolve = questions.get(input?.id);
    questions.delete(input?.id);
    // The other pages remove the same question.
    orca.panels.post('ui.dismiss', { id: input?.id });
    resolve?.(typeof input?.item === 'string' ? input.item : undefined);
    return { ok: !!resolve };
  });

  // Settings. VS Code reads a setting without a wait, so the worker keeps a copy.
  let settings: Record<string, unknown> = {};
  try { settings = (await orca.settings?.get?.()) ?? {}; } catch (err: any) { log(`settings not available: ${err?.code ?? err}`); }
  orca.settings?.onDidChange?.(async () => {
    const before = settings;
    try { settings = (await orca.settings.get()) ?? {}; } catch { return; }
    const changed = Object.keys({ ...before, ...settings }).filter((k) => before[k] !== settings[k]);
    if (changed.length) { fireConfigurationChanged(changed.map((k) => SETTING_PREFIX + k)); }
  });

  // Status bar. Orca changes an item with a host call, so fast changes go out together.
  const statusTimers = new Map<number, NodeJS.Timeout>();
  const statusBarChanged = (item: StatusBarItem) => {
    const id = STATUS_IDS[item.index];
    if (!id || statusTimers.has(item.index)) { return; }
    statusTimers.set(item.index, setTimeout(() => {
      statusTimers.delete(item.index);
      const text = item.text.replace(/\$\([^)]*\)\s*/g, '').trim();
      orca.host.call('statusBar.update', { id, text, visible: item.visible && text.length > 0 }).catch(() => undefined);
    }, 150));
  };

  setAdapterHost({
    extensionPath: path.join(here, 'ext'),
    log,
    notify,
    ask,
    executeHostCommand: (command: string) => { log(`[adapter] command not available in Orca: ${command}`); return undefined; },
    getSetting: (key: string) => (key.startsWith(SETTING_PREFIX) ? settings[key.slice(SETTING_PREFIX.length)] : undefined),
    setSetting: (key: string, value: unknown) => {
      if (!key.startsWith(SETTING_PREFIX)) { return; }
      settings[key.slice(SETTING_PREFIX.length)] = value;
      orca.settings?.set?.(key.slice(SETTING_PREFIX.length), value)?.catch?.((err: any) => log(`cannot save setting ${key}: ${err?.code ?? err}`));
    },
    statusBarChanged,
    // The worker has no clipboard. A frame writes the text.
    clipboardWrite: (text: string) => orca.panels.post('clipboard.write', { text }),
  });
  await activateVaporview(createExtensionContext());
  const provider = registry.customEditors.get(VIEW_TYPE)!.provider;
  const tree = registry.treeViews.get(TREE_ID) as TreeView<any>;
  const treeData = tree.options.treeDataProvider;
  const menus = new Menus(JSON.parse(fs.readFileSync(path.join(here, 'ext', 'package.json'), 'utf8')));
  log(`vaporview core active: ${registry.commands.size} commands`);

  // Context keys that vaporview sets with the `setContext` command. Menus and keys use them.
  const contextKeys = () => Object.fromEntries(registry.contextKeys);
  onDidChangeContextKey.listeners.add(() => {
    for (const e of entries.values()) { if (e.link.instance) { e.link.post({ command: 'orca-context', keys: contextKeys() }); } }
    orca.panels.post('tree.context', {});
  });

  // ------------------------------------------------------------------------------------------
  // Workspaces
  // ------------------------------------------------------------------------------------------

  /**
   * Finds the workspace of a request. Orca gives the workspace id only to the worker (the id
   * contains a path), so the worker reads the focused workspace itself. A frame can only say
   * the name and the branch of its workspace, which is the `hint`.
   */
  async function resolveWorkspace(hint: WorkspaceContext): Promise<WorkspaceInfo | undefined> {
    const focused: WorkspaceContext = await orca.host.call('workspace.readContext').catch(() => null);
    const who = hint ?? focused;
    if (!who) { return undefined; }
    let workspaces: any[] = [];
    try {
      workspaces = (await orca.host.call('workspace.list')).workspaces;
    } catch (err: any) {
      log(`workspace.list failed: ${err?.code ?? err}`);
    }
    const sameAsFocused = focused && focused.displayName === who.displayName && focused.branch === who.branch;
    const found = (sameAsFocused && focused.workspaceId ? workspaces.find((w) => w.id === focused.workspaceId) : undefined)
      // Orca before host API 1.7 gives no id. The name and the branch are then the key.
      ?? workspaces.find((w) => w.name === who.displayName && (w.branch ?? '') === who.branch);
    return {
      key: found?.id ?? `${who.displayName}\n${who.branch}`,
      id: found?.id,
      name: who.displayName,
      path: found?.path,
    };
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
  let treeOwner: string | undefined;
  function setActive(entry: Entry | undefined): void {
    for (const e of entries.values()) {
      if (e !== entry) { e.panel.setViewState(false, false); }
    }
    if (entry) {
      activeByWorkspace.set(entry.workspace.key, entry.key);
      entry.panel.setViewState(true, true);
    }
    // The tree keeps its open nodes while the same waveform stays active.
    if (treeOwner !== entry?.key) { treeOwner = entry?.key; resetTree(); }
    panelChanged();
  }

  const loading = new Map<string, Promise<Entry>>();
  /** Waveforms that the person closed in the panel. An open tab of one must not load it again. */
  const closedKeys = new Set<string>();

  /** Loads a waveform file one time. A second call for the same file gets the same document. */
  function loadWaveform(ws: WorkspaceInfo, waveformPath: string): Promise<Entry> {
    const key = entryKey(ws, waveformPath);
    const existing = entries.get(key);
    if (existing) { return Promise.resolve(existing); }
    let pending = loading.get(key);
    if (!pending) {
      pending = createEntry(key, ws, waveformPath).finally(() => loading.delete(key));
      loading.set(key, pending);
    }
    return pending;
  }

  async function createEntry(key: string, ws: WorkspaceInfo, waveformPath: string): Promise<Entry> {
    if (!fs.existsSync(waveformPath)) { throw Object.assign(new Error(`File not found: ${waveformPath}`), { code: 'action_failed' }); }
    log(`load ${waveformPath} for workspace ${ws.name}`);
    const link = new FrameLink();
    const entry: Entry = { key, workspace: ws, waveformPath, document: undefined, panel: undefined as any, link, state: undefined };
    entry.panel = new WebviewPanel(VIEW_TYPE, (m) => link.post(m), () => void showTab(entry));
    entry.document = await provider.openCustomDocument(Uri.file(waveformPath), {}, token);
    await provider.resolveCustomEditor(entry.document, entry.panel, token);
    // The session file holds the view state of the last time. The webview restores it at its start.
    const file = sessionFileFor(entry);
    if (file) {
      try {
        const { fileName: _f, closed: _c, ...state } = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (Object.keys(state).length) { entry.state = state; }
      } catch { /* a new file */ }
    }
    entries.set(key, entry);
    return entry;
  }

  async function closeWaveform(entry: Entry): Promise<void> {
    entries.delete(entry.key);
    closedKeys.add(entry.key);
    clearTimeout(entry.saveTimer);
    writeSession(entry, true);
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

  function writeSession(entry: Entry, closed = false): void {
    const file = sessionFileFor(entry);
    if (!file) { return; }
    const state = (entry.state && typeof entry.state === 'object') ? entry.state : {};
    try {
      fs.writeFileSync(file, JSON.stringify({ ...state, fileName: entry.waveformPath, ...(closed ? { closed: true } : {}) }, null, 2));
    } catch (err: any) {
      log(`cannot write the session file: ${err?.message ?? err}`);
    }
  }

  function saveSessionSoon(entry: Entry): void {
    clearTimeout(entry.saveTimer);
    entry.saveTimer = setTimeout(() => { if (entries.has(entry.key)) { writeSession(entry); } }, 800);
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
    if (!entry) { throw Object.assign(new Error('This waveform is closed.'), { code: 'conflict' }); }
    return entry;
  };

  orca.panels.handle('editor.hello', async (input: any) => {
    const ws = await resolveWorkspace(input.workspace);
    if (!ws) { throw fail('No workspace has the focus.'); }
    if (typeof input.fileName !== 'string' || !input.fileName) { throw fail('The session file names no waveform file.'); }
    const key = entryKey(ws, input.fileName);
    const known = entries.has(key);
    // A waveform that the person closed stays closed until the person opens it again.
    if (!known && !input.reopen && (closedKeys.has(key) || input.session?.closed === true)) { return { closed: true }; }
    closedKeys.delete(key);
    const entry = await loadWaveform(ws, input.fileName);
    if (!known) { writeSession(entry); }
    log(`frame ${input.instance} shows ${path.basename(entry.waveformPath)} (${known ? 'open document' : 'new document'})`);
    entry.link.connect(input.instance);
    currentWorkspace = ws;
    setActive(entry);
    return {
      docKey: entry.key, state: entry.state ?? null, uri: entry.document.uri.toString(),
      keybindings: menus.keybindings, contextKeys: contextKeys(), editorId: EDITOR_ID,
      extname: path.extname(entry.waveformPath).toLowerCase(),
    };
  });

  orca.panels.handle('editor.poll', (input: any) => {
    const entry = entries.get(input?.docKey);
    // An unknown document that nobody closed: the worker started again. The frame starts again too.
    if (!entry) { return closedKeys.has(input?.docKey) ? { messages: '[]', closed: true } : { messages: '[]', restart: true }; }
    return entry.link.poll(input.instance);
  });

  orca.panels.handle('editor.send', (input: any) => {
    const entry = entryOf(input);
    if (input.instance !== entry.link.instance) { return { stale: true }; }
    if ('state' in input) { entry.state = input.state; saveSessionSoon(entry); }
    for (const message of input.messages ?? []) {
      if (message?.command === 'initialized') { entry.link.markStarted(); }
      if (message?.command === 'ready' || message?.command === 'restoreState') { log(`webview ${input.instance}: ${message.command}`); }
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
  // `reveal` shows an element in the panel. The panel needs the ids from the root to the element.
  tree.revealEmitter.event(async ({ element, options }) => {
    const chain: number[] = [];
    for (let e = element; e; e = await treeData.getParent?.(e)) { chain.unshift(idOf(e)); if (chain.length > 64) { break; } }
    orca.panels.post('tree.reveal', { path: chain, select: options?.select !== false });
  });

  const treeContext = (item: any) => ({ ...contextKeys(), view: TREE_ID, viewItem: item.contextValue ?? '' });

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
      color: item.iconPath?.color?.id ?? '',
      tooltip: typeof item.tooltip === 'string' ? item.tooltip : (item.tooltip?.value ?? ''),
      // The buttons that VS Code shows on the row (menu group "inline").
      inline: menus.resolve('view/item/context', treeContext(item), 'only')
        .flatMap((m) => (m.kind === 'item' ? [{ command: m.command, title: m.title, icon: menus.icon(m.command) }] : [])),
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
    return { items: await Promise.all(children.map(describe)), title: menus.resolve('view/title', { ...contextKeys(), view: TREE_ID }, 'exclude').length };
  });

  orca.panels.handle('tree.action', async (input: any) => {
    const entry = activeEntry();
    const element = treeItems.get(input?.id);
    if (!entry) { return { stale: true }; }
    if (input.action === 'select') {
      const selection = (input.ids ?? []).map((id: number) => treeItems.get(id)).filter(Boolean);
      tree.selection = selection;
      tree.selectionEmitter.fire({ selection });
      return { ok: true };
    }
    if (!element) { return { stale: true }; }
    if (input.action === 'expand') { tree.expandEmitter.fire({ element }); return { ok: true }; }
    if (input.action === 'collapse') { tree.collapseEmitter.fire({ element }); return { ok: true }; }
    if (input.action === 'click') {
      // VS Code runs the command of a tree item at a click. vaporview adds the variable at the second click.
      const item = await treeData.getTreeItem(element);
      if (item.command?.command) {
        await ensureFrame(entry);
        await registry.commands.get(item.command.command)?.(...(item.command.arguments ?? []));
      }
      return { ok: true };
    }
    return { ok: false };
  });

  // ------------------------------------------------------------------------------------------
  // Menus. The frames draw them. This part selects the items and runs the commands.
  // ------------------------------------------------------------------------------------------

  orca.panels.handle('menu.webview', (input: any) => {
    const context = { ...contextKeys(), ...(input?.context ?? {}), webviewId: EDITOR_ID, activeCustomEditorId: EDITOR_ID };
    return { items: menus.resolve('webview/context', context) };
  });

  orca.panels.handle('menu.tree', async (input: any) => {
    const element = treeItems.get(input?.id);
    if (!element) { return { items: [] }; }
    return { items: menus.resolve('view/item/context', treeContext(await treeData.getTreeItem(element))) };
  });

  orca.panels.handle('menu.run', async (input: any) => {
    const command = registry.commands.get(input?.command);
    if (!command) { throw fail(`Command not found: ${input?.command}`); }
    if (input.source === 'tree') {
      const entry = activeEntry();
      const element = treeItems.get(input.id);
      if (!entry || !element) { return { stale: true }; }
      await ensureFrame(entry);
      // VS Code gives a tree command the item and, with a multiple selection, all selected items.
      const selection = tree.selection.includes(element) ? tree.selection : [element];
      await command(element, selection);
    } else if (input.source === 'webview') {
      // VS Code gives a webview menu command the context of the element under the pointer.
      await command(input.context ?? {});
    } else {
      await command();
    }
    return { ok: true };
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
    closedKeys.delete(entryKey(currentWorkspace, input.path));
    const entry = await loadWaveform(currentWorkspace, input.path);
    writeSession(entry);
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

  // Development aid: `orca plugin dev request <key> debug.snapshot` asks the frame of the
  // active waveform what it shows, and writes an image of its canvases to the temp folder.
  const snapshots = new Map<number, { parts: string[]; summary?: unknown; done: (v: unknown) => void }>();
  let snapshotId = 0;
  orca.panels.handle('debug.snapshot', async () => {
    const entry = activeEntry();
    if (!entry) { return { error: 'no active waveform' }; }
    if (!(await entry.link.isLive())) { return { error: 'no live frame' }; }
    const id = ++snapshotId;
    const result = new Promise((resolve) => {
      snapshots.set(id, { parts: [], done: resolve });
      setTimeout(() => resolve({ error: 'the frame did not answer' }), 15_000);
    });
    entry.link.post({ command: 'orca-snapshot', id });
    return result;
  });
  // Development aid: sends pointer, wheel, or key events to the page of the active waveform.
  orca.panels.handle('debug.input', async (input: any) => {
    const entry = activeEntry();
    if (!entry || !(await entry.link.isLive())) { return { error: 'no live frame' }; }
    entry.link.post({ command: 'orca-input', events: input?.events ?? [] });
    return { ok: true };
  });
  orca.panels.handle('debug.part', (input: any) => {
    const shot = snapshots.get(input.id);
    if (!shot) { return { ok: false }; }
    shot.parts[input.index] = input.data;
    if (input.summary) { shot.summary = input.summary; }
    if (shot.parts.filter((p) => p !== undefined).length === input.parts) {
      const file = path.join(os.tmpdir(), 'vaporview-orca-snapshot.jpg');
      fs.writeFileSync(file, Buffer.from(shot.parts.join(''), 'base64'));
      snapshots.delete(input.id);
      shot.done({ summary: shot.summary, image: file });
    }
    return { ok: true };
  });

  orca.events?.on?.('workspace.changed', async (payload: any) => {
    const ws = await resolveWorkspace(payload?.context ?? null);
    if (ws?.key === currentWorkspace?.key) { return; }
    currentWorkspace = ws;
    const key = ws && activeByWorkspace.get(ws.key);
    setActive(key ? entries.get(key) : undefined);
  });
}
