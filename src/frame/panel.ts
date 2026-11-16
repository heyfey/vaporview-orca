// The sidebar panel: the list of open waveforms of the workspace, and the netlist tree of the
// selected waveform. The data comes from the worker.

import { showMenu, writeClipboard, type MenuEntry } from './menu';
import { icon as iconFor, lucideIcon } from './icons';

declare const orca: any;

type Waveform = { key: string; name: string; folder: string };
type ListState = { workspace: string | null; waveforms: Waveform[]; active: string | null };
type InlineButton = { command: string; title: string; icon: string };
type TreeNode = {
  id: number; label: string; description: string; expandable: boolean; kind: string;
  icon: string; color: string; tooltip: string; inline: InlineButton[];
};

// The plugin setting "Netlist Icons". "Orca": lucide icons in one color, as the Orca file explorer.
// "Vaporview": the VS Code icons of vaporview, each kind with its VS Code theme color.
const ICON_SETTING = 'treeIcons';
let vaporviewIcons = false;
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
const list = el('div', 'vv-list vv-rows vv-scroll');
const treeTitle = el('div', 'vv-section');
const treeTitleText = el('span', '', 'Netlist');
const treeButtons = el('span', 'vv-section-buttons');
treeTitle.append(treeTitleText, treeButtons);
const searchBox = el('div', 'vv-search');
const tree = el('div', 'vv-tree vv-rows vv-scroll');
const results = el('div', 'vv-tree vv-rows vv-scroll');
results.style.display = 'none';
root.append(header, messageBar, browser, list, treeTitle, searchBox, tree, results);
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
    const close = lucideIcon('x', 'vv-icon', 'button');
    close.title = 'Close Waveform';
    close.addEventListener('click', (e) => { e.stopPropagation(); void run(() => request('panel.close', { docKey: w.key })); });
    row.addEventListener('click', () => void run(() => request('panel.select', { docKey: w.key })));
    row.append(el('span', 'vv-name', w.name), el('span', 'vv-dim', w.folder), close);
    list.append(row);
  }
  const hasTree = !!state.active;
  treeTitle.style.display = hasTree ? '' : 'none';
  if (!hasTree) { searchBox.replaceChildren(); searchInput = undefined; results.style.display = 'none'; }
  tree.style.display = hasTree && results.style.display === 'none' ? '' : 'none';
}

// --------------------------------------------------------------------------------------------
// File selection. Orca has no open-file dialog for a plugin.
// --------------------------------------------------------------------------------------------

