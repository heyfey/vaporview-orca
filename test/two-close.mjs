// Evidence for the vaporview defect "all documents share one file reader" (D10 in
// docs/feature-parity.md): opens two waveforms, closes both, and counts the open file handles.
// Not a part of `npm test`, because it fails with upstream vaporview 1.6.1:
//   node test/two-close.mjs                               the process stops with EBADF
//   node --unhandled-rejections=warn test/two-close.mjs   shows the handle that stays open
// With the fix the counts are 2, 1, 0 and no error shows. Linux only (/proc/self/fd).
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

const openVcd = () => fs.readdirSync('/proc/self/fd').filter((n) => { try { return fs.readlinkSync('/proc/self/fd/' + n).endsWith('.vcd'); } catch { return false; } }).length;
await req('panel.state', { workspace: context });
const second = path.join(workspacePath, 'second.vcd');
fs.copyFileSync(waveform, second);
const a = await req('panel.open', { path: waveform });
const b = await req('panel.open', { path: second });
console.log('RESULT: open file handles with two waveforms open:', openVcd());
await req('panel.close', { docKey: a.docKey });
await sleep(300);
console.log('RESULT: open file handles after the first close:', openVcd());
await req('panel.close', { docKey: b.docKey });
await sleep(500);
console.log('RESULT: open file handles after the second close:', openVcd());
console.log('RESULT: two waveforms closed, the process is alive');
fs.rmSync(workspacePath, { recursive: true, force: true });
process.exit(0);
