// Runs the built Orca worker (build/plugin/worker.js) with a stand-in for the Orca API.
// It plays the panel and one editor frame: open a waveform, start the frame, add a signal.
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const waveform = process.argv[2] ?? path.join(here, 'data', 'tpu.vcd');
const workspacePath = fs.mkdtempSync(path.join(os.tmpdir(), 'vaporview-orca-'));
const handlers = new Map();
const posts = [];
const calls = [];
const context = { workspaceId: 'ws1', displayName: 'test', branch: 'main' };
const orca = {
  api: { major: 1, minor: 9 },
  log: (m) => { if (!/\[adapter\]|theme/.test(m)) console.log('   log:', String(m).slice(0, 160)); },
  panels: { handle: (name, fn) => handlers.set(name, fn), post: (event, payload) => posts.push({ event, payload }) },
  events: { on: () => ({ dispose() {} }) },
  host: {
    has: () => true,
    call: async (method, params) => {
      calls.push({ method, params });
      if (method === 'workspace.list') { return { workspaces: [{ id: 'ws1', kind: 'folder', name: 'test', path: workspacePath, branch: 'main', hostId: 'local' }], truncated: false }; }
      if (method === 'editor.open') { return { opened: true }; }
      if (method === 'workspace.readContext') { return context; }
      return null;
    },
  },
};
// Orca refuses an answer that is not strict JSON, for example a property with the value undefined.
const assertJson = (name, value, where = 'answer') => {
  if (value === undefined && where !== 'answer') { throw new Error(`${name}: ${where} is undefined, which Orca refuses`); }
  if (value && typeof value === 'object') { for (const [k, v] of Object.entries(value)) { assertJson(name, v, `${where}.${k}`); } }
};
const req = async (name, input = {}) => {
  const answer = await handlers.get(name)(JSON.parse(JSON.stringify(input)), { panel: { id: 'x', surface: 'panel', contributionId: 'y' }, signal: new AbortController().signal });
  assertJson(name, answer);
  return answer;
};
const check = (ok, what) => { console.log(ok ? 'ok  ' : 'FAIL', what); if (!ok) { process.exitCode = 1; } };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const { default: activate } = await import(path.join(here, '..', 'build', 'plugin', 'worker.js'));
await activate(orca);

let state = await req('panel.state', { workspace: context });
check(state.workspace === 'test' && state.waveforms.length === 0, 'panel starts with an empty list');

const listing = await req('panel.browse', { dir: path.dirname(waveform) });
check(listing.files.includes(path.basename(waveform)), 'file browser lists the waveform file');

const opened = await req('panel.open', { path: waveform });
state = await req('panel.state', { workspace: context });
check(state.waveforms.length === 1 && state.active === opened.docKey, 'open adds the waveform and selects it');
const open = calls.find((c) => c.method === 'editor.open');
check(open?.params.path === `.vaporview/${path.basename(waveform)}.vaporview.json`, `editor.open got the session file (${open?.params.path})`);
const sessionFile = path.join(workspacePath, open.params.path);
const session = JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
check(session.fileName === waveform, 'session file names the waveform file');

// The editor frame starts.
const frameContext = { displayName: context.displayName, branch: context.branch };   // a frame gets no workspace id
const hello = await req('editor.hello', { instance: 'f1', fileName: session.fileName, session, workspace: frameContext });
check(hello.docKey === opened.docKey, 'frame hello finds the open document');
const poll = async () => JSON.parse((await req('editor.poll', { docKey: hello.docKey, instance: 'f1' })).messages);
await req('editor.send', { docKey: hello.docKey, instance: 'f1', messages: [{ command: 'ready' }] });
let messages = await poll();
check(messages.some((m) => m.command === 'initViewport'), `ready gives initViewport (${messages.map((m) => m.command)})`);
await req('editor.send', { docKey: hello.docKey, instance: 'f1', messages: [{ command: 'initialized' }] });