let browserOpen = false;
async function browse(dir?: string): Promise<void> {
  const r = await request('panel.browse', { dir });
  if (r.file) { return openWaveform(r.file); }
  browser.replaceChildren();
  const bar = el('div', 'vv-field');
  const input = el('input');
  input.value = r.dir;
  input.spellcheck = false;
  input.title = 'Folder or waveform file. Press Enter.';
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { void run(() => browse(input.value.trim())); } });
  const cancel = lucideIcon('x', 'vv-icon', 'button');
  cancel.title = 'Cancel';
  cancel.addEventListener('click', () => { browserOpen = false; browser.replaceChildren(); });
  bar.append(input, cancel);
  browser.append(bar);
  if (r.error) { browser.append(el('div', 'vv-empty', r.error)); }
  const entries = el('div', 'vv-entries vv-rows vv-scroll');
  const join = (name: string) => r.dir + (r.dir.endsWith(r.sep) ? '' : r.sep) + name;
  if (r.parent) {
    const up = el('div', 'vv-entry');
    up.append(lucideIcon('folder', 'vv-node-icon'), el('span', 'vv-name', '..'));
    up.addEventListener('click', () => void run(() => browse(r.parent)));
    entries.append(up);
  }
  for (const name of r.folders) {
    const row = el('div', 'vv-entry');
    row.append(lucideIcon('folder', 'vv-node-icon'), el('span', 'vv-name', name));
    row.addEventListener('click', () => void run(() => browse(join(name))));
    entries.append(row);
  }
  for (const name of r.files) {
    const row = el('div', 'vv-entry');
    row.append(lucideIcon('file', 'vv-node-icon'), el('span', 'vv-name', name));
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
/** The nodes that are open. A refresh of the same waveform opens them again. */
let openIds = new Set<number>();

function setSelection(ids: number[]): void {
  for (const id of selected) { views.get(id)?.row.classList.remove('selected'); }
  selected = new Set(ids);
  for (const id of selected) { views.get(id)?.row.classList.add('selected'); }
  void request('tree.action', { action: 'select', ids });
}

const runTreeCommand = (id: number, command: string) =>
  run(() => request('menu.run', { source: 'tree', id, command }, 60_000));

/** The icon of a scope or a variable, in the icon set that the setting selects. */
function netlistIcon(codicon: string, color: string): HTMLElement {
  if (!vaporviewIcons) { return iconFor(codicon, 'vv-node-icon'); }
  const node = el('span', codicon ? `vv-node-icon vv-vaporview-icon codicon codicon-${codicon}` : 'vv-node-icon');
  node.style.color = ICON_COLORS[color] ?? '';
  return node;
}

async function loadChildren(container: HTMLElement, id?: number, depth = 0): Promise<void> {
  const r = await request('tree.children', { id });
  if (id === undefined) { renderTitleButtons(r.title ?? []); }
  container.replaceChildren();
  for (const node of r.items as TreeNode[]) { container.append(renderNode(node, depth)); }
}

/** The buttons in the title of the tree. The search has its own field below the title. */
function renderTitleButtons(buttons: InlineButton[]): void {
  treeButtons.replaceChildren();
  showSearchField(buttons.some((b) => b.command === SEARCH_COMMAND));
  for (const b of buttons) {
    if (b.command === SEARCH_COMMAND) { continue; }
    const button = iconFor(b.icon, 'vv-icon', 'button');
    if (!b.icon) { button.textContent = b.title.slice(0, 1); }
    button.title = b.title;
    button.addEventListener('click', () => void run(() => request('menu.run', { source: 'title', command: b.command })));
    treeButtons.append(button);
  }
}

function renderNode(node: TreeNode, depth: number): HTMLElement {
  const wrap = el('div', 'vv-node');
  const row = el('div', 'vv-node-row');
  row.style.paddingLeft = `${8 + depth * 16}px`;
  row.title = node.tooltip || node.label;
  const twist = node.expandable ? lucideIcon('chevron-right', 'vv-twist') : el('span', 'vv-twist');
  const icon = netlistIcon(node.icon, node.color);
  row.append(twist, icon, el('span', 'vv-name', node.label), el('span', 'vv-dim', node.description));
  for (const b of node.inline) {
    const button = iconFor(b.icon, 'vv-icon vv-inline', 'button');
    if (!b.icon) { button.textContent = b.title.slice(0, 1); }
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
    if (isOpen) { openIds.add(node.id); } else { openIds.delete(node.id); }
    twist.classList.toggle('open', isOpen);
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
  if (selected.has(node.id)) { row.classList.add('selected'); }
  if (openIds.has(node.id)) { void run(() => setOpen(true) as Promise<void>); }
  return wrap;
}

/** Reads the tree again. `full` is for a different waveform, which starts with all nodes closed. */
function reloadTree(full = true): void {
  views = new Map();
  if (full) { selected = new Set(); openIds = new Set(); }
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
// Netlist search. vaporview uses a VS Code quick pick. The panel draws the field and the results.
// --------------------------------------------------------------------------------------------

type SearchItem = { label: string; description: string; detail: string; icon: string; color: string };
type SearchState = { visible: boolean; value: string; title: string; placeholder: string; busy: boolean; more: number; items: SearchItem[] };

const SEARCH_COMMAND = 'vaporview.searchNetlist';
const SEARCH_PLACEHOLDER = 'Search netlist';
let searchInput: HTMLInputElement | undefined;
let searchClear: HTMLElement | undefined;
let searchInfo: HTMLElement | undefined;
let searchOpen = false;   // the quick pick of vaporview shows

/** The search field is always in the panel, as "Find files" of the Orca file explorer. */
function showSearchField(searchable: boolean): void {
  if (!searchable) { searchBox.replaceChildren(); searchInput = undefined; return; }
  if (searchInput?.isConnected) { return; }
  searchBox.replaceChildren();
  const field = el('div', 'vv-field');
  const input = el('input');
  input.spellcheck = false;
  input.placeholder = SEARCH_PLACEHOLDER;
  input.addEventListener('input', () => void run(async () => {
    // The first character starts the vaporview search command.
    if (!searchOpen) { searchOpen = true; await request('menu.run', { source: 'title', command: SEARCH_COMMAND }); }
    await request('search.input', { value: input.value });
  }));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { void request('search.hide'); }
    if (e.key === 'Enter') { (results.firstElementChild as HTMLElement | null)?.click(); }
  });
  const clear = lucideIcon('x', 'vv-icon', 'button');
  clear.title = 'Clear the search';
  clear.style.visibility = 'hidden';
  clear.addEventListener('click', () => void request('search.hide'));
  field.append(lucideIcon('search', 'vv-field-icon'), input, clear);
  searchInfo = el('div', 'vv-search-info');
  searchBox.append(field, searchInfo);
  searchInput = input;
  searchClear = clear;
}

function renderSearch(s: SearchState): void {
  searchOpen = s.visible;
  if (!searchInput) { return; }
  if (s.visible && document.activeElement !== searchInput && s.value === '') { searchInput.focus(); }   // "Search Scope", Ctrl+F
  // vaporview changes the text when the person selects a scope: the search goes into that scope.
  if (searchInput.value !== s.value) { searchInput.value = s.value; }
  searchInput.placeholder = s.visible && s.placeholder ? s.placeholder : SEARCH_PLACEHOLDER;
  const active = s.visible && s.value !== '';
  searchClear!.style.visibility = active ? 'visible' : 'hidden';
  searchInfo!.textContent = !active ? '' : s.busy ? 'Searching…' : s.title + (s.more ? ` (the first ${s.items.length} show)` : '');
  // The results take the place of the tree, as in the Orca file explorer.
  results.style.display = active ? '' : 'none';
  tree.style.display = active || !state.active ? 'none' : '';
  results.replaceChildren();
  if (!active) { return; }
  s.items.forEach((item, index) => {
    const row = el('div', 'vv-result');
    const icon = netlistIcon(item.icon, item.color);
    const text = el('div', 'vv-result-text');
    const first = el('div', 'vv-result-line');
    first.append(el('span', 'vv-name', item.label), el('span', 'vv-dim', item.description));
    text.append(first, el('div', 'vv-dim vv-result-detail', item.detail));
    row.title = item.detail;
    row.append(icon, text);
    row.addEventListener('click', () => void run(() => request('search.accept', { index }, 60_000)));
    results.append(row);
  });
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
orca.plugin.on('tree.changed', (p: { full?: boolean }) => reloadTree(p?.full === true));
orca.plugin.on('search.update', (s: SearchState) => renderSearch(s));
orca.plugin.on('tree.reveal', (p: { path: number[]; select: boolean }) => void run(() => reveal(p.path ?? [], p.select)));
orca.plugin.on('panel.message', (m: { level: string; message: string }) => showMessage(m.message, m.level));
orca.plugin.on('clipboard.write', (p: { text: string }) => { if (document.hasFocus()) { void writeClipboard(p?.text ?? ''); } });
// The icon setting. The tree shows the new icons at once, and keeps its open nodes.
async function readIconSetting(): Promise<void> {
  const before = vaporviewIcons;
  vaporviewIcons = (await orca.settings.get(ICON_SETTING).catch(() => undefined)) === 'Vaporview';
  if (before !== vaporviewIcons) { reloadTree(false); }
}
orca.settings.onDidChange?.(() => void readIconSetting());

orca.on('workspace.changed', (p: { context: unknown }) => void run(() => refresh(p?.context ?? null)));
renderList();
void run(async () => { await readIconSetting(); await refresh(); });
