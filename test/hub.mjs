// Runs the built Orca worker (build/plugin/worker.js) with a stand-in for the Orca API.
// It plays the panel and one editor frame: open a waveform, start the frame, add a signal.
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const waveform = process.argv[2] ?? path.join(here, '..', 'testdata', 'tpu.vcd');
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
const req = (name, input = {}) => handlers.get(name)(JSON.parse(JSON.stringify(input)), { panel: { id: 'x', surface: 'panel', contributionId: 'y' }, signal: new AbortController().signal });
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
check(variable.inline.some((b) => b.command === 'vaporview.addVariable' && b.icon === 'add'), 'a variable row has the inline "add" button');
const treeMenu = (await req('menu.tree', { id: variable.id })).items;
check(treeMenu.some((m) => m.title === 'Add Selected') && !treeMenu.some((m) => m.title?.startsWith('Add All Variables')) && !treeMenu.some((m) => m.title === 'Add Variable by Name...'), `tree menu of a variable (${treeMenu.filter((m) => m.kind === 'item').map((m) => m.title).join(', ')})`);
const scopeMenu = (await req('menu.tree', { id: top.items[0].id })).items;
check(scopeMenu.some((m) => m.title === 'Add All Variables in Scope (Recursive)'), 'tree menu of a scope has "Add All Variables in Scope"');
const signalMenu = (await req('menu.webview', { docKey: hello.docKey, context: { webviewSection: 'signal', width: 8, type: 'Wire' } })).items;
const format = signalMenu.find((m) => m.kind === 'submenu' && m.label === 'Format Values');
check(!!format && format.items.some((m) => m.title === 'Hexadecimal') && signalMenu.some((m) => m.title === 'Remove Variable'), `viewer menu of a signal (${signalMenu.filter((m) => m.kind !== 'separator').map((m) => m.title ?? m.label + ' >').join(', ')})`);
const bitMenu = (await req('menu.webview', { docKey: hello.docKey, context: { webviewSection: 'signal', width: 1 } })).items;
check(!bitMenu.some((m) => m.label === 'Format Values') && !bitMenu.some((m) => m.title === 'New Signal From Bit Range...'), 'viewer menu of a 1-bit signal has no "Format Values"');
const rulerMenu = (await req('menu.webview', { docKey: hello.docKey, context: { webviewSection: 'ruler', rulerLines: true } })).items;
check(rulerMenu.some((m) => m.title === 'Hide Ruler Lines') && !rulerMenu.some((m) => m.title === 'Show Ruler Lines'), 'viewer menu of the ruler follows the state');

// vaporview asks before it adds more than 48 signals. The plugin answers "Yes" itself.
posts.length = 0;
const poll2 = async () => JSON.parse((await req('editor.poll', { docKey: hello.docKey, instance: 'f2' })).messages);
const probe = poll2();                 // the live frame has a poll open
const addAll = req('menu.run', { source: 'tree', id: top.items[0].id, command: 'vaporview.addAllInScopeRecursive' });
await probe;                           // the worker asks if the frame is alive
const got = await poll2();             // the frame polls again, so it is alive
await addAll;
check(!posts.some((p) => p.event === 'ui.message') && got.some((m) => m.command === 'add-variable' && m.signalList.length > 48),
  `"add all in scope" adds the signals with no question (${got.filter((m) => m.command === 'add-variable').map((m) => m.signalList.length)} signals)`);

// A question that is not in the list of fixed answers goes to the pages and waits for the person.
const asked = req('debug.ask', { message: 'Test question', items: ['A', 'B'] });
let question;
for (let i = 0; i < 40 && !question; i++) { await sleep(25); question = posts.find((p) => p.event === 'ui.message' && p.payload.items.length)?.payload; }
check(question?.items.join(',') === 'A,B', 'another question goes to the pages with its buttons');
await req('ui.answer', { id: question?.id, item: 'B' });
check((await asked).answer === 'B' && posts.some((p) => p.event === 'ui.dismiss'), 'the answer of the person goes back to the worker');

await req('panel.close', { docKey: hello.docKey });
state = await req('panel.state', { workspace: context });
check(state.waveforms.length === 0, 'close removes the waveform');
// A closed waveform stays closed for a tab that is open, until the person opens it again.
const afterClose = JSON.parse(fs.readFileSync(sessionFile, 'utf8'));
check(afterClose.closed === true, 'close marks the session file');
check((await req('editor.poll', { docKey: hello.docKey, instance: 'f2' })).closed === true, 'a frame of the closed waveform is told "closed"');
check((await req('editor.hello', { instance: 'f3', fileName: session.fileName, session: afterClose, workspace: frameContext })).closed === true, 'a new frame does not load a closed waveform');
const again = await req('editor.hello', { instance: 'f3', fileName: session.fileName, session: afterClose, workspace: frameContext, reopen: true });
check(!!again.docKey && again.keybindings.length === 16, 'the person can open it again, and the frame gets the keybindings');
check((await req('editor.poll', { docKey: 'unknown', instance: 'f9' })).restart === true, 'a frame of an unknown document is told to start again');
fs.rmSync(workspacePath, { recursive: true, force: true });
process.exit(process.exitCode ?? 0);