// The panel reads the tree and adds one signal.
const top = await req('tree.children', {});
check(top.items.length > 0 && top.items[0].expandable, `tree has a top scope (${top.items.map((i) => i.label)})`);
const children = await req('tree.children', { id: top.items[0].id });
const variable = children.items.find((i) => !i.expandable);
check(!!variable, `scope has a variable (${variable?.label})`);
const pending = poll();          // the live frame has a poll open
const add = req('menu.run', { source: 'tree', id: variable.id, command: 'vaporview.addVariable' });
messages = await pending;        // answer of the live probe
if (!messages.length) { messages = await poll(); }
await add;
check(messages.some((m) => m.command === 'add-variable'), `add gives add-variable (${messages.map((m) => m.command)})`);
const signalId = messages.find((m) => m.command === 'add-variable').signalList[0].signalId;
await req('editor.send', { docKey: hello.docKey, instance: 'f1', messages: [{ command: 'fetchDataFromFile', requestList: [{ type: 'signal', signalId }] }], state: { displayedSignals: [], zoomRatio: 1 } });
messages = await poll();
check(messages.some((m) => String(m.command).startsWith('update-waveform-chunk')), `fetch gives signal data (${messages.map((m) => m.command)})`);
await sleep(1000);
check(JSON.parse(fs.readFileSync(sessionFile, 'utf8')).zoomRatio === 1, 'the worker writes the view state to the session file');

// A second frame for the same document (the tab came back).
const hello2 = await req('editor.hello', { instance: 'f2', fileName: session.fileName, session, workspace: frameContext });
check(hello2.docKey === hello.docKey && hello2.state?.zoomRatio === 1, 'a new frame gets the same document and the saved state');
check((await req('editor.poll', { docKey: hello.docKey, instance: 'f1' })).stale === true, 'the old frame is told that it is stale');

// Menus: the worker selects the items from the vaporview package.json.
const signalMenuIcon = () => 'crosshair';
check(variable.inline.some((b) => b.command === 'vaporview.addVariable' && b.icon === 'add'), 'a variable row has the inline "add" button');
const treeMenu = (await req('menu.tree', { id: variable.id })).items;
check(treeMenu.some((m) => m.title === 'Add Selected') && !treeMenu.some((m) => m.title?.startsWith('Add All Variables')) && !treeMenu.some((m) => m.title === 'Add Variable by Name...'), `tree menu of a variable (${treeMenu.filter((m) => m.kind === 'item').map((m) => m.title).join(', ')})`);
const scopeMenu = (await req('menu.tree', { id: top.items[0].id })).items;
check(scopeMenu.some((m) => m.title === 'Add All Variables in Scope (Recursive)'), 'tree menu of a scope has "Add All Variables in Scope"');
check(treeMenu.find((m) => m.title === 'Remove Selected')?.danger === true && scopeMenu.find((m) => m.title === 'Remove All Variables in Scope')?.danger === true && !treeMenu.find((m) => m.title === 'Add Selected')?.danger, 'tree menu: the two remove items are delete items');
check(treeMenu.find((m) => m.title === 'Show in Viewer')?.icon === signalMenuIcon(), 'tree menu and viewer menu use one icon for "show in the other view"');
const signalMenu = (await req('menu.webview', { docKey: hello.docKey, context: { webviewSection: 'signal', width: 8, type: 'Wire' } })).items;
const format = signalMenu.find((m) => m.kind === 'submenu' && m.label === 'Format Values');
check(!!format && format.items.some((m) => m.title === 'Hexadecimal') && signalMenu.some((m) => m.title === 'Remove Variable'), `viewer menu of a signal (${signalMenu.filter((m) => m.kind !== 'separator').map((m) => m.title ?? m.label + ' >').join(', ')})`);
check(signalMenu.find((m) => m.title === 'Remove Variable')?.danger === true && signalMenu.find((m) => m.title === 'Show in Netlist View')?.shortcut === 'Ctrl+R', 'viewer menu: "Remove Variable" is a delete item, "Show in Netlist View" shows its key');
check(signalMenu.find((m) => m.label === 'Color')?.items.find((m) => m.title === 'Color 1')?.shortcut === '1', 'a submenu item shows its key');
check(signalMenu.find((m) => m.title === 'Show in Netlist View')?.icon === signalMenuIcon(), 'viewer menu: "Show in Netlist View" has the same icon');
const bitMenu = (await req('menu.webview', { docKey: hello.docKey, context: { webviewSection: 'signal', width: 1 } })).items;
check(!bitMenu.some((m) => m.label === 'Format Values') && !bitMenu.some((m) => m.title === 'New Signal From Bit Range...'), 'viewer menu of a 1-bit signal has no "Format Values"');
const rulerMenu = (await req('menu.webview', { docKey: hello.docKey, context: { webviewSection: 'ruler', rulerLines: true } })).items;
check(rulerMenu.some((m) => m.title === 'Hide Ruler Lines') && !rulerMenu.some((m) => m.title === 'Show Ruler Lines'), 'viewer menu of the ruler follows the state');

