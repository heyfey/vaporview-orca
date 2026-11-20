// Two waveforms open, then both close: each document must close its own file one time.
// It is the test for vaporview issue 234 (all documents shared one file reader, so the second
// close failed with EBADF and one file stayed open). Vaporview does not wait for the close, so
// the test waits until the count of open files is the expected one. The count comes from
// /proc/self/fd. Where that folder does not exist, the test only makes sure that no error shows.
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const waveform = process.argv[2] ? path.resolve(process.argv[2]) : path.join(here, 'data', 'tpu.vcd');
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

const { default: activate } = await import(path.join(here, '..', 'dist', 'worker.js'));
await activate(orca);

process.on('unhandledRejection', (error) => check(false, `no promise fails without a handler (${error})`));
const canCount = fs.existsSync('/proc/self/fd');
const extension = path.extname(waveform);
const openFiles = () => fs.readdirSync('/proc/self/fd').filter((n) => { try { return fs.readlinkSync('/proc/self/fd/' + n).endsWith(extension); } catch { return false; } }).length;
// Waits until the count is the expected one. Gives the last count after 5 seconds.
const openFilesBecome = async (expected) => {
  if (!canCount) { await sleep(500); return expected; }
  for (let i = 0; i < 100 && openFiles() !== expected; i++) { await sleep(50); }
  return openFiles();
};
await req('panel.state', { workspace: context });
const second = path.join(workspacePath, 'second' + extension);
fs.copyFileSync(waveform, second);
const a = await req('panel.open', { path: waveform });
const b = await req('panel.open', { path: second });
let count = await openFilesBecome(2);
check(count === 2, `two open waveforms have two open files (${count})`);
await req('panel.close', { docKey: a.docKey });
count = await openFilesBecome(1);
check(count === 1, `the first close closes one file (${count})`);
await req('panel.close', { docKey: b.docKey });
count = await openFilesBecome(0);
check(count === 0, `the second close closes the other file (${count})`);
check((await req('panel.state', { workspace: context })).waveforms.length === 0, 'the two waveforms are closed and the worker is alive');
if (!canCount) { console.log('note: no /proc/self/fd, the open files were not counted'); }
fs.rmSync(workspacePath, { recursive: true, force: true });
process.exit(process.exitCode ?? 0);
