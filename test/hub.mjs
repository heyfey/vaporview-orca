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
const hello = await req('editor.hello', { instance: 'f1', fileName: session.fileName, session, workspace: context });
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
const add = req('tree.action', { id: variable.id, action: 'add' });
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
const hello2 = await req('editor.hello', { instance: 'f2', fileName: session.fileName, session, workspace: context });
check(hello2.docKey === hello.docKey && hello2.state?.zoomRatio === 1, 'a new frame gets the same document and the saved state');
check((await req('editor.poll', { docKey: hello.docKey, instance: 'f1' })).stale === true, 'the old frame is told that it is stale');

await req('panel.close', { docKey: hello.docKey });
state = await req('panel.state', { workspace: context });
check(state.waveforms.length === 0, 'close removes the waveform');
fs.rmSync(workspacePath, { recursive: true, force: true });
process.exit(process.exitCode ?? 0);