// Netlist search: the vaporview quick pick shows in the panel.
check(top.title.some((b) => b.command === 'vaporview.searchNetlist' && b.icon === 'search'), 'the tree title has the "Search Netlist" button');
const lastSearch = () => posts.filter((p) => p.event === 'search.update').at(-1)?.payload;
const waitSearch = async (test) => { for (let i = 0; i < 80; i++) { await sleep(25); const s = lastSearch(); if (s && test(s)) { return s; } } return lastSearch(); };
posts.length = 0;
await req('menu.run', { source: 'title', command: 'vaporview.searchNetlist' });
let found = await waitSearch((s) => s.visible);
check(found?.visible === true, 'the command shows the search in the panel');
await req('search.input', { value: 'clk' });
found = await waitSearch((s) => !s.busy && s.items.length > 0);
check(found?.items.length > 0 && found.items.every((i) => i.detail), `the search for "clk" gives results (${found?.items.length}, first: ${found?.items[0]?.detail})`);
await req('search.hide');
found = await waitSearch((s) => !s.visible);
check(found?.visible === false, 'the search closes');

// vaporview asks before it adds more than 48 signals. The plugin answers "Yes" itself.
posts.length = 0;
const poll2 = async () => JSON.parse((await req('editor.poll', { docKey: hello.docKey, instance: 'f2' })).messages);
const probe = poll2();                 // the live frame has a poll open
const addAll = req('menu.run', { source: 'tree', id: top.items[0].id, command: 'vaporview.addAllInScopeRecursive' });
await probe;                           // the worker asks if the frame is alive
const got = await poll2();             // the frame polls again, so it is alive
await addAll;
check(!posts.some((p) => p.event === 'panel.message') && got.some((m) => m.command === 'add-variable' && m.signalList.length > 48),
  `"add all in scope" adds the signals with no question (${got.filter((m) => m.command === 'add-variable').map((m) => m.signalList.length)} signals)`);

await req('panel.close', { docKey: hello.docKey });
state = await req('panel.state', { workspace: context });
check(state.waveforms.length === 0, 'close removes the waveform');
// A closed waveform stays closed for a tab that is open, until the person opens it again.
const afterClose = JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
check(afterClose.closed === true, 'close marks the session file');
check((await req('editor.poll', { docKey: hello.docKey, instance: 'f2' })).closed === true, 'a frame of the closed waveform is told "closed"');
check((await req('editor.hello', { instance: 'f3', fileName: session.fileName, session: afterClose, workspace: frameContext })).closed === true, 'a new frame does not load a closed waveform');
const again = await req('editor.hello', { instance: 'f3', fileName: session.fileName, session: afterClose, workspace: frameContext, reopen: true });
check(!!again.docKey && again.keybindings.length === 17, 'the person can open it again, and the frame gets the keybindings');
check((await req('editor.poll', { docKey: 'unknown', instance: 'f9' })).restart === true, 'a frame of an unknown document is told to start again');
{
  // Two waveforms show at the same time (a split view). The tab that gets the focus sets the tree.
  // This block is the last one and closes no waveform: the close of two waveforms in one run
  // stops the worker, because of a vaporview defect (see D10 in docs/feature-parity.md).
  const second = path.join(workspacePath, 'second.vcd');
  fs.copyFileSync(waveform, second);
  const other = await req('panel.open', { path: second });
  const otherSession = JSON.parse(fs.readFileSync(path.join(workspacePath, '.vaporview', 'second.vcd.vaporview.json'), 'utf8'));
  await req('editor.hello', { instance: 'g1', fileName: otherSession.fileName, session: otherSession, workspace: frameContext });
  check((await req('panel.state', { workspace: context })).active === other.docKey, 'the second waveform is the active one after its page starts');
  await req('editor.focus', { docKey: again.docKey, instance: 'f2' });
  check((await req('panel.state', { workspace: context })).active === other.docKey, 'the focus report of a stale page changes nothing');
  await req('editor.focus', { docKey: again.docKey, instance: 'f3' });
  check((await req('panel.state', { workspace: context })).active === again.docKey, 'the tab that gets the focus makes its waveform the active one');
  const tree = await req('tree.children', {});
  check(tree.items.length > 0, 'the tree shows the waveform of the tab with the focus');
}
fs.rmSync(workspacePath, { recursive: true, force: true });
process.exit(process.exitCode ?? 0);
