// The sidebar panel: the list of open waveforms of the workspace, and the netlist tree of the
// selected waveform. The data comes from the worker.

import { showMenu, writeClipboard, type MenuEntry } from './menu';

declare const orca: any;

type Waveform = { key: string; name: string; folder: string };
type ListState = { workspace: string | null; waveforms: Waveform[]; active: string | null };
type InlineButton = { command: string; title: string; icon: string };
type TreeNode = {
  id: number; label: string; description: string; expandable: boolean; kind: string;
  icon: string; color: string; tooltip: string; inline: InlineButton[];
};

// VS Code theme colors that the vaporview tree icons use. Orca has no such colors.
const ICON_COLORS: Record<string, string> = {
  'charts.purple': '#b180d7', 'charts.green': '#89d185', 'charts.orange': '#d18616',
  'charts.yellow': '#cca700', 'charts.blue': '#3794ff', 'charts.red': '#f14c4c',
};

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text = ''): HTMLElementTagNameMap[K] => {
  const node = document.createElement(tag);
  if (cls) { node.className = cls; }
  if (text) { node.textContent = text; }
  return node;
};

async function request(name: string, input: unknown = {}, timeoutMs = 30_000): Promise<any> {
  for (;;) {
    try {
      return await orca.plugin.request(name, JSON.parse(JSON.stringify(input)), { timeoutMs });
    } catch (err: any) {
      if (err?.code !== 'rate_limited') { throw err; }
      await new Promise((r) => setTimeout(r, err.retryAfterMs ?? 500));
    }
  }
}

const root = el('div', 'vv-panel');
const header = el('div', 'vv-header');
const title = el('span', 'vv-title', 'Waveforms');
const openButton = el('button', 'vv-button', 'Open Waveform');
header.append(title, openButton);
const messageBar = el('div', 'vv-message');
const browser = el('div', 'vv-browser');
const list = el('div', 'vv-list');
const treeTitle = el('div', 'vv-section', 'Netlist');
const tree = el('div', 'vv-tree');
root.append(header, messageBar, browser, list, treeTitle, tree);
document.body.append(root);

let state: ListState = { workspace: null, waveforms: [], active: null };

function showMessage(text: string, level = 'error'): void {
  messageBar.textContent = text;
  messageBar.dataset.level = level;
  messageBar.style.display = text ? 'block' : 'none';
}

async function run(action: () => Promise<unknown>): Promise<void> {
  try {
    showMessage('');
    await action();
  } catch (err: any) {
    showMessage(err?.message ?? String(err));
  }
}

// --------------------------------------------------------------------------------------------
// Waveform list
// --------------------------------------------------------------------------------------------

function renderList(): void {
  list.replaceChildren();
  if (!state.workspace) {
    list.append(el('div', 'vv-empty', 'Select a workspace to open a waveform.'));
  } else if (state.waveforms.length === 0) {
    list.append(el('div', 'vv-empty', 'No waveform is open in this workspace. Open a VCD, FST, or GHW file.'));
  }
  for (const w of state.waveforms) {
    const row = el('div', 'vv-row' + (w.key === state.active ? ' active' : ''));
    row.title = w.folder;
    const close = el('button', 'vv-icon', '×');
    close.title = 'Close Waveform';
    close.addEventListener('click', (e) => { e.stopPropagation(); void run(() => request('panel.close', { docKey: w.key })); });
    row.addEventListener('click', () => void run(() => request('panel.select', { docKey: w.key })));
    row.append(el('span', 'vv-name', w.name), el('span', 'vv-dim', w.folder), close);
    list.append(row);
  }
  const hasTree = !!state.active;
  treeTitle.style.display = hasTree ? '' : 'none';
  tree.style.display = hasTree ? '' : 'none';
}

// --------------------------------------------------------------------------------------------
// File selection. Orca has no open-file dialog for a plugin.
// --------------------------------------------------------------------------------------------

let browserOpen = false;
async function browse(dir?: string): Promise<void> {
  const r = await request('panel.browse', { dir });
  if (r.file) { return openWaveform(r.file); }
  browser.replaceChildren();
  const bar = el('div', 'vv-pathbar');
  const input = el('input', 'vv-input');
  input.value = r.dir;
  input.spellcheck = false;
  input.title = 'Folder or waveform file. Press Enter.';
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { void run(() => browse(input.value.trim())); } });
  const cancel = el('button', 'vv-icon', '×');
  cancel.title = 'Cancel';
  cancel.addEventListener('click', () => { browserOpen = false; browser.replaceChildren(); });
  bar.append(input, cancel);
  browser.append(bar);
  if (r.error) { browser.append(el('div', 'vv-empty', r.error)); }
  const entries = el('div', 'vv-entries');
  const join = (name: string) => r.dir + (r.dir.endsWith(r.sep) ? '' : r.sep) + name;
  if (r.parent) {
    const up = el('div', 'vv-entry folder', '..');
    up.addEventListener('click', () => void run(() => browse(r.parent)));
    entries.append(up);
  }
  for (const name of r.folders) {
    const row = el('div', 'vv-entry folder', name);
    row.addEventListener('click', () => void run(() => browse(join(name))));
    entries.append(row);
  }
  for (const name of r.files) {
    const row = el('div', 'vv-entry file', name);
    row.addEventListener('click', () => void run(() => openWaveform(join(name))));
    entries.append(row);
  }
  if (!r.error && r.folders.length === 0 && r.files.length === 0) { entries.append(el('div', 'vv-empty', 'No folder and no waveform file here.')); }
  browser.append(entries);
}

