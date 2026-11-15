// The sidebar panel: the list of open waveforms of the workspace, and the netlist tree of the
// selected waveform. The data comes from the worker.

declare const orca: any;

type Waveform = { key: string; name: string; folder: string };
type ListState = { workspace: string | null; waveforms: Waveform[]; active: string | null };
type TreeNode = { id: number; label: string; description: string; expandable: boolean; kind: string; icon: string; tooltip: string };

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
let selectedRow: HTMLElement | undefined;

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
    row.title = `${w.folder}`;
    const name = el('span', 'vv-name', w.name);
    const folder = el('span', 'vv-dim', w.folder);
    const close = el('button', 'vv-icon', '×');
    close.title = 'Close Waveform';
    close.addEventListener('click', (e) => { e.stopPropagation(); void run(() => request('panel.close', { docKey: w.key })); });
    row.addEventListener('click', () => void run(() => request('panel.select', { docKey: w.key })));
    row.append(name, folder, close);
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
  if (r.parent) {
    const up = el('div', 'vv-entry folder', '..');
    up.addEventListener('click', () => void run(() => browse(r.parent)));
    entries.append(up);
  }
  for (const name of r.folders) {
    const row = el('div', 'vv-entry folder', name);
    row.addEventListener('click', () => void run(() => browse(r.dir + (r.dir.endsWith(r.sep) ? '' : r.sep) + name)));
    entries.append(row);
  }
  for (const name of r.files) {
    const row = el('div', 'vv-entry file', name);
    row.addEventListener('click', () => void run(() => openWaveform(r.dir + (r.dir.endsWith(r.sep) ? '' : r.sep) + name)));
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
// Netlist tree, with children loaded when a node opens
// --------------------------------------------------------------------------------------------

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
  row.dataset.id = String(node.id);
  const twist = el('span', 'vv-twist', node.expandable ? '▸' : '');
  const label = el('span', 'vv-name', node.label);
  const description = el('span', 'vv-dim', node.description);
  row.append(twist, label, description);
  const children = el('div', 'vv-children');
  children.style.display = 'none';
  let open = false;
  let loaded = false;

  const toggle = async (): Promise<void> => {
    open = !open;
    twist.textContent = open ? '▾' : '▸';
    children.style.display = open ? '' : 'none';
    void request('tree.action', { id: node.id, action: open ? 'expand' : 'collapse' });
    if (open && !loaded) { loaded = true; await loadChildren(children, node.id, depth + 1); }
  };

  if (node.expandable) {
    row.addEventListener('click', () => void run(toggle));
  } else {
    const add = el('button', 'vv-icon vv-add', '+');
    add.title = 'Add to Waveform Viewer';
    add.addEventListener('click', (e) => { e.stopPropagation(); void run(() => request('tree.action', { id: node.id, action: 'add' }, 60_000)); });
    row.append(add);
    row.addEventListener('dblclick', () => void run(() => request('tree.action', { id: node.id, action: 'add' }, 60_000)));
  }
  row.addEventListener('click', () => {
    selectedRow?.classList.remove('selected');
    selectedRow = row;
    row.classList.add('selected');
    void request('tree.action', { id: node.id, action: 'select' });
  });
  wrap.append(row, children);
  return wrap;
}

const reloadTree = (): void => { if (state.active) { void run(() => loadChildren(tree)); } else { tree.replaceChildren(); } };

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
orca.plugin.on('panel.message', (m: { level: string; message: string }) => showMessage(m.message, m.level));
orca.on('workspace.changed', (p: { context: unknown }) => void run(() => refresh(p?.context ?? null)));
void run(() => refresh());