async function openWaveform(path: string): Promise<void> {
  showMessage('Loading the waveform…', 'info');
  await request('panel.open', { path }, 120_000);
  browserOpen = false;
  browser.replaceChildren();
  showMessage('');
}

openButton.addEventListener('click', () => {
  if (browserOpen) { browserOpen = false; browser.replaceChildren(); return; }
  browserOpen = true;
  void run(() => browse());
});

// --------------------------------------------------------------------------------------------
// Netlist tree. The children of a node load when the node opens.
// --------------------------------------------------------------------------------------------

type NodeView = { node: TreeNode; row: HTMLElement; open: () => Promise<void> };
let views = new Map<number, NodeView>();
let selected = new Set<number>();

function setSelection(ids: number[]): void {
  for (const id of selected) { views.get(id)?.row.classList.remove('selected'); }
  selected = new Set(ids);
  for (const id of selected) { views.get(id)?.row.classList.add('selected'); }
  void request('tree.action', { action: 'select', ids });
}

const runTreeCommand = (id: number, command: string) =>
  run(() => request('menu.run', { source: 'tree', id, command }, 60_000));

async function loadChildren(container: HTMLElement, id?: number, depth = 0): Promise<void> {
  const r = await request('tree.children', { id });
  container.replaceChildren();
  for (const node of r.items as TreeNode[]) { container.append(renderNode(node, depth)); }
}

function renderNode(node: TreeNode, depth: number): HTMLElement {
  const wrap = el('div', 'vv-node');
  const row = el('div', 'vv-node-row');
  row.style.paddingLeft = `${4 + depth * 12}px`;
  row.title = node.tooltip || node.label;
  const twist = el('span', 'vv-twist', node.expandable ? '▸' : '');
  const icon = el('span', node.icon ? `vv-node-icon codicon codicon-${node.icon}` : 'vv-node-icon');
  if (node.color) { icon.style.color = ICON_COLORS[node.color] ?? ''; }
  row.append(twist, icon, el('span', 'vv-name', node.label), el('span', 'vv-dim', node.description));
  for (const b of node.inline) {
    const button = el('button', 'vv-icon vv-inline' + (b.icon ? ` codicon codicon-${b.icon}` : ''), b.icon ? '' : b.title.slice(0, 1));
    button.title = b.title;
    button.addEventListener('click', (e) => { e.stopPropagation(); void runTreeCommand(node.id, b.command); });
    row.append(button);
  }
  const children = el('div', 'vv-children');
  children.style.display = 'none';
  let isOpen = false;
  let loaded: Promise<void> | undefined;

  const setOpen = async (next: boolean): Promise<void> => {
    if (!node.expandable || isOpen === next) { return loaded; }
    isOpen = next;
    twist.textContent = isOpen ? '▾' : '▸';
    children.style.display = isOpen ? '' : 'none';
    void request('tree.action', { id: node.id, action: isOpen ? 'expand' : 'collapse' });
    if (isOpen && !loaded) { loaded = loadChildren(children, node.id, depth + 1); }
    return loaded;
  };

  row.addEventListener('click', (e) => {
    if (e.ctrlKey || e.metaKey) {
      const next = new Set(selected);
      if (next.has(node.id)) { next.delete(node.id); } else { next.add(node.id); }
      setSelection([...next]);
      return;
    }
    setSelection([node.id]);
    if (node.expandable) { void run(() => setOpen(!isOpen)); }
    // VS Code runs the command of the tree item at a click. vaporview adds a variable at the second click.
    else { void run(() => request('tree.action', { id: node.id, action: 'click' }, 60_000)); }
  });
  row.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (!selected.has(node.id)) { setSelection([node.id]); }
    const x = e.clientX;
    const y = e.clientY;
    void run(async () => {
      const r = await request('menu.tree', { id: node.id });
      showMenu(x, y, r.items as MenuEntry[], (command) => void runTreeCommand(node.id, command));
    });
  });
  views.set(node.id, { node, row, open: () => setOpen(true) as Promise<void> });
  wrap.append(row, children);
  return wrap;
}

function reloadTree(): void {
  views = new Map();
  selected = new Set();
  if (state.active) { void run(() => loadChildren(tree)); } else { tree.replaceChildren(); }
}

/** Shows an element: opens its parents from the root, then selects it. */
async function reveal(path: number[], select: boolean): Promise<void> {
  for (const id of path.slice(0, -1)) { await views.get(id)?.open(); }
  const target = views.get(path[path.length - 1]);
  if (!target) { return; }
  target.row.scrollIntoView({ block: 'nearest' });
  if (select) { setSelection([target.node.id]); }
}

// --------------------------------------------------------------------------------------------
// Start
// --------------------------------------------------------------------------------------------

async function refresh(context?: unknown): Promise<void> {
  const workspace = context !== undefined ? context : await orca.host.call('workspace.readContext').catch(() => null);
  state = await request('panel.state', { workspace });
  renderList();
  reloadTree();
}

orca.plugin.on('panel.changed', (next: ListState) => { state = next; renderList(); });
orca.plugin.on('tree.changed', () => reloadTree());
orca.plugin.on('tree.reveal', (p: { path: number[]; select: boolean }) => void run(() => reveal(p.path ?? [], p.select)));
orca.plugin.on('panel.message', (m: { level: string; message: string }) => showMessage(m.message, m.level));
orca.plugin.on('clipboard.write', (p: { text: string }) => { if (document.hasFocus()) { void writeClipboard(p?.text ?? ''); } });
orca.on('workspace.changed', (p: { context: unknown }) => void run(() => refresh(p?.context ?? null)));
renderList();
void run(() => refresh());
